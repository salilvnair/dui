import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface DragHandleViewProps {
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Grab-handle primitive for reorderable lists — six-dot grip icon. */
export function DragHandleView({
  size,
  color,
  className = '',
  style,
}: DragHandleViewProps) {
  const base = useDisplayBase(size, { color });
  const dotColor = color ?? 'var(--color-text-muted)';
  const dot = base.iconSize * 0.18;
  const gap = base.iconSize * 0.16;

  return (
    <span
      className={className}
      style={{
        display: 'inline-grid', gridTemplateColumns: `repeat(2, ${dot}px)`, gap,
        cursor: 'grab', touchAction: 'none', padding: 4, ...style,
      }}
      aria-label="Drag to reorder"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} style={{ width: dot, height: dot, borderRadius: '999px', background: dotColor }} />
      ))}
    </span>
  );
}
