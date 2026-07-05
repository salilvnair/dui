import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { CheckCircleIcon } from '../../../icons';

export interface RadioCardOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface RadioCardViewProps {
  options: RadioCardOption[];
  value: string;
  onChange: (value: string) => void;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  accentColor?: string;
  /** Number of columns in the card grid. Default 1 (stacked rows). */
  columns?: number;
  className?: string;
  style?: CSSProperties;
}

export function RadioCardView({
  options,
  value,
  onChange,
  size,
  borderRadius,
  accentColor,
  columns = 1,
  className = '',
  style,
}: RadioCardViewProps) {
  const base = useCardBase(size, { borderRadius });
  const accent = accentColor ?? base.color ?? 'var(--color-primary)';

  return (
    <div
      className={className}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: base.gap, ...style }}
    >
      {options.map(opt => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: base.gap,
              padding: base.padding,
              borderRadius: base.borderRadius,
              border: `1.5px solid ${isActive ? accent : 'var(--color-surface-border)'}`,
              background: isActive ? `color-mix(in srgb, ${accent} 8%, transparent)` : 'var(--color-surface)',
              cursor: opt.disabled ? 'not-allowed' : 'pointer',
              opacity: opt.disabled ? 0.5 : 1,
              textAlign: 'left',
              transition: 'border-color 140ms, background 140ms',
              fontFamily: 'inherit',
              position: 'relative',
            }}
          >
            {opt.icon && (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: isActive ? accent : 'var(--color-text-muted)' }}>
                {opt.icon}
              </span>
            )}
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              <span style={{ fontSize: base.fontSize, fontWeight: 700, color: isActive ? accent : 'var(--color-text-primary)' }}>{opt.label}</span>
              {opt.description && (
                <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{opt.description}</span>
              )}
            </span>
            {isActive && <CheckCircleIcon size={14} style={{ color: accent, flexShrink: 0 }} />}
          </button>
        );
      })}
    </div>
  );
}
