import { useState } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useNavBase } from '../../core/NavBase';
import { ChevronRightIcon, MoreHorizontalIcon } from '../../../icons';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbViewProps {
  items: BreadcrumbItem[];
  /** Collapse the middle into a "…" when there are more than this many items. Default 4. */
  maxVisible?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
}

export function BreadcrumbView({
  items,
  maxVisible = 4,
  size,
  color,
  className = '',
}: BreadcrumbViewProps) {
  const base = useNavBase(size, { activeColor: color });
  const accent = base.activeColor ?? 'var(--color-primary)';
  const [expanded, setExpanded] = useState(false);

  const shouldCollapse = !expanded && items.length > maxVisible;
  const visible = shouldCollapse
    ? [items[0], { label: '…', onClick: undefined, collapse: true } as BreadcrumbItem & { collapse?: boolean }, ...items.slice(items.length - (maxVisible - 2))]
    : items;

  return (
    <nav className={className} aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, fontSize: base.fontSize }}>
      {visible.map((item, i) => {
        const isLast = i === visible.length - 1;
        const isCollapse = (item as { collapse?: boolean }).collapse;
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {isCollapse ? (
              <button type="button" onClick={() => setExpanded(true)} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 2 }} aria-label="Show all">
                <MoreHorizontalIcon size={13} />
              </button>
            ) : item.onClick && !isLast ? (
              <button type="button" onClick={item.onClick} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: base.fontSize, fontWeight: 500, padding: 0 }}>
                {item.label}
              </button>
            ) : (
              <span style={{ color: isLast ? accent : 'var(--color-text-muted)', fontWeight: isLast ? 700 : 500 }}>{item.label}</span>
            )}
            {!isLast && <ChevronRightIcon size={11} style={{ color: 'var(--color-text-muted)', opacity: 0.5, flexShrink: 0 }} />}
          </span>
        );
      })}
    </nav>
  );
}
