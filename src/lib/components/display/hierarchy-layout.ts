/**
 * Layout maths for the hierarchical charts.
 *
 * Kept apart from the components because this is the part that can be wrong in
 * ways nobody sees: an arc that is two degrees short, a row whose widths do not
 * sum to the parent, a depth that quietly drops the deepest frames. A chart
 * that renders is not a chart that is correct, so the arithmetic is separated
 * out where it can be checked.
 */

/** A node in anything hierarchical — a heap, a stack, a filesystem. */
export interface HierarchyNode {
  name: string;
  /** Own size. Ignored when there are children — the parent is their sum. */
  value?: number;
  children?: HierarchyNode[];
  /** Anything the caller wants back on the laid-out slice. */
  meta?: unknown;
}

/** One laid-out ring segment. Angles are radians, clockwise from 12 o'clock. */
export interface SunburstSlice {
  name: string;
  value: number;
  depth: number;
  startAngle: number;
  endAngle: number;
  /** Share of the whole, 0–1. Useful for labelling and for hiding slivers. */
  share: number;
  meta?: unknown;
}

/** One laid-out flame-graph cell. x and width are fractions of the total, 0–1. */
export interface FlameCell {
  name: string;
  value: number;
  depth: number;
  x: number;
  width: number;
  meta?: unknown;
}

/**
 * A node's total, computed once.
 *
 * A leaf is its own value; a parent is the sum of its children, and its own
 * `value` is ignored rather than added. Adding both is the classic way to get
 * a chart whose slices exceed the circle: every level double-counts, and the
 * error compounds with depth so it looks fine at the top and absurd at the
 * bottom.
 */
export function totalOf(node: HierarchyNode): number {
  if (node.children?.length) {
    let sum = 0;
    for (const c of node.children) sum += totalOf(c);
    return sum;
  }
  return Math.max(0, node.value ?? 0);
}

/**
 * Lay a hierarchy out as concentric rings.
 *
 * The root occupies the full circle and is not emitted — it is the hole in the
 * middle, and drawing it would put a disc over the labels. Children divide
 * their parent's arc in the order given, so a caller that wants them biggest
 * first sorts before calling; this does not reorder, because for a stack the
 * order IS the meaning.
 *
 * `minShare` drops slices too thin to see. They are dropped rather than
 * merged into a sibling, and their arc is left empty: a "other" wedge invents
 * a thing that is not in the data, and stretching the survivors to fill the
 * gap would misstate every remaining share.
 */
export function sunburstLayout(
  root: HierarchyNode,
  opts: { maxDepth?: number; minShare?: number } = {},
): SunburstSlice[] {
  const maxDepth = opts.maxDepth ?? 4;
  const minShare = opts.minShare ?? 0.005;

  const total = totalOf(root);
  if (total <= 0) return [];

  const out: SunburstSlice[] = [];

  const walk = (node: HierarchyNode, depth: number, start: number, end: number) => {
    if (depth > maxDepth) return;

    if (depth > 0) {
      const share = (end - start) / (Math.PI * 2);
      if (share < minShare) return;
      out.push({
        name: node.name,
        value: totalOf(node),
        depth,
        startAngle: start,
        endAngle: end,
        share,
        meta: node.meta,
      });
    }

    const kids = node.children;
    if (!kids?.length) return;

    const span = end - start;
    const sum = totalOf(node);
    if (sum <= 0) return;

    let cursor = start;
    for (const child of kids) {
      const slice = (totalOf(child) / sum) * span;
      walk(child, depth + 1, cursor, cursor + slice);
      cursor += slice;
    }
  };

  walk(root, 0, 0, Math.PI * 2);
  return out;
}

/**
 * Lay a hierarchy out as a flame graph.
 *
 * Same arithmetic as the sunburst, unrolled: each level is a row, a child's
 * width is its share of the parent's width, and children sit directly beneath
 * the parent they came from. The root is emitted here — in a flame graph it is
 * the base everything stands on, and leaving it out makes the first real row
 * look like it floats.
 */
export function flameLayout(
  root: HierarchyNode,
  opts: { maxDepth?: number; minWidth?: number } = {},
): FlameCell[] {
  const maxDepth = opts.maxDepth ?? 32;
  const minWidth = opts.minWidth ?? 0.002;

  const total = totalOf(root);
  if (total <= 0) return [];

  const out: FlameCell[] = [];

  const walk = (node: HierarchyNode, depth: number, x: number, width: number) => {
    if (depth > maxDepth || width < minWidth) return;

    out.push({ name: node.name, value: totalOf(node), depth, x, width, meta: node.meta });

    const kids = node.children;
    if (!kids?.length) return;

    const sum = totalOf(node);
    if (sum <= 0) return;

    let cursor = x;
    for (const child of kids) {
      const w = (totalOf(child) / sum) * width;
      walk(child, depth + 1, cursor, w);
      cursor += w;
    }
  };

  walk(root, 0, 0, 1);
  return out;
}

/** One laid-out donut segment. */
export interface DonutSlice {
  name: string;
  value: number;
  startAngle: number;
  endAngle: number;
  share: number;
  meta?: unknown;
}

/**
 * A single ring, with the tail rolled up.
 *
 * Unlike the sunburst this DOES gather what it drops, into an explicit
 * "other" slice — a flat breakdown of a whole is read as a whole, and a
 * missing wedge there reads as a rendering bug rather than as a decision.
 * The rolled-up slice is named, so nobody mistakes it for a real category.
 */
export function donutLayout(
  items: { name: string; value: number; meta?: unknown }[],
  opts: { maxSlices?: number; otherLabel?: string } = {},
): DonutSlice[] {
  const maxSlices = opts.maxSlices ?? 8;
  const otherLabel = opts.otherLabel ?? 'other';

  const positive = items.filter(i => i.value > 0);
  const total = positive.reduce((t, i) => t + i.value, 0);
  if (total <= 0) return [];

  const sorted = [...positive].sort((a, b) => b.value - a.value);
  const head = sorted.slice(0, maxSlices);
  const tail = sorted.slice(maxSlices);

  const shown = tail.length
    ? [...head, { name: otherLabel, value: tail.reduce((t, i) => t + i.value, 0) }]
    : head;

  const out: DonutSlice[] = [];
  let cursor = 0;
  for (const item of shown) {
    const span = (item.value / total) * Math.PI * 2;
    out.push({
      name: item.name,
      value: item.value,
      startAngle: cursor,
      endAngle: cursor + span,
      share: item.value / total,
      meta: (item as { meta?: unknown }).meta,
    });
    cursor += span;
  }
  return out;
}

/**
 * An SVG arc path for a ring segment.
 *
 * Written out rather than pulled from a library because it is twenty lines and
 * the alternative is a dependency in a component library. The full-circle case
 * is special: an arc from an angle back to the same angle draws nothing, so a
 * lone 100% slice would vanish — which is exactly the case a donut of one
 * dominant thing produces.
 */
export function arcPath(
  cx: number, cy: number,
  rInner: number, rOuter: number,
  startAngle: number, endAngle: number,
): string {
  const span = endAngle - startAngle;

  if (span >= Math.PI * 2 - 1e-9) {
    // Two half-circles, since one arc cannot close a full turn.
    return [
      `M ${cx} ${cy - rOuter}`,
      `A ${rOuter} ${rOuter} 0 1 1 ${cx} ${cy + rOuter}`,
      `A ${rOuter} ${rOuter} 0 1 1 ${cx} ${cy - rOuter}`,
      `M ${cx} ${cy - rInner}`,
      `A ${rInner} ${rInner} 0 1 0 ${cx} ${cy + rInner}`,
      `A ${rInner} ${rInner} 0 1 0 ${cx} ${cy - rInner}`,
      'Z',
    ].join(' ');
  }

  // Angles run clockwise from 12 o'clock, which is how a reader expects a
  // pie to start; the trigonometry below is what turns that into screen space.
  const p = (r: number, a: number) => [
    cx + r * Math.sin(a),
    cy - r * Math.cos(a),
  ];

  const [x1, y1] = p(rOuter, startAngle);
  const [x2, y2] = p(rOuter, endAngle);
  const [x3, y3] = p(rInner, endAngle);
  const [x4, y4] = p(rInner, startAngle);
  const large = span > Math.PI ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4}`,
    'Z',
  ].join(' ');
}
