import { describe, it, expect } from 'vitest';
import { placeSelectMenu, MIN_MENU_H } from './select-position';

/**
 * The vertical placement rule.
 *
 * Imported rather than copied. It used to be re-implemented here, with a
 * comment saying the two were kept in step by construction — which is a thing
 * a test cannot check, and the only thing this test is for.
 */
const place = (
  r: { top: number; bottom: number },
  contentH: number,
  viewportH: number,
) => placeSelectMenu(r, contentH, viewportH);

/** Nothing may leave the window, on either edge. */
function onScreen(p: { top: number; maxHeight: number }, viewportH: number) {
  expect(p.top).toBeGreaterThanOrEqual(0);
  expect(p.top + p.maxHeight).toBeLessThanOrEqual(viewportH);
}

describe('select menu placement', () => {
  it('opens downward when there is room', () => {
    const p = place({ top: 100, bottom: 124 }, 300, 900);
    expect(p.side).toBe('below');
    expect(p.top).toBe(128);
  });

  it('flips up for a long list near the bottom', () => {
    /*
      The bug it was written for. 419 timezones is ~12,000px of content, and
      the old rule compared that raw height against the space on each side:
      nothing was ever big enough, so it fell through to opening downward and
      ran off the screen. The longer the list, the more certain it was to do
      the wrong thing.
    */
    const p = place({ top: 700, bottom: 724 }, 12_000, 800);
    expect(p.side).toBe('above');
    expect(p.top + p.maxHeight).toBeLessThanOrEqual(724);
    onScreen(p, 800);
  });

  it('never runs past the bottom of the window', () => {
    onScreen(place({ top: 300, bottom: 324 }, 12_000, 800), 800);
  });

  it('never runs past the top of the window', () => {
    onScreen(place({ top: 760, bottom: 784 }, 12_000, 800), 800);
  });

  it('stays on the side with more room when neither side fits', () => {
    // 200px below, 100px above: cramped either way, so take the larger.
    expect(place({ top: 108, bottom: 600 }, 12_000, 808).side).toBe('below');
    expect(place({ top: 600, bottom: 700 }, 12_000, 808).side).toBe('above');
  });

  /*
    ── A panel too short for the minimum ──

    The second bug. `Math.max(MIN_MENU_H, room)` put the floor ABOVE the space
    available, so a 200px panel opened a 120px menu into 98px of room and hung
    18px past the bottom edge — the exact failure the rest of this arithmetic
    exists to prevent, arriving through the floor instead of the ceiling.

    The minimum is still honoured, because a 12px menu is unusable. What gives
    is the POSITION: the menu slides back inside and overlaps the trigger, a
    control the reader has already finished with, instead of the window edge,
    which would simply eat that part of the list.
  */
  describe('a window too short for the preferred height', () => {
    it('keeps a menu opening downward inside the window', () => {
      const p = place({ top: 70, bottom: 94 }, 12_000, 200);
      expect(p.side).toBe('below');
      expect(p.maxHeight).toBe(MIN_MENU_H);
      onScreen(p, 200);
    });

    it('keeps a menu opening upward inside the window', () => {
      const p = place({ top: 120, bottom: 150 }, 12_000, 200);
      expect(p.side).toBe('above');
      expect(p.maxHeight).toBe(MIN_MENU_H);
      onScreen(p, 200);
    });

    it('never asks for more height than the window itself has', () => {
      const p = place({ top: 40, bottom: 64 }, 12_000, 100);
      expect(p.maxHeight).toBeLessThanOrEqual(100);
      onScreen(p, 100);
    });
  });

  it('stays on screen wherever the trigger is, at any window height', () => {
    for (const viewportH of [100, 200, 360, 800, 1440]) {
      for (let top = 0; top <= viewportH; top += 17) {
        const p = place({ top, bottom: top + 24 }, 12_000, viewportH);
        onScreen(p, viewportH);
        expect(p.maxHeight).toBeGreaterThan(0);
      }
    }
  });
});
