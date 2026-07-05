import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';
import { SearchInputView } from '../input/SearchInputView';
import { ColumnVisibilityMenuView, type ColumnVisibilityOption } from './ColumnVisibilityMenuView';
import { IconButtonView } from '../button/IconButtonView';
import { DownloadIcon, ListIcon } from '../../../icons';

export type DataGridDensity = 'compact' | 'default' | 'comfortable';

export interface DataGridToolbarViewProps {
  search: string;
  onSearchChange: (value: string) => void;
  columns?: ColumnVisibilityOption[];
  visibleColumns?: string[];
  onVisibleColumnsChange?: (visible: string[]) => void;
  density?: DataGridDensity;
  onDensityChange?: (density: DataGridDensity) => void;
  onExport?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const DENSITIES: DataGridDensity[] = ['compact', 'default', 'comfortable'];

/** Table toolbar — search + column-visibility + density cycle + export. */
export function DataGridToolbarView({
  search,
  onSearchChange,
  columns,
  visibleColumns,
  onVisibleColumnsChange,
  density = 'default',
  onDensityChange,
  onExport,
  size,
  color,
  className = '',
  style,
}: DataGridToolbarViewProps) {
  const base = useTableBase(size, { color });

  const cycleDensity = () => {
    if (!onDensityChange) return;
    const next = DENSITIES[(DENSITIES.indexOf(density) + 1) % DENSITIES.length];
    onDensityChange(next);
  };

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: `6px ${base.paddingX}`, ...style }}>
      <SearchInputView value={search} onChange={onSearchChange} placeholder="Search…" size={size} style={{ flex: 1, maxWidth: 240 }} />
      <div style={{ flex: 1 }} />
      {columns && visibleColumns && onVisibleColumnsChange && (
        <ColumnVisibilityMenuView columns={columns} visible={visibleColumns} onChange={onVisibleColumnsChange} size={size} color={color} />
      )}
      {onDensityChange && (
        <IconButtonView icon={<ListIcon size={14} />} tooltip={`Density: ${density}`} variant="ghost" onClick={cycleDensity} />
      )}
      {onExport && (
        <IconButtonView icon={<DownloadIcon size={14} />} tooltip="Export" variant="ghost" onClick={onExport} />
      )}
    </div>
  );
}
