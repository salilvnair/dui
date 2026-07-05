import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';

export interface RateLimitMeterViewProps {
  remaining: number;
  limit: number;
  resetLabel: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Requests-remaining ring gauge with a reset countdown label. */
export function RateLimitMeterView({
  remaining,
  limit,
  resetLabel,
  size,
  className = '',
  style,
}: RateLimitMeterViewProps) {
  const base = useFeedbackBase(size);
  const ratio = limit > 0 ? Math.max(0, Math.min(1, remaining / limit)) : 0;
  const color = ratio <= 0.1 ? 'var(--color-error)' : ratio <= 0.3 ? 'var(--color-warning)' : 'var(--color-success)';
  const d = base.ringDiameter * 0.45;
  const r = (d - base.thickness) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <div style={{ position: 'relative', width: d, height: d }}>
        <svg width={d} height={d}>
          <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke="var(--color-surface-border)" strokeWidth={base.thickness} />
          <circle
            cx={d / 2} cy={d / 2} r={r} fill="none" stroke={color} strokeWidth={base.thickness} strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={circumference * (1 - ratio)}
            transform={`rotate(-90 ${d / 2} ${d / 2})`} style={{ transition: 'stroke-dashoffset 300ms ease-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {remaining}
        </div>
      </div>
      <div>
        <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{remaining} / {limit} left</div>
        <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>Resets {resetLabel}</div>
      </div>
    </div>
  );
}
