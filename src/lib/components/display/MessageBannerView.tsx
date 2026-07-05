import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import { CheckCircleIcon, WarningTriangleIcon, InfoCircleIcon, CloseIcon } from '../../../icons';

export type MessageBannerVariant = 'success' | 'error' | 'info' | 'warning';

export interface MessageBannerViewProps {
  variant?: MessageBannerVariant;
  children: ReactNode;
  onDismiss?: () => void;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const VARIANT: Record<MessageBannerVariant, { color: string; icon: ReactNode }> = {
  success: { color: 'var(--color-success)', icon: <CheckCircleIcon size={14} /> },
  error: { color: 'var(--color-error)', icon: <CloseIcon size={14} /> },
  warning: { color: 'var(--color-warning)', icon: <WarningTriangleIcon size={14} /> },
  info: { color: 'var(--color-info)', icon: <InfoCircleIcon size={14} /> },
};

/** Inline success/error/info/warning message strip. Form-adjacent, distinct from the page-level `CalloutView`/dismissible `BannerView`. */
export function MessageBannerView({
  variant = 'info',
  children,
  onDismiss,
  size,
  className = '',
  style,
}: MessageBannerViewProps) {
  const base = useDisplayBase(size);
  const cfg = VARIANT[variant];

  return (
    <div
      className={className}
      role="status"
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
        borderRadius: base.borderRadius, borderLeft: `3px solid ${cfg.color}`,
        background: `color-mix(in srgb, ${cfg.color} 8%, transparent)`,
        ...style,
      }}
    >
      <span style={{ display: 'flex', color: cfg.color, flexShrink: 0 }}>{cfg.icon}</span>
      <span style={{ flex: 1, fontSize: base.fontSize, color: 'var(--color-text-primary)' }}>{children}</span>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', flexShrink: 0 }}>
          <CloseIcon size={11} />
        </button>
      )}
    </div>
  );
}
