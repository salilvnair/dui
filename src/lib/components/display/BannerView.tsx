import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';
import { CloseIcon, InfoCircleIcon } from '../../../icons';

export type BannerVariant = 'info' | 'success' | 'warning' | 'danger';

export interface BannerViewProps {
  open: boolean;
  message: ReactNode;
  variant?: BannerVariant;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  className?: string;
  style?: CSSProperties;
}

const VARIANT_COLOR: Record<BannerVariant, string> = {
  info: 'var(--color-info)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-error)',
};

export function BannerView({
  open,
  message,
  variant = 'info',
  onDismiss,
  actionLabel,
  onAction,
  icon,
  size,
  borderRadius,
  className = '',
  style,
}: BannerViewProps) {
  const base = useFeedbackBase(size, { borderRadius });
  const accent = VARIANT_COLOR[variant];

  if (!open) return null;

  return (
    <div
      className={className}
      role="status"
      style={{
        display: 'flex', alignItems: 'center', gap: base.gap,
        padding: `10px ${base.paddingX}`,
        borderRadius: base.borderRadius,
        background: `color-mix(in srgb, ${accent} 10%, var(--color-surface))`,
        border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
        width: '100%', boxSizing: 'border-box',
        ...style,
      }}
    >
      <span style={{ display: 'flex', color: accent, flexShrink: 0 }}>{icon ?? <InfoCircleIcon size={16} />}</span>
      <span style={{ flex: 1, fontSize: base.fontSize, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{message}</span>
      {actionLabel && (
        <button type="button" onClick={onAction} style={{ border: 'none', background: 'transparent', color: accent, fontWeight: 700, fontSize: base.fontSize, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
          {actionLabel}
        </button>
      )}
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', flexShrink: 0, padding: 2 }}>
          <CloseIcon size={13} />
        </button>
      )}
    </div>
  );
}
