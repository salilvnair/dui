import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface ContactCardViewProps {
  name: string;
  role?: string;
  avatar?: ReactNode;
  contacts?: { icon: ReactNode; label: string; onClick?: () => void }[];
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Avatar + name + role + contact-icon row card. */
export function ContactCardView({
  name,
  role,
  avatar,
  contacts = [],
  size,
  borderRadius,
  color,
  className = '',
  style,
}: ContactCardViewProps) {
  const base = useCardBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: base.padding, border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, textAlign: 'center', ...style }}>
      {avatar ?? <span style={{ width: 56, height: 56, borderRadius: '999px', background: `color-mix(in srgb, ${accent} 15%, transparent)` }} />}
      <div>
        <div style={{ fontSize: `calc(${base.fontSize} * 1.1)`, fontWeight: 700, color: 'var(--color-text-primary)' }}>{name}</div>
        {role && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{role}</div>}
      </div>
      {contacts.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {contacts.map((c, i) => (
            <button key={i} type="button" onClick={c.onClick} title={c.label} style={{ display: 'flex', border: 'none', background: 'var(--color-surface)', borderRadius: '999px', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', cursor: c.onClick ? 'pointer' : 'default' }}>
              {c.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
