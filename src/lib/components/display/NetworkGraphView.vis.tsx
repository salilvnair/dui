import { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data/peer';
import { Network } from 'vis-network/peer';
import type { Edge as VisEdge, Node as VisNode, Options } from 'vis-network/peer';
import type { NetworkGraphViewProps, NetworkGraphNode } from './NetworkGraphView';

const DEFAULT_PALETTE = [
  '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F',
  '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC',
];

const DIMMED_OPACITY = 0.12;
// Node/edge shadows and continuous-curve edge smoothing look nice but are
// recomputed by vis-network's own canvas draw loop on every single frame —
// above this size that cost (not anything in our own event handlers) is
// what makes zooming/panning feel sluggish on a large graph.
const LARGE_GRAPH_NODE_THRESHOLD = 300;
// Below this zoom the leaf chip labels collide into noise — hide them
// wholesale and restore on zoom-in. Collapsed community/cluster nodes carry
// their own always-legible member-count badge natively (see
// clusterCommunity) instead of a DOM chip, so they're unaffected either way.
const LABEL_ZOOM_THRESHOLD = 0.45;
// Label chips are RECYCLED, never created per graph element. The overlay
// holds a small fixed pool of chip elements; each frame the pool is handed
// to whichever nodes/edges are currently on screen and worth labelling.
//
// This is the whole performance story. Creating one DOM element per node
// and per edge is what made a 3,000-element graph unusable: every chip had
// to be re-positioned against the camera on each redraw, so the cost of a
// pan or zoom scaled with the size of the entire graph rather than with
// what you could actually see. Pooling caps that work at "one screenful"
// forever — the graph can hold a million nodes and a frame still costs the
// same. It also keeps the nice look: real DOM chips can be rounded, tinted
// and padded like dui's ChipView, and stay a constant on-screen size at any
// zoom, neither of which vis-network's canvas `font.background` can do (it
// is a hard-edged rectangle that balloons as you zoom in).
//
// Budgets are per-kind and deliberately generous — they only bite when the
// screen is genuinely crowded, at which point the most connected nodes win
// (they are the useful landmarks; the rest would be an unreadable smear).
const NODE_LABEL_BUDGET = 220;
const EDGE_LABEL_BUDGET = 120;
// Screen-space bucket size for the chip collision grid (see makeChipGrid).
// Roughly one chip-width — big enough that a chip spans only 2-3 cells,
// small enough that a cell holds very few chips.
const CHIP_GRID_CELL = 96;

// Canvas can't resolve CSS custom properties (`var(--color-text-primary)`
// etc. only resolve against a real DOM element's computed style), so the
// resolved theme name is passed in as a prop and mapped to the same hex
// values dui's own [data-theme] CSS blocks use — keeps the minimap and
// edge-label chips visually consistent with the rest of the app in both
// themes instead of always-white/black.
const THEME_TOKENS = {
  dark: {
    text: '#d4d4d4', chipBg: 'rgba(37, 37, 38, 0.85)', chipBorder: 'rgba(255,255,255,0.12)',
    minimapBg: 'rgba(17, 24, 39, 0.85)', minimapBorder: 'rgba(255,255,255,0.2)', viewportStroke: '#ffffff',
  },
  light: {
    text: '#1f2328', chipBg: 'rgba(255, 255, 255, 0.9)', chipBorder: 'rgba(0,0,0,0.12)',
    minimapBg: 'rgba(249, 250, 251, 0.92)', minimapBorder: 'rgba(0,0,0,0.15)', viewportStroke: '#1f2328',
  },
} as const;

function defaultColor(n: NetworkGraphNode): string {
  if (n.color) return n.color;
  if (n.communityId != null) return DEFAULT_PALETTE[n.communityId % DEFAULT_PALETTE.length];
  return '#6B7280';
}

/** Plain axis-aligned rect used for chip collision checks — deliberately
 *  not `DOMRect` (no need for its read-only/class overhead here). */
interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const rectsOverlap = (a: Rect, b: Rect) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

/**
 * Screen-space uniform grid for chip collision tests.
 *
 * The obvious implementation — keep one flat array of placed rects and
 * `.some()` over it per candidate — is O(n²): every chip scans every chip
 * placed before it, and with a nudge search that inner scan runs several
 * times per chip. At a few thousand chips that is tens of millions of rect
 * tests per pass, which is precisely how a smooth graph turns into a stuck
 * one.
 *
 * Bucketing by screen cell makes it O(1) amortised instead: a candidate
 * only ever tests against rects sharing one of the 2-3 cells it covers, so
 * total work grows linearly with chip count and not at all with how
 * crowded the rest of the canvas is. Same structure Sigma.js uses for its
 * label grid.
 */
function makeChipGrid() {
  const cells = new Map<number, Rect[]>();
  // Cantor-ish pairing into a single number key — cheaper than building a
  // `${cx},${cy}` string per cell per lookup in the hot path.
  const key = (cx: number, cy: number) => cx * 73856093 ^ cy * 19349663;
  const forEachCell = (r: Rect, fn: (k: number) => void) => {
    const cx0 = Math.floor(r.left / CHIP_GRID_CELL), cx1 = Math.floor(r.right / CHIP_GRID_CELL);
    const cy0 = Math.floor(r.top / CHIP_GRID_CELL), cy1 = Math.floor(r.bottom / CHIP_GRID_CELL);
    for (let cx = cx0; cx <= cx1; cx++) for (let cy = cy0; cy <= cy1; cy++) fn(key(cx, cy));
  };
  return {
    collides(r: Rect): boolean {
      let hit = false;
      forEachCell(r, k => {
        if (hit) return;
        const bucket = cells.get(k);
        if (bucket) for (let i = 0; i < bucket.length; i++) if (rectsOverlap(r, bucket[i])) { hit = true; return; }
      });
      return hit;
    },
    insert(r: Rect): void {
      forEachCell(r, k => {
        const bucket = cells.get(k);
        if (bucket) bucket.push(r); else cells.set(k, [r]);
      });
    },
  };
}

interface ChipStyle {
  color: string;
  bg: string;
  border: string;
  fontSize: number;
  fontWeight: number;
  padding: string;
}

/** Creates one empty pooled chip element. Only the properties that never
 *  change for the life of the chip are set here — text and palette are
 *  assigned per frame by applyChip(), since a pooled chip is reused by
 *  whichever node/edge currently needs it. */
function createChipElement(overlay: HTMLDivElement | null): HTMLDivElement {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.borderRadius = '9999px';
  el.style.letterSpacing = '0.01em';
  el.style.whiteSpace = 'nowrap';
  el.style.pointerEvents = 'none';
  el.style.display = 'none';
  overlay?.appendChild(el);
  return el;
}

/** Points a pooled chip at new content. Every write is guarded by a
 *  comparison: during a pan the same chips usually keep the same text, and
 *  assigning an identical string to `textContent` would still dirty layout. */
function applyChip(el: HTMLDivElement, text: string, s: ChipStyle): void {
  if (el.textContent !== text) el.textContent = text;
  if (el.style.padding !== s.padding) el.style.padding = s.padding;
  const fontSize = `${s.fontSize}px`;
  if (el.style.fontSize !== fontSize) el.style.fontSize = fontSize;
  const fontWeight = String(s.fontWeight);
  if (el.style.fontWeight !== fontWeight) el.style.fontWeight = fontWeight;
  if (el.style.background !== s.bg) el.style.background = s.bg;
  const border = `1px solid ${s.border}`;
  if (el.style.border !== border) el.style.border = border;
  if (el.style.color !== s.color) el.style.color = s.color;
}

function nodeChipStyle(color: string): ChipStyle {
  return {
    color,
    bg: `color-mix(in srgb, ${color} 16%, transparent)`,
    border: `color-mix(in srgb, ${color} 40%, transparent)`,
    fontSize: 12,
    fontWeight: 600,
    padding: '3px 9px',
  };
}

function edgeChipStyle(tokens: typeof THEME_TOKENS[keyof typeof THEME_TOKENS]): ChipStyle {
  // Neutral, not colored by an endpoint — relationship labels ("contains",
  // "calls") are secondary to node identity, so they shouldn't visually
  // compete with (or be mistaken for) a node's own colorful chip.
  return {
    color: tokens.text,
    bg: tokens.chipBg,
    border: tokens.chipBorder,
    fontSize: 10,
    fontWeight: 500,
    padding: '2px 7px',
  };
}

/**
 * Cluster every node sharing communityId `cid` into one collapsed node.
 * No-op if <2 members.
 *
 * Design note (was: a floating DOM "Community N (count)" pill chip above
 * every cluster — see git history): with dozens of same-sized communities
 * on a 1000+ node graph, those pills piled into an unreadable stack the
 * instant several sat near each other on screen (no amount of collision
 * nudging fixes running out of room). Matches how graphify/most graph
 * tools handle this instead: the canvas only ever shows geometry (a
 * colored, count-sized circle) plus a compact member-count badge baked
 * into the node's own vis-network label; the full "Community N (count)"
 * name lives in the hover tooltip (`title`) and the always-available
 * CommunityLegendPanel sidebar list (ns9-ui), never as an always-on
 * floating label competing for space with its neighbors.
 */
function clusterCommunity(network: Network, cid: number, allNodes: NetworkGraphNode[]): void {
  const memberIds = new Set(allNodes.filter(n => n.communityId === cid).map(n => n.id));
  if (memberIds.size < 2) return;
  // Already clustered (or partially) — skip, avoids vis-network's "cluster already exists" throw.
  for (const id of memberIds) {
    if (!network.findNode(id).length) return;
    if (network.isCluster(id)) return;
  }
  const baseColor = DEFAULT_PALETTE[cid % DEFAULT_PALETTE.length];
  const clusterId = `cluster:community:${cid}`;
  const label = `Community ${cid} (${memberIds.size})`;
  const size = Math.min(20 + memberIds.size * 2, 60);
  // vis-network's 'dot' shape always draws its label BELOW the node (an
  // "external label"), never inside — there's no built-in "labelled circle
  // sized independently of its text" mode. `vadjust` (a font option, added
  // to that external position) is the documented way to relocate it;
  // shifting up by ~(radius + half the badge's own text height) lands the
  // count roughly centered inside the circle instead of floating under it.
  const badgeFontSize = Math.max(11, Math.min(16, Math.round(size * 0.32)));
  const vadjust = -(size + badgeFontSize * 0.5);
  network.cluster({
    joinCondition: (nodeOptions) => memberIds.has(nodeOptions.id as string),
    // vis-network genuinely accepts `id` in clusterNodeProperties at runtime
    // (it's how you address the cluster later via openCluster/isCluster) —
    // the shipped .d.ts's NodeOptions type just doesn't declare it.
    clusterNodeProperties: {
      id: clusterId,
      // Member count only — the full name is tooltip + legend-panel only
      // (see the doc comment above). Not empty string: vis-network defaults
      // `label` to the literal "cluster" when it's `undefined`, which would
      // otherwise draw a stray caption under every collapsed community.
      label: String(memberIds.size),
      font: { color: '#ffffff', size: badgeFontSize, vadjust },
      title: label,
      shape: 'dot',
      // Larger + white-ringed so a collapsed community reads as a distinct
      // "group" at a glance, not just another same-sized leaf node.
      size,
      borderWidth: 3,
      color: { background: baseColor, border: '#ffffff', highlight: { background: baseColor, border: '#ffffff' } },
      // Soft colored glow (a hint of the community's own color) instead of a
      // flat plain circle — same "elevated card" depth language dui's own
      // panels use, just expressed on canvas.
      shadow: { enabled: true, color: `${baseColor}66`, size: 16, x: 0, y: 4 },
    } as VisNode & { id: string },
  });
}

export function NetworkGraphViewImpl({
  nodes, edges, onNodeClick, selectedId, fitTrigger, onReady, colorBy, sizeBy, className = '', style,
  enableClustering = false, enableHoverDim = false, enableMinimap = false, theme = 'dark',
}: NetworkGraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesDataRef = useRef<DataSet<VisNode> | null>(null);
  const edgesDataRef = useRef<DataSet<VisEdge> | null>(null);
  const nodesById = useRef<Map<string, NetworkGraphNode>>(new Map());
  const neighborMapRef = useRef<Map<string, Set<string>>>(new Map());
  // node id -> ids of every edge touching it. Lets hoverNode/blurNode look
  // up "which edges does this node touch" in O(degree) instead of scanning
  // every edge in the graph on every hover — see the hoverNode handler.
  const nodeEdgesRef = useRef<Map<string, Set<string | number>>>(new Map());
  // Every label (node, collapsed-community, edge) renders as a real DOM chip
  // styled like dui's own ChipView (rounded pill, color-mix background/
  // border, colored text) instead of vis-network's canvas-only
  // `font.background`, which is a plain rectangle with no border-radius, no
  // real padding, and — short of computing per-node canvas fill colors by
  // hand — no way to tint it from outside the library. DOM chips also fix
  // the "huge overlapping text at high zoom" complaint for free: unlike
  // vis's canvas labels (which scale with zoom, so they can balloon and
  // collide at high zoom), these stay a fixed on-screen size regardless of
  // zoom level.
  const labelsOverlayRef = useRef<HTMLDivElement>(null);
  // Recycled pools, grown lazily up to their budget — see the budget
  // constants. Index in the array is the only identity a chip has; which
  // node or edge it represents changes from frame to frame.
  const nodeChipPoolRef = useRef<HTMLDivElement[]>([]);
  const edgeChipPoolRef = useRef<HTMLDivElement[]>([]);
  // Chip dimensions cached per (kind, text) — the size of a chip depends
  // only on its string and its kind's fixed font/padding, so the same label
  // is measured exactly once for the life of the view no matter how many
  // times it is assigned to a pooled element.
  //
  // This cache is what keeps layout thrashing out of the hot path. Reading
  // `offsetWidth` right after writing `style.left/top` forces a synchronous
  // layout recalculation, and doing that per chip per redraw was the single
  // most expensive thing in this component.
  const chipTextSizeRef = useRef<Map<string, { w: number; h: number }>>(new Map());
  // Kept current every render (not via its own effect — just needs to be
  // readable-without-a-stale-closure from inside the settle callbacks
  // below, which are registered once per network instance via `.once()`).
  const selectedIdRef = useRef<string | null | undefined>(selectedId);
  selectedIdRef.current = selectedId;
  // Set while a network.focus()/moveTo() camera animation is in flight (see
  // the selectedId effect + the 'animationFinished' listener below). On a
  // graph with hundreds/thousands of chips, syncAllChipPositions and the
  // minimap redraw were still firing at their throttled ~10/sec cadence
  // DURING every one of vis-network's 1s click-to-focus animations — each
  // pass does a getBoundingBox/canvasToDOM + forced-reflow offsetWidth/
  // offsetHeight read PER CHIP, which is the actual "slow motion" jank on
  // large graphs (vis-network's own canvas redraw is comparatively cheap).
  // Skipping chip/minimap sync entirely while the camera is moving — and
  // doing exactly one full sync when it lands — removes ~10 of those
  // passes per click with no visible cost (chips settle the instant the
  // animation ends, same as they did after every throttled tick before).
  const isCameraAnimatingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Declared here (not inside the enableHoverDim block below that uses
    // it) so this effect's own cleanup can clear a still-pending timer on
    // unmount — otherwise a debounced blur restore could fire after
    // network.destroy() and touch a torn-down dataset.
    let blurRestoreTimer: ReturnType<typeof setTimeout> | null = null;

    nodesById.current = new Map(nodes.map(n => [n.id, n]));

    const degree: Record<string, number> = {};
    const neighborMap = new Map<string, Set<string>>();
    const nodeEdges = new Map<string, Set<string | number>>();
    edges.forEach((e, i) => {
      degree[e.source] = (degree[e.source] ?? 0) + 1;
      degree[e.target] = (degree[e.target] ?? 0) + 1;
      if (!neighborMap.has(e.source)) neighborMap.set(e.source, new Set());
      if (!neighborMap.has(e.target)) neighborMap.set(e.target, new Set());
      neighborMap.get(e.source)!.add(e.target);
      neighborMap.get(e.target)!.add(e.source);
      // Same id derivation as visEdges below (e.id ?? i) — same array, same
      // iteration order, so the ids line up.
      const edgeId = e.id ?? i;
      if (!nodeEdges.has(e.source)) nodeEdges.set(e.source, new Set());
      if (!nodeEdges.has(e.target)) nodeEdges.set(e.target, new Set());
      nodeEdges.get(e.source)!.add(edgeId);
      nodeEdges.get(e.target)!.add(edgeId);
    });
    neighborMapRef.current = neighborMap;
    nodeEdgesRef.current = nodeEdges;
    const maxDeg = Math.max(1, ...Object.values(degree));

    const themeTokens = THEME_TOKENS[theme];
    const nodeColors = new Map<string, string>();

    const visNodes: VisNode[] = nodes.map(n => {
      const color = colorBy ? colorBy(n) : defaultColor(n);
      nodeColors.set(n.id, color);
      const deg = degree[n.id] ?? 1;
      const size = sizeBy ? sizeBy(n, deg, maxDeg) : 10 + 30 * (deg / maxDeg);
      return {
        id: n.id,
        title: n.label,
        // No `label` here on purpose: every label is a pooled DOM chip
        // positioned by syncAllChipPositions. Collapsed community nodes are
        // the one exception and set their own label natively — see
        // clusterCommunity.
        // Selection keeps the node's own fill and flags it with a themed
        // border instead — the old highlight swapped the fill to the theme
        // text color, which read as a jarring near-black circle in light
        // mode (and near-white in dark).
        color: { background: color, border: color, highlight: { background: color, border: themeTokens.text } },
        size: Math.round(size * 10) / 10,
        shape: 'dot',
      };
    });

    const visEdges: VisEdge[] = edges.map((e, i) => ({
      id: e.id ?? i,
      from: e.source,
      to: e.target,
      title: e.type,
      // Blends from the source node's color to the target's at the
      // midpoint instead of a flat gray line — a vis-network-native
      // stand-in for the gradient edges ck8t's ReactFlow canvas uses.
      color: { inherit: 'both', opacity: 0.55 },
      arrows: { to: { enabled: true, scaleFactor: 0.6 } },
    }));

    const nodesData = new DataSet(visNodes);
    const edgesData = new DataSet(visEdges);
    nodesDataRef.current = nodesData;
    edgesDataRef.current = edgesData;

    // Above LARGE_GRAPH_NODE_THRESHOLD, shadows + continuous-curve edges are
    // disabled — see the constant's comment. Small graphs keep the nicer look.
    const isLargeGraph = nodes.length > LARGE_GRAPH_NODE_THRESHOLD;

    const options: Options = {
      // vis-network defaults `layout.improvedLayout` to true, which runs a
      // Kamada-Kawai pre-positioning pass whenever the graph exceeds its
      // internal clusterThreshold (150 nodes). On graphs with many
      // uneven-sized communities that pass regularly fails to reduce the
      // graph within its own iteration budget: it logs "This network could
      // not be positioned by this version of the improved layout
      // algorithm" and falls back to leaving most nodes near their default
      // circular starting positions with a ±35px jitter — the stray ring of
      // dots around the outside that physics then can't pull in within its
      // stabilization budget. Skipping the pre-pass (vis's own documented
      // suggestion, printed in that same message) lets forceAtlas2Based
      // position everything from a clean random start instead.
      layout: { improvedLayout: false },
      physics: {
        enabled: true,
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
          gravitationalConstant: -60,
          centralGravity: 0.005,
          springLength: 120,
          springConstant: 0.08,
          damping: 0.4,
          avoidOverlap: 0.8,
        },
        stabilization: { iterations: 200, fit: true },
      },
      // hideEdgesOnZoom mirrors hideEdgesOnDrag below — edges (continuous
      // smooth curves + shadows) are by far the most expensive thing on
      // canvas to redraw every frame; hiding them for the duration of a
      // zoom gesture (mouse wheel or pinch) is what actually fixes "zoom
      // feels like a turtle" on a large graph, vs. anything in our own
      // event handlers (which only ever ran custom code on TOP of vis's
      // own native per-frame draw loop, never touched by throttling it).
      interaction: {
        hover: true, tooltipDelay: 100,
        hideEdgesOnDrag: true, hideEdgesOnZoom: true,
        navigationButtons: false,
      },
      // Soft drop shadow on every node — same elevated-card depth cue dui's
      // own panels use, expressed via canvas shadow instead of CSS box-shadow.
      // Shadows aren't covered by hideEdgesOnZoom (nodes stay visible while
      // zooming) and shadowBlur is one of canvas's most expensive per-shape
      // operations — skip them above LARGE_GRAPH_NODE_THRESHOLD.
      nodes: {
        shape: 'dot', borderWidth: 1.5, borderWidthSelected: 3,
        shadow: { enabled: !isLargeGraph, color: 'rgba(0,0,0,0.35)', size: 8, x: 0, y: 3 },
      },
      edges: {
        // 'continuous' recomputes bezier control points per edge per draw —
        // the most expensive of vis-network's smooth types. Straight lines
        // above the threshold; edges are hidden during zoom either way.
        smooth: isLargeGraph ? false : { enabled: true, type: 'continuous', roundness: 0.25 },
        shadow: { enabled: !isLargeGraph, color: 'rgba(0,0,0,0.12)', size: 3, x: 0, y: 1 },
      },
    };

    const network = new Network(containerRef.current, { nodes: nodesData, edges: edgesData }, options);
    networkRef.current = network;

    const drawMinimap = () => {
      const canvas = minimapCanvasRef.current;
      if (!canvas || !enableMinimap) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const positions = network.getPositions();
      const xs = Object.values(positions).map(p => p.x);
      const ys = Object.values(positions).map(p => p.y);
      if (xs.length === 0) return;
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const w = canvas.width, h = canvas.height;
      const spanX = Math.max(1, maxX - minX), spanY = Math.max(1, maxY - minY);
      const toCanvas = (x: number, y: number): [number, number] => [
        ((x - minX) / spanX) * (w - 10) + 5,
        ((y - minY) / spanY) * (h - 10) + 5,
      ];

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = themeTokens.minimapBg;
      ctx.fillRect(0, 0, w, h);

      Object.entries(positions).forEach(([id, pos]) => {
        const [cx, cy] = toCanvas(pos.x, pos.y);
        const n = nodesById.current.get(id);
        ctx.fillStyle = n ? (colorBy ? colorBy(n) : defaultColor(n)) : '#6B7280';
        ctx.beginPath();
        // Degree-scaled dots so hubs read as landmarks when orienting.
        const deg = degree[id] ?? 0;
        ctx.arc(cx, cy, 1 + 1.5 * (deg / maxDeg), 0, Math.PI * 2);
        ctx.fill();
      });

      // Viewport rectangle
      const scale = network.getScale();
      const viewPos = network.getViewPosition();
      const canvasEl = containerRef.current;
      if (canvasEl && scale > 0) {
        const viewW = canvasEl.clientWidth / scale;
        const viewH = canvasEl.clientHeight / scale;
        const [rx1, ry1] = toCanvas(viewPos.x - viewW / 2, viewPos.y - viewH / 2);
        const [rx2, ry2] = toCanvas(viewPos.x + viewW / 2, viewPos.y + viewH / 2);
        ctx.strokeStyle = themeTokens.viewportStroke;
        ctx.lineWidth = 1;
        ctx.strokeRect(rx1, ry1, rx2 - rx1, ry2 - ry1);
      }
    };

    // ── Label chips (nodes, edges — NOT clusters, see clusterCommunity) ────
    // Nothing is created up front. Pools grow on demand, capped by the
    // budgets, and are handed out per frame by syncAllChipPositions.

    // Node positions live in canvas space, so panning and zooming don't
    // change them at all — only dragging a node or (de)clustering does.
    // Cached so the per-frame path never pays for a full getPositions().
    let canvasPositions: { [id: string]: { x: number; y: number } } | null = null;
    const invalidatePositions = () => { canvasPositions = null; };

    // Hover-dim state. A pooled chip has no fixed owner, so "dim everything
    // that isn't a neighbour of the hovered node" can't be applied to chips
    // by id up front — instead the hover handler records what should stay
    // lit and the sync applies it to whichever chip currently shows that
    // node. `null` means nothing is hovered and everything is lit.
    let dimKeepNodes: Set<string> | null = null;
    let dimKeepEdges: Set<string | number> | null = null;

    const edgeTypeById = new Map<string | number, string>();
    edges.forEach((e, i) => { if (e.type) edgeTypeById.set(e.id ?? i, e.type); });

    /** Pooled chip at `index`, created on first use. */
    const chipAt = (pool: HTMLDivElement[], index: number): HTMLDivElement => {
      let el = pool[index];
      if (!el) { el = createChipElement(labelsOverlayRef.current); pool[index] = el; }
      return el;
    };

    /** Size of `text` rendered as `kind`, measured at most once ever. The
     *  single `offsetWidth` read here happens only on a cache miss, i.e. the
     *  first time a given label is ever shown — never on a steady-state pan. */
    const chipSize = (el: HTMLDivElement, kind: 'n' | 'e', text: string) => {
      const key = `${kind} ${text}`;
      let size = chipTextSizeRef.current.get(key);
      if (!size) {
        size = { w: el.offsetWidth, h: el.offsetHeight };
        chipTextSizeRef.current.set(key, size);
      }
      return size;
    };

    const hidePoolFrom = (pool: HTMLDivElement[], from: number) => {
      for (let i = from; i < pool.length; i++) {
        if (pool[i].style.display !== 'none') pool[i].style.display = 'none';
      }
    };

    /**
     * Positions every (non-cluster — see clusterCommunity) chip and decides
     * what's visible this frame:
     *  - Node chips hide when their node is absorbed into a collapsed
     *    cluster, or when fully zoomed out (declutter threshold).
     *  - A visible node chip is never hidden for overlapping another —
     *    instead it's nudged in a small grid search (a handful of pixels at
     *    a time, capped) until it clears, the same "stack the overlapping
     *    pins" trick map UIs use for crowded marker labels.
     *  - Edge chips hide when either endpoint isn't currently visible
     *    (absorbed into a cluster — the underlying edge itself isn't drawn
     *    either), when fully zoomed out, OR when they'd visually overlap a
     *    node chip (node identity wins over relationship labels).
     */
    const syncAllChipPositions = () => {
      const nodePool = nodeChipPoolRef.current;
      const edgePool = edgeChipPoolRef.current;
      const viewW = containerRef.current?.clientWidth ?? 0;
      const viewH = containerRef.current?.clientHeight ?? 0;

      // Fully zoomed out: chips would collide into noise. Collapsed
      // community nodes keep their own canvas-drawn member-count badge, so
      // nothing important disappears here.
      if (network.getScale() < LABEL_ZOOM_THRESHOLD || !viewW || !viewH) {
        hidePoolFrom(nodePool, 0);
        hidePoolFrom(edgePool, 0);
        return;
      }

      if (!canvasPositions) canvasPositions = network.getPositions();
      const tl = network.DOMtoCanvas({ x: 0, y: 0 });
      const br = network.DOMtoCanvas({ x: viewW, y: viewH });

      // Everything on screen is a candidate. Only if the screen is crowded
      // past the budget do we rank — and then by degree, so the landmarks
      // survive and the anonymous leaves are the ones dropped. Zooming in
      // shrinks the candidate set, which is what makes zoom the natural
      // "reveal more detail" gesture rather than a fixed global cutoff.
      const candidates: { id: string; deg: number }[] = [];
      for (const id in canvasPositions) {
        const p = canvasPositions[id];
        if (p.x < tl.x || p.x > br.x || p.y < tl.y || p.y > br.y) continue;
        // Cluster super-nodes carry their own badge — never chip them.
        if (!nodesById.current.has(id)) continue;
        candidates.push({ id, deg: degree[id] ?? 0 });
      }
      if (candidates.length > NODE_LABEL_BUDGET) {
        candidates.sort((a, b) => b.deg - a.deg);
        candidates.length = NODE_LABEL_BUDGET;
      }

      const grid = makeChipGrid();
      const MAX_NUDGES = 12; // 4 rows × 3 columns (center/left/right per row)
      let used = 0;

      for (const cand of candidates) {
        const node = nodesById.current.get(cand.id);
        if (!node?.label) continue;
        // Absorbed into a collapsed community since positions were cached.
        if (network.findNode(cand.id).length !== 1) continue;

        const box = network.getBoundingBox(cand.id);
        if (!box) continue;
        const domPos = network.canvasToDOM({ x: (box.left + box.right) / 2, y: box.bottom });

        const el = chipAt(nodePool, used);
        applyChip(el, node.label, nodeChipStyle(nodeColors.get(cand.id) ?? '#6B7280'));
        if (el.style.display !== '') el.style.display = '';
        const opacity = !dimKeepNodes || dimKeepNodes.has(cand.id) ? '1' : String(DIMMED_OPACITY);
        if (el.style.opacity !== opacity) el.style.opacity = opacity;
        const { w, h } = chipSize(el, 'n', node.label);

        // Grid search, not a straight-down stack: two overlapping chips are
        // just as often side-by-side (adjacent communities at similar
        // height) as stacked, and a pure vertical nudge never resolves a
        // horizontal collision. Each attempt tries center/left/right at a
        // given row before dropping to the next row down.
        const baseLeft = domPos.x - w / 2;
        const baseTop = domPos.y + 6;
        let left = baseLeft, top = baseTop;
        for (let n = 0; n < MAX_NUDGES; n++) {
          const row = Math.floor(n / 3);
          const col = (n % 3) - 1; // -1, 0, 1
          left = baseLeft + col * (w + 6);
          top = baseTop + row * (h + 3);
          if (!grid.collides({ left, top, right: left + w, bottom: top + h })) break;
        }
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        grid.insert({ left, top, right: left + w, bottom: top + h });
        used++;
      }
      hidePoolFrom(nodePool, used);

      // Edge chips: same budget treatment, and they always lose a collision
      // against a node chip — relationship labels are secondary to identity.
      let edgeUsed = 0;
      for (const [edgeId, type] of edgeTypeById) {
        if (edgeUsed >= EDGE_LABEL_BUDGET) break;
        const e = edgesData.get(edgeId) as VisEdge | null;
        if (!e) continue;
        const from = canvasPositions[e.from as string];
        const to = canvasPositions[e.to as string];
        if (!from || !to) continue;
        const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
        if (mid.x < tl.x || mid.x > br.x || mid.y < tl.y || mid.y > br.y) continue;
        if (network.findNode(e.from as string).length !== 1) continue;
        if (network.findNode(e.to as string).length !== 1) continue;

        const domPos = network.canvasToDOM(mid);
        const el = chipAt(edgePool, edgeUsed);
        applyChip(el, type, edgeChipStyle(themeTokens));
        if (el.style.display !== '') el.style.display = '';
        const eOpacity = !dimKeepEdges || dimKeepEdges.has(edgeId) ? '1' : String(DIMMED_OPACITY);
        if (el.style.opacity !== eOpacity) el.style.opacity = eOpacity;
        const { w, h } = chipSize(el, 'e', type);
        const rect: Rect = { left: domPos.x - w / 2, top: domPos.y - h / 2, right: domPos.x + w / 2, bottom: domPos.y + h / 2 };
        if (grid.collides(rect)) { el.style.display = 'none'; continue; }
        el.style.left = `${rect.left}px`;
        el.style.top = `${rect.top}px`;
        grid.insert(rect);
        edgeUsed++;
      }
      hidePoolFrom(edgePool, edgeUsed);
    };

    const syncOverlays = syncAllChipPositions;

    // Coalesce to at most one sync per animation frame, and run it aligned
    // with paint rather than on a wall-clock timer. A fixed 100ms throttle
    // is both too slow (chips visibly lag the canvas mid-drag) and too fast
    // (a pass that takes longer than the interval just queues the next one
    // immediately, so the main thread never gets a gap). rAF self-limits:
    // if a pass is slow, frames drop and the sync rate drops with them
    // instead of piling up.
    let syncRafHandle: number | null = null;
    const syncOverlaysThrottled = () => {
      // A network.focus()/moveTo() camera animation is running — overlays
      // get one full, non-throttled sync the instant it lands (see the
      // 'animationFinished' listener below). Skipping them mid-flight is
      // what actually fixes the large-graph "slow motion" click-to-zoom.
      if (isCameraAnimatingRef.current) return;
      if (syncRafHandle !== null) return;
      syncRafHandle = requestAnimationFrame(() => {
        syncRafHandle = null;
        syncOverlays();
      });
    };

    network.once('stabilizationIterationsDone', () => {
      network.setOptions({ physics: { enabled: false } });
      let willRunClusterSeparationBurst = false;
      if (enableClustering) {
        const communityIds = new Set(nodes.map(n => n.communityId).filter((c): c is number => c != null));
        communityIds.forEach(cid => clusterCommunity(network, cid, nodes));
        // Collapsed community super-nodes inherit their members' centroid
        // position and can land overlapping each other. One short physics
        // burst separates them, then
        // physics goes back off so the layout stays stable.
        if (communityIds.size > 1) {
          willRunClusterSeparationBurst = true;
          network.once('stabilizationIterationsDone', () => {
            network.setOptions({ physics: { enabled: false } });
            drawMinimap();
            // Physics + clustering just moved everything — the cached
            // canvas positions are stale.
            invalidatePositions();
            syncOverlays();
            // A selectedId set before this rebuild's stabilization finished
            // (e.g. a filter change that just made the selected node visible
            // again) needs to be (re-)applied here — the standalone
            // selectedId effect below fires as soon as the network is
            // (re)created, well before physics has settled, so its focus()
            // call is invisibly overwritten by physics ticks still in
            // progress. This is the true final settle point; re-focus wins.
            if (selectedIdRef.current && network.findNode(selectedIdRef.current).length > 0) {
              network.selectNodes([selectedIdRef.current]);
              network.focus(selectedIdRef.current, { scale: 1.4, animation: true });
              isCameraAnimatingRef.current = true;
            }
            // Genuinely ready only now — calling onReady from the outer
            // callback too would reveal the canvas mid-cluster-separation
            // (nodes still visibly reflowing), the exact ugly transient
            // state onReady exists to hide.
            onReady?.();
          });
          network.setOptions({
            physics: { enabled: true, stabilization: { iterations: 80, fit: false } },
          });
          network.stabilize(80);
        }
      }
      // Slight zoom-out so labels/nodes at the layout's bounding box aren't
      // flush against (and clipped by) the viewport edges.
      const scale = network.getScale();
      if (scale > 0) network.moveTo({ scale: scale * 0.92 });
      drawMinimap();
      // Stabilization (and any clustering above) just moved every node.
      invalidatePositions();
      syncOverlays();
      if (!willRunClusterSeparationBurst) {
        // See the matching comment in the nested cluster-separation settle
        // callback above — re-apply a pre-set selectedId here since this is
        // the true final settle point when no cluster-separation burst is
        // coming.
        if (selectedIdRef.current && network.findNode(selectedIdRef.current).length > 0) {
          network.selectNodes([selectedIdRef.current]);
          network.focus(selectedIdRef.current, { scale: 1.4, animation: true });
          isCameraAnimatingRef.current = true;
        }
        onReady?.();
      }
    });

    network.on('afterDrawing', syncOverlaysThrottled);
    network.on('dragEnd', () => { invalidatePositions(); syncOverlays(); });

    // vis-network's own animation-driven redraws (focus()/moveTo() with
    // animation: true) are what 'animationFinished' marks the end of — see
    // isCameraAnimatingRef's declaration above for why chip/minimap sync is
    // skipped while one is in flight.
    network.on('animationFinished', () => {
      isCameraAnimatingRef.current = false;
      syncOverlays();
      if (enableMinimap) drawMinimap();
    });

    network.on('click', (params) => {
      if (params.nodes.length === 0) return;
      const nodeId = params.nodes[0];
      const n = nodesById.current.get(nodeId);
      if (n) {
        onNodeClick?.(n);
        return;
      }
      // Clicked node has no backing NetworkGraphNode — this is a collapsed
      // cluster's synthetic id (e.g. "cluster:community:5"), not a real node.
      // Still fire the callback with a lightweight synthetic node so the
      // caller's click handling (e.g. a side-panel summary) actually runs
      // instead of silently doing nothing, which is what a plain lookup
      // miss used to produce.
      if (network.isCluster(nodeId)) {
        onNodeClick?.({ id: nodeId, label: nodeId });
      }
    });

    if (enableClustering) {
      network.on('doubleClick', (params) => {
        if (params.nodes.length !== 1) return;
        const nodeId = params.nodes[0];
        if (network.isCluster(nodeId)) {
          network.openCluster(nodeId);
        } else {
          const n = nodesById.current.get(nodeId);
          if (n?.communityId != null) clusterCommunity(network, n.communityId, nodes);
        }
        drawMinimap();
        // Opening/collapsing a cluster changes which nodes exist.
        invalidatePositions();
        syncOverlays();
      });
    }

    if (enableHoverDim) {
      // Diff against the PREVIOUS "kept" (opacity-1) set instead of
      // rewriting every node/edge on every hoverNode. hoverNode fires on
      // every node the mouse passes over while simply moving across the
      // canvas (not just on click) — a full nodesData.update() +
      // edgesData.update() over the WHOLE graph (1200+/1500+ items, each a
      // real vis-data change event → canvas redraw) on every single one of
      // those was the actual "everything feels slow" cause on a large
      // graph. nodeEdgesRef (built above, once) makes "which edges touch
      // this node" O(degree) instead of an O(all edges) scan too.
      //
      // A previous version of this fix (see git history if curious) had
      // hoverNode and blurNode using DIFFERENT, asymmetric logic — blurNode
      // "restored" prevKeptNodeIds (the already-correct, already-opacity-1
      // set) instead of the actually-dimmed complement, which is backwards:
      // it left everything ELSE stuck dimmed forever, visible as "hovering
      // anything makes the graph disappear and it never comes back."
      // applyKeep() below is now the ONE diff routine both events call,
      // just with a different target "keepNodes" set — hoverNode passes
      // {hoveredId, neighbors}, blurNode passes "everyone" (the correct
      // definition of "nothing is dimmed", not the empty set).
      let prevKeptNodeIds = new Set<string>(nodesData.getIds() as string[]);
      let prevKeptEdgeIds = new Set<string | number>(edgesData.getIds());
      // blurNode is debounced: it fires just as often as hoverNode (every
      // node the mouse LEAVES while moving), and moving between two
      // adjacent nodes fires blur(A) then hover(B) back-to-back — doing the
      // full "restore everyone" work synchronously in blur would mean B's
      // hover immediately re-dims most of it again, paying the O(n) cost
      // TWICE per transition instead of once. Deferring it a beat lets a
      // following hoverNode cancel the pending restore and build its own
      // (cheap, small-diff) transition directly on top of whatever's
      // currently dimmed — the full restore only actually runs once the
      // mouse has genuinely stopped hovering anything. (blurRestoreTimer
      // itself is declared at the top of this effect, not here — so this
      // effect's cleanup can also clear it.)

      const applyKeep = (keepNodes: Set<string>, keepEdges: Set<string | number>) => {
        const nodeUpdates: { id: string; opacity: number }[] = [];
        for (const id of keepNodes) if (!prevKeptNodeIds.has(id)) nodeUpdates.push({ id, opacity: 1 });
        for (const id of prevKeptNodeIds) if (!keepNodes.has(id)) nodeUpdates.push({ id, opacity: DIMMED_OPACITY });
        if (nodeUpdates.length) nodesData.update(nodeUpdates);

        const edgeUpdates: { id: string | number; color: { inherit: 'both'; opacity: number } }[] = [];
        // `color` is replaced wholesale on update (not deep-merged), so
        // `inherit` has to be repeated here — omitting it would silently
        // drop the gradient-edge effect the instant an edge changes state.
        for (const id of keepEdges) {
          if (!prevKeptEdgeIds.has(id)) edgeUpdates.push({ id, color: { inherit: 'both', opacity: 0.9 } });
        }
        for (const id of prevKeptEdgeIds) {
          if (!keepEdges.has(id)) edgeUpdates.push({ id, color: { inherit: 'both', opacity: DIMMED_OPACITY } });
        }
        if (edgeUpdates.length) edgesData.update(edgeUpdates);

        // Chips are pooled, so they can't be dimmed by id here — record the
        // lit sets and let the sync apply them to whichever chip currently
        // represents each node/edge.
        dimKeepNodes = keepNodes;
        dimKeepEdges = keepEdges;
        syncOverlays();

        prevKeptNodeIds = keepNodes;
        prevKeptEdgeIds = keepEdges;
      };

      network.on('hoverNode', (params) => {
        if (blurRestoreTimer !== null) {
          clearTimeout(blurRestoreTimer);
          blurRestoreTimer = null;
        }
        const hoveredId: string = params.node;
        const neighbors = neighborMapRef.current.get(hoveredId) ?? new Set();
        // Real ids only. hoveredId can be a SYNTHETIC cluster id
        // ("cluster:community:N") — vis-network fires hoverNode for
        // collapsed communities too, and neighborMapRef (built from the
        // original nodes/edges, pre-clustering) never contains one. Left
        // unfiltered, pushing a cluster id into nodesData.update() silently
        // INSERTS a phantom real DataSet node sharing that same id —
        // colliding with and hijacking vis-network's own internal virtual
        // rendering of that cluster (part of the "community circles
        // disappear" bug — verified live: this INSERT is real, confirmed
        // by inspecting network.body.data.nodes before/after a direct
        // hoverNode emit on a cluster id).
        const keepNodes = new Set<string>(
          [hoveredId, ...neighbors].filter((id) => nodesData.get(id) != null)
        );
        const keepEdges = nodeEdgesRef.current.get(hoveredId) ?? new Set<string | number>();
        applyKeep(keepNodes, keepEdges);
      });

      network.on('blurNode', () => {
        blurRestoreTimer = setTimeout(() => {
          blurRestoreTimer = null;
          applyKeep(new Set(nodesData.getIds() as string[]), new Set(edgesData.getIds()));
        }, 80);
      });
    }

    if (enableMinimap) {
      network.on('dragEnd', drawMinimap);
      // 'zoom' fires on every scale-level change — completely unthrottled —
      // and mouse-wheel zooming fires a burst of these per tick, each one
      // previously doing a full getPositions() + one arc per node redraw.
      // On a 1,242-node graph that's the "turtle" scroll-to-zoom lag: shares
      // the same ~10/sec throttle budget as afterDrawing below so a fast
      // scroll doesn't queue up dozens of full minimap repaints.
      let lastMinimapDraw = 0;
      const throttledDrawMinimap = () => {
        if (isCameraAnimatingRef.current) return;
        const now = Date.now();
        if (now - lastMinimapDraw < 100) return;
        lastMinimapDraw = now;
        drawMinimap();
      };
      network.on('zoom', throttledDrawMinimap);
      // afterDrawing fires on EVERY canvas render — during pane resizes or
      // physics ticks that meant a full minimap repaint (getPositions + one
      // arc per node) per frame, a visible drag-lag contributor. Gate it to
      // ~10 repaints/second; dragEnd above still repaints instantly.
      network.on('afterDrawing', throttledDrawMinimap);
    }

    return () => {
      if (blurRestoreTimer !== null) clearTimeout(blurRestoreTimer);
      // A queued sync would otherwise fire after destroy() and touch a
      // torn-down network — same hazard as blurRestoreTimer above.
      if (syncRafHandle !== null) cancelAnimationFrame(syncRafHandle);
      network.destroy();
      networkRef.current = null;
      nodesDataRef.current = null;
      edgesDataRef.current = null;
      for (const el of nodeChipPoolRef.current) el.remove();
      nodeChipPoolRef.current = [];
      for (const el of edgeChipPoolRef.current) el.remove();
      edgeChipPoolRef.current = [];
      chipTextSizeRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, enableClustering, enableHoverDim, enableMinimap, theme]);

  useEffect(() => {
    const network = networkRef.current;
    if (!network || !selectedId) return;
    // `nodesById` only indexes the original (pre-cluster) node list, so a
    // collapsed cluster's synthetic id (e.g. "cluster:community:5") always
    // missed this check and never got the focus/zoom treatment real nodes
    // get. `network.findNode` looks up vis-network's own live node index,
    // which includes cluster super-nodes, so it correctly covers both.
    if (network.findNode(selectedId).length > 0) {
      network.selectNodes([selectedId]);
      // Set AFTER focus(), not before: vis-network forcibly finishes any
      // still-running animation synchronously inside focus() itself (and
      // synchronously emits 'animationFinished' for THAT one) before it
      // starts this new one — rapidly clicking a second node mid-animation
      // would otherwise have our own 'animationFinished' handler for the
      // interrupted animation flip the flag back to false a moment after
      // we'd set it true, immediately un-gating sync for the new animation
      // that just started.
      network.focus(selectedId, { scale: 1.4, animation: true });
      isCameraAnimatingRef.current = true;
    }
    // `nodes` is included so a previously-set selectedId gets re-applied to
    // a freshly (re)created network — e.g. a caller relaxing a node-type
    // filter that was hiding the selected node rebuilds `network` (see the
    // `[nodes, edges, ...]` effect above) without `selectedId` itself ever
    // changing, and the fresh network otherwise never learns it should
    // focus on it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, nodes]);

  // "Reset zoom" — a genuine zoom-to-fit-all, recomputed fresh every time
  // (the same bounding-box calculation vis-network runs when you scroll the
  // mouse wheel all the way out), not a restore of some earlier captured
  // camera snapshot — a snapshot can go stale (e.g. once a cluster has been
  // expanded, or after a click-to-focus) and "reset" would silently stop
  // matching what "totally zoomed out" actually looks like right now.
  // Skips the initial mount (fitTrigger starts at 0/undefined) — only fires
  // on a genuine increment from the host app's Reset button.
  const prevFitTriggerRef = useRef(fitTrigger);
  useEffect(() => {
    const network = networkRef.current;
    if (!network || fitTrigger === undefined || fitTrigger === prevFitTriggerRef.current) {
      prevFitTriggerRef.current = fitTrigger;
      return;
    }
    prevFitTriggerRef.current = fitTrigger;
    network.unselectAll();
    network.fit({ animation: true });
    isCameraAnimatingRef.current = true;
  }, [fitTrigger]);

  const minimapToGraph = (evt: { clientX: number; clientY: number }): { x: number; y: number } | null => {
    const network = networkRef.current;
    const canvas = minimapCanvasRef.current;
    if (!network || !canvas) return null;
    const positions = network.getPositions();
    const xs = Object.values(positions).map(p => p.x);
    const ys = Object.values(positions).map(p => p.y);
    if (xs.length === 0) return null;
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const rect = canvas.getBoundingClientRect();
    const cx = evt.clientX - rect.left, cy = evt.clientY - rect.top;
    const spanX = Math.max(1, maxX - minX), spanY = Math.max(1, maxY - minY);
    return {
      x: ((cx - 5) / (canvas.width - 10)) * spanX + minX,
      y: ((cy - 5) / (canvas.height - 10)) * spanY + minY,
    };
  };

  const handleMinimapClick = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = minimapToGraph(evt);
    if (pos) networkRef.current?.moveTo({ position: pos, animation: true });
  };

  // Drag-the-viewport panning (UIP-3): press-and-drag on the minimap pans
  // the main canvas continuously (no animation during drag — it would lag
  // behind the pointer). Click-to-center still works via handleMinimapClick.
  const minimapDragging = useRef(false);
  const handleMinimapMouseDown = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    minimapDragging.current = true;
    const move = (e: MouseEvent) => {
      if (!minimapDragging.current) return;
      const pos = minimapToGraph(e);
      if (pos) networkRef.current?.moveTo({ position: pos });
    };
    const up = () => {
      minimapDragging.current = false;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    evt.preventDefault();
  };

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div ref={labelsOverlayRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} />
      {enableMinimap && (
        <canvas
          ref={minimapCanvasRef}
          width={140}
          height={100}
          onClick={handleMinimapClick}
          onMouseDown={handleMinimapMouseDown}
          style={{
            // bottom 72 (not 8): host apps commonly float a chat/action
            // orb in the bottom-right corner — leave that spot free.
            position: 'absolute', bottom: 72, right: 8,
            borderRadius: 4, border: `1px solid ${THEME_TOKENS[theme].minimapBorder}`,
            cursor: 'grab',
          }}
        />
      )}
    </div>
  );
}
