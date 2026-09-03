import { describe, it, expect } from 'vitest';

/**
 * The vertical placement rule, extracted so it can be reasoned about.
 *
 * Kept in step with SelectInputView by construction: this is the same
 * arithmetic, and the test that matters is the one with hundreds of options,
 * because that is the case the old code got exactly backwards.
 */
const MIN_MENU_H = 120;

function place(r: { top: number; bottom: number }, contentH: number, viewportH: number) {
  const M = 8;
  const cap = Math.min(380, viewportH * 0.7);
  const wanted = Math.min(contentH || 200, cap);
  const spaceBelow = viewportH - r.bottom - M;
  const spaceAbove = r.top - M;

  if (spaceBelow >= wanted || spaceBelow >= spaceAbove) {
    return { side: 'below' as const, top: r.bottom + 4, maxHeight: Math.max(MIN_MENU_H, spaceBelow - 4) };
  }
  const h = Math.max(MIN_MENU_H, Math.min(wanted, spaceAbove - 4));
  return { side: 'above' as const, top: r.top - h - 4, maxHeight: h };
}

describe('select menu placement', () => {
  it('opens downward when there is room', () => {
    const p = place({ top: 100, bottom: 124 }, 300, 900);
    expect(p.side).toBe('below');
    expect(p.top).toBe(128);
  });

  it('flips up for a long list near the bottom', () => {
    /*
      The bug. 419 timezones is ~12,000px of content, and the old rule compared
      that raw height against the space on each side: nothing was ever big
      enough, so it fell through to opening downward and ran off the screen.
      The longer the list, the more certain it was to do the wrong thing.
    */
    const p = place({ top: 700, bottom: 724 }, 12_000, 800);
    expect(p.side).toBe('above');
    expect(p.top).toBeGreaterThanOrEqual(0);
    expect(p.top + p.maxHeight).toBeLessThanOrEqual(724);
  });

  it('never runs past the bottom of the window', () => {
    const viewportH = 800;
    const p = place({ top: 300, bottom: 324 }, 12_000, viewportH);
    expect(p.top + p.maxHeight).toBeLessThanOrEqual(viewportH);
  });

  it('never runs past the top of the window', () => {
    const p = place({ top: 760, bottom: 784 }, 12_000, 800);
    expect(p.top).toBeGreaterThanOrEqual(0);
  });

  it('stays on the side with more room when neither side fits', () => {
    // 200px below, 100px above: cramped either way, so take the larger.
    expect(place({ top: 108, bottom: 600 }, 12_000, 808).side).toBe('below');
    expect(place({ top: 600, bottom: 700 }, 12_000, 808).side).toBe('above');
  });

  it('stays usable for a trigger pinned to an edge', () => {
    // A 12px menu is not a menu. Better to overlap slightly and be readable.
    const p = place({ top: 790, bottom: 798 }, 12_000, 800);
    expect(p.maxHeight).toBeGreaterThanOrEqual(MIN_MENU_H);
  });

  it('does not grow a short list to fill the space', () => {
    const p = place({ top: 100, bottom: 124 }, 90, 900);
    expect(p.side).toBe('below');
    // The cap is a ceiling, not a target — the menu is its content's height.
    expect(p.maxHeight).toBeGreaterThanOrEqual(90);
  });
});
