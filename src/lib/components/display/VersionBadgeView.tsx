import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';

export interface VersionBadgeViewProps {
  version: string;
  updateAvailable?: boolean;
  onClick?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Version number chip with an "update available" dot indicator. */
export function VersionBadgeView({
  version,
  updateAvailable = false,
  onClick,
  size,
  color,
  className = '',
  style,
}: VersionBadgeViewProps) {
  const base = useChipBase(size, { color });
  const accent = color ?? 'var(--color-text-muted)';
  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5, height: base.height,
        paddingLeft: base.paddingX, paddingRight: base.paddingX, borderRadius: base.borderRadius,
        border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)',
        color: accent, fontSize: base.fontSize, fontWeight: 600, fontFamily: 'ui-monospace, monospace',
        cursor: onClick ? 'pointer' : 'default', ...style,
      }}
    >
      v{version}
      {updateAvailable && <span style={{ width: 6, height: 6, borderRadius: '999px', background: 'var(--color-warning)' }} />}
    </Tag>
  );
}
