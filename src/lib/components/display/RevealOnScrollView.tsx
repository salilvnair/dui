import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export interface RevealOnScrollViewProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  /** Transition duration in ms. Default 500. */
  duration?: number;
  delay?: number;
  /** Re-trigger every time it enters the viewport, instead of only once. */
  repeat?: boolean;
  className?: string;
  style?: CSSProperties;
}

const OFFSETS: Record<string, string> = {
  up: 'translateY(24px)',
  down: 'translateY(-24px)',
  left: 'translateX(24px)',
  right: 'translateX(-24px)',
  fade: 'none',
};

/** Fade/slide-in-on-scroll wrapper. */
export function RevealOnScrollView({
  children,
  direction = 'up',
  duration = 500,
  delay = 0,
  repeat = false,
  className = '',
  style,
}: RevealOnScrollViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else if (repeat) setVisible(false);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : OFFSETS[direction],
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
