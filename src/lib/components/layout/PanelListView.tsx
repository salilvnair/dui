import { useState, useMemo, type CSSProperties, type ReactNode } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';
import { SearchInputView } from '../input/SearchInputView';

export interface PanelListItem {
  value: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface PanelListTab {
  id: string;
  label: string;
}

export interface PanelListViewProps {
  heading: string;
  items: PanelListItem[];
  tabs?: PanelListTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  searchable?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Heading + tabs + filterable block list — panel primitive. */
export function PanelListView({
  heading,
  items,
  tabs,
  activeTab,
  onTabChange,
  searchable = true,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: PanelListViewProps) {
  const base = useLayoutBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter(i => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  return (
    <div className={className} style={{ border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, overflow: 'hidden', ...style }}>
      <div style={{ padding: '10px 14px', fontWeight: 700, fontSize: `calc(${base.fontSize} * 1.15)`, color: 'var(--color-text-primary)', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-surface-border)' }}>
        {heading}
      </div>
      {tabs && tabs.length > 0 && (
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-surface-border)' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange?.(t.id)}
              style={{
                flex: 1, padding: '8px 0', border: 'none', background: 'transparent',
                fontSize: base.fontSize, fontWeight: t.id === activeTab ? 700 : 500,
                color: t.id === activeTab ? accent : 'var(--color-text-muted)',
                borderBottom: t.id === activeTab ? `2px solid ${accent}` : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      {searchable && (
        <div style={{ padding: 8, borderBottom: '1px solid var(--color-surface-border)' }}>
          <SearchInputView value={query} onChange={setQuery} placeholder="Filter…" size={size} style={{ width: '100%' }} />
        </div>
      )}
      <div>
        {filtered.map(item => (
          <button
            key={item.value}
            type="button"
            onClick={item.onClick}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left',
              padding: '8px 14px', border: 'none', borderBottom: '1px solid var(--color-surface-border)',
              background: item.active ? `color-mix(in srgb, ${accent} 10%, transparent)` : 'transparent',
              fontSize: base.fontSize, fontWeight: item.active ? 700 : 500,
              color: item.active ? accent : 'var(--color-text-secondary)', cursor: 'pointer',
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 16, textAlign: 'center', fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>No matches</div>
        )}
      </div>
    </div>
  );
}
