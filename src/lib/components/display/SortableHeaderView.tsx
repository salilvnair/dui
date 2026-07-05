import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';
import { ChevronUpIcon, ChevronDownIcon } from '../../../icons';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortableHeaderViewProps {
  label: string;
  direction: SortDirection;
  onClick: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Clickable table column header with a sort-direction arrow indicator. */
export function SortableHeaderView({
  label,
  direction,
  onClick,
  size,
  color,
  className = '',
  style,
}: SortableHeaderViewProps) {
  const base = useTableBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const active = direction !== null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'transparent',
        cursor: 'pointer', padding: 0, fontFamily: 'inherit',
        fontSize: base.headerFontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
        color: active ? accent : 'var(--color-text-muted)',
        ...style,
      }}
    >
      {label}
      <span style={{ display: 'flex', flexDirection: 'column', opacity: active ? 1 : 0.35 }}>
        {direction === 'desc'
          ? <ChevronDownIcon size={10} />
          : <ChevronUpIcon size={10} />}
      </span>
    </button>
  );
}
