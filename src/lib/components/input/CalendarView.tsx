import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useDateBase } from '../../core/DateBase';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '../../../icons';
import './CalendarView.css';

export type CalendarMode = 'single' | 'range' | 'multi';

/** Visual treatment for in-range days in `range` mode. */
export type CalendarRangeStyle = 'tint' | 'block';

/** ISO `YYYY-MM-DD` date string. */
export type IsoDate = string;

export interface CalendarViewProps {
  mode?: CalendarMode;
  /** `single`: IsoDate | null. `range`: [IsoDate | null, IsoDate | null]. `multi`: IsoDate[]. */
  value: IsoDate | null | [IsoDate | null, IsoDate | null] | IsoDate[];
  onChange: (value: IsoDate | [IsoDate | null, IsoDate | null] | IsoDate[]) => void;
  minDate?: IsoDate;
  maxDate?: IsoDate;
  disabledDates?: (date: Date) => boolean;
  /** `tint` (default) = soft background on in-range days. `block` = solid connected "snake" of boxes. */
  rangeStyle?: CalendarRangeStyle;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  /** Accent color for selected day(s) and today's ring. */
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function toIso(d: Date): IsoDate {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function fromIso(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function buildGrid(monthAnchor: Date): Date[] {
  const first = startOfMonth(monthAnchor);
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}

/** Small anchored dropdown — trigger styled like a compact text input, portal menu with a real scrollbar. */
function MonthYearDropdown({
  label,
  items,
  activeValue,
  onSelect,
  accent,
  fontSize,
}: {
  label: string;
  items: { value: string; label: string }[];
  activeValue: string;
  onSelect: (value: string) => void;
  accent: string;
  fontSize: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    const position = () => {
      const r = trigger.getBoundingClientRect();
      menu.style.minWidth = `${r.width}px`;
      const menuH = menu.offsetHeight || 240;
      const spaceBelow = window.innerHeight - r.bottom;
      menu.style.top = spaceBelow < menuH + 8 && r.top > menuH + 8 ? `${r.top - menuH - 4}px` : `${r.bottom + 4}px`;
      menu.style.left = `${Math.min(r.left, window.innerWidth - menu.offsetWidth - 8)}px`;
    };
    position();
    const raf = requestAnimationFrame(() => {
      position();
      activeItemRef.current?.scrollIntoView({ block: 'center' });
    });
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
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const activeLabel = items.find(i => i.value === activeValue)?.label ?? '';

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="dui_calendar__dropdowntrigger"
        style={{ fontSize, borderColor: open ? accent : 'var(--color-input-border)' }}
      >
        {activeLabel}
        <ChevronDownIcon size={11} style={{ transition: 'transform 140ms', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--color-text-muted)' }} />
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          role="listbox"
          className="dui_calendar__dropdown"
          style={{ position: 'fixed', zIndex: 99999, '--dui-cal-accent': accent } as React.CSSProperties}
        >
          {items.map(item => {
            const active = item.value === activeValue;
            return (
              <button
                key={item.value}
                ref={active ? activeItemRef : undefined}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => { onSelect(item.value); setOpen(false); }}
                className={`dui_calendar__dropdownitem${active ? ' dui_calendar__dropdownitem--active' : ''}`}
                style={{ fontSize }}
              >
                {item.label}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}

export function CalendarView({
  mode = 'single',
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  rangeStyle = 'tint',
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: CalendarViewProps) {
  const base = useDateBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';

  const initialAnchor = useMemo(() => {
    if (mode === 'single' && typeof value === 'string') return fromIso(value);
    if (mode === 'range' && Array.isArray(value) && typeof value[0] === 'string') return fromIso(value[0] as string);
    if (mode === 'multi' && Array.isArray(value) && value.length && typeof value[0] === 'string') return fromIso(value[0] as string);
    return new Date();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [anchor, setAnchor] = useState(startOfMonth(initialAnchor));
  const [dir, setDir] = useState<'left' | 'right'>('right');

  const min = minDate ? fromIso(minDate) : undefined;
  const max = maxDate ? fromIso(maxDate) : undefined;

  const isDisabled = useCallback((d: Date) => {
    if (min && d < min) return true;
    if (max && d > max) return true;
    if (disabledDates?.(d)) return true;
    return false;
  }, [min, max, disabledDates]);

  const grid = useMemo(() => buildGrid(anchor), [anchor]);
  const today = new Date();

  const rangeVal = mode === 'range' && Array.isArray(value) ? (value as [IsoDate | null, IsoDate | null]) : [null, null];
  const multiVal = mode === 'multi' && Array.isArray(value) ? (value as IsoDate[]) : [];

  const dayState = useCallback((d: Date): 'selected' | 'range-start' | 'range-end' | 'in-range' | 'none' => {
    if (mode === 'single') {
      return typeof value === 'string' && isSameDay(d, fromIso(value)) ? 'selected' : 'none';
    }
    if (mode === 'range') {
      const [s, e] = rangeVal;
      if (s && isSameDay(d, fromIso(s))) return 'range-start';
      if (e && isSameDay(d, fromIso(e))) return 'range-end';
      if (s && e && d > fromIso(s) && d < fromIso(e)) return 'in-range';
      return 'none';
    }
    return multiVal.some(v => isSameDay(d, fromIso(v))) ? 'selected' : 'none';
  }, [mode, value, rangeVal, multiVal]);

  const handlePick = useCallback((d: Date) => {
    if (isDisabled(d)) return;
    const iso = toIso(d);
    if (mode === 'single') {
      onChange(iso);
    } else if (mode === 'range') {
      const [s, e] = rangeVal;
      if (!s || (s && e)) onChange([iso, null]);
      else if (fromIso(s) > d) onChange([iso, s]);
      else onChange([s, iso]);
    } else {
      const exists = multiVal.includes(iso);
      onChange(exists ? multiVal.filter(v => v !== iso) : [...multiVal, iso]);
    }
  }, [mode, onChange, isDisabled, rangeVal, multiVal]);

  const nav = (n: number) => { setDir(n > 0 ? 'right' : 'left'); setAnchor(a => addMonths(a, n)); };

  const monthOptions = useMemo(() => MONTH_NAMES.map((m, i) => ({ value: String(i), label: m })), []);
  const currentYear = anchor.getFullYear();
  const yearOptions = useMemo(() => Array.from({ length: 121 }, (_, i) => {
    const y = currentYear - 60 + i;
    return { value: String(y), label: String(y) };
  }), [currentYear]);

  return (
    <div
      className={`dui_calendar ${className}`}
      style={{
        width: base.width,
        borderRadius: base.borderRadius,
        border: '1px solid var(--color-surface-border)',
        background: 'var(--color-surface)',
        padding: base.paddingX,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: base.gap, gap: 6 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <MonthYearDropdown
            label="Select month"
            items={monthOptions}
            activeValue={String(anchor.getMonth())}
            onSelect={v => setAnchor(new Date(anchor.getFullYear(), Number(v), 1))}
            accent={accent}
            fontSize={base.fontSize}
          />
          <MonthYearDropdown
            label="Select year"
            items={yearOptions}
            activeValue={String(anchor.getFullYear())}
            onSelect={v => setAnchor(new Date(Number(v), anchor.getMonth(), 1))}
            accent={accent}
            fontSize={base.fontSize}
          />
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <button type="button" className="dui_calendar__nav" onClick={() => nav(-1)} aria-label="Previous month">
            <ChevronLeftIcon size={base.cellSize * 0.4} />
          </button>
          <button type="button" className="dui_calendar__nav" onClick={() => nav(1)} aria-label="Next month">
            <ChevronRightIcon size={base.cellSize * 0.4} />
          </button>
        </div>
      </div>

      <div key={anchor.toISOString()} className={`dui_calendar__grid dui_calendar__grid--${dir}`}>
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="dui_calendar__weekday" style={{ width: base.cellSize, fontSize: base.fontSize }}>{w}</div>
        ))}
        {grid.map((d, i) => {
          const outside = d.getMonth() !== anchor.getMonth();
          const state = dayState(d);
          const disabled = isDisabled(d);
          const isToday = isSameDay(d, today);
          const isActiveState = (s: typeof state) => s === 'in-range' || s === 'range-start' || s === 'range-end';
          const showBar = rangeStyle === 'block' && isActiveState(state);
          const connectLeft = showBar && i % 7 !== 0 && isActiveState(dayState(grid[i - 1]));
          const connectRight = showBar && i % 7 !== 6 && isActiveState(dayState(grid[i + 1]));
          const barRadius = base.cellSize / 2;

          return (
            <div key={i} className="dui_calendar__cell" style={{ height: base.cellSize }}>
              {showBar && (
                <span
                  className="dui_calendar__rangebar"
                  style={{
                    background: state === 'in-range'
                      ? `color-mix(in srgb, ${accent} 18%, transparent)`
                      : accent,
                    borderTopLeftRadius: connectLeft ? 0 : barRadius,
                    borderBottomLeftRadius: connectLeft ? 0 : barRadius,
                    borderTopRightRadius: connectRight ? 0 : barRadius,
                    borderBottomRightRadius: connectRight ? 0 : barRadius,
                  }}
                />
              )}
              <button
                type="button"
                disabled={disabled}
                onClick={() => handlePick(d)}
                className={[
                  'dui_calendar__day',
                  outside && 'dui_calendar__day--outside',
                  isToday && 'dui_calendar__day--today',
                  !showBar && (state === 'selected' || state === 'range-start' || state === 'range-end') && 'dui_calendar__day--selected',
                  showBar && (state === 'range-start' || state === 'range-end') && 'dui_calendar__day--barcap',
                  !showBar && state === 'in-range' && 'dui_calendar__day--inrange',
                  disabled && 'dui_calendar__day--disabled',
                ].filter(Boolean).join(' ')}
                style={{
                  width: base.cellSize,
                  height: base.cellSize,
                  fontSize: base.fontSize,
                  '--dui-cal-accent': accent,
                } as React.CSSProperties}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
