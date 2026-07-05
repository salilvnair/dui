import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface TiltCardViewProps {
  children: ReactNode;
  /** Max tilt angle in degrees. Default 10. */
  maxTilt?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** 3D perspective tilt-on-hover card. */
export function TiltCardView({
  children,
  maxTilt = 10,
  size,
  className = '',
  style,
}: TiltCardViewProps) {
  const base = useCardBase(size);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * maxTilt * 2, ry: px * maxTilt * 2 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className={className}
      style={{
        padding: base.padding, borderRadius: base.borderRadius,
        border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)',
        transform: `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform 150ms ease-out', transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
