import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface IntegrationCardViewProps {
  logo: ReactNode;
  name: string;
  description?: string;
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Logo + name + connect/disconnect card — integrations/marketplace listing. */
export function IntegrationCardView({
  logo,
  name,
  description,
  connected,
  onConnect,
  onDisconnect,
  size,
  color,
  className = '',
  style,
}: IntegrationCardViewProps) {
  const base = useCardBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: base.gap, padding: base.padding, border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, ...style }}>
      <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{logo}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{name}</div>
        {description && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{description}</div>}
      </div>
      <button
        type="button"
        onClick={connected ? onDisconnect : onConnect}
        style={{
          flexShrink: 0, border: connected ? '1px solid var(--color-surface-border)' : `1px solid ${accent}`,
          borderRadius: 6, padding: '5px 12px', fontSize: base.fontSize, fontWeight: 700, cursor: 'pointer',
          background: connected ? 'transparent' : accent, color: connected ? 'var(--color-text-secondary)' : '#fff',
        }}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}
