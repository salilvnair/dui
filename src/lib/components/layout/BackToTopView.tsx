import { useEffect, useState } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { ChevronUpIcon } from '../../../icons';

export interface BackToTopViewProps {
  /** Scroll threshold (px) before the button appears. Default 240. */
  threshold?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
}

/** Floating scroll-to-top button — fades in once the page scrolls past `threshold`. */
export function BackToTopView({
  threshold = 240,
  size,
  color,
  className = '',
}: BackToTopViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? base.defaultColor ?? 'var(--color-primary)';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold);
    handler();
    window.addEventListener('scroll', handler, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handler, { capture: true });
  }, [threshold]);

  const h = parseInt(base.height, 10) * 1.15;

  if (!visible) return null;

  return (
    <button
      type="button"
      className={className}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9000,
        width: h, height: h, borderRadius: '999px', border: 'none',
        background: accent, color: 'var(--color-btn-primary-text, #fff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,0,0,.3)',
      }}
    >
      <ChevronUpIcon size={base.iconSize} />
    </button>
  );
}
