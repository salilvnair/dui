import { useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import { ChevronRightIcon, CheckIcon } from '../../../icons';

export interface TreeSelectNode {
  id: string;
  label: string;
  children?: TreeSelectNode[];
}

export interface TreeSelectViewProps {
  nodes: TreeSelectNode[];
  /** Checked node ids. */
  value: string[];
  onChange: (value: string[]) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function collectIds(node: TreeSelectNode): string[] {
  return [node.id, ...(node.children?.flatMap(collectIds) ?? [])];
}

function Node({ node, checked, onToggle, base, accent, depth }: {
  node: TreeSelectNode; checked: Set<string>; onToggle: (ids: string[], next: boolean) => void;
  base: ReturnType<typeof useSelectBase>; accent: string; depth: number;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const ids = collectIds(node);
  const allChecked = ids.every(id => checked.has(id));
  const someChecked = !allChecked && ids.some(id => checked.has(id));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: depth * 18, height: 26 }}>
        {node.children && node.children.length > 0 ? (
          <button type="button" onClick={() => setExpanded(e => !e)} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 2 }}>
            <ChevronRightIcon size={11} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 120ms' }} />
          </button>
        ) : <span style={{ width: 15 }} />}
        <button
          type="button"
          onClick={() => onToggle(ids, !allChecked)}
          style={{
            width: 15, height: 15, borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: allChecked || someChecked ? 'none' : '1.5px solid var(--color-surface-border)',
            background: allChecked ? accent : someChecked ? `color-mix(in srgb, ${accent} 40%, transparent)` : 'transparent', cursor: 'pointer',
          }}
        >
          {allChecked && <CheckIcon size={10} style={{ color: '#fff' }} />}
        </button>
        <span style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', cursor: 'pointer' }} onClick={() => onToggle(ids, !allChecked)}>{node.label}</span>
      </div>
      {expanded && node.children?.map(child => (
        <Node key={child.id} node={child} checked={checked} onToggle={onToggle} base={base} accent={accent} depth={depth + 1} />
      ))}
    </div>
  );
}

/** Checkbox-driven hierarchical select — tri-state parent checkboxes over a folder-style tree. */
export function TreeSelectView({
  nodes,
  value,
  onChange,
  size,
  color,
  className = '',
  style,
}: TreeSelectViewProps) {
  const base = useSelectBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const checked = new Set(value);

  const handleToggle = (ids: string[], next: boolean) => {
    const set = new Set(value);
    for (const id of ids) { if (next) set.add(id); else set.delete(id); }
    onChange(Array.from(set));
  };

  return (
    <div className={className} style={style}>
      {nodes.map(node => <Node key={node.id} node={node} checked={checked} onToggle={handleToggle} base={base} accent={accent} depth={0} />)}
    </div>
  );
}
