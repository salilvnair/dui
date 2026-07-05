import { useRef, useCallback, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import './RangeSliderView.css';

export interface RangeSliderViewProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: DuiSize;
  accentColor?: string;
  width?: number | string;
  showValue?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Dual-handle min/max range slider — distinct from the single-handle `SliderView`. */
export function RangeSliderView({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size,
  accentColor,
  width = 200,
  showValue = false,
  className = '',
  style,
}: RangeSliderViewProps) {
  const accent = accentColor ?? 'var(--color-primary)';
  const trackRef = useRef<HTMLDivElement>(null);
  const [lo, hi] = value;

  const clamp = (v: number) => Math.round(Math.min(max, Math.max(min, v)) / step) * step;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const dragHandle = useCallback((handle: 'lo' | 'hi') => (e: React.PointerEvent) => {
    if (disabled) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
      const raw = clamp(min + ratio * (max - min));
      if (handle === 'lo') onChange([Math.min(raw, hi), hi]);
      else onChange([lo, Math.max(raw, lo)]);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }, [disabled, lo, hi, min, max, step, onChange]);

  return (
    <div className={`dui_rangeslider ${className}`} style={{ display: 'flex', alignItems: 'center', gap: 8, width: typeof width === 'number' ? width : undefined, ...style }}>
      <div ref={trackRef} className="dui_rangeslider__track" style={{ opacity: disabled ? 0.4 : 1 }}>
        <div
          className="dui_rangeslider__fill"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%`, background: accent }}
        />
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          className="dui_rangeslider__thumb"
          style={{ left: `${pct(lo)}%`, background: accent }}
          onPointerDown={dragHandle('lo')}
        />
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          className="dui_rangeslider__thumb"
          style={{ left: `${pct(hi)}%`, background: accent }}
          onPointerDown={dragHandle('hi')}
        />
      </div>
      {showValue && <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>{lo}–{hi}</span>}
    </div>
  );
}
