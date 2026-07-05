import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './GradientTextView.css';

export interface GradientTextViewProps {
  children: ReactNode;
  colors?: [string, string, string?];
  /** Animation duration in seconds. Default 4. */
  duration?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Animated gradient-shifting text. */
export function GradientTextView({
  children,
  colors = ['var(--color-primary)', 'var(--color-accent, var(--color-primary))', 'var(--color-success)'],
  duration = 4,
  size,
  className = '',
  style,
}: GradientTextViewProps) {
  const base = useDisplayBase(size);
  const gradient = `linear-gradient(90deg, ${colors.filter(Boolean).join(', ')})`;

  return (
    <span
      className={`dui_gradienttext ${className}`}
      style={{
        fontSize: base.fontSize,
        fontWeight: 700,
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animationDuration: `${duration}s`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
