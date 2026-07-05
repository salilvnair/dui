import { useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import './DialKnobInputView.css';

export interface DialKnobInputViewProps {
  value: number;
  min?: number;
  max?: number;
  /** Number of discrete snap-ticks across the full sweep. Default 10. */
  ticks?: number;
  onChange: (value: number) => void;
  label?: string;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const SWEEP_START = -135;
const SWEEP_END = 135;

const DIAMETER: Record<DuiSize, number> = {
  xxs: 40, xs: 46, sm: 52, md: 64, lg: 76, xl: 88, xxl: 100, xxxl: 112,
};

/** Rotary analog knob (drag in a circle) with snap-ticks and a haptic-style micro-bounce at each notch. */
export function DialKnobInputView({
  value,
  min = 0,
  max = 100,
  ticks = 10,
  onChange,
  label,
  size,
  color,
  className = '',
  style,
}: DialKnobInputViewProps) {
  const base = useInputBase(size, { color });
  const s = size ?? 'md';
  const diameter = DIAMETER[s] ?? DIAMETER.md;
  const accent = color ?? 'var(--color-primary)';
  const ref = useRef<HTMLDivElement>(null);
  const [bounce, setBounce] = useState(false);
  const lastTick = useRef(-1);

  const ratio = (value - min) / (max - min);
  const angle = SWEEP_START + ratio * (SWEEP_END - SWEEP_START);

  const angleToValue = (clientX: number, clientY: number): number => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return value;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let deg = (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;
    if (deg > 180) deg -= 360;
    const clamped = Math.min(SWEEP_END, Math.max(SWEEP_START, deg));
    const r = (clamped - SWEEP_START) / (SWEEP_END - SWEEP_START);
    const raw = min + r * (max - min);
    const step = (max - min) / ticks;
    return Math.round(raw / step) * step;
  };

  const handleDrag = (e: ReactMouseEvent<HTMLDivElement>) => {
    const move = (ev: globalThis.MouseEvent) => {
      const next = angleToValue(ev.clientX, ev.clientY);
      const tickIdx = Math.round(((next - min) / (max - min)) * ticks);
      if (tickIdx !== lastTick.current) {
        lastTick.current = tickIdx;
        setBounce(true);
        setTimeout(() => setBounce(false), 140);
      }
      onChange(next);
    };
    move(e.nativeEvent);
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, ...style }}>
      <div
        ref={ref}
        onMouseDown={handleDrag}
        className={bounce ? 'dui_dialknob--bounce' : ''}
        style={{
          width: diameter, height: diameter, borderRadius: '999px', position: 'relative', cursor: 'grab',
          background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)',
        }}
      >
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const tAngle = SWEEP_START + (i / ticks) * (SWEEP_END - SWEEP_START);
          const active = i / ticks <= ratio;
          return (
            <div
              key={i}
              style={{
                position: 'absolute', left: '50%', top: 2, width: 2, height: 5, borderRadius: 1,
                background: active ? accent : 'var(--color-surface-border)',
                transform: `translateX(-50%) rotate(${tAngle}deg)`, transformOrigin: `1px ${diameter / 2 - 2}px`,
              }}
            />
          );
        })}
        <div style={{
          position: 'absolute', inset: 6, borderRadius: '999px', transform: `rotate(${angle}deg)`,
          transition: 'transform 60ms linear',
        }}>
          <div style={{ position: 'absolute', left: '50%', top: 4, width: 3, height: diameter * 0.28, borderRadius: 2, background: accent, transform: 'translateX(-50%)' }} />
        </div>
      </div>
      {label && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{label}: {Math.round(value)}</span>}
    </div>
  );
}
