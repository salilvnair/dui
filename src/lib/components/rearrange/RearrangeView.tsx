import { useState, type CSSProperties, type DragEvent } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { CheckboxView } from '../input/CheckboxView';
import './RearrangeView.css';

export interface RearrangeItem {
  /** Stable unique id. */
  id: string;
  /** Visible label (or pass `render` for custom content). */
  label?: string;
  /** Enabled state — shows a checkbox when `selectable` is on. */
  enabled?: boolean;
  /** Optional leading glyph / emoji. */
  icon?: string;
  /** Optional custom row content (overrides label). */
  render?: () => React.ReactNode;
  /** Lock this row from being reordered or toggled. */
  locked?: boolean;
}

export interface RearrangeViewProps {
  items: RearrangeItem[];
  /** Fired with the new ordered/toggled list on any change. */
  onChange: (items: RearrangeItem[]) => void;
  /** Show an enable/disable checkbox per row. Default: true. */
  selectable?: boolean;
  /** Accent color (CSS var or value) for the active drop indicator + checkbox. */
  accentColor?: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/**
 * RearrangeView — a drag-to-reorder list with an optional enable/disable checkbox
 * per row. Theme-aware (DUI CSS variables). Reordering uses native HTML5 drag and
 * drop with a live drop indicator; the checkbox uses DUI's CheckboxView.
 */
export function RearrangeView({
  items,
  onChange,
  selectable = true,
  accentColor = 'var(--dui-accent, var(--color-accent, #6366f1))',
  size = 'md',
  className = '',
  style,
}: RearrangeViewProps) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const move = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const from = items.findIndex((i) => i.id === fromId);
    const to = items.findIndex((i) => i.id === toId);
    if (from < 0 || to < 0) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const onDrop = (e: DragEvent, toId: string) => {
    e.preventDefault();
    if (dragId) move(dragId, toId);
    setDragId(null);
    setOverId(null);
  };

  return (
    <div
      className={`dui-rearrange dui-rearrange--${size} ${className}`}
      style={{ ['--dui-rearrange-accent' as string]: accentColor, ...style }}
    >
      {items.map((item) => {
        const dragging = dragId === item.id;
        const over = overId === item.id && dragId !== item.id;
        return (
          <div
            key={item.id}
            className={`dui-rearrange-row${dragging ? ' is-dragging' : ''}${over ? ' is-over' : ''}${item.enabled === false ? ' is-disabled' : ''}${item.locked ? ' is-locked' : ''}`}
            draggable={!item.locked}
            onDragStart={() => !item.locked && setDragId(item.id)}
            onDragOver={(e) => { e.preventDefault(); setOverId(item.id); }}
            onDrop={(e) => onDrop(e, item.id)}
            onDragEnd={() => { setDragId(null); setOverId(null); }}
          >
            <span className="dui-rearrange-handle" aria-hidden title={item.locked ? 'Locked' : 'Drag to reorder'}>
              {item.locked ? '🔒' : '⠿'}
            </span>

            {selectable && (
              <CheckboxView
                checked={item.enabled !== false}
                disabled={item.locked}
                size={size}
                onChange={(checked) => onChange(items.map((i) => (i.id === item.id ? { ...i, enabled: checked } : i)))}
              />
            )}

            <div className="dui-rearrange-body">
              {item.render
                ? item.render()
                : (<>{item.icon && <span className="dui-rearrange-icon">{item.icon}</span>}<span className="dui-rearrange-label">{item.label ?? item.id}</span></>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
