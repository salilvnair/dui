import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';

export interface ToastDeckEntry {
  id: string;
  content: ReactNode;
  color?: string;
}

export interface StackedToastDeckViewProps {
  toasts: ToastDeckEntry[];
  onDismiss: (id: string) => void;
  size?: DuiSize;
  width?: number;
  className?: string;
  style?: CSSProperties;
}

/** Toasts don't stack vertically — older ones shrink and recede behind the newest like a card deck; click to fan out. */
export function StackedToastDeckView({
  toasts,
  onDismiss,
  size,
  width = 280,
  className = '',
  style,
}: StackedToastDeckViewProps) {
  const base = useOverlayBase(size);
  const [fanned, setFanned] = useState(false);
  const visible = toasts.slice(0, 5);

  return (
    <div
      className={className}
      onClick={() => setFanned(f => !f)}
      style={{ position: 'relative', width, minHeight: fanned ? visible.length * 56 : 64, cursor: 'pointer', ...style }}
    >
      {visible.slice().reverse().map((toast, revIdx) => {
        const idx = visible.length - 1 - revIdx;
        const isTop = idx === 0;
        return (
          <div
            key={toast.id}
            onClick={e => { if (isTop || fanned) { e.stopPropagation(); onDismiss(toast.id); } }}
            style={{
              position: 'absolute', left: 0, right: 0,
              top: fanned ? idx * 56 : idx * 6,
              transform: fanned ? 'none' : `scale(${1 - idx * 0.04})`,
              transition: 'top 220ms ease-out, transform 220ms ease-out, opacity 220ms ease-out',
              zIndex: visible.length - idx,
              opacity: fanned ? 1 : 1 - idx * 0.12,
              padding: `${base.paddingY} ${base.paddingX}`, borderRadius: base.borderRadius,
              border: `1px solid ${toast.color ?? 'var(--color-surface-border)'}`,
              background: 'var(--color-surface)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: base.fontSize, color: 'var(--color-text-primary)',
            }}
          >
            {toast.content}
          </div>
        );
      })}
    </div>
  );
}
