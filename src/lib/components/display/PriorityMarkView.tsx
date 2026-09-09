import type { CSSProperties } from 'react';

export type PriorityMarkLevel = 'urgent' | 'high' | 'medium' | 'low' | 'none';

export interface PriorityMarkViewProps {
  level: PriorityMarkLevel;
  /** Show the word as well as the ring. On by default. */
  showLabel?: boolean;
  /** Override the word — for a tracker that calls Urgent something else. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Semantic, and deliberately separate from any product accent.
 *
 * Priority means the same thing on every screen it appears on, so it never
 * borrows the accent of the tab it happens to be in — a board tinted amber
 * would otherwise make every medium-priority item look like the tab's own
 * furniture.
 */
const LEVEL: Record<PriorityMarkLevel, { color: string; label: string }> = {
  urgent: { color: 'var(--color-error)', label: 'Urgent' },
  high: { color: 'var(--color-orange, #f0883e)', label: 'High' },
  medium: { color: 'var(--color-warning)', label: 'Medium' },
  low: { color: 'var(--color-success)', label: 'Low' },
  none: { color: 'var(--color-text-muted)', label: 'None' },
};

/**
 * A priority, as a ring and a word.
 *
 * A ring rather than a filled dot, because status is already a filled dot
 * everywhere else and the two sit side by side on the same row — two solid
 * dots in different palettes read as one broken thing. The ring is the whole
 * distinction, and it survives being 7px.
 */
export function PriorityMarkView({
  level,
  showLabel = true,
  label,
  className = '',
  style,
}: PriorityMarkViewProps) {
  const { color, label: word } = LEVEL[level] ?? LEVEL.none;
  return (
    <span
      className={className}
      title={label ?? word}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 10,
        whiteSpace: 'nowrap',
        color,
        ...style,
      }}
    >
      <b style={{
        width: 7,
        height: 7,
        borderRadius: '50%',
        border: '2px solid currentColor',
        flexShrink: 0,
        boxSizing: 'border-box',
      }} />
      {showLabel && (label ?? word)}
    </span>
  );
}
