import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export interface AffixViewProps {
  children: ReactNode;
  /** Distance from viewport top before sticking. Default 0. */
  offsetTop?: number;
  onStickyChange?: (stuck: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

/** Sticky-on-scroll wrapper — stays pinned once it reaches `offsetTop`, releases at the end of its placeholder. */
export function AffixView({
  children,
  offsetTop = 0,
  onStickyChange,
  className = '',
  style,
}: AffixViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      const rect = el.getBoundingClientRect();
      const isStuck = rect.top <= offsetTop;
      setStuck(prev => {
        if (prev !== isStuck) onStickyChange?.(isStuck);
        return isStuck;
      });
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true, capture: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, { capture: true });
      window.removeEventListener('resize', handler);
    };
  }, [offsetTop, onStickyChange]);

  return (
    <div ref={ref} className={className} style={{ position: 'sticky', top: offsetTop, zIndex: 10, ...style }} data-stuck={stuck}>
      {children}
    </div>
  );
}
