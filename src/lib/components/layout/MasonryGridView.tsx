import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface MasonryGridViewProps {
  children: ReactNode[];
  columns?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Pinterest-style column-balanced layout — CSS columns, no JS measurement needed. */
export function MasonryGridView({
  children,
  columns = 3,
  size,
  className = '',
  style,
}: MasonryGridViewProps) {
  const base = useLayoutBase(size);

  return (
    <div
      className={className}
      style={{ columnCount: columns, columnGap: base.gap, ...style }}
    >
      {children.map((child, i) => (
        <div key={i} style={{ breakInside: 'avoid', marginBottom: base.gap }}>
          {child}
        </div>
      ))}
    </div>
  );
}
