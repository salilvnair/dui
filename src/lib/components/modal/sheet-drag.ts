/**
 * The geometry behind a sheet you can throw away.
 *
 * Kept apart from the component because it is the half that can be wrong in a
 * way nobody notices: a sheet that dismisses at the wrong moment feels
 * unreliable rather than broken, and that is exactly the kind of thing a test
 * catches and a demo does not.
 */

export type SheetEdge = 'bottom' | 'top' | 'left' | 'right';

/** Which way a sheet on this edge travels when it leaves. */
export function axisOf(edge: SheetEdge): 'x' | 'y' {
  return edge === 'left' || edge === 'right' ? 'x' : 'y';
}

/**
 * How far the pointer has dragged the sheet *towards its own edge*.
 *
 * Never negative. Dragging a bottom sheet upwards does not lift it off the
 * bottom of the screen — the sheet is already against that edge, and letting it
 * move would open a gap under it that has nothing in it. Pulling the other way
 * is a no-op, which is what every native sheet does.
 */
export function travel(edge: SheetEdge, dx: number, dy: number): number {
  switch (edge) {
    case 'bottom': return Math.max(0, dy);
    case 'top': return Math.max(0, -dy);
    case 'right': return Math.max(0, dx);
    case 'left': return Math.max(0, -dx);
  }
}

/** The way a sheet on this edge is pulled *away* from its edge — i.e. wider. */
export function opposite(edge: SheetEdge): SheetEdge {
  switch (edge) {
    case 'bottom': return 'top';
    case 'top': return 'bottom';
    case 'right': return 'left';
    case 'left': return 'right';
  }
}

/**
 * How wide a sheet becomes when its handle is pulled away from the edge.
 *
 * The same handle does both, and which one it is doing is decided by direction
 * alone: towards the edge it came from is "throw it back out", away from it is
 * "I want more room". Nothing else on a sheet is a natural place to put a
 * resize grip, and a second one beside the first would be two 4px targets
 * doing different things a few pixels apart.
 *
 * Clamped at both ends: below `MIN_SIZE` the sheet is a strip with no content
 * in it, and past `MAX_RATIO` of the window it has covered the thing it is a
 * detail view *of*.
 */
export const MIN_SIZE = 320;
export const MAX_RATIO = 0.96;

export function grownTo(from: number, pulled: number, viewport: number): number {
  const most = Math.max(MIN_SIZE, viewport * MAX_RATIO);
  return Math.round(Math.min(most, Math.max(MIN_SIZE, from + pulled)));
}

/** The `transform` for a sheet dragged `moved` pixels off its edge. */
export function offsetStyle(edge: SheetEdge, moved: number): string {
  if (moved <= 0) return '';
  switch (edge) {
    case 'bottom': return `translateY(${moved}px)`;
    case 'top': return `translateY(${-moved}px)`;
    case 'right': return `translateX(${moved}px)`;
    case 'left': return `translateX(${-moved}px)`;
  }
}

/** Past this share of its own size, a released sheet keeps going. */
export const DISMISS_RATIO = 0.3;

/**
 * Fast enough that it was thrown, in pixels per millisecond.
 *
 * A flick is a short, fast drag — it never crosses the distance threshold, and
 * without this it springs back, which reads as the sheet refusing to close.
 * 0.5px/ms is about 500px in a second: brisk, not twitchy.
 */
export const FLING_SPEED = 0.5;

/**
 * Does the sheet leave, or spring back?
 *
 * Either far enough or fast enough. Requiring both would mean a slow deliberate
 * drag all the way across still bounced back; requiring distance alone loses
 * the flick, which is how people actually dismiss these.
 */
export function shouldDismiss(
  moved: number, size: number, speed = 0,
): boolean {
  if (size > 0 && moved >= size * DISMISS_RATIO) return true;
  /* A fling still has to be a drag. Without a floor, the last pointer event of
     an ordinary tap — a pixel in half a millisecond — reads as a throw. */
  return moved > 8 && speed >= FLING_SPEED;
}

/** Pixels per millisecond, guarding the zero-duration case. */
export function speedOf(moved: number, ms: number): number {
  return ms > 0 ? moved / ms : 0;
}
