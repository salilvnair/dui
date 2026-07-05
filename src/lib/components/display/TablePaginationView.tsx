import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';
import { PaginationView } from '../layout/PaginationView';
import { SelectInputView } from '../input/SelectInputView';

export interface TablePaginationViewProps {
  page: number;
  totalRows: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Rows-per-page selector + page-number footer for data tables. */
export function TablePaginationView({
  page,
  totalRows,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  size,
  color,
  className = '',
  style,
}: TablePaginationViewProps) {
  const base = useTableBase(size, { color });
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const from = totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to = Math.min(totalRows, page * rowsPerPage);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: `6px ${base.paddingX}`, fontSize: base.cellFontSize, color: 'var(--color-text-muted)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Rows per page</span>
        <SelectInputView
          size={size}
          value={String(rowsPerPage)}
          onChange={v => onRowsPerPageChange(Number(v))}
          options={rowsPerPageOptions.map(n => ({ value: String(n), label: String(n) }))}
          style={{ width: 72 }}
        />
      </div>
      <span>{from}–{to} of {totalRows}</span>
      <PaginationView page={page} totalPages={totalPages} onChange={onPageChange} size={size} color={color} />
    </div>
  );
}
