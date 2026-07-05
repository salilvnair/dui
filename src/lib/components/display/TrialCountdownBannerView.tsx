import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface TrialCountdownBannerViewProps {
  daysLeft: number;
  onUpgrade: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** "N days left in trial" strip with an upgrade CTA. */
export function TrialCountdownBannerView({
  daysLeft,
  onUpgrade,
  size,
  color,
  className = '',
  style,
}: TrialCountdownBannerViewProps) {
  const base = useLayoutBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const urgent = daysLeft <= 3;

  return (
    <div
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: `8px ${base.padding}`,
        background: urgent ? 'color-mix(in srgb, var(--color-error) 12%, transparent)' : `color-mix(in srgb, ${accent} 10%, transparent)`,
        width: '100%', boxSizing: 'border-box', borderRadius: base.borderRadius, ...style,
      }}
    >
      <span style={{ flex: 1, fontSize: base.fontSize, fontWeight: 600, color: urgent ? 'var(--color-error)' : 'var(--color-text-primary)' }}>
        {daysLeft === 0 ? 'Your trial ends today' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your trial`}
      </span>
      <button type="button" onClick={onUpgrade} style={{ border: 'none', borderRadius: 6, padding: '5px 12px', background: accent, color: '#fff', fontSize: base.fontSize, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
        Upgrade now
      </button>
    </div>
  );
}
