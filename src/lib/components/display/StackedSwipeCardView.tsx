import { useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface StackedSwipeCardViewProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  onSwipe: (item: T, direction: 'left' | 'right') => void;
  width?: number;
  height?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Swipeable card stack for one-at-a-time approve/reject flows. */
export function StackedSwipeCardView<T>({
  items,
  renderItem,
  onSwipe,
  width = 280,
  height = 180,
  size,
  className = '',
  style,
}: StackedSwipeCardViewProps<T>) {
  const base = useCardBase(size);
  const [dragX, setDragX] = useState(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);

  const top = items[0];
  const stack = items.slice(0, 3);

  const handleDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    const move = (ev: globalThis.MouseEvent) => {
      if (!draggingRef.current) return;
      setDragX(ev.clientX - startXRef.current);
    };
    const up = (ev: globalThis.MouseEvent) => {
      draggingRef.current = false;
      const dx = ev.clientX - startXRef.current;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      if (Math.abs(dx) > width * 0.3 && top) {
        onSwipe(top, dx > 0 ? 'right' : 'left');
      }
      setDragX(0);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <div className={className} style={{ position: 'relative', width, height, ...style }}>
      {stack.slice().reverse().map((item, revIdx) => {
        const idx = stack.length - 1 - revIdx;
        const isTop = idx === 0;
        const scale = 1 - idx * 0.04;
        const yOffset = idx * 8;
        const rotate = isTop ? dragX / 20 : 0;
        const translateX = isTop ? dragX : 0;
        return (
          <div
            key={idx}
            onMouseDown={isTop ? handleDown : undefined}
            style={{
              position: 'absolute', inset: 0, borderRadius: base.borderRadius, padding: base.padding,
              border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)',
              transform: `translate(${translateX}px, ${yOffset}px) scale(${scale}) rotate(${rotate}deg)`,
              transition: draggingRef.current && isTop ? 'none' : 'transform 220ms ease-out',
              cursor: isTop ? 'grab' : 'default',
              zIndex: stack.length - idx,
              opacity: isTop ? 1 - Math.min(1, Math.abs(dragX) / (width * 0.7)) * 0.3 : 1,
              boxSizing: 'border-box',
            }}
          >
            {renderItem(item)}
          </div>
        );
      })}
    </div>
  );
}
