import type { CSSProperties, ReactNode } from 'react';
import './ScrollAreaView.css';

export interface ScrollAreaViewProps {
  children: ReactNode;
  direction?: 'vertical' | 'horizontal' | 'both';
  maxHeight?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Container with a slim, accent-tinted custom scrollbar instead of the browser default. */
export function ScrollAreaView({
  children,
  direction = 'vertical',
  maxHeight,
  color,
  className = '',
  style,
}: ScrollAreaViewProps) {
  const accent = color ?? 'var(--color-primary)';

  return (
    <div
      className={`dui_scrollarea ${className}`}
      style={{
        overflowY: direction !== 'horizontal' ? 'auto' : 'hidden',
        overflowX: direction !== 'vertical' ? 'auto' : 'hidden',
        maxHeight,
        '--dui-scrollarea-accent': accent,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
