import type { CSSProperties } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';

/**
 * Mask tokens: `9` = digit, `A` = letter, `*` = any character.
 * Any other character in the mask is a literal separator, auto-inserted.
 */
export interface MaskedInputViewProps {
  value: string;
  onChange: (value: string) => void;
  mask: string;
  placeholder?: string;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function matchesToken(token: string, char: string): boolean {
  if (token === '9') return /[0-9]/.test(char);
  if (token === 'A') return /[a-zA-Z]/.test(char);
  return true; // '*'
}

export function applyMask(mask: string, raw: string): string {
  const chars = raw.split('');
  let out = '';
  let ci = 0;
  for (let mi = 0; mi < mask.length && ci < chars.length; mi++) {
    const token = mask[mi];
    if (token === '9' || token === 'A' || token === '*') {
      while (ci < chars.length && !matchesToken(token, chars[ci])) ci++;
      if (ci >= chars.length) break;
      out += chars[ci];
      ci++;
    } else {
      out += token;
      if (chars[ci] === token) ci++;
    }
  }
  return out;
}

export function MaskedInputView({
  value,
  onChange,
  mask,
  placeholder,
  disabled = false,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: MaskedInputViewProps) {
  const base = useInputBase(size, { width, borderRadius, color });

  return (
    <input
      type="text"
      className={className}
      disabled={disabled}
      placeholder={placeholder ?? mask.replace(/9/g, '_').replace(/A/g, '_')}
      value={value}
      onChange={e => onChange(applyMask(mask, e.target.value))}
      style={{
        width: base.width,
        height: base.height,
        fontSize: base.fontSize,
        paddingLeft: base.paddingX,
        paddingRight: base.paddingX,
        borderRadius: base.borderRadius,
        border: '1px solid var(--color-input-border)',
        background: 'var(--color-input-bg)',
        color: 'var(--color-text-primary)',
        outline: 'none',
        fontFamily: 'monospace',
        letterSpacing: '0.03em',
        boxSizing: 'border-box',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    />
  );
}
