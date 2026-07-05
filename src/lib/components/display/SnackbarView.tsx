import { useEffect, useRef, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';
import { CloseIcon } from '../../../icons';
import './SnackbarView.css';

export interface SnackbarViewProps {
  open: boolean;
  message: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
  /** Auto-dismiss after N ms. 0 disables auto-dismiss. Timer pauses on hover. Default 4000. */
  duration?: number;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SnackbarView({
  open,
  message,
  onClose,
  actionLabel,
  onAction,
  duration = 4000,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: SnackbarViewProps) {
  const base = useFeedbackBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current); };
  const startTimer = () => {
    clearTimer();
    if (duration > 0) timerRef.current = setTimeout(onClose, duration);
  };

  useEffect(() => {
    if (open) startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, duration]);

  if (!open) return null;

  return (
    <div
      className={`dui_snackbar ${className}`}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: base.gap,
        paddingLeft: base.paddingX, paddingRight: base.paddingX, height: 'auto', minHeight: 40,
        borderRadius: base.borderRadius, width: width ? base.width : undefined,
        background: 'var(--color-elevated, #1f2430)', color: '#fff',
        boxShadow: '0 8px 30px rgba(0,0,0,.35)',
        ...style,
      }}
    >
      <span style={{ fontSize: base.fontSize, flex: 1, padding: '10px 0' }}>{message}</span>
      {actionLabel && (
        <button
          type="button"
          onClick={() => { onAction?.(); onClose(); }}
          style={{ border: 'none', background: 'transparent', color: accent, fontWeight: 700, fontSize: base.fontSize, cursor: 'pointer', flexShrink: 0 }}
        >
          {actionLabel}
        </button>
      )}
      <button type="button" onClick={onClose} aria-label="Dismiss" style={{ display: 'flex', border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', flexShrink: 0, padding: 2 }}>
        <CloseIcon size={13} />
      </button>
    </div>
  );
}
