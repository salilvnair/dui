import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';

export interface RatingBreakdownViewProps {
  /** Count per star level, index 0 = 1 star … index 4 = 5 stars. */
  counts: [number, number, number, number, number];
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** 5-star rating distribution bars — App Store-style rating breakdown. */
export function RatingBreakdownView({
  counts,
  size,
  color,
  className = '',
  style,
}: RatingBreakdownViewProps) {
  const base = useFeedbackBase(size, { color });
  const accent = color ?? 'var(--color-warning)';
  const max = Math.max(1, ...counts);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      {[5, 4, 3, 2, 1].map(star => {
        const count = counts[star - 1];
        const ratio = count / max;
        return (
          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', width: 12, textAlign: 'right' }}>{star}</span>
            <div style={{ flex: 1, height: base.thickness, borderRadius: base.thickness / 2, background: 'var(--color-surface-border)', overflow: 'hidden' }}>
              <div style={{ width: `${ratio * 100}%`, height: '100%', background: accent, borderRadius: 'inherit', transition: 'width 300ms ease-out' }} />
            </div>
            <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', width: 28, textAlign: 'right' }}>{count}</span>
          </div>
        );
      })}
    </div>
  );
}
