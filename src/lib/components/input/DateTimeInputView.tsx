import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { CalendarView, type IsoDate } from './CalendarView';
import { TimeWheelView, type TimeWheelValue } from './TimeWheelView';
import { CalendarEventIcon } from '../../../icons';

/** Local `YYYY-MM-DDTHH:mm` — no timezone suffix, same shape a native
 * `<input type="datetime-local">` produces, so it's a drop-in replacement. */
export type IsoDateTime = string;

export interface DateTimeInputViewProps {
  value: IsoDateTime | null;
  onChange: (value: IsoDateTime) => void;
  placeholder?: string;
  minDate?: IsoDate;
  maxDate?: IsoDate;
  use24Hour?: boolean;
  minuteStep?: number;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function splitValue(v: IsoDateTime | null): { date: IsoDate | null; time: TimeWheelValue } {
  if (!v) return { date: null, time: { hour: 9, minute: 0, meridiem: 'AM' } };
  const [datePart, timePart = '09:00'] = v.split('T');
  const [h24, m] = timePart.split(':').map(Number);
  const meridiem: 'AM' | 'PM' = h24 >= 12 ? 'PM' : 'AM';
  const hour12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return { date: datePart, time: { hour: hour12, minute: m, meridiem } };
}

function joinValue(date: IsoDate, time: TimeWheelValue, use24Hour: boolean): IsoDateTime {
  let h24 = time.hour;
  if (!use24Hour) {
    h24 = time.hour % 12;
    if (time.meridiem === 'PM') h24 += 12;
  }
  return `${date}T${String(h24).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
}

function formatDisplay(v: IsoDateTime | null, use24Hour: boolean): string {
  if (!v) return '';
  const [datePart, timePart] = v.split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  const [h, min] = (timePart || '09:00').split(':').map(Number);
  const dt = new Date(y, m - 1, d, h, min);
  return dt.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: !use24Hour,
  });
}

/**
 * DateTimeInputView — a proper DUI-styled replacement for the native
 * `<input type="datetime-local">`, whose picker chrome is OS-rendered and
 * looks inconsistent with everything else in the app. Composes the existing
 * `CalendarView` (date grid) and `TimeWheelView` (hour/minute/meridiem
 * wheels) side by side in one popover — same trigger-button + portal pattern
 * as `DateInputView`, just with a second pane.
 */
export function DateTimeInputView({
  value,
  onChange,
  placeholder = 'Select date & time…',
  minDate,
  maxDate,
  use24Hour = false,
  minuteStep = 5,
  size,
  width,
  borderRadius,
  color,
  disabled = false,
  className = '',
  style,
}: DateTimeInputViewProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const base = useInputBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const { date, time } = splitValue(value);

  useEffect(() => {
    if (!open || !triggerRef.current || !popRef.current) return;
    const trigger = triggerRef.current;
    const pop = popRef.current;
    const position = () => {
      const r = trigger.getBoundingClientRect();
      pop.style.top = `${r.bottom + 6}px`;
      pop.style.left = `${Math.min(r.left, window.innerWidth - pop.offsetWidth - 8)}px`;
    };
    position();
    const raf = requestAnimationFrame(position);
    window.addEventListener('scroll', position, { passive: true, capture: true });
    window.addEventListener('resize', position, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', position, { capture: true });
      window.removeEventListener('resize', position);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (popRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className={`relative inline-block ${className}`} style={style}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: base.gap,
          width: base.width,
          height: base.height,
          paddingLeft: base.paddingX,
          paddingRight: base.paddingX,
          fontSize: base.fontSize,
          background: 'var(--color-input-bg)',
          border: `1px solid ${open ? accent : 'var(--color-input-border)'}`,
          borderRadius: base.borderRadius,
          color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          cursor: disabled ? 'default' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 140ms',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <CalendarEventIcon size={base.iconSize} style={{ flexShrink: 0, color: 'var(--color-text-muted)' }} />
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value ? formatDisplay(value, use24Hour) : placeholder}
        </span>
      </button>

      {open && createPortal(
        <div
          ref={popRef}
          style={{
            position: 'fixed',
            zIndex: 99999,
            display: 'flex',
            boxShadow: '0 12px 40px rgba(0,0,0,.35)',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid var(--color-input-border)',
          }}
        >
          <CalendarView
            mode="single"
            value={date}
            onChange={(v) => onChange(joinValue(v as IsoDate, time, use24Hour))}
            minDate={minDate}
            maxDate={maxDate}
            size={size}
            color={color}
          />
          <div style={{ borderLeft: '1px solid var(--color-input-border)', display: 'flex', alignItems: 'stretch' }}>
            <TimeWheelView
              value={time}
              onChange={(v) => onChange(joinValue(date ?? toTodayIso(), v, use24Hour))}
              use24Hour={use24Hour}
              minuteStep={minuteStep}
              size={size}
              color={color}
            />
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

function toTodayIso(): IsoDate {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
