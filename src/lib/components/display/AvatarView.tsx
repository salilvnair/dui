import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useAvatarBase } from '../../core/AvatarBase';
import type { PresenceStatus } from './PresenceDotView';
import { PresenceDotView } from './PresenceDotView';

export interface AvatarViewProps {
  src?: string | null;
  /** Fallback initials when no `src` is given — auto-derived from `name` if omitted. */
  initials?: string;
  name?: string;
  status?: PresenceStatus;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function deriveInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || name.slice(0, 2).toUpperCase();
}

export function AvatarView({
  src,
  initials,
  name,
  status,
  size,
  color,
  className = '',
  style,
}: AvatarViewProps) {
  const base = useAvatarBase(size, { color });
  const accent = color ?? base.activeColor ?? 'var(--color-primary)';
  const label = initials ?? deriveInitials(name);

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-flex', flexShrink: 0, ...style }}>
      <span
        title={name}
        style={{
          width: base.diameter, height: base.diameter, borderRadius: '999px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          background: src ? undefined : `color-mix(in srgb, ${accent} 18%, transparent)`,
          color: accent, fontWeight: 700, fontSize: base.diameter * 0.38,
          border: '1.5px solid var(--color-surface-border)',
        }}
      >
        {src ? <img src={src} alt={name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : label}
      </span>
      {status && (
        <span style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <PresenceDotView status={status} size={size} ring />
        </span>
      )}
    </span>
  );
}
