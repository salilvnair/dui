/**
 * Time-to-pixel maths for the lane charts.
 *
 * Separated for the same reason as the hierarchy layout: a chart that renders
 * is not a chart that is correct. A segment one pixel wide when it should be
 * forty, a lane whose last event falls off the right edge, two lanes that
 * disagree about where "now" is — all of them look like a drawing and none of
 * them look like a bug.
 */

export interface Span {
  /** Start, in whatever unit the caller is using. Milliseconds, usually. */
  from: number;
  to: number;
}

/** A span placed on the axis, as fractions of the width. */
export interface PlacedSpan {
  x: number;
  width: number;
  /** True when the span was cut by the window rather than ending inside it. */
  clippedStart: boolean;
  clippedEnd: boolean;
}

/**
 * The window every lane shares.
 *
 * Computed once from all lanes rather than per lane, because a shared axis is
 * the entire point: two lanes scaled independently put simultaneous events in
 * different places, which is worse than not drawing them at all.
 */
export function windowOf(spans: Span[]): Span | null {
  if (!spans.length) return null;
  let from = Infinity;
  let to = -Infinity;
  for (const s of spans) {
    if (s.from < from) from = s.from;
    if (s.to > to) to = s.to;
  }
  if (!Number.isFinite(from) || !Number.isFinite(to)) return null;
  // A window of zero duration would divide by zero downstream. One instant is
  // a legitimate thing to be handed — a dump, a single event — and it should
  // draw as a full-width lane rather than vanish.
  return to > from ? { from, to } : { from, to: from + 1 };
}

/**
 * Place a span on the axis, clipped to the window.
 *
 * Returns null when the span is entirely outside, so a caller can drop it
 * rather than draw a zero-width rectangle at the edge — which reads as an
 * event that happened at the boundary and did not.
 */
export function place(span: Span, win: Span): PlacedSpan | null {
  const total = win.to - win.from;
  if (total <= 0) return null;
  if (span.to <= win.from || span.from >= win.to) return null;

  const from = Math.max(span.from, win.from);
  const to = Math.min(span.to, win.to);

  return {
    x: (from - win.from) / total,
    width: (to - from) / total,
    clippedStart: span.from < win.from,
    clippedEnd: span.to > win.to,
  };
}

/** A single instant on the axis, for a marker. */
export function placeAt(at: number, win: Span): number | null {
  const total = win.to - win.from;
  if (total <= 0) return null;
  if (at < win.from || at > win.to) return null;
  return (at - win.from) / total;
}

/**
 * A polyline through a series, in fractions of width and height.
 *
 * y is inverted here — 0 is the top in screen space and the highest value
 * should be highest on screen. Doing that at the call site is how a chart ends
 * up upside down in one lane and not the others.
 */
export function polyline(
  points: { at: number; value: number }[],
  win: Span,
  opts: { min?: number; max?: number } = {},
): { x: number; y: number }[] {
  if (!points.length) return [];
  const total = win.to - win.from;
  if (total <= 0) return [];

  const values = points.map(p => p.value);
  const min = opts.min ?? Math.min(...values);
  const rawMax = opts.max ?? Math.max(...values);
  // A flat series has no range; drawing it through the middle is more honest
  // than dividing by zero or pinning it to the top.
  const range = rawMax - min || 1;

  return points
    .filter(p => p.at >= win.from && p.at <= win.to)
    .map(p => ({
      x: (p.at - win.from) / total,
      y: 1 - (p.value - min) / range,
    }));
}

/** An SVG path for a polyline already in fractions, scaled to a box. */
export function pathFor(pts: { x: number; y: number }[], w: number, h: number): string {
  if (pts.length < 2) return '';
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${(p.x * w).toFixed(2)},${(p.y * h).toFixed(2)}`)
    .join(' ');
}

/** The same polyline closed to the baseline, for an area fill. */
export function areaFor(pts: { x: number; y: number }[], w: number, h: number): string {
  const line = pathFor(pts, w, h);
  if (!line) return '';
  const first = pts[0];
  const last = pts[pts.length - 1];
  return `${line} L${(last.x * w).toFixed(2)},${h} L${(first.x * w).toFixed(2)},${h} Z`;
}
