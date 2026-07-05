import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface HoloCardViewProps {
  children: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** A card with a mouse-position-reactive holographic/iridescent sheen — trading-card holo effect. */
export function HoloCardView({
  children,
  size,
  className = '',
  style,
}: HoloCardViewProps) {
  const base = useCardBase(size);
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden', padding: base.padding, borderRadius: base.borderRadius,
        border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)',
        transform: active ? `perspective(600px) rotateX(${(50 - pos.y) / 8}deg) rotateY(${(pos.x - 50) / 8}deg)` : 'none',
        transition: active ? 'none' : 'transform 300ms ease-out',
        ...style,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'color-dodge', opacity: active ? 0.55 : 0,
          transition: 'opacity 200ms ease-out',
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,120,255,0.5), rgba(120,220,255,0.4) 30%, rgba(255,220,120,0.3) 60%, transparent 80%)`,
        }}
      />
    </div>
  );
}
