import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './LatencyPulseView.css';

export interface LatencyPulseViewProps {
  /** Latest latency in ms — higher values beat faster and spike taller. */
  latencyMs: number;
  /** Latency (ms) considered "critical" — beat turns red past this. Default 500. */
  criticalMs?: number;
  width?: number;
  height?: number;
  color?: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

function beatPath(w: number, h: number): string {
  const mid = h / 2;
  const spike = h * 0.42;
  return `M 0 ${mid} L ${w * 0.32} ${mid} L ${w * 0.38} ${mid - spike * 0.3} L ${w * 0.44} ${mid + spike} L ${w * 0.5} ${mid - spike * 1.4} L ${w * 0.56} ${mid + spike * 0.4} L ${w * 0.62} ${mid} L ${w} ${mid}`;
}

/** EKG/vitals-monitor style live pulse line for request latency — a metric that visually "beats". */
export function LatencyPulseView({
  latencyMs,
  criticalMs = 500,
  width = 240,
  height = 64,
  color,
  size,
  className = '',
  style,
}: LatencyPulseViewProps) {
  const base = useDisplayBase(size, { color });
  const critical = latencyMs >= criticalMs;
  const accent = color ?? (critical ? 'var(--color-error)' : 'var(--color-success)');
  const beatDuration = Math.max(0.5, Math.min(2.2, 1400 / Math.max(latencyMs, 40)));
  const single = beatPath(width, height);

  return (
    <div className={className} style={{ width, overflow: 'hidden', ...style }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className="dui_latencypulse__track" style={{ animationDuration: `${beatDuration * 3}s` }}>
          {[0, 1, 2].map(i => (
            <path key={i} d={single} transform={`translate(${i * width}, 0)`} fill="none" stroke={accent} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          ))}
        </g>
      </svg>
      <div style={{ fontSize: base.fontSize, color: accent, fontWeight: 700, marginTop: 2 }}>{Math.round(latencyMs)}ms</div>
    </div>
  );
}
