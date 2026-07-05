import type { CSSProperties } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { SelectInputView, type SelectOption } from './SelectInputView';
import './PhoneInputView.css';

export interface PhoneCountry {
  code: string;
  dialCode: string;
  label: string;
  flag?: string;
}

export const DEFAULT_PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'US', dialCode: '+1', label: 'United States', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IN', dialCode: '+91', label: 'India', flag: '🇮🇳' },
  { code: 'CA', dialCode: '+1', label: 'Canada', flag: '🇨🇦' },
  { code: 'AU', dialCode: '+61', label: 'Australia', flag: '🇦🇺' },
  { code: 'DE', dialCode: '+49', label: 'Germany', flag: '🇩🇪' },
  { code: 'FR', dialCode: '+33', label: 'France', flag: '🇫🇷' },
  { code: 'JP', dialCode: '+81', label: 'Japan', flag: '🇯🇵' },
  { code: 'SG', dialCode: '+65', label: 'Singapore', flag: '🇸🇬' },
  { code: 'AE', dialCode: '+971', label: 'United Arab Emirates', flag: '🇦🇪' },
];

export interface PhoneInputViewProps {
  countryCode: string;
  onCountryChange: (code: string) => void;
  number: string;
  onNumberChange: (number: string) => void;
  countries?: PhoneCountry[];
  placeholder?: string;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PhoneInputView({
  countryCode,
  onCountryChange,
  number,
  onNumberChange,
  countries = DEFAULT_PHONE_COUNTRIES,
  placeholder = 'Phone number',
  disabled = false,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: PhoneInputViewProps) {
  const base = useInputBase(size, { width, borderRadius, color });

  const options: SelectOption[] = countries.map(c => ({
    value: c.code,
    label: `${c.flag ?? ''} ${c.dialCode}`.trim(),
  }));

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        width: base.width,
        border: '1px solid var(--color-input-border)',
        borderRadius: base.borderRadius,
        background: 'var(--color-input-bg)',
        overflow: 'hidden',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <SelectInputView
        options={options}
        value={countryCode}
        onChange={onCountryChange}
        size={size}
        style={{ width: 90, flexShrink: 0 }}
        borderRadius={0}
        className="dui_phoneinput__select"
      />
      <div style={{ width: 1, background: 'var(--color-input-border)', flexShrink: 0 }} />
      <input
        type="tel"
        disabled={disabled}
        placeholder={placeholder}
        value={number}
        onChange={e => onNumberChange(e.target.value.replace(/[^0-9\s-]/g, ''))}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'var(--color-text-primary)',
          fontSize: base.fontSize,
          paddingLeft: base.paddingX,
          paddingRight: base.paddingX,
        }}
      />
    </div>
  );
}
