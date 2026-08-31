import { describe, it, expect } from 'vitest';
import { windowOf, place, placeAt, polyline, pathFor, areaFor } from './lane-scale';

describe('windowOf', () => {
  it('spans from the earliest start to the latest end', () => {
    expect(windowOf([{ from: 10, to: 20 }, { from: 5, to: 15 }])).toEqual({ from: 5, to: 20 });
  });

  it('is null for nothing', () => {
    expect(windowOf([])).toBeNull();
  });

  /*
    One instant is a legitimate thing to be handed — a dump, a single event.
    A zero-width window divides by zero downstream and the lane vanishes,
    which looks like the data was missing rather than instantaneous.
  */
  it('gives a single instant a width rather than a zero window', () => {
    const w = windowOf([{ from: 100, to: 100 }])!;
    expect(w.to).toBeGreaterThan(w.from);
  });
});

describe('place', () => {
  const win = { from: 0, to: 100 };

  it('places a span as fractions of the window', () => {
    expect(place({ from: 25, to: 75 }, win)).toMatchObject({ x: 0.25, width: 0.5 });
  });

  it('fills the lane for a span covering the window', () => {
    expect(place({ from: 0, to: 100 }, win)).toMatchObject({ x: 0, width: 1 });
  });

  it('clips a span that starts before the window, and says so', () => {
    const p = place({ from: -50, to: 50 }, win)!;
    expect(p.x).toBe(0);
    expect(p.width).toBe(0.5);
    expect(p.clippedStart).toBe(true);
    expect(p.clippedEnd).toBe(false);
  });

  it('clips a span that runs past the end, and says so', () => {
    const p = place({ from: 50, to: 500 }, win)!;
    expect(p.width).toBe(0.5);
    expect(p.clippedEnd).toBe(true);
  });

  /*
    Returning a zero-width rectangle at the edge would draw an event at the
    boundary that did not happen there — worse than not drawing it.
  */
  it('returns null for a span entirely outside', () => {
    expect(place({ from: 200, to: 300 }, win)).toBeNull();
    expect(place({ from: -300, to: -200 }, win)).toBeNull();
  });

  it('returns null when the window has no width', () => {
    expect(place({ from: 1, to: 2 }, { from: 5, to: 5 })).toBeNull();
  });
});

describe('placeAt', () => {
  const win = { from: 100, to: 200 };

  it('places an instant', () => {
    expect(placeAt(150, win)).toBe(0.5);
    expect(placeAt(100, win)).toBe(0);
    expect(placeAt(200, win)).toBe(1);
  });

  it('is null outside the window', () => {
    expect(placeAt(99, win)).toBeNull();
    expect(placeAt(201, win)).toBeNull();
  });
});

describe('polyline', () => {
  const win = { from: 0, to: 10 };

  it('inverts y so the highest value is highest on screen', () => {
    // Doing this at the call site is how one lane ends up upside down.
    const pts = polyline([{ at: 0, value: 0 }, { at: 10, value: 100 }], win);
    expect(pts[0].y).toBe(1);
    expect(pts[1].y).toBe(0);
  });

  it('scales x across the window', () => {
    const pts = polyline([{ at: 0, value: 1 }, { at: 5, value: 2 }, { at: 10, value: 3 }], win);
    expect(pts.map(p => p.x)).toEqual([0, 0.5, 1]);
  });

  it('honours an explicit min and max, so lanes can share a scale', () => {
    const pts = polyline([{ at: 0, value: 50 }], win, { min: 0, max: 100 });
    expect(pts[0].y).toBeCloseTo(0.5, 9);
  });

  it('draws a flat series through the middle rather than dividing by zero', () => {
    const pts = polyline([{ at: 0, value: 7 }, { at: 10, value: 7 }], win);
    expect(pts.every(p => Number.isFinite(p.y))).toBe(true);
  });

  it('drops points outside the window', () => {
    const pts = polyline([{ at: -5, value: 1 }, { at: 5, value: 2 }, { at: 50, value: 3 }], win);
    expect(pts.length).toBe(1);
  });

  it('is empty for no points', () => {
    expect(polyline([], win)).toEqual([]);
  });
});

describe('pathFor / areaFor', () => {
  const pts = [{ x: 0, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 }];

  it('draws a line', () => {
    const d = pathFor(pts, 100, 50);
    expect(d.startsWith('M0.00,50.00')).toBe(true);
    expect(d).toContain('L100.00,0.00');
  });

  it('needs two points to be a line', () => {
    expect(pathFor([{ x: 0, y: 0 }], 100, 50)).toBe('');
  });

  it('closes the area to the baseline', () => {
    const d = areaFor(pts, 100, 50);
    expect(d.endsWith('Z')).toBe(true);
    // Down to the bottom at the last x, back along the bottom to the first.
    expect(d).toContain('L100.00,50');
    expect(d).toContain('L0.00,50');
  });
});
