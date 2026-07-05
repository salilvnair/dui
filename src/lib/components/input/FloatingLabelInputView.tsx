import { useState, type CSSProperties } from 'react';
import type { DuiSize, DuiWidth, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import './FloatingLabelInputView.css';

export interface FloatingLabelInputViewProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Floating-label input, distinct from TextInputView's static placeholder. */
export function FloatingLabelInputView({
  label,
  value,
  onChange,
  type = 'text',
  disabled,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: FloatingLabelInputViewProps) {
  const base = useInputBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div
      className={`dui_floatinglabel ${className}`}
      style={{ width: base.width, ['--dui-floatinglabel-accent' as string]: accent, ...style }}
    >
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', height: base.height, fontSize: base.fontSize, padding: `0 ${base.paddingX}`,
          borderRadius: base.borderRadius, border: `1px solid ${focused ? accent : 'var(--color-surface-border)'}`,
          background: 'var(--color-surface)', color: 'var(--color-text-primary)', outline: 'none',
          boxSizing: 'border-box', opacity: disabled ? 0.5 : 1,
        }}
      />
      <label className={`dui_floatinglabel__label ${floated ? 'dui_floatinglabel__label--float' : ''}`} style={{ fontSize: base.fontSize }}>
        {label}
      </label>
    </div>
  );
}
