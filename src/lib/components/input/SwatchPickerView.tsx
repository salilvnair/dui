/**
 * Choosing by colour, with colour.
 *
 * A dropdown listing "Tokyo Night, Catppuccin, Dracula" asks the reader to
 * know what those look like. A row of swatches shows them, which is the whole
 * decision — the names are worth keeping as tooltips and worth nothing as the
 * primary control.
 *
 * Three to six options is the range this suits. Past that a row of dots stops
 * being scannable and a list with previews is the better shape.
 */
import type { CSSProperties } from 'react';

export interface SwatchOption {
  id: string;
  /** Shown as the tooltip and the accessible name — never as visible text. */
  label: string;
  /** The one colour that stands for this option. */
  color: string;
}

export interface SwatchPickerViewProps {
  options: SwatchOption[];
  value: string;
  onChange: (id: string) => void;
  size?: number;
  /**
   * Draw each option's first letter inside its swatch.
   *
   * Colour alone is enough to CHOOSE by and not enough to NAME by: pointing
   * someone at "the blue one" fails the moment two palettes are both blue, and
   * a tooltip only helps a reader who already went looking. The initial makes
   * the row sayable out loud without turning it back into a list of words.
   *
   * Needs room — below about 14px the letter is a smudge — so the swatch is
   * given a floor when this is on.
   */
  initials?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Ink that survives whatever colour it lands on.
 *
 * A fixed white letter vanishes on Gruvbox's yellow and a fixed black one
 * vanishes on Nord's navy; there is no single ink that works on sixteen
 * palettes. Rec. 601 luma is the cheap standard for this and agrees with the
 * eye closely enough to choose between two.
 */
function inkOn(background: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(background.trim());
  if (!m) return '#000';
  const n = parseInt(m[1], 16);
  const luma = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luma > 0.55 ? 'rgba(0,0,0,.72)' : 'rgba(255,255,255,.92)';
}

export function SwatchPickerView({
  options,
  value,
  onChange,
  size = 12,
  initials,
  className,
  style,
}: SwatchPickerViewProps) {
  const box = initials ? Math.max(size, 15) : size;
  return (
    <span
      role="radiogroup"
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, ...style }}
    >
      {options.map(o => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={o.label}
            title={o.label}
            onClick={() => onChange(o.id)}
            style={{
              width: box, height: box, borderRadius: Math.round(box / 4),
              background: o.color,
              padding: 0, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              /*
                The letter is sized off the swatch rather than fixed, so the
                same component reads correctly in a 15px toolbar row and a 24px
                settings row without a second set of numbers.
              */
              fontSize: Math.round(box * 0.62),
              lineHeight: 1,
              fontWeight: 700,
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              color: inkOn(o.color),
              /*
                The ring is drawn in the SURFACE colour, then the swatch's own
                colour outside it. On a light ground a white gap reads as a
                halo and on a dark one it reads as a notch, and both say
                "selected" without the ring needing to pick a colour that works
                on every possible swatch — which nothing does.
              */
              border: on
                ? `2px solid var(--color-surface, #1e1e1e)`
                : '2px solid transparent',
              outline: on ? `1.5px solid ${o.color}` : 'none',
              outlineOffset: 0,
              /*
                Unselected swatches are dimmed rather than greyed. Greying them
                would change the colour, which is the one thing they are for.
              */
              opacity: on ? 1 : 0.4,
              transition: 'opacity .12s ease',
            }}
          >
            {/* The first letter, and only the first: two characters at this
                size is a texture rather than a word. */}
            {initials ? (o.label.trim()[0] ?? '').toUpperCase() : null}
          </button>
        );
      })}
    </span>
  );
}
