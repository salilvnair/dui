import { useEffect, useRef, useState, cloneElement, type ReactElement, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import './TooltipView.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipTriggerProps {
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  [key: string]: unknown;
}

export interface TooltipViewProps {
  content: ReactNode;
  /**
   * Trigger element — must forward its ref to a real DOM node (native elements
   * like `<button>`/`<span>` work out of the box). If wrapping a DUI component
   * that doesn't forward refs, wrap it in a `<span>` first:
   * `<TooltipView content="..."><span><ButtonView>Save</ButtonView></span></TooltipView>`.
   */
  children: ReactElement<TooltipTriggerProps>;
  placement?: TooltipPlacement;
  /** ms before showing on hover/focus. Default 300. */
  delay?: number;
  size?: DuiSize;
  color?: string;
  disabled?: boolean;
}

export function TooltipView({
  content,
  children,
  placement = 'top',
  delay = 300,
  size,
  color,
  disabled = false,
}: TooltipViewProps) {
  const base = useOverlayBase(size, { color });
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: -9999, left: -9999 });
  const triggerRef = useRef<HTMLElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  useEffect(() => {
    if (!open || !triggerRef.current || !tipRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const t = tipRef.current.getBoundingClientRect();
    const GAP = 6;
    let top = r.top - t.height - GAP;
    let left = r.left + r.width / 2 - t.width / 2;
    if (placement === 'bottom') top = r.bottom + GAP;
    if (placement === 'left') { top = r.top + r.height / 2 - t.height / 2; left = r.left - t.width - GAP; }
    if (placement === 'right') { top = r.top + r.height / 2 - t.height / 2; left = r.right + GAP; }
    left = Math.min(Math.max(4, left), window.innerWidth - t.width - 4);
    top = Math.min(Math.max(4, top), window.innerHeight - t.height - 4);
    setPos({ top, left });
  }, [open, placement]);

  const childProps = children.props;
  const trigger = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => { show(); childProps.onMouseEnter?.(e); },
    onMouseLeave: (e: React.MouseEvent) => { hide(); childProps.onMouseLeave?.(e); },
    onFocus: (e: React.FocusEvent) => { show(); childProps.onFocus?.(e); },
    onBlur: (e: React.FocusEvent) => { hide(); childProps.onBlur?.(e); },
  } as Partial<TooltipTriggerProps> & { ref: typeof triggerRef });

  return (
    <>
      {trigger}
      {open && content && createPortal(
        <div
          ref={tipRef}
          className="dui_tooltip"
          role="tooltip"
          style={{
            position: 'fixed', top: pos.top, left: pos.left, zIndex: 99999,
            background: 'var(--color-elevated, #1f2430)', color: '#fff',
            fontSize: base.fontSize, padding: '5px 9px', borderRadius: 6,
            boxShadow: '0 6px 20px rgba(0,0,0,.3)', maxWidth: 240, pointerEvents: 'none',
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}
