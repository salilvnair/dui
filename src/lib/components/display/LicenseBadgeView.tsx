import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';

export type LicenseTier = 'free' | 'pro' | 'enterprise';

export interface LicenseBadgeViewProps {
  tier: LicenseTier;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const TIER_CONFIG: Record<LicenseTier, { label: string; color: string }> = {
  free: { label: 'Free', color: 'var(--color-text-muted)' },
  pro: { label: 'Pro', color: 'var(--color-primary)' },
  enterprise: { label: 'Enterprise', color: '#a855f7' },
};

/** Plan/tier ribbon badge — Free / Pro / Enterprise. */
export function LicenseBadgeView({
  tier,
  size,
  className = '',
  style,
}: LicenseBadgeViewProps) {
  const base = useChipBase(size);
  const cfg = TIER_CONFIG[tier];

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', height: base.height,
        paddingLeft: base.paddingX, paddingRight: base.paddingX, borderRadius: base.borderRadius,
        background: tier === 'free' ? 'var(--color-surface)' : `linear-gradient(135deg, ${cfg.color}, color-mix(in srgb, ${cfg.color} 60%, white))`,
        border: tier === 'free' ? '1px solid var(--color-surface-border)' : 'none',
        color: tier === 'free' ? cfg.color : '#fff',
        fontSize: base.fontSize, fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase',
        ...style,
      }}
    >
      {cfg.label}
    </span>
  );
}
