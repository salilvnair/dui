import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';

export type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface StatusPageRowViewProps {
  service: string;
  status: ServiceStatus;
  uptime: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const STATUS_CONFIG: Record<ServiceStatus, { label: string; color: string }> = {
  operational: { label: 'Operational', color: 'var(--color-success)' },
  degraded: { label: 'Degraded', color: 'var(--color-warning)' },
  outage: { label: 'Outage', color: 'var(--color-error)' },
  maintenance: { label: 'Maintenance', color: 'var(--color-info)' },
};

/** Service + uptime% + status-dot row — status page primitive. */
export function StatusPageRowView({
  service,
  status,
  uptime,
  size,
  className = '',
  style,
}: StatusPageRowViewProps) {
  const base = useTableBase(size);
  const cfg = STATUS_CONFIG[status];

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: `8px ${base.paddingX}`, borderBottom: '1px solid var(--color-surface-border)', ...style }}>
      <span style={{ width: 8, height: 8, borderRadius: '999px', background: cfg.color, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: base.cellFontSize, fontWeight: 600, color: 'var(--color-text-primary)' }}>{service}</span>
      <span style={{ fontSize: base.cellFontSize, color: 'var(--color-text-muted)' }}>{uptime.toFixed(2)}% uptime</span>
      <span style={{ fontSize: base.cellFontSize, fontWeight: 700, color: cfg.color, minWidth: 90, textAlign: 'right' }}>{cfg.label}</span>
    </div>
  );
}
