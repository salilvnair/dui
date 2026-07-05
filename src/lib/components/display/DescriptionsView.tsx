import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface DescriptionItem {
  label: string;
  value: ReactNode;
  /** Number of grid columns this item spans. Default 1. */
  span?: number;
}

export interface DescriptionsViewProps {
  title?: string;
  items: DescriptionItem[];
  columns?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Read-only label/value grid for entity detail views. */
export function DescriptionsView({
  title,
  items,
  columns = 2,
  size,
  color,
  className = '',
  style,
}: DescriptionsViewProps) {
  const base = useDisplayBase(size, { color });

  return (
    <div className={className} style={{ border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, overflow: 'hidden', ...style }}>
      {title && (
        <div style={{ padding: '10px 14px', fontWeight: 700, fontSize: `calc(${base.fontSize} * 1.1)`, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-surface-border)' }}>
          {title}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              gridColumn: item.span ? `span ${item.span}` : undefined,
              padding: '8px 14px', borderTop: i < columns ? 'none' : '1px solid var(--color-surface-border)',
              borderLeft: i % columns !== 0 ? '1px solid var(--color-surface-border)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{item.label}</span>
            <span style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
