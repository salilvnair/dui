import { useState, useEffect, useRef, useCallback } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useDateBase } from '../../core/DateBase';

export interface CountdownRingViewProps {
  /** Target time to count down to. Takes precedence over `durationSeconds`. */
  target?: Date | number;
  /** Alternative to `target` — counts down from now for N seconds. */
  durationSeconds?: number;
  onComplete?: () => void;
  size?: DuiSize;
  /** Ring diameter in px — overrides the size-derived default. */
  diameter?: number;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  label?: string;
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function formatRemaining(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function CountdownRingView({
  target,
  durationSeconds,
  onComplete,
  size,
  diameter,
  width,
  borderRadius,
  color,
  label,
  paused = false,
  className = '',
  style,
}: CountdownRingViewProps) {
  const base = useDateBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const d = diameter ?? base.ringDiameter;
  const stroke = Math.max(3, d * 0.07);
  const r = (d - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  const endAt = useRef<number>(
    target ? (typeof target === 'number' ? target : target.getTime()) : Date.now() + (durationSeconds ?? 60) * 1000
  );
  const startAt = useRef<number>(Date.now());
  const totalMs = useRef<number>(Math.max(1, endAt.current - startAt.current));
  const [remaining, setRemaining] = useState(() => Math.max(0, endAt.current - Date.now()));
  const firedComplete = useRef(false);

  useEffect(() => {
    if (paused) return;
    let raf: number;
    const tick = () => {
      const rem = Math.max(0, endAt.current - Date.now());
      setRemaining(rem);
      if (rem <= 0) {
        if (!firedComplete.current) { firedComplete.current = true; onComplete?.(); }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, onComplete]);

  const progress = 1 - Math.min(1, remaining / totalMs.current);
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className={`dui_countdown_ring ${className}`}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: base.gap, ...style }}
    >
      <div style={{ position: 'relative', width: d, height: d }}>
        <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke="var(--color-surface-border)" strokeWidth={stroke} />
          <circle
            cx={d / 2} cy={d / 2} r={r} fill="none"
            stroke={accent} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 260ms linear' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: base.fontSize, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-primary)',
        }}>
          {formatRemaining(remaining)}
        </div>
      </div>
      {label && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{label}</span>}
    </div>
  );
}
