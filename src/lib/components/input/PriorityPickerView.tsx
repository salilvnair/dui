import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useToggleBase } from '../../core/ToggleBase';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface PriorityPickerViewProps {
  value: PriorityLevel;
  onChange: (value: PriorityLevel) => void;
  size?: DuiSize;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const LEVELS: { value: PriorityLevel; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'var(--color-info)' },
  { value: 'medium', label: 'Medium', color: 'var(--color-warning)' },
  { value: 'high', label: 'High', color: 'var(--color-error)' },
  { value: 'urgent', label: 'Urgent', color: '#a855f7' },
];

/** Low/medium/high/urgent selector with color-coded dots — a color-coded priority picker. */
export function PriorityPickerView({
  value,
  onChange,
  size,
  disabled = false,
  className = '',
  style,
}: PriorityPickerViewProps) {
  const base = useToggleBase(size);

  return (
    <div className={className} style={{ display: 'inline-flex', gap: 4, ...style }}>
      {LEVELS.map(level => {
        const active = level.value === value;
        return (
          <button
            key={level.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(level.value)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 999,
              border: `1px solid ${active ? level.color : 'var(--color-surface-border)'}`,
              background: active ? `color-mix(in srgb, ${level.color} 14%, transparent)` : 'transparent',
              cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
              fontSize: base.fontSize, fontWeight: active ? 700 : 500,
              color: active ? level.color : 'var(--color-text-secondary)',
              transition: 'background 120ms, border-color 120ms',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '999px', background: level.color, flexShrink: 0 }} />
            {level.label}
          </button>
        );
      })}
    </div>
  );
}
