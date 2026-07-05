import { useEffect, useState, type CSSProperties, type RefObject } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './ConnectionPulseLineView.css';

export interface ConnectionPulseLineViewProps {
  /** A positioned ancestor that both `from`/`to` live inside — coordinates are relative to it. */
  containerRef: RefObject<HTMLElement | null>;
  from: RefObject<HTMLElement | null>;
  to: RefObject<HTMLElement | null>;
  color?: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** A dashed/gradient SVG line connecting two arbitrary DOM elements, with a traveling pulse dot. */
export function ConnectionPulseLineView({
  containerRef,
  from,
  to,
  color,
  size,
  className = '',
  style,
}: ConnectionPulseLineViewProps) {
  useDisplayBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const [path, setPath] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const containerEl = containerRef.current;
      const fromEl = from.current;
      const toEl = to.current;
      if (!containerEl || !fromEl || !toEl) return;
      const cRect = containerEl.getBoundingClientRect();
      const fRect = fromEl.getBoundingClientRect();
      const tRect = toEl.getBoundingClientRect();
      setPath({
        x1: fRect.left + fRect.width / 2 - cRect.left,
        y1: fRect.top + fRect.height / 2 - cRect.top,
        x2: tRect.left + tRect.width / 2 - cRect.left,
        y2: tRect.top + tRect.height / 2 - cRect.top,
      });
    };
    update();
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { window.removeEventListener('resize', update); observer.disconnect(); };
  }, [containerRef, from, to]);

  if (!path) return null;
  const pathId = `dui-connpulse-${path.x1}-${path.y1}-${path.x2}-${path.y2}`;

  return (
    <svg className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', ...style }}>
      <path id={pathId} d={`M ${path.x1} ${path.y1} L ${path.x2} ${path.y2}`} fill="none" stroke={accent} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.5} />
      <circle r={4} fill={accent} className="dui_connpulse__dot" style={{ offsetPath: `path('M ${path.x1} ${path.y1} L ${path.x2} ${path.y2}')`, animationDuration: '1.8s' }} />
    </svg>
  );
}
