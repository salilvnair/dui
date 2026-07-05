import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';
import './FeatureSpotlightBadgeView.css';

export interface FeatureSpotlightBadgeViewProps {
  label?: string;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Pulsing "New" badge for recently shipped features. */
export function FeatureSpotlightBadgeView({
  label = 'New',
  size,
  color,
  className = '',
  style,
}: FeatureSpotlightBadgeViewProps) {
  const base = useChipBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <span
      className={`dui_spotlightbadge ${className}`}
      style={{
        display: 'inline-flex', alignItems: 'center', height: base.height,
        paddingLeft: base.paddingX, paddingRight: base.paddingX, borderRadius: base.borderRadius,
        background: accent, color: '#fff', fontSize: base.fontSize, fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '0.03em', ...style,
      }}
    >
      {label}
    </span>
  );
}
