import type { ReactNode, CSSProperties } from 'react';

export type TogglePillVariant = 'default' | 'go';

export interface TogglePillViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  children: ReactNode;
  /** A glyph before the label. */
  icon?: ReactNode;
  /** Lit in the accent, with a tinted ground and a matching border. */
  active?: boolean;
  /**
   * A number after the label — how many filters are on, how many are selected.
   *
   * Bold rather than a second chip: a count inside its own pill turns one
   * control into two objects, and a toolbar of them stops being scannable.
   */
  count?: number | string;
  /**
   * `go` fills the pill solid.
   *
   * For the one pill in a row that commits rather than toggles — Run, Apply,
   * Export. It reads as a button among switches, which is what it is.
   */
  variant?: TogglePillVariant;
  accentColor?: string;
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * A toolbar pill: a small bordered control that is either on or off.
 *
 * The unit a dense toolbar is built from, where a segmented control would be
 * wrong. A segmented control says "these are the choices, pick one"; a row of
 * pills says "each of these is a thing you can turn on", which is what a view
 * switch, a filter toggle and a grouping selector actually are — they are not
 * one set, and boxing them into one implies a relationship that is not there.
 *
 * Off is a plain border on the panel, not a grey fill: a toolbar where every
 * pill has a background is a wall, and the lit one no longer stands out.
 */
export function TogglePillView({ testId,
  children,
  icon,
  active = false,
  count,
  variant = 'default',
  accentColor = 'var(--color-primary)',
  disabled = false,
  title,
  onClick,
  className = '',
  style,
}: TogglePillViewProps) {
  const go = variant === 'go';

  return (
    <button data-testid={testId}
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={go ? undefined : active}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 10.5,
        lineHeight: 1.2,
        padding: '4px 9px',
        borderRadius: 6,
        whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontWeight: go || active ? 600 : 400,
        border: '1px solid',
        borderColor: go
          ? accentColor
          : active
            ? `color-mix(in srgb, ${accentColor} 45%, transparent)`
            : 'var(--color-surface-border)',
        background: go
          ? accentColor
          : active
            ? `color-mix(in srgb, ${accentColor} 12%, transparent)`
            : 'transparent',
        color: go ? '#fff' : active ? accentColor : 'var(--color-text-muted)',
        ...style,
      }}
    >
      {icon}
      {children}
      {count != null && <b style={{ fontWeight: 700 }}>{count}</b>}
    </button>
  );
}
