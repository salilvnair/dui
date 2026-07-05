import type { CSSProperties } from 'react';
import type { DuiSize, DuiWidth } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';

export interface UsageMeterViewProps {
  used: number;
  limit: number;
  label?: string;
  /** Fraction (0-1) at which the bar turns warning-colored. Default 0.75. */
  warningAt?: number;
  /** Fraction (0-1) at which the bar turns error-colored. Default 0.9. */
  dangerAt?: number;
  size?: DuiSize;
  width?: DuiWidth;
  className?: string;
  style?: CSSProperties;
}

/** Quota bar (used/limit) with warning-color thresholds. */
export function UsageMeterView({
  used,
  limit,
  label,
  warningAt = 0.75,
  dangerAt = 0.9,
  size,
  width,
  className = '',
  style,
}: UsageMeterViewProps) {
  const base = useFeedbackBase(size, { width });
  const ratio = limit > 0 ? Math.min(1, used / limit) : 0;
  const color = ratio >= dangerAt ? 'var(--color-error)' : ratio >= warningAt ? 'var(--color-warning)' : 'var(--color-success)';

  return (
    <div className={className} style={{ width: base.width, ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: base.fontSize, marginBottom: 4 }}>
        <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{used.toLocaleString()} / {limit.toLocaleString()}</span>
      </div>
      <div style={{ height: base.thickness, borderRadius: base.thickness / 2, background: 'var(--color-surface-border)', overflow: 'hidden' }}>
        <div style={{ width: `${ratio * 100}%`, height: '100%', background: color, borderRadius: 'inherit', transition: 'width 300ms ease-out, background 200ms' }} />
      </div>
    </div>
  );
}
