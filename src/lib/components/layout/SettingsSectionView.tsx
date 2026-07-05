import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface SettingsSectionViewProps {
  title: string;
  description?: string;
  children: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Grouped settings card with a header — pairs with `SettingsRowView`. */
export function SettingsSectionView({
  title,
  description,
  children,
  size,
  className = '',
  style,
}: SettingsSectionViewProps) {
  const base = useLayoutBase(size);

  return (
    <div className={className} style={{ border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, overflow: 'hidden', ...style }}>
      <div style={{ padding: `10px ${base.padding}`, borderBottom: '1px solid var(--color-surface-border)' }}>
        <div style={{ fontSize: `calc(${base.fontSize} * 1.1)`, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</div>
        {description && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginTop: 2 }}>{description}</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} style={{ borderTop: i > 0 ? '1px solid var(--color-surface-border)' : 'none' }}>{child}</div>
            ))
          : children}
      </div>
    </div>
  );
}
