import type { ReactNode, CSSProperties } from 'react';

export interface GroupHeaderViewProps {
  /** The group's name. Set in small caps, because it is a label not a heading. */
  name: string;
  /** How many are in it. */
  count?: number | string;
  /**
   * What the group is worth knowing at a glance — a chip, a count of the ones
   * that need attention.
   *
   * Sits after the rule, hard right, so a column of group headers puts every
   * summary in the same place and the eye can run straight down them.
   */
  summary?: ReactNode;
  /** Tints the name — for the pile nobody owns. */
  tone?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * The line above a group of things.
 *
 * Name, size, a rule that eats the remaining width, and the one fact about the
 * group worth carrying. The rule is what makes a stack of these read as
 * sections rather than as a list with bold entries in it, and it costs nothing
 * — it is the leftover space, drawn.
 */
export function GroupHeaderView({
  name,
  count,
  summary,
  tone,
  className = '',
  style,
}: GroupHeaderViewProps) {
  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: 9, ...style }}
    >
      <span style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: tone ?? 'var(--color-text-primary)',
      }}>
        {name}
      </span>
      {count != null && (
        <span style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 10,
          color: 'var(--color-text-muted)',
        }}>
          {count}
        </span>
      )}
      <span style={{ flex: 1, height: 1, background: 'var(--color-surface-border)' }} />
      {summary}
    </div>
  );
}
