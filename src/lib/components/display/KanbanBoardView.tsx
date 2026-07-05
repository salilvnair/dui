import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
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

/** Draggable columns + cards board, native HTML5 drag-and-drop. */
export function KanbanBoardView({
  columns,
  onChange,
  size,
  className = '',
  style,
}: KanbanBoardViewProps) {
  const base = useCardBase(size);
  const [dragCard, setDragCard] = useState<{ colId: string; cardId: string } | null>(null);

  const moveCard = (toColId: string, toIndex: number) => {
    if (!dragCard) return;
    const next = columns.map(c => ({ ...c, cards: [...c.cards] }));
    const fromCol = next.find(c => c.id === dragCard.colId)!;
    const cardIdx = fromCol.cards.findIndex(c => c.id === dragCard.cardId);
    if (cardIdx < 0) return;
    const [card] = fromCol.cards.splice(cardIdx, 1);
    const toCol = next.find(c => c.id === toColId)!;
    toCol.cards.splice(toIndex, 0, card);
    onChange(next);
    setDragCard({ colId: toColId, cardId: card.id });
  };

  return (
    <div className={`dui_kanban ${className}`} style={{ display: 'flex', gap: base.gap, overflowX: 'auto', ...style }}>
      {columns.map(col => (
        <div
          key={col.id}
          className="dui_kanban__column"
          onDragOver={e => e.preventDefault()}
          onDrop={() => moveCard(col.id, col.cards.length)}
        >
          <div className="dui_kanban__columnhead" style={{ borderTopColor: col.color ?? 'var(--color-primary)' }}>
            <span style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{col.title}</span>
            <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{col.cards.length}</span>
          </div>
          <div className="dui_kanban__cards">
            {col.cards.map((card, i) => (
              <div
                key={card.id}
                draggable
                className="dui_kanban__card"
                onDragStart={() => setDragCard({ colId: col.id, cardId: card.id })}
                onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={e => { e.stopPropagation(); moveCard(col.id, i); }}
                style={{ fontSize: base.fontSize }}
              >
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{card.title}</div>
                {card.content && <div style={{ color: 'var(--color-text-muted)', marginTop: 4 }}>{card.content}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
