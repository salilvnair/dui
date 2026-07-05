import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface ListViewItem {
  id: string;
  avatar?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  onClick?: () => void;
}

export interface ListViewProps {
  items: ListViewItem[];
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Generic avatar/title/subtitle/action list primitive. */
export function ListView({
  items,
  size,
  color,
  className = '',
  style,
}: ListViewProps) {
  const base = useCardBase(size, { color });

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {items.map((item, i) => {
        const Tag = item.onClick ? 'button' : 'div';
        return (
          <Tag
            key={item.id}
            type={item.onClick ? 'button' : undefined}
            onClick={item.onClick}
            style={{
              display: 'flex', alignItems: 'center', gap: base.gap, width: '100%', textAlign: 'left',
              padding: base.padding, border: 'none', background: 'transparent',
              borderTop: i > 0 ? '1px solid var(--color-surface-border)' : 'none',
              cursor: item.onClick ? 'pointer' : 'default', fontFamily: 'inherit',
            }}
          >
            {item.avatar && <span style={{ flexShrink: 0, display: 'flex' }}>{item.avatar}</span>}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: base.fontSize, fontWeight: 600, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
              {item.subtitle && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginTop: 1 }}>{item.subtitle}</div>}
            </div>
            {item.actions && <div style={{ flexShrink: 0, display: 'flex', gap: 6 }}>{item.actions}</div>}
          </Tag>
        );
      })}
    </div>
  );
}
