import { useState, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { PlusIcon, MinusIcon } from '../../../icons';

/**
 * How many characters the value field has to hold.
 *
 * ── Why this is not a function of the height ──
 *
 * It was: the field was `height * 1.4`, which is 37px at every size — room for
 * two digits. A stepper bounded at 300 therefore displayed its own maximum as
 * `3(`, clipped mid-glyph, and no caller could widen it because the width was
 * computed inside.
 *
 * A stepper knows its range. The longest thing it can ever show is the longer
 * of its two bounds, sign and decimals included, so that is what it makes room
 * for — and a range with no bounds gets enough for a number somebody would
 * plausibly type.
 *
 * Exported so the rule can be held to by a test rather than by looking at it.
 */
export function stepperValueChars(
  min: number, max: number, step = 1,
): number {
  /* A fractional step means fractional values: leave room for the point and
     the digits it implies. `0.25` shows two, `0.1` shows one. */
  const stepDecimals = Number.isInteger(step)
    ? 0
    : Math.min(4, (String(step).split('.')[1] ?? '').length);

  const width = (n: number): number => {
    if (!Number.isFinite(n)) return 0;
    const whole = Math.trunc(Math.abs(n)).toString().length;
    return whole
      + (n < 0 ? 1 : 0)
      + (stepDecimals ? stepDecimals + 1 : 0);
  };

  /*
    Both ends, or neither. A range bounded at one end only — 0 to infinity is
    the common one — can still show any number, so it gets the unbounded width
    rather than the width of the bound it happens to have.
  */
  const bounded = Number.isFinite(min) && Number.isFinite(max);
  /* Unbounded: four characters is a number people type without thinking —
     wider than that and the control starts to look like a text field. */
  const chars = bounded
    ? Math.max(width(min), width(max))
    : 4 + (stepDecimals ? stepDecimals + 1 : 0);
  /* Never narrower than two, never so wide it stops reading as a stepper. */
  return Math.min(10, Math.max(2, chars));
}

export interface StepperInputViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function StepperInputView({ testId,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: StepperInputViewProps) {
  const base = useInputBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-accent, var(--color-primary))';

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  /*
    ── What is typed, while it is being typed ──

    The field committed every keystroke through `clamp`, which made it fight
    the person using it. With a minimum of 5, typing `30` went `3` → clamped to
    `5` → `50`. And clearing it to start again was impossible: `Number('')` is
    0, not NaN, so select-all-delete jumped straight to the minimum.

    So a half-typed value lives here until it is finished. The parent hears
    about it as soon as it is a number inside the range, and on blur whatever
    is left is clamped — which is the moment a bound should be enforced, not
    the middle of a word.
  */
  const [draft, setDraft] = useState<string | null>(null);
  const shown = draft ?? String(value);

  const typed = (raw: string) => {
    setDraft(raw);
    const n = Number(raw);
    if (raw.trim() === '' || Number.isNaN(n)) return;
    if (n >= min && n <= max) onChange(n);
  };

  const settle = () => {
    const n = Number(draft ?? '');
    setDraft(null);
    if (draft === null) return;
    onChange(clamp(draft.trim() === '' || Number.isNaN(n) ? value : n));
  };

  /* A button press is a finished value, so anything half-typed goes with it. */
  const dec = () => { setDraft(null); onChange(clamp(value - step)); };
  const inc = () => { setDraft(null); onChange(clamp(value + step)); };

  const btnStyle: CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: base.height, height: base.height, flexShrink: 0,
    border: 'none', background: 'transparent', color: accent, cursor: disabled ? 'default' : 'pointer',
  };

  return (
    <div data-testid={testId}
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center',
        border: '1px solid var(--color-input-border)', borderRadius: base.borderRadius,
        background: 'var(--color-input-bg)', overflow: 'hidden',
        opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
    >
      <button type="button" style={btnStyle} onClick={dec} disabled={value <= min} aria-label="Decrease">
        <MinusIcon size={base.iconSize} />
      </button>
      <input
        type="text"
        inputMode="decimal"
        value={shown}
        onChange={e => typed(e.target.value)}
        onBlur={settle}
        onKeyDown={e => {
          /* Enter finishes it, the way blur does — and the arrow keys step,
             which is what a spinner's keyboard is for. */
          if (e.key === 'Enter') { settle(); return; }
          if (e.key === 'ArrowUp') { e.preventDefault(); setDraft(null); inc(); }
          if (e.key === 'ArrowDown') { e.preventDefault(); setDraft(null); dec(); }
        }}
        style={{
          /*
            Sized to the longest value the range allows — see
            `stepperValueChars`. `ch` is the width of a digit in the current
            font, which is the only honest unit for a field that holds digits.

            The padding is stated rather than inherited, and the box sized
            around it: a page with its own `input { padding: … }` was eating
            almost the whole field — measured at 1px of usable room inside a
            26px box — so a width computed here meant nothing by the time it
            was painted. A control that dictates its own geometry has to own
            all of it.
          */
          boxSizing: 'border-box',
          padding: '0 8px',
          /* `ch` is the advance of "0", and the digits are bold — measured on a
             real page the rendered run comes out a little wider than the sum,
             so the slack is real rather than decorative. */
          width: `calc(${stepperValueChars(min, max, step)}ch + 22px)`,
          /* So 111 and 300 are the same width and the control does not twitch
             as the value changes. */
          fontVariantNumeric: 'tabular-nums',
          textAlign: 'center', border: 'none', borderLeft: '1px solid var(--color-input-border)',
          borderRight: '1px solid var(--color-input-border)', background: 'transparent', color: 'var(--color-text-primary)',
          fontSize: base.fontSize, fontWeight: 700, outline: 'none', height: base.height,
        }}
      />
      <button type="button" style={btnStyle} onClick={inc} disabled={value >= max} aria-label="Increase">
        <PlusIcon size={base.iconSize} />
      </button>
    </div>
  );
}
