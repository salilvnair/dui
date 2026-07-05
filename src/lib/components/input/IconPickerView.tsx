import { useState, useRef, useEffect, useMemo, type CSSProperties, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import * as Icons from '../../../icons';
import './IconPickerView.css';

// Most DUI icons accept `{ size? }`; a couple of special-purpose ones (e.g.
// pattern fills) need extra props, so this is intentionally loose — it's
// only ever invoked with `size`.
type IconComponent = (props: { size?: number }) => ReactElement;

const ALL_ICONS: { name: string; Icon: IconComponent }[] = Object.entries(Icons)
  .filter(([name, fn]) => name.endsWith('Icon') && typeof fn === 'function')
  .map(([name, Icon]) => ({ name, Icon: Icon as unknown as IconComponent }));

export interface IconPickerViewProps {
  value: string | null;
  onChange: (iconName: string) => void;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function IconPickerView({
  value,
  onChange,
  disabled = false,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: IconPickerViewProps) {
  const base = useSelectBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selected = ALL_ICONS.find(i => i.name === value);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter(i => i.name.toLowerCase().includes(q));
  }, [query]);

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

  return (
    <div className={`dui_iconpicker ${className}`} style={{ display: 'inline-block', ...style }}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: base.gap,
          height: base.height, paddingLeft: base.paddingX, paddingRight: base.paddingX,
          border: `1px solid ${open ? accent : 'var(--color-input-border)'}`,
          borderRadius: base.borderRadius, background: 'var(--color-input-bg)',
          cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
        }}
      >
        {selected ? <selected.Icon size={base.iconSize} /> : <span style={{ width: base.iconSize, height: base.iconSize }} />}
        <span style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', fontWeight: 500 }}>{selected?.name ?? 'Choose icon'}</span>
      </button>

      {open && createPortal(
        <div ref={menuRef} className="dui_iconpicker__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search icons…"
            className="dui_iconpicker__search"
          />
          <div className="dui_iconpicker__grid">
            {filtered.slice(0, 200).map(({ name, Icon }) => (
              <button
                key={name}
                type="button"
                title={name}
                className={`dui_iconpicker__item${name === value ? ' dui_iconpicker__item--active' : ''}`}
                onClick={() => { onChange(name); setOpen(false); }}
              >
                <Icon size={16} />
              </button>
            ))}
            {filtered.length === 0 && <div className="dui_iconpicker__empty">No icons found</div>}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
