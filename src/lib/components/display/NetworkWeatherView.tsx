import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './NetworkWeatherView.css';

export type NetworkWeatherCondition = 'sunny' | 'cloudy' | 'stormy';

export interface NetworkWeatherViewProps {
  condition: NetworkWeatherCondition;
  label?: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const LABELS: Record<NetworkWeatherCondition, string> = {
  sunny: 'All systems healthy',
  cloudy: 'Elevated error rate',
  stormy: 'Service disruption',
};

/** System health/error-rate expressed as literal weather instead of a status dot. */
export function NetworkWeatherView({
  condition,
  label,
  size,
  className = '',
  style,
}: NetworkWeatherViewProps) {
  const base = useDisplayBase(size);
  const w = 96, h = 72;

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, ...style }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {condition === 'sunny' && (
          <g transform={`translate(${w / 2}, ${h / 2 - 4})`}>
            <circle r={16} fill="var(--color-warning)" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return <line key={i} x1={Math.cos(a) * 20} y1={Math.sin(a) * 20} x2={Math.cos(a) * 26} y2={Math.sin(a) * 26} stroke="var(--color-warning)" strokeWidth={2} strokeLinecap="round" />;
            })}
          </g>
        )}
        {condition !== 'sunny' && (
          <g className="dui_weather__cloud" transform={`translate(${w / 2 - 24}, ${h / 2 - 20})`}>
            <ellipse cx={24} cy={20} rx={26} ry={16} fill="var(--color-text-muted)" opacity={0.85} />
            <ellipse cx={10} cy={24} rx={16} ry={11} fill="var(--color-text-muted)" opacity={0.85} />
            <ellipse cx={40} cy={24} rx={16} ry={11} fill="var(--color-text-muted)" opacity={0.85} />
          </g>
        )}
        {condition === 'cloudy' && [0, 1, 2].map(i => (
          <line key={i} className="dui_weather__drop" x1={w / 2 - 12 + i * 12} y1={h / 2 + 14} x2={w / 2 - 12 + i * 12} y2={h / 2 + 20} stroke="var(--color-primary)" strokeWidth={2} strokeLinecap="round" style={{ animationDelay: `${i * 200}ms` }} />
        ))}
        {condition === 'stormy' && (
          <>
            {[0, 1, 2, 3].map(i => (
              <line key={i} className="dui_weather__drop" x1={w / 2 - 18 + i * 12} y1={h / 2 + 12} x2={w / 2 - 22 + i * 12} y2={h / 2 + 22} stroke="var(--color-primary)" strokeWidth={2} strokeLinecap="round" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
            <polygon className="dui_weather__bolt" points={`${w / 2 + 2},${h / 2 + 8} ${w / 2 - 6},${h / 2 + 22} ${w / 2},${h / 2 + 22} ${w / 2 - 8},${h / 2 + 36} ${w / 2 + 10},${h / 2 + 18} ${w / 2 + 3},${h / 2 + 18}`} fill="var(--color-warning)" />
          </>
        )}
      </svg>
      <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', fontWeight: 600 }}>{label ?? LABELS[condition]}</span>
    </div>
  );
}
