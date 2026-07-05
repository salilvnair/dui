import { useState, useRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import { BellIcon } from '../../../icons';
import './NotificationCenterView.css';

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  read?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface NotificationCenterViewProps {
  notifications: NotificationItem[];
  onMarkAllRead?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
}

/** Bell icon + dropdown notification list, unread-count badge. */
export function NotificationCenterView({
  notifications,
  onMarkAllRead,
  size,
  color,
  className = '',
}: NotificationCenterViewProps) {
  const base = useOverlayBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    menuRef.current.style.top = `${r.bottom + 6}px`;
    menuRef.current.style.right = `${window.innerWidth - r.right}px`;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className={`dui_notifcenter ${className}`} style={{ display: 'inline-block' }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{ position: 'relative', display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 6 }}
        aria-label="Notifications"
      >
        <BellIcon size={18} />
        {unread > 0 && (
          <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '999px', background: 'var(--color-error)', border: '2px solid var(--color-surface)' }} />
        )}
      </button>

      {open && createPortal(
        <div ref={menuRef} className="dui_notifcenter__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid var(--color-surface-border)' }}>
            <span style={{ fontWeight: 700, fontSize: base.headerFontSize, color: 'var(--color-text-primary)' }}>Notifications</span>
            {onMarkAllRead && <button type="button" onClick={onMarkAllRead} style={{ border: 'none', background: 'transparent', color: accent, fontSize: base.fontSize, fontWeight: 700, cursor: 'pointer' }}>Mark all read</button>}
          </div>
          <div className="dui_notifcenter__list">
            {notifications.map(n => (
              <button key={n.id} type="button" onClick={n.onClick} className="dui_notifcenter__item">
                {n.icon && <span style={{ display: 'flex', flexShrink: 0, color: accent }}>{n.icon}</span>}
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: base.fontSize, fontWeight: n.read ? 500 : 700, color: 'var(--color-text-primary)' }}>{n.title}</span>
                  {n.description && <span style={{ display: 'block', fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{n.description}</span>}
                  <span style={{ display: 'block', fontSize: base.fontSize, color: 'var(--color-text-muted)', marginTop: 2 }}>{n.timestamp}</span>
                </span>
                {!n.read && <span style={{ width: 6, height: 6, borderRadius: '999px', background: accent, flexShrink: 0, marginTop: 4 }} />}
              </button>
            ))}
            {notifications.length === 0 && <div style={{ padding: 20, textAlign: 'center', fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>No notifications</div>}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
