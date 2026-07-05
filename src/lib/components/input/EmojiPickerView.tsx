import { useState, useRef, useEffect, useMemo, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import './EmojiPickerView.css';

interface EmojiEntry { char: string; name: string; category: string }

const EMOJI_DATA: EmojiEntry[] = [
  ...['😀', '😁', '😂', '🤣', '😊', '😍', '🤩', '😎', '🤔', '😴', '😢', '😡', '🥳', '🤯', '🙌', '👍', '👎', '🙏', '👏', '💪'].map((char, i) => ({ char, name: `smiley-${i}`, category: 'Smileys' })),
  ...['🐶', '🐱', '🦊', '🦁', '🐼', '🐨', '🐸', '🐙', '🦋', '🐝', '🦄', '🐢'].map((char, i) => ({ char, name: `animal-${i}`, category: 'Animals' })),
  ...['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍰', '☕', '🍺', '🍷', '🥑', '🍎'].map((char, i) => ({ char, name: `food-${i}`, category: 'Food' })),
  ...['⚽', '🏀', '🏈', '🎮', '🎸', '🎨', '📸', '🎯', '🏆', '🚀', '✈️', '🚗'].map((char, i) => ({ char, name: `activity-${i}`, category: 'Activities' })),
  ...['❤️', '🔥', '⭐', '✅', '❌', '⚠️', '💡', '🔒', '🔑', '📌', '🎉', '💯'].map((char, i) => ({ char, name: `symbol-${i}`, category: 'Symbols' })),
];

export interface EmojiPickerViewProps {
  value: string | null;
  onChange: (emoji: string) => void;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function EmojiPickerView({
  value,
  onChange,
  disabled = false,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: EmojiPickerViewProps) {
  const base = useSelectBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? EMOJI_DATA.filter(e => e.category.toLowerCase().includes(q)) : EMOJI_DATA;
    const groups = new Map<string, EmojiEntry[]>();
    for (const e of list) {
      if (!groups.has(e.category)) groups.set(e.category, []);
      groups.get(e.category)!.push(e);
    }
    return Array.from(groups.entries());
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
    <div className={`dui_emojipicker ${className}`} style={{ display: 'inline-block', ...style }}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: base.gap,
          width: base.height, height: base.height,
          border: `1px solid ${open ? accent : 'var(--color-input-border)'}`,
          borderRadius: base.borderRadius, background: 'var(--color-input-bg)',
          cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
          fontSize: base.iconSize + 4,
        }}
      >
        {value ?? '🙂'}
      </button>

      {open && createPortal(
        <div ref={menuRef} className="dui_emojipicker__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search category…"
            className="dui_emojipicker__search"
          />
          <div className="dui_emojipicker__scroll">
            {grouped.map(([category, emojis]) => (
              <div key={category}>
                <div className="dui_emojipicker__category">{category}</div>
                <div className="dui_emojipicker__grid">
                  {emojis.map(e => (
                    <button
                      key={e.name}
                      type="button"
                      className={`dui_emojipicker__item${e.char === value ? ' dui_emojipicker__item--active' : ''}`}
                      onClick={() => { onChange(e.char); setOpen(false); }}
                    >
                      {e.char}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
