import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';
import './NavbarView.css';

export interface NavbarLink {
  id: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface NavbarViewProps {
  brand: ReactNode;
  links?: NavbarLink[];
  right?: ReactNode;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Top app bar — brand, link menu, burger collapse on narrow widths. */
export function NavbarView({
  brand,
  links = [],
  right,
  size,
  color,
  className = '',
  style,
}: NavbarViewProps) {
  const base = useLayoutBase(size, { color });
  const accent = base.color ?? 'var(--color-primary)';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={className} style={{ position: 'relative', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-surface-border)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${base.padding}`, height: 52 }}>
        <div style={{ fontWeight: 800, fontSize: `calc(${base.fontSize} * 1.2)`, color: 'var(--color-text-primary)' }}>{brand}</div>
        <div className="dui_navbar__links" style={{ display: 'flex', alignItems: 'center', gap: base.gap }}>
          {links.map(l => (
            <button
              key={l.id}
              type="button"
              onClick={l.onClick}
              style={{
                border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: base.fontSize, fontWeight: l.active ? 700 : 500,
                color: l.active ? accent : 'var(--color-text-secondary)', padding: '6px 0',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {right}
          <button
            type="button"
            className="dui_navbar__burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{ display: 'none', flexDirection: 'column', gap: 3, border: 'none', background: 'transparent', cursor: 'pointer', padding: 6 }}
          >
            <span style={{ width: 18, height: 2, background: 'var(--color-text-primary)', borderRadius: 1 }} />
            <span style={{ width: 18, height: 2, background: 'var(--color-text-primary)', borderRadius: 1 }} />
            <span style={{ width: 18, height: 2, background: 'var(--color-text-primary)', borderRadius: 1 }} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', padding: base.padding, gap: 6, borderTop: '1px solid var(--color-surface-border)' }}>
          {links.map(l => (
            <button key={l.id} type="button" onClick={l.onClick} style={{ textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: base.fontSize, color: l.active ? accent : 'var(--color-text-secondary)', fontWeight: l.active ? 700 : 500 }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
