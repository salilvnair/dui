import { useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import { DragHandleIcon } from '../../../icons';
import './SortableView.css';

export interface SortableRow {
  /** Stable unique id. */
  id: string;
  /** The row's content — rendered untouched inside the sortable wrapper. */
  node: ReactNode;
}

export interface SortableViewProps {
  rows: SortableRow[];
  /** Fired once per completed drag with the source and target indices. */
  onReorder: (fromIndex: number, toIndex: number) => void;
  /** Wrapper element per row — use 'li' inside a <ul>/<ol>. Default 'div'. */
  as?: 'div' | 'li';
  /** Accent color for the drop indicator + handle hover. */
  accentColor?: string;
  /** Disables all dragging (rows render bare). */
  disabled?: boolean;
  /** Extra class per row wrapper. */
  rowClassName?: string;
  style?: CSSProperties;
}

/**
 * SortableView — headless drag-to-reorder for arbitrary markup, the invisible
 * sibling of RearrangeView. RearrangeView owns its row chrome (list rows,
 * checkboxes); SortableView wraps YOUR rows (resume bullets, canvas items,
 * cards…) and adds only a hover grab-handle in the left gutter plus a drop
 * indicator line. Rows drag exclusively from the handle, so inline editing,
 * text selection, and buttons inside the row keep working.
 *
 * Renders a fragment of row wrappers — the caller owns the container
 * (pass `as="li"` to stay valid inside a <ul>).
 */
export function SortableView({
  rows,
  onReorder,
  as = 'div',
  accentColor = 'var(--dui-accent, var(--color-accent, #6366f1))',
  disabled = false,
  rowClassName = '',
  style,
}: SortableViewProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  // Rows are draggable, but only a mousedown on the handle arms the drag —
  // anywhere else on the row keeps native behavior (dblclick edit, selection).
  const armedRef = useRef(false);

  const Row = as;

  const onDrop = (e: DragEvent, toIdx: number) => {
    e.preventDefault();
    if (dragIdx != null && dragIdx !== toIdx) onReorder(dragIdx, toIdx);
    setDragIdx(null);
    setOverIdx(null);
  };

  return (
    <>
      {rows.map((row, idx) => {
        const dragging = dragIdx === idx;
        const over = overIdx === idx && dragIdx !== null && dragIdx !== idx;
        return (
          <Row
            key={row.id}
            className={`dui-sortable-row${dragging ? ' is-dragging' : ''}${over ? ' is-over' : ''}${disabled ? ' is-static' : ''}${rowClassName ? ` ${rowClassName}` : ''}`}
            style={{ ['--dui-sortable-accent' as string]: accentColor, ...style }}
            draggable={!disabled}
            onDragStart={(e: DragEvent) => {
              if (disabled) { e.preventDefault(); return; }
              if (!armedRef.current) {
                // Only veto drags that originate from THIS row. A bubbled
                // dragstart from a nested SortableView row must pass through
                // untouched or nesting (items containing bullets) breaks.
                if (e.target === e.currentTarget) e.preventDefault();
                return;
              }
              e.stopPropagation();
              e.dataTransfer.effectAllowed = 'move';
              setDragIdx(idx);
            }}
            onDragOver={(e: DragEvent) => { if (dragIdx != null) { e.preventDefault(); setOverIdx(idx); } }}
            onDrop={(e: DragEvent) => onDrop(e, idx)}
            onDragEnd={() => { armedRef.current = false; setDragIdx(null); setOverIdx(null); }}
          >
            {!disabled && (
              <span
                className="dui-sortable-handle"
                title="Drag to reorder"
                aria-hidden
                onMouseDown={() => { armedRef.current = true; }}
                onMouseUp={() => { armedRef.current = false; }}
              >
                <DragHandleIcon size={12} />
              </span>
            )}
            {row.node}
          </Row>
        );
      })}
    </>
  );
}
