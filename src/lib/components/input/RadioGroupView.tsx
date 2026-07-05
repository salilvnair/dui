import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDui } from '../../core/DuiContext';
import { DUI_CHECKBOX, DUI_FONT_SIZE } from '../../core/DuiTokens';

const DUI_SIZES: DuiSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupViewProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  size?: DuiSize;
  accentColor?: string;
  disabled?: boolean;
  /** Stack rows vertically (default) or lay them out horizontally. */
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: CSSProperties;
}

export function RadioGroupView({
  options,
  value,
  onChange,
  size,
  accentColor,
  disabled = false,
  direction = 'vertical',
  className = '',
  style,
}: RadioGroupViewProps) {
  const ctx = useDui();
  const s = size ?? ctx.size;
  const accent = accentColor ?? ctx.activeColor ?? 'var(--color-primary)';
  const { box } = DUI_CHECKBOX[s];
  const labelS = DUI_SIZES[Math.max(0, DUI_SIZES.indexOf(s) - 1)];
  const fontSize = DUI_FONT_SIZE[labelS];
  const descFontSize = DUI_FONT_SIZE[DUI_SIZES[Math.max(0, DUI_SIZES.indexOf(labelS) - 1)]];

  return (
    <div
      role="radiogroup"
      className={className}
      style={{ display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: direction === 'vertical' ? 8 : 16, ...style }}
    >
      {options.map(opt => {
        const isActive = opt.value === value;
        const isDisabled = disabled || opt.disabled;
        return (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              alignItems: opt.description ? 'flex-start' : 'center',
              gap: 8,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              opacity: isDisabled ? 0.5 : 1,
            }}
            onClick={() => !isDisabled && onChange(opt.value)}
          >
            <span
              style={{
                width: box,
                height: box,
                borderRadius: '999px',
                flexShrink: 0,
                marginTop: opt.description ? 2 : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isActive ? `2px solid ${accent}` : '1.5px solid color-mix(in srgb, var(--color-text-primary) 28%, transparent)',
                transition: 'border-color 120ms',
                boxSizing: 'border-box',
              }}
            >
              {isActive && (
                <span style={{ width: box * 0.5, height: box * 0.5, borderRadius: '999px', background: accent }} />
              )}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize, fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>{opt.label}</span>
              {opt.description && (
                <span style={{ fontSize: descFontSize, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{opt.description}</span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
