import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import './ActionSheetView.css';

export interface ActionSheetItem {
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export interface ActionSheetViewProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  items: ActionSheetItem[];
  cancelLabel?: string;
  size?: DuiSize;
  className?: string;
}

export function ActionSheetView({
  open,
  onClose,
  title,
  items,
  cancelLabel = 'Cancel',
  size,
  className = '',
}: ActionSheetViewProps) {
  const base = useOverlayBase(size);
  if (!open) return null;

  return createPortal(
    <div className="dui_actionsheet__backdrop" onClick={onClose}>
      <div className={`dui_actionsheet__sheet ${className}`} onClick={e => e.stopPropagation()}>
        <div className="dui_actionsheet__group">
          {title && (
            <div style={{ padding: `10px ${base.paddingX}`, fontSize: base.fontSize, color: 'var(--color-text-muted)', textAlign: 'center', borderBottom: '1px solid var(--color-surface-border)' }}>
              {title}
            </div>
          )}
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              disabled={item.disabled}
              onClick={() => { item.onClick(); onClose(); }}
              className="dui_actionsheet__item"
              style={{
                fontSize: base.headerFontSize,
                color: item.danger ? 'var(--color-error)' : 'var(--color-text-primary)',
                borderTop: i > 0 ? '1px solid var(--color-surface-border)' : 'none',
              }}
            >
              {item.icon && <span style={{ display: 'flex' }}>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose} className="dui_actionsheet__cancel" style={{ fontSize: base.headerFontSize }}>
          {cancelLabel}
        </button>
      </div>
    </div>,
    document.body
  );
}
