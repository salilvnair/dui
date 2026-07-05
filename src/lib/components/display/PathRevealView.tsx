import { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface PathRevealViewProps {
  /** One or more SVG path `d` strings — each draws itself on mount. */
  d: string | string[];
  viewBox?: string;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  /** Draw duration in ms. Default 1200. */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/** Generic SVG stroke-draw reveal primitive — any path/diagram/signature "draws itself" on mount. */
export function PathRevealView({
  d,
  viewBox = '0 0 100 100',
  width = 100,
  height = 100,
  color,
  strokeWidth = 2,
  duration = 1200,
  className = '',
  style,
}: PathRevealViewProps) {
  const paths = Array.isArray(d) ? d : [d];
  const refs = useRef<(SVGPathElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const accent = color ?? 'var(--color-primary)';

  useEffect(() => {
    refs.current.forEach(el => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    });
    requestAnimationFrame(() => setReady(true));
  }, [paths.join('|')]);

  return (
    <svg width={width} height={height} viewBox={viewBox} className={className} style={style}>
      {paths.map((pd, i) => (
        <path
          key={i}
          ref={el => { refs.current[i] = el; }}
          d={pd}
          fill="none"
          stroke={accent}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDashoffset: ready ? 0 : undefined, transition: ready ? `stroke-dashoffset ${duration}ms ease-out` : 'none' }}
        />
      ))}
    </svg>
  );
}
