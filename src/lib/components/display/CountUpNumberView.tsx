import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface CountUpNumberViewProps {
  value: number;
  /** Animation duration in milliseconds. Default 1200. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  precision?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Standalone animated number count-up primitive. */
export function CountUpNumberView({
  value,
  duration = 1200,
  prefix = '',
  suffix = '',
  precision = 0,
  size,
  color,
  className = '',
  style,
}: CountUpNumberViewProps) {
  const base = useDisplayBase(size, { color });
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (value - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span className={className} style={{ fontSize: `calc(${base.fontSize} * 1.6)`, fontWeight: 800, color: color ?? 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}{display.toFixed(precision)}{suffix}
    </span>
  );
}
