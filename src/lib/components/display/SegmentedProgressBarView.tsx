import type { CSSProperties } from 'react';
import type { DuiSize, DuiWidth } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';

export type SegmentStatus = 'pending' | 'active' | 'done' | 'error';

export interface ProgressSegment {
  label?: string;
  status: SegmentStatus;
}

export interface SegmentedProgressBarViewProps {
  segments: ProgressSegment[];
  size?: DuiSize;
  width?: DuiWidth;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const STATUS_COLOR: Record<SegmentStatus, string> = {
  pending: 'var(--color-surface-border)',
  active: 'var(--color-warning)',
  done: 'var(--color-success)',
  error: 'var(--color-error)',
};

/** Multi-segment progress bar — e.g. upload/pipeline stages, each independently colored. */
export function SegmentedProgressBarView({
  segments,
  size,
  width,
  color,
  className = '',
  style,
}: SegmentedProgressBarViewProps) {
  const base = useFeedbackBase(size, { width, color });

  return (
    <div className={className} style={{ width: base.width, ...style }}>
      <div style={{ display: 'flex', gap: 3, height: base.thickness }}>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              flex: 1, borderRadius: base.thickness / 2,
              background: color && seg.status !== 'pending' ? color : STATUS_COLOR[seg.status],
              transition: 'background 200ms',
            }}
          />
        ))}
      </div>
      {segments.some(s => s.label) && (
        <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
          {segments.map((seg, i) => (
            <div key={i} style={{ flex: 1, fontSize: base.fontSize, color: 'var(--color-text-muted)', textAlign: 'center' }}>
              {seg.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
