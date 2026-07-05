import { useRef, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';

export interface OtpInputViewProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  /** Accepts only digits by default. Set false to allow any character. */
  numeric?: boolean;
  disabled?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function OtpInputView({
  value,
  onChange,
  onComplete,
  length = 6,
  numeric = true,
  disabled = false,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: OtpInputViewProps) {
  const base = useInputBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const commit = (next: string) => {
    onChange(next);
    if (next.length === length && !next.includes('')) onComplete?.(next);
  };

  const setChar = (idx: number, char: string) => {
    const arr = chars.slice();
    arr[idx] = char;
    commit(arr.join(''));
  };

  const handleChange = (idx: number, raw: string) => {
    const filtered = numeric ? raw.replace(/[^0-9]/g, '') : raw;
    if (!filtered) { setChar(idx, ''); return; }
    const char = filtered[filtered.length - 1];
    setChar(idx, char);
    if (idx < length - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (chars[idx]) { setChar(idx, ''); }
      else if (idx > 0) { inputRefs.current[idx - 1]?.focus(); setChar(idx - 1, ''); }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const filtered = numeric ? text.replace(/[^0-9]/g, '') : text;
    if (!filtered) return;
    const arr = chars.slice();
    for (let i = 0; i < filtered.length && idx + i < length; i++) arr[idx + i] = filtered[i];
    commit(arr.join(''));
    const nextEmpty = Math.min(idx + filtered.length, length - 1);
    inputRefs.current[nextEmpty]?.focus();
  };

  return (
    <div className={className} style={{ display: 'flex', gap: base.gap, ...style }}>
      {chars.map((char, idx) => (
        <input
          key={idx}
          ref={el => { inputRefs.current[idx] = el; }}
          type="text"
          inputMode={numeric ? 'numeric' : 'text'}
          maxLength={1}
          disabled={disabled}
          value={char}
          onChange={e => handleChange(idx, e.target.value)}
          onKeyDown={e => handleKeyDown(idx, e)}
          onPaste={e => handlePaste(idx, e)}
          onFocus={e => e.target.select()}
          style={{
            width: base.height,
            height: base.height,
            fontSize: base.fontSize,
            textAlign: 'center',
            borderRadius: base.borderRadius,
            border: `1.5px solid ${char ? accent : 'var(--color-input-border)'}`,
            background: 'var(--color-input-bg)',
            color: 'var(--color-text-primary)',
            fontWeight: 700,
            outline: 'none',
            opacity: disabled ? 0.5 : 1,
            transition: 'border-color 140ms',
          }}
        />
      ))}
    </div>
  );
}
