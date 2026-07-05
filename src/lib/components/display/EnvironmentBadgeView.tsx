import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';
import './EnvironmentBadgeView.css';

export type EnvironmentKind = 'dev' | 'staging' | 'prod';

export interface EnvironmentBadgeViewProps {
  env: EnvironmentKind;
  /** Show a pulsing "live" dot — typically for prod. */
  live?: boolean;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const ENV_CONFIG: Record<EnvironmentKind, { label: string; color: string }> = {
  dev: { label: 'Development', color: 'var(--color-info)' },
  staging: { label: 'Staging', color: 'var(--color-warning)' },
  prod: { label: 'Production', color: 'var(--color-error)' },
};

/** Colored environment chip with an optional pulsing live indicator. */
export function EnvironmentBadgeView({
  env,
  live = false,
  size,
  className = '',
  style,
}: EnvironmentBadgeViewProps) {
  const base = useChipBase(size);
  const cfg = ENV_CONFIG[env];

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5, height: base.height,
        paddingLeft: base.paddingX, paddingRight: base.paddingX, borderRadius: base.borderRadius,
        background: `color-mix(in srgb, ${cfg.color} 14%, transparent)`, color: cfg.color,
        fontSize: base.fontSize, fontWeight: 700, ...style,
      }}
    >
      {live && <span className="dui_envbadge__dot" style={{ width: 6, height: 6, borderRadius: '999px', background: cfg.color }} />}
      {cfg.label}
    </span>
  );
}
