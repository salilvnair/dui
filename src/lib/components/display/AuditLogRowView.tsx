import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';

export interface AuditLogRowViewProps {
  timestamp: string;
  actor: string;
  actorAvatar?: ReactNode;
  action: string;
  target: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Timestamped actor+action+target log row — audit trail primitive. */
export function AuditLogRowView({
  timestamp,
  actor,
  actorAvatar,
  action,
  target,
  size,
  className = '',
  style,
}: AuditLogRowViewProps) {
  const base = useTableBase(size);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: `8px ${base.paddingX}`, borderBottom: '1px solid var(--color-surface-border)', ...style }}>
      <span style={{ fontSize: base.cellFontSize, color: 'var(--color-text-muted)', flexShrink: 0, width: 130, fontFamily: 'ui-monospace, monospace' }}>{timestamp}</span>
      {actorAvatar && <span style={{ flexShrink: 0 }}>{actorAvatar}</span>}
      <span style={{ fontSize: base.cellFontSize, fontWeight: 700, color: 'var(--color-text-primary)', flexShrink: 0 }}>{actor}</span>
      <span style={{ fontSize: base.cellFontSize, color: 'var(--color-text-secondary)' }}>{action}</span>
      <span style={{ fontSize: base.cellFontSize, fontWeight: 600, color: 'var(--color-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{target}</span>
    </div>
  );
}
