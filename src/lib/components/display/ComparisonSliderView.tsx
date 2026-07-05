import { useState, useRef, type CSSProperties } from 'react';
import { useMediaBase } from '../../core/MediaBase';
import './ComparisonSliderView.css';

export interface ComparisonSliderViewProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/** Before/after drag slider for image comparison. */
export function ComparisonSliderView({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  height = 260,
  className = '',
  style,
}: ComparisonSliderViewProps) {
  const base = useMediaBase();
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(ratio);
  };

  return (
    <div
      ref={containerRef}
      className={`dui_comparisonslider ${className}`}
      style={{ position: 'relative', height, borderRadius: base.borderRadius, overflow: 'hidden', userSelect: 'none', ...style }}
      onPointerDown={e => { dragging.current = true; setFromClientX(e.clientX); (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
      onPointerMove={e => { if (dragging.current) setFromClientX(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
    >
      <img src={beforeSrc} alt={beforeLabel} className="dui_comparisonslider__img" />
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={afterSrc} alt={afterLabel} className="dui_comparisonslider__img" />
      </div>
      <div className="dui_comparisonslider__handle" style={{ left: `${pos}%` }}>
        <span className="dui_comparisonslider__grip" />
      </div>
      <span className="dui_comparisonslider__tag" style={{ left: 8 }}>{beforeLabel}</span>
      <span className="dui_comparisonslider__tag" style={{ right: 8 }}>{afterLabel}</span>
    </div>
  );
}
