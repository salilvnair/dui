import { useRef, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';

export interface TimeTravelSliderViewProps<T> {
  /** Historical states, oldest first. */
  states: T[];
  /** Index of the currently-scrubbed state. */
  index: number;
  onScrub: (index: number) => void;
  /** Extracts a plottable number (e.g. a metric) from each state, for the background sparkline. */
  toValue: (state: T) => number;
  /** Extracts a short label shown above the playhead. */
  toLabel?: (state: T, index: number) => string;
  width?: number;
  height?: number;
  color?: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Scrub a draggable playhead across a sparkline of past states — a time-travel state scrubber, generalized. */
export function TimeTravelSliderView<T>({
  states,
  index,
  onScrub,
  toValue,
  toLabel,
  width = 320,
  height = 64,
  color,
  size,
  className = '',
  style,
}: TimeTravelSliderViewProps<T>) {
  const base = useInputBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const trackRef = useRef<HTMLDivElement>(null);
  const values = states.map(toValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const n = Math.max(1, states.length - 1);

  const points = values.map((v, i) => {
    const x = (i / n) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const scrubTo = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onScrub(Math.round(ratio * n));
  };

  const handleDrag = (e: ReactMouseEvent<HTMLDivElement>) => {
    scrubTo(e.clientX);
    const move = (ev: globalThis.MouseEvent) => scrubTo(ev.clientX);
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const playheadX = (index / n) * width;

  return (
    <div className={className} style={{ width, ...style }}>
      {toLabel && (
        <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginBottom: 4, textAlign: 'center' }}>
          {toLabel(states[index], index)}
        </div>
      )}
      <div ref={trackRef} onMouseDown={handleDrag} style={{ position: 'relative', width, height, cursor: 'pointer' }}>
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
          <polyline points={points} fill="none" stroke="var(--color-surface-border)" strokeWidth={1.5} />
          <line x1={playheadX} y1={0} x2={playheadX} y2={height} stroke={accent} strokeWidth={2} />
        </svg>
        <div
          style={{
            position: 'absolute', left: playheadX - 6, top: height - ((values[index] - min) / range) * height - 6,
            width: 12, height: 12, borderRadius: '999px', background: accent, border: '2px solid var(--color-surface)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
