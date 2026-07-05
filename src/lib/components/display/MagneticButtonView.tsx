import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';

export interface MagneticButtonViewProps {
  children: ReactNode;
  onClick?: () => void;
  /** Max pull distance in px. Default 12. */
  strength?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Cursor-attraction hover button effect. */
export function MagneticButtonView({
  children,
  onClick,
  strength = 12,
  size,
  color,
  className = '',
  style,
}: MagneticButtonViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: ((e.clientX - cx) / rect.width) * strength * 2, y: ((e.clientY - cy) / rect.height) * strength * 2 });
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onClick={onClick}
      className={className}
      style={{
        height: base.height, fontSize: base.fontSize, padding: `0 ${base.paddingX}`,
        borderRadius: base.borderRadius, border: 'none', cursor: 'pointer',
        background: accent, color: '#fff', fontWeight: 600,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 150ms ease-out',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
