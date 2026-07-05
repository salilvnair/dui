import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';
import { WarningTriangleIcon } from '../../../icons';

export interface MaintenanceBannerViewProps {
  open: boolean;
  window: string;
  onDismiss?: () => void;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Scheduled-downtime notice strip. */
export function MaintenanceBannerView({
  open,
  window: maintenanceWindow,
  onDismiss,
  size,
  className = '',
  style,
}: MaintenanceBannerViewProps) {
  const base = useLayoutBase(size);

  if (!open) return null;

  return (
    <div
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: `8px ${base.padding}`,
        background: 'color-mix(in srgb, var(--color-warning) 12%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--color-warning) 30%, transparent)',
        width: '100%', boxSizing: 'border-box', ...style,
      }}
    >
      <WarningTriangleIcon size={14} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: base.fontSize, color: 'var(--color-text-primary)' }}>
        Scheduled maintenance: <strong>{maintenanceWindow}</strong>. Some features may be unavailable.
      </span>
      {onDismiss && (
        <button type="button" onClick={onDismiss} style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: base.fontSize, cursor: 'pointer', flexShrink: 0 }}>
          Dismiss
        </button>
      )}
    </div>
  );
}
