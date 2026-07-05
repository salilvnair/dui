import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useMenuBase } from '../../core/MenuBase';
import { ColumnsIcon, ChevronDownIcon } from '../../../icons';
import './ColumnVisibilityMenuView.css';

export interface ColumnVisibilityOption {
  key: string;
  label: string;
}

export interface ColumnVisibilityMenuViewProps {
  columns: ColumnVisibilityOption[];
  /** Keys of currently-visible columns. */
  visible: string[];
  onChange: (visible: string[]) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Checkbox menu to toggle table column visibility. */
export function ColumnVisibilityMenuView({
  columns,
  visible,
  onChange,
  size,
  color,
  className = '',
  style,
}: ColumnVisibilityMenuViewProps) {
  const base = useMenuBase(size, { color });
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const visibleSet = new Set(visible);

  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    menuRef.current.style.top = `${r.bottom + 4}px`;
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

  const toggle = (key: string) => {
    onChange(visibleSet.has(key) ? visible.filter(k => k !== key) : [...visible, key]);
  };

  return (
    <div className={`dui_colvis ${className}`} style={{ display: 'inline-block', ...style }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5, border: '1px solid var(--color-surface-border)',
          background: 'var(--color-surface)', borderRadius: 6, padding: '5px 9px', cursor: 'pointer',
          fontSize: base.fontSize, color: 'var(--color-text-secondary)',
        }}
      >
        <ColumnsIcon size={base.iconSize} />
        Columns
        <ChevronDownIcon size={10} style={{ transition: 'transform 140ms', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && createPortal(
        <div ref={menuRef} className="dui_colvis__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          {columns.map(col => (
            <label key={col.key} className="dui_colvis__item" style={{ fontSize: base.fontSize }}>
              <input type="checkbox" checked={visibleSet.has(col.key)} onChange={() => toggle(col.key)} />
              {col.label}
            </label>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
