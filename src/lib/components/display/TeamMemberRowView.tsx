import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { TrashIcon } from '../../../icons';

export interface TeamMemberRowViewProps {
  name: string;
  role: string;
  avatar?: ReactNode;
  onRemove?: () => void;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Avatar + name + role + remove-action row — team management list item. */
export function TeamMemberRowView({
  name,
  role,
  avatar,
  onRemove,
  size,
  className = '',
  style,
}: TeamMemberRowViewProps) {
  const base = useCardBase(size);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: base.gap, padding: base.padding, ...style }}>
      {avatar ?? <span style={{ width: 32, height: 32, borderRadius: '999px', background: 'var(--color-surface-border)', flexShrink: 0 }} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{name}</div>
        <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{role}</div>
      </div>
      {onRemove && (
        <button type="button" onClick={onRemove} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', flexShrink: 0 }} aria-label="Remove">
          <TrashIcon size={14} />
        </button>
      )}
    </div>
  );
}
