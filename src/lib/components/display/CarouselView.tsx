import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import './CarouselView.css';

export interface CarouselViewProps {
  slides: ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
  color?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/** Swipeable card carousel with dot indicators — autoplay pauses on hover. */
export function CarouselView({
  slides,
  autoplay = false,
  autoplayInterval = 3500,
  color,
  height = 220,
  className = '',
  style,
}: CarouselViewProps) {
  const accent = color ?? 'var(--color-primary)';
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const dragState = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false });

  useEffect(() => {
    if (!autoplay || hovering || slides.length <= 1) return;
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), autoplayInterval);
    return () => clearInterval(t);
  }, [autoplay, hovering, autoplayInterval, slides.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, dragging: true };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.dragging = false;
    if (dx > 50) setIndex(i => (i - 1 + slides.length) % slides.length);
    else if (dx < -50) setIndex(i => (i + 1) % slides.length);
  };

  return (
    <div
      className={`dui_carousel ${className}`}
      style={{ height, ...style }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="dui_carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="dui_carousel__slide">{slide}</div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="dui_carousel__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="dui_carousel__dot"
              style={{ background: i === index ? accent : 'var(--color-surface-border)' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
