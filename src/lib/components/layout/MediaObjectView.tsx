import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface MediaObjectViewProps {
  media: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Avatar/icon + content + actions row — media object primitive. */
export function MediaObjectView({
  media,
  children,
  actions,
  size,
  className = '',
  style,
}: MediaObjectViewProps) {
  const base = useLayoutBase(size);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'flex-start', gap: base.gap, ...style }}>
      <div style={{ flexShrink: 0 }}>{media}</div>
      <div style={{ flex: 1, minWidth: 0, fontSize: base.fontSize, color: 'var(--color-text-primary)' }}>{children}</div>
      {actions && <div style={{ flexShrink: 0, display: 'flex', gap: base.gap }}>{actions}</div>}
    </div>
  );
}
