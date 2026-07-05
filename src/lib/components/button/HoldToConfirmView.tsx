import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';

export interface HoldToConfirmViewProps {
  children: ReactNode;
  onConfirm: () => void;
  /** Hold duration in ms required to trigger. Default 900. */
  duration?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Press-and-hold with a radial fill that must complete before the destructive action fires. */
export function HoldToConfirmView({
  children,
  onConfirm,
  duration = 900,
  size,
  color,
  className = '',
  style,
}: HoldToConfirmViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? 'var(--color-error)';
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  const startHold = () => {
    startRef.current = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      setProgress(t);
      if (t >= 1) { onConfirm(); setProgress(0); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const cancelHold = () => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
  };

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden', height: base.height, fontSize: base.fontSize,
        padding: `0 ${base.paddingX}`, borderRadius: base.borderRadius, border: `1px solid ${accent}`,
        background: 'var(--color-surface)', color: accent, fontWeight: 600, cursor: 'pointer',
        userSelect: 'none', WebkitUserSelect: 'none',
        ...style,
      }}
    >
      <span style={{ position: 'absolute', inset: 0, width: `${progress * 100}%`, background: accent, opacity: 0.9, transition: progress === 0 ? 'width 150ms ease-out' : 'none' }} />
      <span style={{ position: 'relative', mixBlendMode: progress > 0.5 ? 'difference' : 'normal' }}>{children}</span>
    </button>
  );
}
