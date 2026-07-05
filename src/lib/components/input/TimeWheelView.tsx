import { useMemo, useCallback } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { PickerView, type PickerColumn } from './PickerView';

export interface TimeWheelValue {
  hour: number;   // 1-12 (12h) or 0-23 (24h)
  minute: number; // 0-59
  meridiem?: 'AM' | 'PM'; // only used when use24Hour is false
}

export interface TimeWheelViewProps {
  value: TimeWheelValue;
  onChange: (value: TimeWheelValue) => void;
  use24Hour?: boolean;
  minuteStep?: number;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  visibleRows?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TimeWheelView({
  value,
  onChange,
  use24Hour = false,
  minuteStep = 1,
  size,
  width,
  borderRadius,
  color,
  visibleRows,
  disabled,
  className,
  style,
}: TimeWheelViewProps) {
  const hourOptions = useMemo(() => {
    if (use24Hour) return Array.from({ length: 24 }, (_, i) => ({ value: String(i), label: String(i).padStart(2, '0') }));
    return Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
  }, [use24Hour]);

  const minuteOptions = useMemo(() => {
    const count = Math.floor(60 / minuteStep);
    return Array.from({ length: count }, (_, i) => {
      const m = i * minuteStep;
      return { value: String(m), label: String(m).padStart(2, '0') };
    });
  }, [minuteStep]);

  const meridiemOptions = useMemo(() => [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }], []);

  const setHour = useCallback((v: string) => onChange({ ...value, hour: Number(v) }), [value, onChange]);
  const setMinute = useCallback((v: string) => onChange({ ...value, minute: Number(v) }), [value, onChange]);
  const setMeridiem = useCallback((v: string) => onChange({ ...value, meridiem: v as 'AM' | 'PM' }), [value, onChange]);

  const columns: PickerColumn[] = [
    { options: hourOptions, value: String(value.hour), onChange: setHour, label: 'Hour' },
    { options: minuteOptions, value: String(value.minute), onChange: setMinute, label: 'Min' },
  ];
  if (!use24Hour) {
    columns.push({ options: meridiemOptions, value: value.meridiem ?? 'AM', onChange: setMeridiem, label: '' });
  }

  return (
    <PickerView
      columns={columns}
      size={size}
      width={width}
      borderRadius={borderRadius}
      color={color}
      visibleRows={visibleRows}
      disabled={disabled}
      className={className}
      style={style}
    />
  );
}
