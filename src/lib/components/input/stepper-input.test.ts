/**
 * The stepper's field has to hold the numbers the stepper allows.
 *
 * It did not: the width was the control's height times 1.4 — 37px at every
 * size, room for two digits — so a stepper bounded at 300 rendered its own
 * maximum clipped mid-glyph, and no caller could widen it because the width
 * was computed inside the component.
 */
import { describe, it, expect } from 'vitest';
import { stepperValueChars } from './StepperInputView';

describe('how wide the value field has to be', () => {
  it('fits the longest bound, not the height', () => {
    expect(stepperValueChars(5, 300)).toBe(3);
    expect(stepperValueChars(0, 10)).toBe(2);
    expect(stepperValueChars(1, 100000)).toBe(6);
  });

  it('leaves room for a minus sign', () => {
    // -40 is three characters; 40 is two.
    expect(stepperValueChars(-40, 40)).toBe(3);
    expect(stepperValueChars(-300, 20)).toBe(4);
  });

  it('leaves room for the decimals a fractional step implies', () => {
    // 0.25 steps show two decimals: "10.25" is five characters.
    expect(stepperValueChars(0, 10, 0.25)).toBe(5);
    expect(stepperValueChars(0, 1, 0.1)).toBe(3);
  });

  it('has a sensible width when the range is unbounded', () => {
    // The default `min`/`max` are infinite, which is most callers.
    expect(stepperValueChars(-Infinity, Infinity)).toBe(4);
    expect(stepperValueChars(0, Infinity)).toBe(4);
  });

  it('never gets so narrow it clips, or so wide it stops being a stepper', () => {
    expect(stepperValueChars(0, 1)).toBeGreaterThanOrEqual(2);
    expect(stepperValueChars(-1e30, 1e30)).toBeLessThanOrEqual(10);
  });

  it('fits the case that started this', () => {
    // dk8s's cluster timeout: 5 to 300 seconds, and "300" was showing as "3(".
    expect(stepperValueChars(5, 300, 5)).toBe(3);
  });
});
