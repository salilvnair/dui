import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import './GlowBorderView.css';

export interface GlowBorderViewProps {
  children: ReactNode;
  colors?: [string, string];
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Animated gradient glowing-border wrapper. */
export function GlowBorderView({
  children,
  colors = ['var(--color-primary)', 'var(--color-success)'],
  size,
  className = '',
  style,
}: GlowBorderViewProps) {
  const base = useCardBase(size);

  return (
    <div
      className={`dui_glowborder ${className}`}
      style={{
        padding: base.padding, borderRadius: base.borderRadius, background: 'var(--color-surface)',
        ['--dui-glow-c1' as string]: colors[0], ['--dui-glow-c2' as string]: colors[1],
        ...style,
      }}
    >
      {children}
    </div>
  );
}
