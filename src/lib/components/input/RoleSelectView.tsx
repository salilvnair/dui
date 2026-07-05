import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import { ChevronDownIcon } from '../../../icons';
import './RoleSelectView.css';

export interface RoleOption {
  value: string;
  label: string;
  description?: string;
}

export interface RoleSelectViewProps {
  options: RoleOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Role dropdown with a per-option description shown beneath the label. */
export function RoleSelectView({
  options,
  value,
  onChange,
  disabled = false,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: RoleSelectViewProps) {
  const base = useSelectBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    menuRef.current.style.top = `${r.bottom + 4}px`;
    menuRef.current.style.left = `${r.left}px`;
    menuRef.current.style.minWidth = `${r.width}px`;
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
    <div className={`dui_roleselect ${className}`} style={{ display: 'inline-block', ...style }}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: base.gap,
          width: base.width, height: base.height, paddingLeft: base.paddingX, paddingRight: base.paddingX,
          border: `1px solid ${open ? accent : 'var(--color-input-border)'}`, borderRadius: base.borderRadius,
          background: 'var(--color-input-bg)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
        }}
      >
        <span style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', fontWeight: 600 }}>{selected?.label ?? 'Select role'}</span>
        <ChevronDownIcon size={base.iconSize - 2} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 140ms', color: 'var(--color-text-muted)' }} />
      </button>

      {open && createPortal(
        <div ref={menuRef} className="dui_roleselect__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`dui_roleselect__item${opt.value === value ? ' dui_roleselect__item--active' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              <span style={{ fontSize: base.fontSize, fontWeight: 700, color: opt.value === value ? accent : 'var(--color-text-primary)' }}>{opt.label}</span>
              {opt.description && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{opt.description}</span>}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
