import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface KeyValueListEntry {
  key: string;
  value: ReactNode;
}

export interface KeyValueListViewProps {
  entries: KeyValueListEntry[];
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Lightweight label:value stacked list — no edit, no toolbar. Distinct from `KeyValueTableView`. */
export function KeyValueListView({
  entries,
  size,
  className = '',
  style,
}: KeyValueListViewProps) {
  const base = useDisplayBase(size);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {entries.map((e, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: base.fontSize }}>
          <span style={{ color: 'var(--color-text-muted)' }}>{e.key}</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500, textAlign: 'right' }}>{e.value}</span>
        </div>
      ))}
    </div>
  );
}
