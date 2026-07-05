import { useEffect, useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface AnchorLink {
  /** Section element id, without the `#`. */
  id: string;
  label: string;
}

export interface AnchorViewProps {
  links: AnchorLink[];
  size?: DuiSize;
  color?: string;
  /** Extra offset (px) for scroll-into-view and scroll-spy detection, e.g. a fixed header height. */
  offset?: number;
  className?: string;
  style?: CSSProperties;
}

/** Scroll-spy in-page navigation — highlights the section currently in view, click to jump. */
export function AnchorView({
  links,
  size,
  color,
  offset = 0,
  className = '',
  style,
}: AnchorViewProps) {
  const base = useLayoutBase(size, { color });
  const accent = base.color ?? 'var(--color-primary)';
  const [active, setActive] = useState(links[0]?.id);

  useEffect(() => {
    const handler = () => {
      let current = links[0]?.id;
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top - offset <= 8) current = link.id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handler, { capture: true });
  }, [links, offset]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav className={className} style={{ display: 'flex', flexDirection: 'column', gap: 2, borderLeft: '2px solid var(--color-surface-border)', ...style }}>
      {links.map(link => {
        const isActive = link.id === active;
        return (
          <button
            key={link.id}
            type="button"
            onClick={() => handleClick(link.id)}
            style={{
              textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer',
              padding: '4px 0 4px 12px', marginLeft: -2,
              borderLeft: `2px solid ${isActive ? accent : 'transparent'}`,
              fontSize: base.fontSize, fontWeight: isActive ? 700 : 500,
              color: isActive ? accent : 'var(--color-text-muted)',
              transition: 'color 120ms, border-color 120ms',
            }}
          >
            {link.label}
          </button>
        );
      })}
    </nav>
  );
}
