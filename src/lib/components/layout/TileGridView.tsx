import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface TileNode {
  /** Leaf content — mutually exclusive with `children`. */
  content?: ReactNode;
  /** Nested tiles — renders this node as a sub-grid ("parent" wrapping an "ancestor"). */
  children?: TileNode[];
  /** Stack this node's children vertically instead of horizontally. */
  vertical?: boolean;
  /** Flex-grow weight relative to siblings. Default 1. */
  weight?: number;
}

export interface TileGridViewProps {
  nodes: TileNode[];
  vertical?: boolean;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

function Ancestor({ nodes, vertical, gap }: { nodes: TileNode[]; vertical?: boolean; gap: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap, width: '100%' }}>
      {nodes.map((node, i) => (
        <div key={i} style={{ flex: node.weight ?? 1, minWidth: 0, display: 'flex' }}>
          {node.children
            ? <Ancestor nodes={node.children} vertical={node.vertical} gap={gap} />
            : <div style={{ flex: 1, minWidth: 0 }}>{node.content}</div>}
        </div>
      ))}
    </div>
  );
}

/** Nested ancestor/parent/child tile grid — tile primitive. */
export function TileGridView({
  nodes,
  vertical = false,
  size,
  className = '',
  style,
}: TileGridViewProps) {
  const base = useLayoutBase(size);
  return (
    <div className={className} style={style}>
      <Ancestor nodes={nodes} vertical={vertical} gap={base.gap} />
    </div>
  );
}
