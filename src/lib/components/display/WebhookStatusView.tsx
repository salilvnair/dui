import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';
import { RefreshIcon } from '../../../icons';

export type WebhookHealth = 'healthy' | 'failing' | 'disabled';

export interface WebhookStatusViewProps {
  url: string;
  health: WebhookHealth;
  lastDelivery?: string;
  statusCode?: number;
  onRetry?: () => void;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const HEALTH_COLOR: Record<WebhookHealth, string> = {
  healthy: 'var(--color-success)',
  failing: 'var(--color-error)',
  disabled: 'var(--color-text-muted)',
};

/** Webhook endpoint health row — last delivery, status code, retry action. */
export function WebhookStatusView({
  url,
  health,
  lastDelivery,
  statusCode,
  onRetry,
  size,
  className = '',
  style,
}: WebhookStatusViewProps) {
  const base = useTableBase(size);
  const color = HEALTH_COLOR[health];

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: `8px ${base.paddingX}`, border: '1px solid var(--color-surface-border)', borderRadius: 8, ...style }}>
      <span style={{ width: 8, height: 8, borderRadius: '999px', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: base.cellFontSize, fontFamily: 'ui-monospace, monospace', color: 'var(--color-text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
      {statusCode !== undefined && <span style={{ fontSize: base.cellFontSize, fontWeight: 700, color }}>{statusCode}</span>}
      {lastDelivery && <span style={{ fontSize: base.cellFontSize, color: 'var(--color-text-muted)', flexShrink: 0 }}>{lastDelivery}</span>}
      {onRetry && (
        <button type="button" onClick={onRetry} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', flexShrink: 0 }} aria-label="Retry">
          <RefreshIcon size={13} />
        </button>
      )}
    </div>
  );
}
