import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import { WarningTriangleIcon } from '../../../icons';
import './AlertDialogView.css';

export interface AlertDialogViewProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  size?: DuiSize;
  className?: string;
}

/** Pre-built confirm/cancel dialog with danger styling — the standard "Are you sure?" pattern. */
export function AlertDialogView({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
  size,
  className = '',
}: AlertDialogViewProps) {
  const base = useOverlayBase(size);
  const accent = danger ? 'var(--color-error)' : 'var(--color-primary)';

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="dui_alertdialog__backdrop" onClick={onCancel}>
      <div className={`dui_alertdialog__card ${className}`} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 12, padding: base.paddingX }}>
          {danger && (
            <span style={{ display: 'flex', flexShrink: 0, width: 36, height: 36, borderRadius: '999px', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--color-error) 15%, transparent)', color: 'var(--color-error)' }}>
              <WarningTriangleIcon size={18} />
            </span>
          )}
          <div>
            <div style={{ fontSize: base.headerFontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</div>
            <div style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)', marginTop: 4, lineHeight: 1.5 }}>{message}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: base.paddingX, borderTop: '1px solid var(--color-surface-border)' }}>
          <button type="button" onClick={onCancel} className="dui_alertdialog__btn dui_alertdialog__btn--ghost">{cancelLabel}</button>
          <button type="button" onClick={onConfirm} className="dui_alertdialog__btn" style={{ background: accent }}>{confirmLabel}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
