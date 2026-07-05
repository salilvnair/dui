import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import './PopoverView.css';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverViewProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: ReactNode;
  placement?: PopoverPlacement;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
}

/**
 * Generic anchored floating-content primitive — extracted positioning logic
 * shared conceptually with SelectInputView's dropdown / InfoPopupView, but
 * exposed as a standalone component for any custom popover content.
 */
export function PopoverView({
  open,
  onClose,
  anchorEl,
  children,
  placement = 'bottom',
  size,
  borderRadius,
  color,
  className = '',
}: PopoverViewProps) {
  const base = useOverlayBase(size, { borderRadius, color });
  const menuRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ top: number; left: number }>({ top: -9999, left: -9999 });

  useEffect(() => {
    if (!open || !anchorEl || !menuRef.current) return;
    const menu = menuRef.current;
    const position = () => {
      const r = anchorEl.getBoundingClientRect();
      const m = menu.getBoundingClientRect();
      const GAP = 8;
      let top = r.bottom + GAP;
      let left = r.left;
      if (placement === 'top') top = r.top - m.height - GAP;
      if (placement === 'left') { top = r.top; left = r.left - m.width - GAP; }
      if (placement === 'right') { top = r.top; left = r.right + GAP; }
      left = Math.min(Math.max(8, left), window.innerWidth - m.width - 8);
      top = Math.min(Math.max(8, top), window.innerHeight - m.height - 8);
      setStyle({ top, left });
    };
    position();
    const raf = requestAnimationFrame(position);
    window.addEventListener('scroll', position, { passive: true, capture: true });
    window.addEventListener('resize', position, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', position, { capture: true });
      window.removeEventListener('resize', position);
    };
  }, [open, anchorEl, placement]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (anchorEl?.contains(e.target as Node)) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [open, anchorEl, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={menuRef}
      className={`dui_popover ${className}`}
      style={{
        position: 'fixed', top: style.top, left: style.left, zIndex: 99999,
        borderRadius: base.borderRadius, background: 'var(--color-surface-bg, var(--color-elevated))',
        border: '1px solid var(--color-surface-border)', boxShadow: '0 12px 40px rgba(0,0,0,.35)',
        padding: base.paddingY,
      }}
    >
      {children}
    </div>,
    document.body
  );
}
