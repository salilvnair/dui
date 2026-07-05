import { useMemo, type CSSProperties } from 'react';

export interface SparklineViewProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  /** Fill the area under the line. Default true. */
  filled?: boolean;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/** Tiny inline SVG trend line, no axes — for table cells / stat cards. */
export function SparklineView({
  data,
  width = 80,
  height = 24,
  color,
  filled = true,
  strokeWidth = 1.5,
  className = '',
  style,
}: SparklineViewProps) {
  const accent = color ?? 'var(--color-primary)';

  const path = useMemo(() => {
    if (data.length < 2) return { line: '', area: '' };
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return [x, y];
    });
    const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
    const area = `${line} L${width},${height} L0,${height} Z`;
    return { line, area };
  }, [data, width, height]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} style={style}>
      {filled && <path d={path.area} fill={accent} opacity={0.12} />}
      <path d={path.line} fill="none" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
