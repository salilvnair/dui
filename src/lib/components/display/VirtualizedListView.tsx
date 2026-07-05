import { useRef, useState, useMemo, type CSSProperties, type ReactNode } from 'react';

export interface VirtualizedListViewProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => ReactNode;
  /** Extra rows rendered above/below the visible window, to reduce blank-on-fast-scroll. Default 4. */
  overscan?: number;
  className?: string;
  style?: CSSProperties;
}

/** Windowed rendering for large lists — only mounts rows currently in (or near) the viewport. */
export function VirtualizedListView<T>({
  items,
  itemHeight,
  height,
  renderItem,
  overscan = 4,
  className = '',
  style,
}: VirtualizedListViewProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + height) / itemHeight) + overscan);
  const visible = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);

  return (
    <div
      ref={containerRef}
      className={className}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height, overflowY: 'auto', position: 'relative', ...style }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visible.map((item, i) => {
          const index = startIndex + i;
          return (
            <div key={index} style={{ position: 'absolute', top: index * itemHeight, left: 0, right: 0, height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
