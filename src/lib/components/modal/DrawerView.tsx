import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import { CloseIcon } from '../../../icons';
import './DrawerView.css';

export type DrawerEdge = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerViewProps {
  open: boolean;
  onClose: () => void;
  edge?: DrawerEdge;
  title?: string;
  children?: ReactNode;
  /** Width (left/right edges) or height (top/bottom edges), e.g. 320 or '40vw'. */
  size?: number | string;
  duiSize?: DuiSize;
  className?: string;
}

export function DrawerView({
  open,
  onClose,
  edge = 'right',
  title,
  children,
  size = 320,
  duiSize,
  className = '',
}: DrawerViewProps) {
  const base = useOverlayBase(duiSize);
  const horizontal = edge === 'left' || edge === 'right';

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="dui_drawer__backdrop" onClick={onClose}>
      <div
        className={`dui_drawer__panel dui_drawer__panel--${edge} ${className}`}
        onClick={e => e.stopPropagation()}
        style={{
          [horizontal ? 'width' : 'height']: typeof size === 'number' ? `${size}px` : size,
          background: 'var(--color-surface)',
        }}
      >
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${base.paddingY} ${base.paddingX}`, borderBottom: '1px solid var(--color-surface-border)' }}>
            <span style={{ fontSize: base.headerFontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</span>
            <button type="button" onClick={onClose} aria-label="Close" style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <CloseIcon size={15} />
            </button>
          </div>
        )}
        <div style={{ flex: 1, overflow: 'auto', padding: base.paddingX }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
