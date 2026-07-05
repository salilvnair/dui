import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useDateBase } from '../../core/DateBase';
import { CalendarView, type IsoDate, type CalendarRangeStyle } from './CalendarView';

export interface DateRangePreset {
  label: string;
  getRange: () => [IsoDate, IsoDate];
}

/** `panel` (default) = presets sidebar beside the calendar, one bordered box. `single` = one unified box, presets as a chip row above the calendar. */
export type DateRangePickerVariant = 'panel' | 'single';

export interface DateRangePickerViewProps {
  value: [IsoDate | null, IsoDate | null];
  onChange: (value: [IsoDate | null, IsoDate | null]) => void;
  presets?: DateRangePreset[];
  variant?: DateRangePickerVariant;
  /** Visual treatment for in-range days — see `CalendarView`. Defaults to `block` here (a connected "snake" of boxes reads better in a range picker). */
  rangeStyle?: CalendarRangeStyle;
  minDate?: IsoDate;
  maxDate?: IsoDate;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

function toIso(d: Date): IsoDate {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysAgo(n: number): IsoDate {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toIso(d);
}

export const DEFAULT_DATE_RANGE_PRESETS: DateRangePreset[] = [
  { label: 'Today', getRange: () => [toIso(new Date()), toIso(new Date())] },
  { label: 'Last 7 days', getRange: () => [daysAgo(6), toIso(new Date())] },
  { label: 'Last 30 days', getRange: () => [daysAgo(29), toIso(new Date())] },
  { label: 'This month', getRange: () => {
    const now = new Date();
    return [toIso(new Date(now.getFullYear(), now.getMonth(), 1)), toIso(now)];
  } },
];

export function DateRangePickerView({
  value,
  onChange,
  presets = DEFAULT_DATE_RANGE_PRESETS,
  variant = 'panel',
  rangeStyle = 'block',
  minDate,
  maxDate,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: DateRangePickerViewProps) {
  const base = useDateBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [start, end] = value;

  const calendar = (
    <CalendarView
      mode="range"
      value={value}
      onChange={v => onChange(v as [IsoDate | null, IsoDate | null])}
      minDate={minDate}
      maxDate={maxDate}
      rangeStyle={rangeStyle}
      size={size}
      color={color}
      style={{ border: 'none', padding: 0, background: 'transparent', width: 'auto' }}
    />
  );

  const presetButton = (p: DateRangePreset, chip: boolean) => {
    const range = p.getRange();
    const active = start === range[0] && end === range[1];
    return (
      <button
        key={p.label}
        type="button"
        onClick={() => onChange(range)}
        style={chip ? {
          padding: '5px 12px',
          borderRadius: 999,
          border: `1px solid ${active ? accent : 'var(--color-surface-border)'}`,
          fontSize: base.fontSize,
          fontWeight: active ? 700 : 500,
          background: active ? `color-mix(in srgb, ${accent} 14%, transparent)` : 'transparent',
          color: active ? accent : 'var(--color-text-secondary)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        } : {
          textAlign: 'left',
          padding: '6px 8px',
          borderRadius: 6,
          border: 'none',
          fontSize: base.fontSize,
          fontWeight: active ? 700 : 500,
          background: active ? `color-mix(in srgb, ${accent} 14%, transparent)` : 'transparent',
          color: active ? accent : 'var(--color-text-secondary)',
          cursor: 'pointer',
        }}
      >
        {p.label}
      </button>
    );
  };

  if (variant === 'single') {
    return (
      <div
        className={`dui_daterange dui_daterange--single ${className}`}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: base.gap,
          border: '1px solid var(--color-surface-border)',
          borderRadius: base.borderRadius,
          background: 'var(--color-surface)',
          padding: base.paddingX,
          boxSizing: 'border-box',
          ...style,
        }}
      >
        {presets.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {presets.map(p => presetButton(p, true))}
          </div>
        )}
        {calendar}
      </div>
    );
  }

  return (
    <div
      className={`dui_daterange dui_daterange--panel ${className}`}
      style={{
        display: 'inline-flex',
        border: '1px solid var(--color-surface-border)',
        borderRadius: base.borderRadius,
        background: 'var(--color-surface)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {presets.length > 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 2, padding: base.paddingX,
          borderRight: '1px solid var(--color-surface-border)', minWidth: 120,
        }}>
          {presets.map(p => presetButton(p, false))}
        </div>
      )}
      <div style={{ padding: base.paddingX }}>
        {calendar}
      </div>
    </div>
  );
}
