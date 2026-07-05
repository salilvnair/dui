import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';
import './ProgressRingView.css';

export interface ProgressRingViewProps {
  /** 0-100. Omit for indeterminate (spinning) mode. */
  value?: number;
  size?: DuiSize;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ProgressRingView({
  value,
  size,
  color,
  trackColor,
  showLabel = true,
  className = '',
  style,
}: ProgressRingViewProps) {
  const base = useFeedbackBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const track = trackColor ?? 'var(--color-surface-border)';
  const d = base.ringDiameter * 0.6;
  const stroke = base.thickness;
  const r = (d - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const indeterminate = value === undefined;
  const pct = Math.min(100, Math.max(0, value ?? 0));
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className={`dui_progressring ${className}`} style={{ position: 'relative', width: d, height: d, ...style }}>
      <svg width={d} height={d} className={indeterminate ? 'dui_progressring__svg dui_progressring__svg--spin' : 'dui_progressring__svg'}>
        <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={d / 2} cy={d / 2} r={r} fill="none" stroke={accent} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
          transform={`rotate(-90 ${d / 2} ${d / 2})`}
          style={{ transition: indeterminate ? undefined : 'stroke-dashoffset 300ms ease-out' }}
        />
      </svg>
      {showLabel && !indeterminate && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {Math.round(pct)}%
        </div>
      )}
    </div>
  );
}
