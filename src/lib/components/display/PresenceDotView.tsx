import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useAvatarBase } from '../../core/AvatarBase';

export type PresenceStatus = 'online' | 'away' | 'busy' | 'offline';

export interface PresenceDotViewProps {
  status: PresenceStatus;
  size?: DuiSize;
  /** Adds a surface-colored ring, useful when overlapping an avatar image. */
  ring?: boolean;
  className?: string;
  style?: CSSProperties;
}

const STATUS_COLOR: Record<PresenceStatus, string> = {
  online: 'var(--color-success)',
  away: 'var(--color-warning)',
  busy: 'var(--color-error)',
  offline: 'var(--color-text-muted)',
};

export function PresenceDotView({
  status,
  size,
  ring = false,
  className = '',
  style,
}: PresenceDotViewProps) {
  const base = useAvatarBase(size);
  const color = STATUS_COLOR[status];

  return (
    <span
      className={className}
      aria-label={status}
      style={{
        display: 'inline-block', width: base.dotSize, height: base.dotSize, borderRadius: '999px',
        background: color, border: ring ? `2px solid var(--color-surface)` : undefined,
        boxSizing: 'content-box', flexShrink: 0,
        ...style,
      }}
    />
  );
}
