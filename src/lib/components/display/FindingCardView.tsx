import type { CSSProperties, ReactNode } from 'react';

export type FindingSeverity = 'critical' | 'warning' | 'info' | 'success';

export interface FindingCardViewProps {
  severity: FindingSeverity;
  title: ReactNode;
  /** Small monospace label after the title — a rule id, a category, a source. */
  meta?: ReactNode;
  /** One or two sentences. What was found, with the numbers that matter. */
  detail?: ReactNode;
  /** Anything structured — a stack, a table, a chart. Sits below the detail. */
  children?: ReactNode;
  /** What to do about it. Rendered apart from the detail, because it is advice. */
  remediation?: ReactNode;
  /** Buttons on the right of the header — Ask AI, dismiss, open. */
  actions?: ReactNode;
  /** Colour override; otherwise the severity decides. */
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const SEVERITY_COLOR: Record<FindingSeverity, string> = {
  critical: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info, var(--color-primary))',
  success: 'var(--color-success)',
};

/**
 * A diagnostic finding: something was detected, here is what and what to do.
 *
 * Distinct from a callout or a banner, which announce a state. A finding is the
 * output of a rule, and it always has the same four parts in the same order —
 * severity, what was found, the evidence, what to change. Fixing that order in
 * a component is most of the value: a reader who has seen one finding knows
 * where to look in every other one, and a rule author cannot accidentally bury
 * the remediation.
 *
 * The severity paints a left edge rather than filling the card. A wall of
 * findings where each is a block of tinted background is exhausting to read and
 * makes the critical one no easier to spot than the rest; a 3px edge is enough
 * to sort them by eye and leaves the content on the ordinary surface.
 */
export function FindingCardView({
  severity,
  title,
  meta,
  detail,
  children,
  remediation,
  actions,
  color,
  className = '',
  style,
}: FindingCardViewProps) {
  const accent = color ?? SEVERITY_COLOR[severity];

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-surface-border)',
        borderLeft: `3px solid ${accent}`,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          // A wash rather than a fill, so the header reads as part of the card.
          background: `color-mix(in srgb, ${accent} 7%, transparent)`,
          borderBottom: '1px solid var(--color-surface-border)',
        }}
      >
        <span style={{ color: accent, fontSize: 10, lineHeight: 1 }}>◆</span>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {title}
        </span>
        <span
          style={{
            fontSize: 8.5,
            fontWeight: 700,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            padding: '2px 6px',
            borderRadius: 4,
            color: accent,
            background: `color-mix(in srgb, ${accent} 14%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accent} 32%, transparent)`,
            whiteSpace: 'nowrap',
          }}
        >
          {severity}
        </span>
        {meta && (
          <span style={{
            fontSize: 10.5,
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            color: 'var(--color-text-muted)',
          }}>
            {meta}
          </span>
        )}
        <div style={{ flex: 1 }} />
        {actions}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 12px' }}>
        {detail && (
          <span style={{ fontSize: 11.5, lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            {detail}
          </span>
        )}

        {children}

        {remediation && (
          /*
            Set apart from the detail deliberately. The detail is what the
            engine measured and the remediation is what a person should do —
            running them together invites a reader to trust the advice as much
            as the measurement, and only one of the two is a fact.
          */
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
            <span style={{ color: accent, fontSize: 10, marginTop: 3, lineHeight: 1 }}>→</span>
            <span style={{ fontSize: 11, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
              {remediation}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
