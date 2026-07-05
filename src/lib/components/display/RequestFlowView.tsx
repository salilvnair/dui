import { useMemo, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './RequestFlowView.css';

export interface RequestFlowPhase {
  id: string;
  label: string;
  /** Duration of this phase in ms — drives both the segment width and particle speed. */
  duration: number;
  color?: string;
}

export interface RequestFlowViewProps {
  phases: RequestFlowPhase[];
  /** Number of particles in flight at once. Default 3. */
  particleCount?: number;
  width?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/**
 * Animated network waterfall — particles travel along a DNS→TCP→TLS→Request→Response
 * pipe, speed/color mapped to actual phase timing. DUI-original, no direct prior art.
 */
export function RequestFlowView({
  phases,
  particleCount = 3,
  width = 480,
  size,
  className = '',
  style,
}: RequestFlowViewProps) {
  const base = useDisplayBase(size);
  const total = phases.reduce((sum, p) => sum + p.duration, 0) || 1;
  const height = 64;
  const y = height / 2;

  const segments = useMemo(() => {
    let x = 0;
    return phases.map(p => {
      const w = (p.duration / total) * width;
      const seg = { ...p, x, w };
      x += w;
      return seg;
    });
  }, [phases, total, width]);

  const totalDurationS = Math.max(1.2, total / 300);

  return (
    <div className={className} style={{ width, ...style }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path id="dui-requestflow-path" d={`M 0 ${y} L ${width} ${y}`} fill="none" stroke="none" />
        {segments.map(seg => (
          <g key={seg.id}>
            <rect x={seg.x} y={y - 3} width={seg.w} height={6} rx={3} fill={seg.color ?? 'var(--color-surface-border)'} opacity={0.35} />
            <line x1={seg.x} y1={y - 10} x2={seg.x} y2={y + 10} stroke="var(--color-surface-border)" strokeWidth={1} />
          </g>
        ))}
        {Array.from({ length: particleCount }, (_, i) => (
          <circle
            key={i}
            r={4}
            fill={segments[Math.floor((i / particleCount) * segments.length)]?.color ?? 'var(--color-primary)'}
            className="dui_requestflow__particle"
            style={{
              offsetPath: `path('M 0 ${y} L ${width} ${y}')`,
              animationDuration: `${totalDurationS}s`,
              animationDelay: `${-(i / particleCount) * totalDurationS}s`,
            }}
          />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {segments.map(seg => (
          <div key={seg.id} style={{ fontSize: base.fontSize, color: seg.color ?? 'var(--color-text-muted)', width: seg.w, textAlign: 'center' }}>
            {seg.label}
          </div>
        ))}
      </div>
    </div>
  );
}
