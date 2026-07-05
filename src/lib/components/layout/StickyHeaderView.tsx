import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface StickyHeaderViewProps {
  children: ReactNode;
  offsetTop?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Sticky section header that grows a shadow once it's pinned to the top. */
export function StickyHeaderView({
  children,
  offsetTop = 0,
  size,
  className = '',
  style,
}: StickyHeaderViewProps) {
  const base = useLayoutBase(size);
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => setStuck(el.getBoundingClientRect().top <= offsetTop);
    handler();
    window.addEventListener('scroll', handler, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handler, { capture: true });
  }, [offsetTop]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'sticky', top: offsetTop, zIndex: 10,
        padding: `10px ${base.padding}`, background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-surface-border)',
        boxShadow: stuck ? '0 4px 12px rgba(0,0,0,.12)' : 'none',
        transition: 'box-shadow 160ms',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
