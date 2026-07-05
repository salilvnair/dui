import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';

export interface StickyTableColumn<T> {
  key: string;
  label: string;
  width?: number | string;
  render: (row: T) => ReactNode;
}

export interface StickyTableHeaderViewProps<T> {
  columns: StickyTableColumn<T>[];
  rows: T[];
  keyField: keyof T;
  /** Pin the first column while scrolling horizontally. Default true. */
  freezeFirstColumn?: boolean;
  maxHeight?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Data table with a sticky header row and an optional frozen first column, for wide/tall grids. */
export function StickyTableHeaderView<T>({
  columns,
  rows,
  keyField,
  freezeFirstColumn = true,
  maxHeight = 360,
  size,
  className = '',
  style,
}: StickyTableHeaderViewProps<T>) {
  const base = useTableBase(size);

  return (
    <div className={className} style={{ maxHeight, overflow: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8, ...style }}>
      <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%' }}>
        <thead>
          <tr>
            {columns.map((col, ci) => (
              <th
                key={col.key}
                style={{
                  position: 'sticky', top: 0, zIndex: freezeFirstColumn && ci === 0 ? 3 : 2,
                  left: freezeFirstColumn && ci === 0 ? 0 : undefined,
                  width: col.width, background: 'var(--color-surface)',
                  borderBottom: '1px solid var(--color-surface-border)',
                  padding: `6px ${base.paddingX}`, textAlign: 'left',
                  fontSize: base.headerFontSize, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.04em', color: 'var(--color-text-muted)',
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={String(row[keyField])}>
              {columns.map((col, ci) => (
                <td
                  key={col.key}
                  style={{
                    position: freezeFirstColumn && ci === 0 ? 'sticky' : undefined,
                    left: freezeFirstColumn && ci === 0 ? 0 : undefined,
                    zIndex: freezeFirstColumn && ci === 0 ? 1 : undefined,
                    background: freezeFirstColumn && ci === 0 ? 'var(--color-panel)' : undefined,
                    padding: `6px ${base.paddingX}`, borderBottom: '1px solid var(--color-surface-border)',
                    fontSize: base.cellFontSize, color: 'var(--color-text-primary)', whiteSpace: 'nowrap',
                  }}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
