import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import './ColorPickerView.css';

const DEFAULT_SWATCHES = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
  '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
  '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#64748B',
];

export interface ColorPickerViewProps {
  value: string;
  onChange: (value: string) => void;
  swatches?: string[];
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  className?: string;
  style?: CSSProperties;
}

export function ColorPickerView({
  value,
  onChange,
  swatches = DEFAULT_SWATCHES,
  disabled = false,
  size,
  width,
  borderRadius,
  className = '',
  style,
}: ColorPickerViewProps) {
  const base = useSelectBase(size, { width, borderRadius });
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(value);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setHex(value), [value]);

  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    const position = () => {
      const r = trigger.getBoundingClientRect();
      menu.style.top = `${r.bottom + 6}px`;
      menu.style.left = `${Math.min(r.left, window.innerWidth - menu.offsetWidth - 8)}px`;
    };
    position();
    const raf = requestAnimationFrame(position);
    return () => cancelAnimationFrame(raf);
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

  const commitHex = (v: string) => {
    setHex(v);
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) onChange(v);
  };

  return (
    <div className={`dui_colorpicker ${className}`} style={{ display: 'inline-block', ...style }}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: base.gap,
          height: base.height, paddingLeft: base.paddingX, paddingRight: base.paddingX,
          border: `1px solid ${open ? 'var(--color-primary)' : 'var(--color-input-border)'}`,
          borderRadius: base.borderRadius, background: 'var(--color-input-bg)',
          cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
        }}
      >
        <span style={{ width: base.iconSize + 4, height: base.iconSize + 4, borderRadius: 4, background: value, border: '1px solid var(--color-surface-border)', flexShrink: 0 }} />
        <span style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', fontWeight: 500 }}>{value}</span>
      </button>

      {open && createPortal(
        <div ref={menuRef} className="dui_colorpicker__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          <div className="dui_colorpicker__grid">
            {swatches.map(sw => (
              <button
                key={sw}
                type="button"
                className={`dui_colorpicker__swatch${sw.toLowerCase() === value.toLowerCase() ? ' dui_colorpicker__swatch--active' : ''}`}
                style={{ background: sw }}
                onClick={() => { onChange(sw); setOpen(false); }}
                aria-label={sw}
              />
            ))}
          </div>
          <div className="dui_colorpicker__hexrow">
            <input
              type="color"
              value={/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex) ? hex : '#000000'}
              onChange={e => commitHex(e.target.value)}
              className="dui_colorpicker__native"
            />
            <input
              type="text"
              value={hex}
              onChange={e => commitHex(e.target.value)}
              className="dui_colorpicker__hexinput"
              placeholder="#RRGGBB"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
