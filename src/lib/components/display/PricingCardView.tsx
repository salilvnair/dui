import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { CheckIcon } from '../../../icons';

export interface PricingCardViewProps {
  planName: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  actions?: ReactNode;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Plan comparison card with a "popular" ribbon. */
export function PricingCardView({
  planName,
  price,
  period = '/mo',
  features,
  popular = false,
  actions,
  size,
  color,
  className = '',
  style,
}: PricingCardViewProps) {
  const base = useCardBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <div
      className={className}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, padding: base.padding,
        minWidth: 240,
        border: `1.5px solid ${popular ? accent : 'var(--color-surface-border)'}`, borderRadius: base.borderRadius,
        background: popular ? `color-mix(in srgb, ${accent} 4%, var(--color-surface))` : 'var(--color-surface)',
        ...style,
      }}
    >
      {popular && (
        <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: accent, color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 10px', borderRadius: 999, textTransform: 'uppercase' }}>
          Popular
        </span>
      )}
      <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{planName}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: `calc(${base.fontSize} * 2.2)`, fontWeight: 800, color: 'var(--color-text-primary)' }}>{price}</span>
        <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{period}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckIcon size={13} style={{ color: accent, flexShrink: 0 }} />
            <span style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)' }}>{f}</span>
          </div>
        ))}
      </div>
      {actions && <div style={{ marginTop: 4 }}>{actions}</div>}
    </div>
  );
}
