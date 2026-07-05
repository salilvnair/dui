import { useMemo, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './ConstellationLoaderView.css';

export interface ConstellationLoaderViewProps {
  /** Number of stars. Default 7. */
  count?: number;
  size?: DuiSize;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

function seededPoints(count: number, w: number, h: number) {
  let s = count * 104729;
  const rand = () => { s = (s * 1103515245 + 12345) >>> 0; return (s >>> 8) / 0xFFFFFF; };
  return Array.from({ length: count }, () => ({ x: 8 + rand() * (w - 16), y: 8 + rand() * (h - 16) }));
}

/** Loading dots that drift and connect into shifting constellation lines — ties to NetworkGraphView's visual identity. */
export function ConstellationLoaderView({
  count = 7,
  size,
  color,
  width = 100,
  height = 60,
  className = '',
  style,
}: ConstellationLoaderViewProps) {
  useDisplayBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const points = useMemo(() => seededPoints(count, width, height), [count, width, height]);

  const edges: [number, number][] = [];
  points.forEach((p, i) => {
    points.forEach((q, j) => {
      if (j <= i) return;
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < Math.max(width, height) * 0.45) edges.push([i, j]);
    });
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} style={style}>
      {edges.map(([i, j], k) => (
        <line key={k} x1={points[i].x} y1={points[i].y} x2={points[j].x} y2={points[j].y} stroke={accent} strokeWidth={0.75} opacity={0.35} />
      ))}
      {points.map((p, i) => (
        <circle key={i} className="dui_constellation__dot" cx={p.x} cy={p.y} r={2.5} fill={accent} />
      ))}
    </svg>
  );
}
