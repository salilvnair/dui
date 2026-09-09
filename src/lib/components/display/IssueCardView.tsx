import type { ReactNode, CSSProperties } from 'react';

export interface IssueCardViewProps {
  /** The identifier, shown as given — `#41`, `PROJ-8`. */
  reference?: string;
  title: string;
  /**
   * The chips beside the reference — module, environment, whatever classifies
   * this one. Rendered by the caller so it can use the same chip component the
   * rest of the screen uses.
   */
  chips?: ReactNode;
  /** Evidence: a screenshot strip, a thumbnail. Sits under the title. */
  media?: ReactNode;
  /** The left of the footer: an avatar, or the word for having no owner. */
  owner?: ReactNode;
  /** Beside the owner: priority, state. */
  mark?: ReactNode;
  /** The right of the footer: age, comment count, a stale chip. */
  meta?: ReactNode;
  /** Lift the card — selected, or dragged over. */
  selected?: boolean;
  accentColor?: string;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * One tracked item on a board — an issue, a ticket.
 *
 * The order is the whole component: reference and classification, then the
 * sentence, then the evidence, then who and when. A reader who has scanned one
 * card knows where to look on every other one, which is the only reason a board
 * beats a table.
 *
 * The title is never truncated. A card whose sentence ends in an ellipsis makes
 * you open the item to find out whether you cared, which is precisely the work
 * the board existed to save; cards in a row may be different heights instead.
 */
export function IssueCardView({
  reference,
  title,
  chips,
  media,
  owner,
  mark,
  meta,
  selected = false,
  accentColor = 'var(--color-primary)',
  onClick,
  tooltip,
  className = '',
  style,
}: IssueCardViewProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      title={tooltip ?? title}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick
        ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }
        : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        minWidth: 0,
        padding: '9px 10px',
        borderRadius: 8,
        background: 'var(--color-surface)',
        border: `1px solid ${selected
          ? `color-mix(in srgb, ${accentColor} 55%, transparent)`
          : 'var(--color-surface-border)'}`,
        boxShadow: selected ? `0 0 0 1px color-mix(in srgb, ${accentColor} 35%, transparent)` : undefined,
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {(reference || chips) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          {reference && (
            <span style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10,
              color: 'var(--color-text-muted)',
            }}>
              {reference}
            </span>
          )}
          {chips}
        </div>
      )}

      <div style={{
        fontSize: 11.5,
        fontWeight: 600,
        lineHeight: 1.38,
        color: 'var(--color-text-primary)',
        overflowWrap: 'anywhere',
      }}>
        {title}
      </div>

      {media}

      {(owner || mark || meta) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          fontSize: 10,
          color: 'var(--color-text-muted)',
          minWidth: 0,
        }}>
          {owner}
          {mark}
          <span style={{ flex: 1 }} />
          {meta}
        </div>
      )}
    </div>
  );
}
