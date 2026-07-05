import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import { BellIcon } from '../../../icons';

export interface EmptyInboxViewProps {
  title?: string;
  message?: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Zero-notifications empty state — pre-styled variant of the general EmptyStateView shape. */
export function EmptyInboxView({
  title = "You're all caught up",
  message = 'No new notifications right now.',
  size,
  className = '',
  style,
}: EmptyInboxViewProps) {
  const base = useDisplayBase(size);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 32, gap: 8, ...style }}>
      <span style={{ width: 44, height: 44, borderRadius: '999px', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        <BellIcon size={20} />
      </span>
      <div style={{ fontSize: `calc(${base.fontSize} * 1.1)`, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</div>
      <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{message}</div>
    </div>
  );
}
