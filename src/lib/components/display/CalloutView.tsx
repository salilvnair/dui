import type { ReactNode } from 'react';
import { InfoCircleIcon, WarningTriangleIcon, SparkleIcon, XCircleIcon } from '../../../icons';

export type CalloutVariant = 'info' | 'warning' | 'tip' | 'danger';

export interface CalloutViewProps {
  variant?: CalloutVariant;
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const VARIANT_TOKENS: Record<CalloutVariant, { color: string; Icon: typeof InfoCircleIcon }> = {
  info:    { color: 'var(--color-info)',    Icon: InfoCircleIcon },
  warning: { color: 'var(--color-warning)', Icon: WarningTriangleIcon },
  tip:     { color: 'var(--color-success)', Icon: SparkleIcon },
  danger:  { color: 'var(--color-error)',   Icon: XCircleIcon },
};

export function CalloutView({ variant = 'info', title, children, className = '', style }: CalloutViewProps) {
  const { color, Icon } = VARIANT_TOKENS[variant];
  return (
    <div
      className={className}
      style={{
        borderRadius: '12px',
        border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
        padding: '14px 16px',
        margin: '16px 0',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '13px', marginBottom: 4, color }}>
        <Icon size={15} />
        {title}
      </div>
      <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
        {children}
      </div>
    </div>
  );
}
