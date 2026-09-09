import type { CSSProperties } from 'react';

export interface IssueCardSkeletonViewProps {
  /** Leave room for the evidence strip, when the board shows screenshots. */
  media?: boolean;
  /**
   * How long the title bar is, 0–1.
   *
   * Varied by the caller across a grid so the placeholder reads as a list of
   * different things rather than a printed pattern — a wall of identical bars
   * looks like a rendering bug, which is the opposite of reassuring.
   */
  titleFill?: number;
  className?: string;
  style?: CSSProperties;
}

const bar = (w: number | string, h: number): CSSProperties => ({
  display: 'block',
  width: w,
  height: h,
  borderRadius: 4,
  background: 'var(--color-loader-track)',
});

/**
 * An issue card that has not arrived yet.
 *
 * Deliberately the twin of IssueCardView: same padding, radius, gaps and row
 * order, so the real card lands exactly where the placeholder stood and the
 * grid does not jump under a cursor already on its way to a click.
 *
 * A skeleton rather than a spinner because the shape is the information — a
 * reader can see a board is coming, roughly how much of it, and start moving
 * before the data lands. A centred spinner says only "wait", and a centred
 * panel that takes over the whole view says "something is wrong".
 */
export function IssueCardSkeletonView({
  media = false,
  titleFill = 0.9,
  className = '',
  style,
}: IssueCardSkeletonViewProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        minWidth: 0,
        padding: '9px 10px',
        borderRadius: 8,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-surface-border)',
        ...style,
      }}
    >
      {/* Reference and chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }} className="animate-pulse">
        <span style={bar(22, 9)} />
        <span style={bar(34, 12)} />
        <span style={bar(40, 12)} />
      </div>

      {/* Title — two bars, the second short, the way a wrapped sentence sits */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }} className="animate-pulse">
        <span style={bar('100%', 10)} />
        <span style={bar(`${Math.round(titleFill * 100)}%`, 10)} />
      </div>

      {media && <span style={{ ...bar('100%', 46), borderRadius: 5 }} className="animate-pulse" />}

      {/* Owner, and the figure on the right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }} className="animate-pulse">
        <span style={{ ...bar(15, 15), borderRadius: '50%' }} />
        <span style={bar(52, 9)} />
        <span style={{ flex: 1 }} />
        <span style={bar(24, 9)} />
      </div>
    </div>
  );
}
