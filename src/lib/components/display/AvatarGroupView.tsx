import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useAvatarBase } from '../../core/AvatarBase';
import { AvatarView } from './AvatarView';

export interface AvatarGroupMember {
  src?: string | null;
  name?: string;
  initials?: string;
}

export interface AvatarGroupViewProps {
  members: AvatarGroupMember[];
  /** Max avatars shown before collapsing into a "+N" overflow bubble. Default 4. */
  max?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AvatarGroupView({
  members,
  max = 4,
  size,
  color,
  className = '',
  style,
}: AvatarGroupViewProps) {
  const base = useAvatarBase(size, { color });
  const visible = members.slice(0, max);
  const overflow = members.length - visible.length;
  const overlap = -(base.diameter * 0.28);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', ...style }}>
      {visible.map((m, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : overlap, position: 'relative', zIndex: visible.length - i, borderRadius: '999px', boxShadow: '0 0 0 2px var(--color-surface)' }}>
          <AvatarView src={m.src} name={m.name} initials={m.initials} size={size} color={color} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          style={{
            marginLeft: overlap, zIndex: 0, width: base.diameter, height: base.diameter, borderRadius: '999px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-surface)', color: 'var(--color-text-secondary)',
            fontWeight: 700, fontSize: base.diameter * 0.32,
            boxShadow: '0 0 0 2px var(--color-surface)', border: '1.5px solid var(--color-surface-border)',
          }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
