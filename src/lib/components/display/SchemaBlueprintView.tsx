import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './SchemaBlueprintView.css';

export interface SchemaBlueprintField {
  name: string;
  type: string;
}

export interface SchemaBlueprintNode {
  id: string;
  title: string;
  fields: SchemaBlueprintField[];
  /** IDs of nodes this one references (e.g. a foreign object/ref field). */
  connectsTo?: string[];
}

export interface SchemaBlueprintViewProps {
  nodes: SchemaBlueprintNode[];
  width?: number;
  height?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const NODE_W = 160;

/** JSON Schema / OpenAPI spec rendered as a literal architectural blueprint — graph-paper + dashed right-angle connectors. */
export function SchemaBlueprintView({
  nodes,
  width = 560,
  height = 320,
  size,
  className = '',
  style,
}: SchemaBlueprintViewProps) {
  const base = useDisplayBase(size);
  const cols = Math.max(1, Math.floor(width / (NODE_W + 40)));
  const positions = new Map<string, { x: number; y: number; h: number }>();
  let x = 24, y = 24, rowH = 0, col = 0;
  nodes.forEach(node => {
    const h = 28 + node.fields.length * 18;
    positions.set(node.id, { x, y, h });
    rowH = Math.max(rowH, h);
    col++;
    if (col >= cols) { col = 0; x = 24; y += rowH + 40; rowH = 0; }
    else x += NODE_W + 40;
  });

  return (
    <div className={`dui_blueprint ${className}`} style={{ width, height, borderRadius: 8, padding: 8, position: 'relative', overflow: 'auto', ...style }}>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {nodes.flatMap(node => (node.connectsTo ?? []).map(targetId => {
          const from = positions.get(node.id);
          const to = positions.get(targetId);
          if (!from || !to) return null;
          const x1 = from.x + NODE_W, y1 = from.y + from.h / 2;
          const x2 = to.x, y2 = to.y + to.h / 2;
          const midX = (x1 + x2) / 2;
          return (
            <path key={`${node.id}-${targetId}`} className="dui_blueprint__connector" d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`} />
          );
        }))}
      </svg>
      {nodes.map(node => {
        const pos = positions.get(node.id)!;
        return (
          <div key={node.id} className="dui_blueprint__node" style={{ position: 'absolute', left: pos.x, top: pos.y, width: NODE_W, borderRadius: 4, fontSize: base.fontSize }}>
            <div style={{ padding: '4px 8px', borderBottom: '1px dashed #4a9fd8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 10 }}>{node.title}</div>
            <div style={{ padding: '4px 8px' }}>
              {node.fields.map(f => (
                <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '1px 0' }}>
                  <span>{f.name}</span>
                  <span style={{ opacity: 0.7 }}>{f.type}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
