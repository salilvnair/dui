import type { ReactNode, CSSProperties } from 'react';

export interface UnderlineTab {
  id: string;
  label: string;
  icon?: ReactNode;
  /** A count beside the label — how many rows are behind this tab. */
  count?: number | string;
  disabled?: boolean;
}

export interface UnderlineTabsViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  tabs: UnderlineTab[];
  activeId: string;
  onChange: (id: string) => void;
  accentColor?: string;
  /** Draw the hairline the tabs sit on. On by default. */
  rule?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Sections within one view, marked by an underline.
 *
 * The second level of navigation, under a window's own tabs: Board, New issue,
 * Insights, Repository. Underline rather than pill because these are places
 * inside the same thing, and a row of filled pills competes with the window
 * tabs above it for "which of these is the tab bar".
 *
 * A count sits inside the tab rather than beside it, and takes the accent only
 * on the active one — so an inactive section still reports its size without
 * pulling the eye off the section you are in.
 */
export function UnderlineTabsView({ testId,
  tabs,
  activeId,
  onChange,
  accentColor = 'var(--color-primary)',
  rule = true,
  className = '',
  style,
}: UnderlineTabsViewProps) {
  return (
    <div
      className={className}
      role="tablist"
      data-testid={testId}
      style={{
        display: 'flex',
        gap: 3,
        borderBottom: rule ? '1px solid var(--color-surface-border)' : undefined,
        ...style,
      }}
    >
      {tabs.map(t => {
        const on = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            disabled={t.disabled}
            onClick={() => onChange(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 10px 7px',
              fontSize: 11.5,
              background: 'transparent',
              border: 'none',
              borderBottom: '2px solid',
              borderBottomColor: on ? accentColor : 'transparent',
              color: on ? accentColor : 'var(--color-text-muted)',
              fontWeight: on ? 600 : 400,
              cursor: t.disabled ? 'not-allowed' : 'pointer',
              opacity: t.disabled ? 0.45 : 1,
              /* The tab sits ON the rule, so its own underline replaces it. */
              marginBottom: -1,
            }}
          >
            {t.icon}
            {t.label}
            {t.count != null && (
              <span style={{
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: 9.5,
                padding: '0 5px',
                borderRadius: 999,
                background: on
                  ? `color-mix(in srgb, ${accentColor} 20%, transparent)`
                  : 'var(--color-panel)',
                color: on ? accentColor : 'var(--color-text-muted)',
              }}>
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
