import { useState, useEffect, useRef, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';

export interface EditableCellViewProps {
  value: string;
  onChange: (value: string) => void;
  size?: DuiSize;
  color?: string;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

/** Click-to-edit table cell — click to enter edit mode, Enter to commit, Escape to cancel. */
export function EditableCellView({
  value,
  onChange,
  size,
  color,
  placeholder,
  className = '',
  style,
}: EditableCellViewProps) {
  const base = useTableBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) { setDraft(value); inputRef.current?.focus(); inputRef.current?.select(); } }, [editing, value]);

  const commit = () => { onChange(draft); setEditing(false); };
  const cancel = () => setEditing(false);

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') cancel(); }}
        className={className}
        style={{
          width: '100%', fontSize: base.cellFontSize, padding: '2px 6px', borderRadius: 4,
          border: `1.5px solid ${accent}`, background: 'var(--color-input-bg)', color: 'var(--color-text-primary)',
          outline: 'none', boxSizing: 'border-box', ...style,
        }}
      />
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className={className}
      style={{
        fontSize: base.cellFontSize, padding: '2px 6px', borderRadius: 4, cursor: 'text',
        color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
        border: '1.5px solid transparent', transition: 'border-color 100ms',
        ...style,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-surface-border)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
    >
      {value || placeholder || '—'}
    </div>
  );
}
