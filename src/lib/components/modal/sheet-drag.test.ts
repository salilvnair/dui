import { describe, it, expect } from 'vitest';
import {
  DISMISS_RATIO, FLING_SPEED, MAX_RATIO, MIN_SIZE, axisOf, grownTo, offsetStyle,
  opposite, shouldDismiss, speedOf, travel,
} from './sheet-drag';

describe('axisOf', () => {
  it('knows which way each edge travels', () => {
    expect(axisOf('left')).toBe('x');
    expect(axisOf('right')).toBe('x');
    expect(axisOf('top')).toBe('y');
    expect(axisOf('bottom')).toBe('y');
  });
});

describe('travel', () => {
  it('follows the pointer towards the sheet’s own edge', () => {
    expect(travel('bottom', 0, 40)).toBe(40);
    expect(travel('top', 0, -40)).toBe(40);
    expect(travel('right', 40, 0)).toBe(40);
    expect(travel('left', -40, 0)).toBe(40);
  });

  it('refuses to move the other way — there is nothing behind the sheet', () => {
    expect(travel('bottom', 0, -40)).toBe(0);
    expect(travel('top', 0, 40)).toBe(0);
    expect(travel('right', -40, 0)).toBe(0);
    expect(travel('left', 40, 0)).toBe(0);
  });

  it('ignores the cross axis', () => {
    expect(travel('bottom', 200, 30)).toBe(30);
    expect(travel('right', 30, 200)).toBe(30);
  });
});

describe('offsetStyle', () => {
  it('pushes each edge out the way it came in', () => {
    expect(offsetStyle('bottom', 40)).toBe('translateY(40px)');
    expect(offsetStyle('top', 40)).toBe('translateY(-40px)');
    expect(offsetStyle('right', 40)).toBe('translateX(40px)');
    expect(offsetStyle('left', 40)).toBe('translateX(-40px)');
  });

  it('is nothing at rest, so the CSS transition owns the transform', () => {
    expect(offsetStyle('bottom', 0)).toBe('');
    expect(offsetStyle('left', -5)).toBe('');
  });
});

describe('shouldDismiss', () => {
  it('leaves once it is dragged past a third of itself', () => {
    expect(shouldDismiss(300 * DISMISS_RATIO, 300)).toBe(true);
    expect(shouldDismiss(300 * DISMISS_RATIO - 1, 300)).toBe(false);
  });

  it('leaves when it is thrown, however short the throw', () => {
    expect(shouldDismiss(30, 600, FLING_SPEED)).toBe(true);
  });

  it('does not read a tap as a throw', () => {
    /* One pixel in half a millisecond is a very fast speed and not a drag. */
    expect(shouldDismiss(1, 600, 2)).toBe(false);
  });

  it('springs back from a slow short drag', () => {
    expect(shouldDismiss(40, 600, 0.05)).toBe(false);
  });

  it('survives a sheet whose size is not known yet', () => {
    expect(shouldDismiss(40, 0)).toBe(false);
    expect(shouldDismiss(40, 0, FLING_SPEED)).toBe(true);
  });
});

describe('speedOf', () => {
  it('is pixels per millisecond', () => {
    expect(speedOf(500, 1000)).toBe(0.5);
  });

  it('does not divide by zero', () => {
    expect(speedOf(500, 0)).toBe(0);
  });
});

/*
  The same handle widens it. Towards its own edge is "throw it out"; away from
  that edge is "give me more room" — which is the only direction left, and the
  one nothing else on a sheet was using.
*/
describe('opposite', () => {
  it('is the way away from the edge', () => {
    expect(opposite('right')).toBe('left');
    expect(opposite('left')).toBe('right');
    expect(opposite('bottom')).toBe('top');
    expect(opposite('top')).toBe('bottom');
  });

  it('is its own inverse', () => {
    for (const e of ['top', 'bottom', 'left', 'right'] as const) {
      expect(opposite(opposite(e))).toBe(e);
    }
  });
});

describe('grownTo', () => {
  it('adds what was pulled', () => {
    expect(grownTo(600, 140, 1600)).toBe(740);
  });

  it('will not shrink below a usable width', () => {
    expect(grownTo(400, -900, 1600)).toBe(MIN_SIZE);
  });

  it('will not cover the whole window — it is a detail view of something', () => {
    expect(grownTo(900, 5000, 1000)).toBe(Math.round(1000 * MAX_RATIO));
  });

  it('keeps the floor even on a window narrower than it', () => {
    expect(grownTo(600, 0, 200)).toBe(MIN_SIZE);
  });

  it('is a whole number of pixels', () => {
    expect(Number.isInteger(grownTo(600, 10.4, 1600))).toBe(true);
  });
});
