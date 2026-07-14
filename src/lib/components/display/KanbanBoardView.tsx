import { useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { DragHandleIcon } from '../../../icons';
import './KanbanBoardView.css';

export interface KanbanCard {
  id: string;
  title: string;
  content?: ReactNode;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
}

export interface KanbanBoardViewProps {
  columns: KanbanColumn[];
  onChange: (columns: KanbanColumn[]) => void;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/**
 * Draggable columns + cards board. Both cards and column headers drag
 * exclusively from a dedicated handle (same "armed" pattern as
 * SortableView) so buttons/links inside a card's custom content keep
 * working — dragging from anywhere else on the card just clicks through.
 */
export function KanbanBoardView({
  columns,
  onChange,
  size,
  className = '',
  style,
}: KanbanBoardViewProps) {
  const base = useCardBase(size);
  const [dragCard, setDragCard] = useState<{ colId: string; cardId: string } | null>(null);
  const [overCard, setOverCard] = useState<{ colId: string; index: number } | null>(null);
  const [dragColId, setDragColId] = useState<string | null>(null);
  const [overColId, setOverColId] = useState<string | null>(null);
  const cardArmedRef = useRef(false);
  const colArmedRef = useRef(false);

  const moveCard = (toColId: string, toIndex: number) => {
    if (!dragCard) return;
    const next = columns.map(c => ({ ...c, cards: [...c.cards] }));
    const fromCol = next.find(c => c.id === dragCard.colId)!;
    const cardIdx = fromCol.cards.findIndex(c => c.id === dragCard.cardId);
    if (cardIdx < 0) return;
    const [card] = fromCol.cards.splice(cardIdx, 1);
    const toCol = next.find(c => c.id === toColId)!;
    const clampedIdx = Math.min(toIndex, toCol.cards.length);
    toCol.cards.splice(clampedIdx, 0, card);
    onChange(next);
  };

  const moveColumn = (toIndex: number) => {
    if (!dragColId) return;
    const fromIdx = columns.findIndex(c => c.id === dragColId);
    if (fromIdx < 0 || fromIdx === toIndex) return;
    const next = [...columns];
    const [col] = next.splice(fromIdx, 1);
    next.splice(toIndex, 0, col);
    onChange(next);
  };

  return (
    <div className={`dui_kanban ${className}`} style={{ display: 'flex', gap: base.gap, overflowX: 'auto', ...style }}>
      {columns.map((col, colIdx) => (
        <div
          key={col.id}
          className={`dui_kanban__column${dragColId === col.id ? ' is-dragging' : ''}${overColId === col.id && dragColId != null && dragColId !== col.id ? ' is-over' : ''}`}
          draggable
          onDragStart={(e: DragEvent) => {
            if (!colArmedRef.current) { e.preventDefault(); return; }
            e.stopPropagation();
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', col.id);
            setDragColId(col.id);
          }}
          onDragOver={(e: DragEvent) => {
            e.preventDefault();
            if (dragColId) setOverColId(col.id);
          }}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            if (dragColId) {
              moveColumn(colIdx);
              setDragColId(null);
              setOverColId(null);
              return;
            }
            moveCard(col.id, col.cards.length);
            setDragCard(null);
            setOverCard(null);
          }}
          onDragEnd={() => { colArmedRef.current = false; setDragColId(null); setOverColId(null); }}
        >
          <div className="dui_kanban__columnhead" style={{ borderTopColor: col.color ?? 'var(--color-primary)' }}>
            <span
              className="dui_kanban__handle"
              title="Drag to reorder column"
              aria-hidden
              onMouseDown={() => { colArmedRef.current = true; }}
              onMouseUp={() => { colArmedRef.current = false; }}
            >
              <DragHandleIcon size={12} />
            </span>
            <span style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)', flex: 1 }}>{col.title}</span>
            <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{col.cards.length}</span>
          </div>
          <div className="dui_kanban__cards">
            {col.cards.map((card, i) => (
              <div
                key={card.id}
                draggable
                className={`dui_kanban__card${dragCard?.cardId === card.id ? ' is-dragging' : ''}${overCard?.colId === col.id && overCard.index === i && dragCard?.cardId !== card.id ? ' is-over' : ''}`}
                onDragStart={(e: DragEvent) => {
                  if (!cardArmedRef.current) { e.preventDefault(); return; }
                  e.stopPropagation();
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/plain', card.id);
                  setDragCard({ colId: col.id, cardId: card.id });
                }}
                onDragOver={(e: DragEvent) => {
                  if (!dragCard) return;
                  e.preventDefault();
                  e.stopPropagation();
                  setOverCard({ colId: col.id, index: i });
                }}
                onDrop={(e: DragEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  moveCard(col.id, i);
                  setDragCard(null);
                  setOverCard(null);
                }}
                onDragEnd={() => { cardArmedRef.current = false; setDragCard(null); setOverCard(null); }}
                style={{ fontSize: base.fontSize }}
              >
                <span
                  className="dui_kanban__card-handle"
                  title="Drag to move"
                  aria-hidden
                  onMouseDown={() => { cardArmedRef.current = true; }}
                  onMouseUp={() => { cardArmedRef.current = false; }}
                >
                  <DragHandleIcon size={11} />
                </span>
                <div className="dui_kanban__card-body">
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{card.title}</div>
                  {card.content && <div style={{ color: 'var(--color-text-muted)', marginTop: 4 }}>{card.content}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
