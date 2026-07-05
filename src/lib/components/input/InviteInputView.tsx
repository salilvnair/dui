import { useState, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { CloseIcon } from '../../../icons';

export interface InviteInputViewProps {
  emails: string[];
  onChange: (emails: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Email-chip input specialized for multi-invite forms — validates each entry before adding. */
export function InviteInputView({
  emails,
  onChange,
  placeholder = 'Enter email and press Enter…',
  disabled = false,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: InviteInputViewProps) {
  const base = useInputBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [draft, setDraft] = useState('');
  const [error, setError] = useState(false);

  const commit = () => {
    const value = draft.trim().replace(/,$/, '');
    if (!value) return;
    if (!EMAIL_RE.test(value)) { setError(true); return; }
    if (!emails.includes(value)) onChange([...emails, value]);
    setDraft('');
    setError(false);
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', minHeight: base.height,
        padding: '4px 6px', border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-input-border)'}`,
        borderRadius: base.borderRadius, background: 'var(--color-input-bg)',
        opacity: disabled ? 0.5 : 1, boxSizing: 'border-box', ...style,
      }}
    >
      {emails.map(email => (
        <span key={email} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 6px', borderRadius: 5, background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent, fontSize: base.fontSize, fontWeight: 600 }}>
          {email}
          <button type="button" onClick={() => onChange(emails.filter(e => e !== email))} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', padding: 0, opacity: 0.7 }}>
            <CloseIcon size={10} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        disabled={disabled}
        placeholder={emails.length === 0 ? placeholder : ''}
        onChange={e => { setDraft(e.target.value); setError(false); }}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit(); } if (e.key === 'Backspace' && !draft && emails.length) onChange(emails.slice(0, -1)); }}
        onBlur={commit}
        style={{ flex: 1, minWidth: 120, border: 'none', outline: 'none', background: 'transparent', color: 'var(--color-text-primary)', fontSize: base.fontSize }}
      />
    </div>
  );
}
