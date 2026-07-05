import { useState, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useNavBase } from '../../core/NavBase';
import './DockView.css';

export interface DockItem {
  id: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}

export interface DockViewProps {
  items: DockItem[];
  onSelect: (id: string) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
}

/** Floating icon dock — icons magnify as the cursor approaches. */
export function DockView({
  items,
  onSelect,
  size,
  color,
  className = '',
}: DockViewProps) {
  const base = useNavBase(size, { activeColor: color });
  const accent = base.activeColor ?? 'var(--color-primary)';
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const baseSize = base.iconSize * 2.2;

  const scaleFor = (i: number) => {
    if (hoverIdx === null) return 1;
    const dist = Math.abs(i - hoverIdx);
    if (dist === 0) return 1.5;
    if (dist === 1) return 1.22;
    if (dist === 2) return 1.08;
    return 1;
  };

  return (
    <div className={`dui_dock ${className}`} onMouseLeave={() => setHoverIdx(null)}>
      {items.map((item, i) => {
        const scale = scaleFor(i);
        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            onMouseEnter={() => setHoverIdx(i)}
            onClick={() => onSelect(item.id)}
            className="dui_dock__item"
            style={{
              width: baseSize, height: baseSize,
              transform: `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 14 : 0}px)`,
              color: item.active ? accent : 'var(--color-text-secondary)',
            }}
          >
            {item.icon}
            {item.active && <span className="dui_dock__dot" style={{ background: accent }} />}
          </button>
        );
      })}
    </div>
  );
}
