import type { CSSProperties } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { PlusIcon, MinusIcon } from '../../../icons';

export interface StepperInputViewProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function StepperInputView({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: StepperInputViewProps) {
  const base = useInputBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const dec = () => onChange(clamp(value - step));
  const inc = () => onChange(clamp(value + step));

  const btnStyle: CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: base.height, height: base.height, flexShrink: 0,
    border: 'none', background: 'transparent', color: accent, cursor: disabled ? 'default' : 'pointer',
  };

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center',
        border: '1px solid var(--color-input-border)', borderRadius: base.borderRadius,
        background: 'var(--color-input-bg)', overflow: 'hidden',
        opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
    >
      <button type="button" style={btnStyle} onClick={dec} disabled={value <= min} aria-label="Decrease">
        <MinusIcon size={base.iconSize} />
      </button>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={e => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(clamp(n));
        }}
        style={{
          width: parseInt(base.height, 10) * 1.4, textAlign: 'center', border: 'none', borderLeft: '1px solid var(--color-input-border)',
          borderRight: '1px solid var(--color-input-border)', background: 'transparent', color: 'var(--color-text-primary)',
          fontSize: base.fontSize, fontWeight: 700, outline: 'none', height: base.height,
        }}
      />
      <button type="button" style={btnStyle} onClick={inc} disabled={value >= max} aria-label="Increase">
        <PlusIcon size={base.iconSize} />
      </button>
    </div>
  );
}
