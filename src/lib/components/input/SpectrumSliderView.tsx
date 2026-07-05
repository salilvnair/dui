import { useRef, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';

export interface SpectrumSliderViewProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  /** CSS gradient stops rendered along the track, e.g. hue, severity, or temperature. */
  gradient?: string;
  width?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** The slider track is a live rendered gradient spectrum; the handle shows a magnified live-color preview bubble while dragging. */
export function SpectrumSliderView({
  value,
  min = 0,
  max = 100,
  onChange,
  gradient = 'linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7)',
  width = 240,
  size,
  className = '',
  style,
}: SpectrumSliderViewProps) {
  const base = useInputBase(size);
  const trackRef = useRef<HTMLDivElement>(null);
  const ratio = (value - min) / (max - min);

  const scrubTo = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const r = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    onChange(Math.round(min + r * (max - min)));
  };

  const handleDrag = (e: ReactMouseEvent<HTMLDivElement>) => {
    scrubTo(e.clientX);
    const move = (ev: globalThis.MouseEvent) => scrubTo(ev.clientX);
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <div className={className} style={{ width, position: 'relative', paddingTop: 28, ...style }}>
      <div
        style={{
          position: 'absolute', top: 0, left: `${ratio * 100}%`, transform: 'translateX(-50%)',
          width: 28, height: 20, borderRadius: 6, border: '2px solid var(--color-surface)',
          background: gradient, backgroundSize: `${width}px 100%`, backgroundPositionX: `${-ratio * width}px`,
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        }}
      />
      <div
        ref={trackRef}
        onMouseDown={handleDrag}
        style={{ position: 'relative', width, height: base.height, borderRadius: base.height, background: gradient, cursor: 'pointer' }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: `${ratio * 100}%`, transform: 'translate(-50%, -50%)',
          width: parseInt(base.height) - 2, height: parseInt(base.height) - 2, borderRadius: '999px',
          border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.4)', pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}
