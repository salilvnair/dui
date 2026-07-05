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

// Canvas can't resolve CSS custom properties (`var(--color-text-primary)`
// etc. only resolve against a real DOM element's computed style), so the
// resolved theme name is passed in as a prop and mapped to the same hex
// values dui's own [data-theme] CSS blocks use — keeps canvas-drawn text
// and chip backgrounds visually consistent with the rest of the app in
// both themes instead of a label that was always white.
const THEME_TOKENS = {
  dark:  {
    text: '#d4d4d4', chipBg: 'rgba(37, 37, 38, 0.85)',
    minimapBg: 'rgba(17, 24, 39, 0.85)', minimapBorder: 'rgba(255,255,255,0.2)', viewportStroke: '#ffffff',
  },
  light: {
    text: '#1f2328', chipBg: 'rgba(255, 255, 255, 0.9)',
    minimapBg: 'rgba(249, 250, 251, 0.92)', minimapBorder: 'rgba(0,0,0,0.15)', viewportStroke: '#1f2328',
  },
} as const;

function defaultColor(n: NetworkGraphNode): string {
  if (n.color) return n.color;
  if (n.communityId != null) return DEFAULT_PALETTE[n.communityId % DEFAULT_PALETTE.length];
  return '#6B7280';
}

/** Cluster every node sharing communityId `cid` into one collapsed node. No-op if <2 members. */
function clusterCommunity(network: Network, cid: number, allNodes: NetworkGraphNode[], theme: 'dark' | 'light'): void {
  const memberIds = new Set(allNodes.filter(n => n.communityId === cid).map(n => n.id));
  if (memberIds.size < 2) return;
  // Already clustered (or partially) — skip, avoids vis-network's "cluster already exists" throw.
  for (const id of memberIds) {
    if (!network.findNode(id).length) return;
    if (network.isCluster(id)) return;
  }
  const tokens = THEME_TOKENS[theme];
  const baseColor = DEFAULT_PALETTE[cid % DEFAULT_PALETTE.length];
  // Radius-aware clearance: vis-network's dot `size` IS the radius, so a
  // fixed vadjust sat right on top of (or inside) larger clusters. Scaling
  // the offset with size keeps a consistent ~20px gap above every cluster
  // regardless of its member count.
  const size = Math.min(20 + memberIds.size * 2, 60);
  network.cluster({
    joinCondition: (nodeOptions) => memberIds.has(nodeOptions.id as string),
    // vis-network genuinely accepts `id` in clusterNodeProperties at runtime
    // (it's how you address the cluster later via openCluster/isCluster) —
    // the shipped .d.ts's NodeOptions type just doesn't declare it.
    clusterNodeProperties: {
      id: `cluster:community:${cid}`,
      label: `Community ${cid} (${memberIds.size})`,
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
      // No `vadjust`: this vis-network version repositions vadjust-ed text
      // unreliably (it can land centered on the circle), and combining it
      // with `font.background` detaches the background box from the text.
      // The `dot` shape's DEFAULT label position is already below the
      // circle, where a plain `font.background` renders correctly — giving
      // a chip-style label (filled pill behind the text) that stays legible
      // over the canvas in both themes.
      font: {
        size: 13,
        color: tokens.text,
        background: tokens.chipBg,
      },
    } as VisNode & { id: string },
  });
}

export function NetworkGraphViewImpl({
  nodes, edges, onNodeClick, selectedId, colorBy, sizeBy, className = '', style,
  enableClustering = false, enableHoverDim = false, enableMinimap = false, theme = 'dark',
}: NetworkGraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesDataRef = useRef<DataSet<VisNode> | null>(null);
  const edgesDataRef = useRef<DataSet<VisEdge> | null>(null);
  const nodesById = useRef<Map<string, NetworkGraphNode>>(new Map());
  const neighborMapRef = useRef<Map<string, Set<string>>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    nodesById.current = new Map(nodes.map(n => [n.id, n]));

    const degree: Record<string, number> = {};
    const neighborMap = new Map<string, Set<string>>();
    edges.forEach(e => {
      degree[e.source] = (degree[e.source] ?? 0) + 1;
      degree[e.target] = (degree[e.target] ?? 0) + 1;
      if (!neighborMap.has(e.source)) neighborMap.set(e.source, new Set());
      if (!neighborMap.has(e.target)) neighborMap.set(e.target, new Set());
      neighborMap.get(e.source)!.add(e.target);
      neighborMap.get(e.target)!.add(e.source);
    });
    neighborMapRef.current = neighborMap;
    const maxDeg = Math.max(1, ...Object.values(degree));

    const themeTokens = THEME_TOKENS[theme];

    const visNodes: VisNode[] = nodes.map(n => {
      const color = colorBy ? colorBy(n) : defaultColor(n);
      const deg = degree[n.id] ?? 1;
      const size = sizeBy ? sizeBy(n, deg, maxDeg) : 10 + 30 * (deg / maxDeg);
      // Hide low-degree labels by omitting the label itself, not via
      // font.size 0 — a zero-size font can still leave rendering artifacts
      // at high zoom, and an omitted label simply isn't drawn (the hover
      // `title` tooltip still identifies the node).
      const showLabel = deg >= maxDeg * 0.15;
      return {
        id: n.id,
        label: showLabel ? n.label : undefined,
        title: n.label,
        // Selection keeps the node's own fill and flags it with a themed
        // border instead — the old highlight swapped the fill to the theme
        // text color, which read as a jarring near-black circle in light
        // mode (and near-white in dark).
        color: { background: color, border: color, highlight: { background: color, border: themeTokens.text } },
        size: Math.round(size * 10) / 10,
        // Chip-style label below the circle: `dot`'s default label position
        // (no vadjust — see clusterCommunity's comment for why vadjust is
        // avoided) plus a theme-aware filled background behind the text.
        font: {
          size: 12,
          color: themeTokens.text,
          background: themeTokens.chipBg,
        },
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

    const options: Options = {
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
      interaction: { hover: true, tooltipDelay: 100, hideEdgesOnDrag: true, navigationButtons: false },
      // Soft drop shadow on every node — same elevated-card depth cue dui's
      // own panels use, expressed via canvas shadow instead of CSS box-shadow.
      nodes: { shape: 'dot', borderWidth: 1.5, borderWidthSelected: 3, shadow: { enabled: true, color: 'rgba(0,0,0,0.35)', size: 8, x: 0, y: 3 } },
      edges: {
        smooth: { enabled: true, type: 'continuous', roundness: 0.25 },
        shadow: { enabled: true, color: 'rgba(0,0,0,0.12)', size: 3, x: 0, y: 1 },
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

    network.once('stabilizationIterationsDone', () => {
      network.setOptions({ physics: { enabled: false } });
      if (enableClustering) {
        const communityIds = new Set(nodes.map(n => n.communityId).filter((c): c is number => c != null));
        communityIds.forEach(cid => clusterCommunity(network, cid, nodes, theme));
        // Collapsed community super-nodes inherit their members' centroid
        // position and can land overlapping each other (and each other's
        // chip labels). One short physics burst separates them, then
        // physics goes back off so the layout stays stable.
        if (communityIds.size > 1) {
          network.once('stabilizationIterationsDone', () => {
            network.setOptions({ physics: { enabled: false } });
            drawMinimap();
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
    });

    // Label declutter (UIP-2): below this zoom the leaf chip labels collide
    // into noise — hide them wholesale and restore on zoom-in. Hidden via
    // `label: null` (DataSet.update ignores undefined; font.size 0 leaves
    // artifacts); originals are cached on first hide. Cluster super-nodes
    // live outside the DataSet and deliberately KEEP their labels — the
    // community names are exactly the landmarks you want when zoomed out.
    // Only fires on threshold crossings, not every zoom tick.
    const LABEL_ZOOM_THRESHOLD = 0.45;
    const labelCache = new Map<string | number, string>();
    let labelsHidden = false;
    network.on('zoom', () => {
      const hide = network.getScale() < LABEL_ZOOM_THRESHOLD;
      if (hide === labelsHidden) return;
      labelsHidden = hide;
      if (hide) {
        const updates: VisNode[] = [];
        for (const id of nodesData.getIds()) {
          const n = nodesData.get(id) as VisNode | null;
          if (n?.label) {
            labelCache.set(id, n.label as string);
            updates.push({ id, label: null } as unknown as VisNode);
          }
        }
        nodesData.update(updates);
      } else {
        const updates: VisNode[] = [];
        for (const [id, label] of labelCache) {
          updates.push({ id, label } as VisNode);
        }
        nodesData.update(updates);
        labelCache.clear();
      }
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
        const clusterData = nodesData.get(nodeId) as VisNode | null;
        onNodeClick?.({ id: nodeId, label: (clusterData?.label as string) || nodeId });
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
          if (n?.communityId != null) clusterCommunity(network, n.communityId, nodes, theme);
        }
        drawMinimap();
      });
    }

    if (enableHoverDim) {
      network.on('hoverNode', (params) => {
        const hoveredId: string = params.node;
        const neighbors = neighborMapRef.current.get(hoveredId) ?? new Set();
        const keep = new Set([hoveredId, ...neighbors]);

        const nodeUpdates = nodesData.getIds().map((id) => ({
          id,
          opacity: keep.has(id as string) ? 1 : DIMMED_OPACITY,
        }));
        nodesData.update(nodeUpdates);

        const edgeUpdates = edgesData.getIds().map((id) => {
          const e = edgesData.get(id) as VisEdge;
          const isKept = e.from === hoveredId || e.to === hoveredId;
          // `color` is replaced wholesale on update (not deep-merged), so
          // `inherit` has to be repeated here — omitting it would silently
          // drop the gradient-edge effect the instant you hover any node.
          return { id, color: { inherit: 'both', opacity: isKept ? 0.9 : DIMMED_OPACITY } };
        });
        edgesData.update(edgeUpdates);
      });

      network.on('blurNode', () => {
        nodesData.update(nodesData.getIds().map((id) => ({ id, opacity: 1 })));
        edgesData.update(edgesData.getIds().map((id) => ({ id, color: { inherit: 'both', opacity: 0.55 } })));
      });
    }

    if (enableMinimap) {
      network.on('dragEnd', drawMinimap);
      network.on('zoom', drawMinimap);
      network.on('afterDrawing', drawMinimap);
    }

    return () => {
      network.destroy();
      networkRef.current = null;
      nodesDataRef.current = null;
      edgesDataRef.current = null;
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
      network.focus(selectedId, { scale: 1.4, animation: true });
    }
  }, [selectedId]);

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
