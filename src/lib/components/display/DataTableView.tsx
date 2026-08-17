import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '../../../icons';
import type { DuiSize } from '../../core/DuiTypes';
import { useDui } from '../../core/DuiContext';
import { DUI_HEIGHT, DUI_FONT_SIZE } from '../../core/DuiTokens';
import { EmptyStateView } from './EmptyStateView';
import './DataTableView.css';

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  /** Usually plain text; accepts a ReactNode for e.g. a select-all checkbox header. */
  label: React.ReactNode;
  width?: string | number;
  sortable?: boolean;
  renderCell?: (row: T, value: unknown) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableViewProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  rows: T[];
  keyField?: string;
  onRowClick?: (row: T) => void;
  renderExpanded?: (row: T) => React.ReactNode;
  emptyTitle?: string;
  emptyMessage?: string;
  striped?: boolean;
  /** Reduces padding to match 'sm' size. Prefer `size` for token-aligned sizing. */
  compact?: boolean;
  /** Falls back to DuiProvider size when omitted. */
  size?: DuiSize;
  sortable?: boolean;
  maxHeight?: string;
  className?: string;
}

export function DataTableView<T extends Record<string, unknown>>({
  columns,
  rows,
  keyField = 'id',
  onRowClick,
  renderExpanded,
  emptyTitle = 'No data',
  emptyMessage,
  striped = false,
  compact = false,
  size,
  maxHeight,
  className = '',
}: DataTableViewProps<T>) {
  const ctx = useDui();
  const s = compact ? 'sm' : (size ?? ctx.size);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const handleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortAsc(a => !a);
    } else {
      setSortKey(col.key);
      setSortAsc(true);
    }
  };

  const toggleExpand = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const sorted = sortKey
    ? [...rows].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = String(av ?? '').localeCompare(String(bv ?? ''));
        return sortAsc ? cmp : -cmp;
      })
    : rows;

  const expandCol = renderExpanded ? '28px ' : '';
  // A bare number (valid per DataTableColumn.width's type) must become a
  // px length — grid-template-columns rejects the WHOLE value (not just
  // that track) if any token is a unitless number, silently collapsing
  // the table to a single implicit column the width of its container.
  const colTemplate = expandCol + columns.map(c => (typeof c.width === 'number' ? `${c.width}px` : c.width ?? '1fr')).join(' ');
  const rowH = DUI_HEIGHT.table[s];
  const cellPad = `${Math.round((rowH - 16) / 2)}px 12px`;
  const fontSize = DUI_FONT_SIZE[s];

  // When rows can expand, the table must grow naturally so expanded content
  // pushes siblings down instead of scrolling them out of view.
  const pushMode = !!renderExpanded;

  return (
    <div
      className={className}
      style={{
        border: '1px solid var(--color-surface-border)',
        borderRadius: '6px',
        overflow: 'hidden',
        minWidth: 360,
        // flexShrink: 0 — when this table is itself a child of some OTHER
        // flex-column container (e.g. a page's scrollable content area),
        // that ancestor's default flex-shrink:1 + this box's own overflow:
        // hidden (which resolves its automatic min-height to 0, per the flex
        // spec) let the ancestor squeeze it down toward 0 to avoid its own
        // scroll — confirmed via measurement (collapsed to ~35-63px instead
        // of its real ~170-214px content height) — instead of the page
        // scrolling normally like every other settings panel. Refusing to
        // shrink here restores that normal behavior.
        ...(pushMode ? {} : { maxHeight, display: 'flex', flexDirection: 'column', flexShrink: 0 }),
      }}
    >
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: colTemplate,
        background: 'var(--color-panel)',
        borderBottom: '1px solid var(--color-surface-border)',
        flexShrink: 0,
      }}>
        {renderExpanded && <div />}
        {columns.map(col => (
          <div
            key={col.key}
            onClick={() => handleSort(col)}
            style={{
              padding: cellPad,
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-text-muted)',
              cursor: col.sortable ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              // text-align has no effect on a flex item — justify-content is
              // the actual axis-alignment property for a flex container's
              // children, which is what col.align needs to drive here.
              justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start',
              gap: '4px',
              userSelect: 'none',
            }}
          >
            {col.label}
            {col.sortable && sortKey === col.key && (
              sortAsc
                ? <ChevronDownIcon size={10} />
                : <ChevronRightIcon size={10} style={{ transform: 'rotate(-90deg)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Body — push mode: natural flow so expanded rows push siblings; scroll mode:
          body scrolls within maxHeight. `flex: 1` (flex-basis: 0%) would force this
          to collapse to its min-content height regardless of actual row content —
          confirmed via measurement (needed 170px, given 35px) — since the outer
          container's height is itself content-derived (maxHeight only caps it, it
          doesn't stretch it), so there's no "extra space" for flex-grow to hand out.
          flex-basis: auto sizes the body to its content first; flex-shrink: 1 still
          lets it yield to overflow-y: auto once actual content exceeds maxHeight. */}
      <div style={pushMode ? {} : { flex: '1 1 auto', overflowY: 'auto' }}>
        {sorted.length === 0 ? (
          <EmptyStateView title={emptyTitle} message={emptyMessage} compact />
        ) : (
          sorted.map((row, ri) => {
            const rowKey = String(row[keyField] ?? ri);
            const isExpanded = expandedKeys.has(rowKey);
            const bgDefault = striped && ri % 2 === 1
              ? 'var(--color-table-stripe)'
              : 'transparent';

            return (
              <div
                key={rowKey}
                style={{
                  borderBottom: ri < sorted.length - 1 ? '1px solid var(--color-surface-border)' : 'none',
                }}
              >
                {/* Data row */}
                <div
                  onClick={() => onRowClick?.(row)}
                  className={`dui_data-table__row${(onRowClick || renderExpanded) ? ' dui_data-table__row--clickable' : ''}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: colTemplate,
                    background: bgDefault,
                    cursor: onRowClick ? 'pointer' : 'default',
                  }}
                >
                  {/* Expand toggle */}
                  {renderExpanded && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={e => toggleExpand(rowKey, e)}
                    >
                      <ChevronRightIcon
                        size={12}
                        style={{
                          color: 'var(--color-text-muted)',
                          transition: 'transform 120ms',
                          transform: isExpanded ? 'rotate(90deg)' : 'none',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  )}
                  {columns.map(col => (
                    <div
                      key={col.key}
                      style={{
                        padding: cellPad,
                        fontSize,
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        // Same as the header cell — text-align is a no-op on
                        // a flex item, justify-content is what actually
                        // positions it along the row axis.
                        justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {col.renderCell
                        ? col.renderCell(row, row[col.key])
                        : <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{String(row[col.key] ?? '—')}</span>
                      }
                    </div>
                  ))}
                </div>

                {/* Expanded row */}
                {renderExpanded && isExpanded && (
                  <div style={{
                    background: 'color-mix(in srgb, var(--color-text-primary) 3%, transparent)',
                    borderTop: '1px solid var(--color-surface-border)',
                  }}>
                    {renderExpanded(row)}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
