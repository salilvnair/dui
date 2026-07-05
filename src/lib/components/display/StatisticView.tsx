import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface StatisticViewProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  precision?: number;
  /** Animate count-up from 0 on mount/value change. Default true. */
  animate?: boolean;
  /** Animation duration in ms. Default 800. */
  duration?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function StatisticView({
  label,
  value,
  prefix,
  suffix,
  precision = 0,
  animate = true,
  duration = 800,
  size,
  color,
  className = '',
  style,
}: StatisticViewProps) {
  const base = useDisplayBase(size, { color });
  const [display, setDisplay] = useState(animate ? 0 : value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) { setDisplay(value); return; }
    const start = performance.now();
    const from = display;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(from + (value - from) * easeOutCubic(t));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate, duration]);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }}>
      <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{label}</span>
      <span style={{ fontSize: `calc(${base.fontSize} * 2)`, fontWeight: 800, color: base.color ?? 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
        {prefix}{display.toFixed(precision)}{suffix}
      </span>
    </div>
  );
}
