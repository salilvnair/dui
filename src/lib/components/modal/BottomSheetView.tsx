import { useRef, useState, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import './BottomSheetView.css';

export interface BottomSheetViewProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  /** Sheet height as a fraction of viewport height, e.g. 0.5. Default 0.6. */
  heightRatio?: number;
  size?: DuiSize;
  className?: string;
}

/** Mobile-style sheet — drag the handle down past a threshold, or fling it, to dismiss. */
export function BottomSheetView({
  open,
  onClose,
  title,
  children,
  heightRatio = 0.6,
  size,
  className = '',
}: BottomSheetViewProps) {
  const base = useOverlayBase(size);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startY: number; dy: number; dragging: boolean }>({ startY: 0, dy: 0, dragging: false });
  const [dragY, setDragY] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => { if (open) { setDragY(0); setClosing(false); } }, [open]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startY: e.clientY, dy: 0, dragging: true };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dy = Math.max(0, e.clientY - dragState.current.startY);
    dragState.current.dy = dy;
    setDragY(dy);
  };
  const onPointerUp = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    const sheetH = sheetRef.current?.offsetHeight ?? 300;
    if (dragState.current.dy > sheetH * 0.3) {
      setClosing(true);
      setTimeout(onClose, 180);
    } else {
      setDragY(0);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="dui_bottomsheet__backdrop" onClick={onClose} style={{ opacity: closing ? 0 : 1 }}>
      <div
        ref={sheetRef}
        className={`dui_bottomsheet__sheet ${className}`}
        onClick={e => e.stopPropagation()}
        style={{
          height: `${heightRatio * 100}vh`,
          transform: `translateY(${closing ? '100%' : `${dragY}px`})`,
          transition: dragState.current.dragging ? 'none' : 'transform 200ms ease-out',
        }}
      >
        <div
          className="dui_bottomsheet__handle"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <span className="dui_bottomsheet__grip" />
        </div>
        {title && (
          <div style={{ padding: `0 ${base.paddingX} ${base.paddingY}`, fontSize: base.headerFontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {title}
          </div>
        )}
        <div style={{ flex: 1, overflow: 'auto', padding: `0 ${base.paddingX} ${base.paddingY}` }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
