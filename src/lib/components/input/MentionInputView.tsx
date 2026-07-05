import { useState, useRef, useMemo, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import './MentionInputView.css';

export interface MentionUser {
  id: string;
  label: string;
}

export interface MentionInputViewProps {
  value: string;
  onChange: (value: string) => void;
  users: MentionUser[];
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** @mention autocomplete textarea. */
export function MentionInputView({
  value,
  onChange,
  users,
  placeholder = 'Write a comment… use @ to mention',
  rows = 3,
  disabled = false,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: MentionInputViewProps) {
  const base = useInputBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [query, setQuery] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = useMemo(() => {
    if (query === null) return [];
    const q = query.toLowerCase();
    return users.filter(u => u.label.toLowerCase().includes(q)).slice(0, 6);
  }, [query, users]);

  const handleChange = (text: string) => {
    onChange(text);
    const caret = textareaRef.current?.selectionStart ?? text.length;
    const upToCaret = text.slice(0, caret);
    const match = upToCaret.match(/@([\w.-]*)$/);
    setQuery(match ? match[1] : null);
  };

  const insertMention = (user: MentionUser) => {
    const el = textareaRef.current;
    if (!el) return;
    const caret = el.selectionStart;
    const upToCaret = value.slice(0, caret);
    const replaced = upToCaret.replace(/@([\w.-]*)$/, `@${user.label} `);
    const next = replaced + value.slice(caret);
    onChange(next);
    setQuery(null);
    requestAnimationFrame(() => el.focus());
  };

  return (
    <div className={`dui_mentioninput ${className}`} style={{ position: 'relative', ...style }}>
      <textarea
        ref={textareaRef}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        onChange={e => handleChange(e.target.value)}
        style={{
          width: '100%', resize: 'vertical', fontSize: base.fontSize, fontFamily: 'inherit',
          padding: base.paddingX, border: '1px solid var(--color-input-border)', borderRadius: base.borderRadius,
          background: 'var(--color-input-bg)', color: 'var(--color-text-primary)', outline: 'none', boxSizing: 'border-box',
        }}
      />
      {query !== null && suggestions.length > 0 && textareaRef.current && createPortal(
        <div
          className="dui_mentioninput__menu"
          style={{
            position: 'fixed', zIndex: 99999,
            top: textareaRef.current.getBoundingClientRect().bottom + 4,
            left: textareaRef.current.getBoundingClientRect().left,
          }}
        >
          {suggestions.map(u => (
            <button key={u.id} type="button" className="dui_mentioninput__item" onClick={() => insertMention(u)} style={{ fontSize: base.fontSize, color: accent }}>
              @{u.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
