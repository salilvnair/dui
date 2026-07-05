import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface UndoRedoNode {
  id: string;
  label: string;
  /** Parent node id — omit for the root. */
  parentId?: string;
}

export interface UndoRedoTimelineViewProps {
  nodes: UndoRedoNode[];
  activeId: string;
  onSelect: (id: string) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** History rendered as a branching git-log graph — jump to any node, diverging edits show as visible branches. */
export function UndoRedoTimelineView({
  nodes,
  activeId,
  onSelect,
  size,
  color,
  className = '',
  style,
}: UndoRedoTimelineViewProps) {
  const base = useDisplayBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  const lanes = new Map<string, number>();
  let laneCount = 0;
  nodes.forEach(node => {
    if (!node.parentId) { lanes.set(node.id, laneCount++); return; }
    const childrenOfParent = nodes.filter(n => n.parentId === node.parentId);
    const idx = childrenOfParent.indexOf(node);
    lanes.set(node.id, idx === 0 ? (lanes.get(node.parentId) ?? 0) : laneCount++);
  });

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 2, ...style }}>
      {nodes.map(node => {
        const lane = lanes.get(node.id) ?? 0;
        const active = node.id === activeId;
        return (
          <div key={node.id} onClick={() => onSelect(node.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', paddingLeft: lane * 16 }}>
            <span style={{
              width: 10, height: 10, borderRadius: '999px', flexShrink: 0,
              background: active ? accent : 'var(--color-surface-border)',
              border: active ? `2px solid ${accent}` : '2px solid var(--color-surface-border)',
              boxSizing: 'content-box',
            }} />
            <span style={{ fontSize: base.fontSize, color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)', fontWeight: active ? 700 : 400 }}>
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
