import { useState, useRef, useEffect, useMemo, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import './ComboBoxView.css';

export interface ComboBoxOption {
  value: string;
  label: string;
}

export interface ComboBoxViewProps {
  options: ComboBoxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Allow values not present in `options`. Default true. */
  freeSolo?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Free-text input with a filtered dropdown of matching suggestions — autocomplete pattern. */
export function ComboBoxView({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  freeSolo = true,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: ComboBoxViewProps) {
  const base = useSelectBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter(o => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  useEffect(() => {
    if (!open || !inputRef.current || !menuRef.current) return;
    const trigger = inputRef.current;
    const menu = menuRef.current;
    const position = () => {
      const r = trigger.getBoundingClientRect();
      menu.style.top = `${r.bottom + 4}px`;
      menu.style.left = `${r.left}px`;
      menu.style.minWidth = `${r.width}px`;
    };
    position();
    const raf = requestAnimationFrame(position);
    return () => cancelAnimationFrame(raf);
  }, [open, filtered.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (inputRef.current?.contains(e.target as Node)) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
      if (freeSolo) onChange(query);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, freeSolo, query, onChange]);

  const select = (opt: ComboBoxOption) => {
    setQuery(opt.label);
    onChange(opt.value);
    setOpen(false);
  };

  return (
    <div className={`dui_combobox ${className}`} style={{ display: 'inline-block', width: base.width, ...style }}>
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={e => { setQuery(e.target.value); setOpen(true); if (freeSolo) onChange(e.target.value); }}
        style={{
          width: '100%', height: base.height, fontSize: base.fontSize,
          paddingLeft: base.paddingX, paddingRight: base.paddingX,
          border: `1px solid ${open ? accent : 'var(--color-input-border)'}`, borderRadius: base.borderRadius,
          background: 'var(--color-input-bg)', color: 'var(--color-text-primary)', outline: 'none',
          boxSizing: 'border-box', opacity: disabled ? 0.5 : 1,
        }}
      />
      {open && filtered.length > 0 && createPortal(
        <div ref={menuRef} className="dui_combobox__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          {filtered.map(opt => (
            <button
              key={opt.value}
              type="button"
              className="dui_combobox__item"
              onClick={() => select(opt)}
              style={{ fontSize: base.fontSize }}
            >
              {opt.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
