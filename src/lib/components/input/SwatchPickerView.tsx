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
  className?: string;
  style?: CSSProperties;
}

export function SwatchPickerView({
  options,
  value,
  onChange,
  size = 12,
  className,
  style,
}: SwatchPickerViewProps) {
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
              width: size, height: size, borderRadius: Math.round(size / 4),
              background: o.color,
              padding: 0, cursor: 'pointer',
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
          />
        );
      })}
    </span>
  );
}
