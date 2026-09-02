/**
 * TimeZoneSelectView — an IANA time zone picker, and the conversion that makes
 * one useful.
 *
 * A `datetime-local` value is a wall-clock reading with no zone attached, so it
 * means whatever zone the reader assumes. That is fine while both ends of a
 * system share one, and wrong the moment they do not: a server writing UTC and
 * a person reading CST disagree by five hours, and nothing on screen says so.
 * Typing the timestamp you just read in a log then selects a window five hours
 * away from the one you meant.
 *
 * So the zone is named rather than assumed, and the pairing of a
 * `DateTimeInputView` with this control converts to an instant explicitly.
 */
import { useMemo } from 'react';
import { SelectInputView } from './SelectInputView';
import type { SelectInputSize } from './SelectInputView';

/** The browser's own zone, e.g. `America/Chicago`. */
export function localTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

/** The zones this runtime knows, common ones first. Falls back to a short list. */
export function timeZoneList(): string[] {
  const common = ['UTC', localTimeZone()];
  let all: string[] = [];
  try {
    // Not in every runtime; the catch is the point of the try.
    all = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] })
      .supportedValuesOf?.('timeZone') ?? [];
  } catch { all = []; }
  if (!all.length) {
    all = [
      'UTC', 'America/Los_Angeles', 'America/Denver', 'America/Chicago',
      'America/New_York', 'America/Sao_Paulo', 'Europe/London', 'Europe/Berlin',
      'Europe/Moscow', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore',
      'Asia/Tokyo', 'Australia/Sydney',
    ];
  }
  const seen = new Set<string>();
  return [...common, ...all].filter(z => z && !seen.has(z) && seen.add(z));
}

/** The parts of `date` as they read in `timeZone`. */
function partsIn(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const got: Record<string, number> = {};
  for (const p of fmt.formatToParts(date)) {
    if (p.type !== 'literal') got[p.type] = Number(p.value);
  }
  return {
    year: got.year, month: got.month, day: got.day,
    // `hour12: false` renders midnight as 24 in some runtimes.
    hour: got.hour === 24 ? 0 : got.hour,
    minute: got.minute, second: got.second,
  };
}

/** How far `timeZone` sits from UTC at `date`, in milliseconds. */
export function zoneOffsetMs(date: Date, timeZone: string): number {
  const p = partsIn(date, timeZone);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/**
 * A wall-clock `YYYY-MM-DDTHH:mm` read in `timeZone`, as an instant.
 *
 * Twice, because the offset itself depends on the instant: the first pass uses
 * the offset at the guessed time, and near a daylight-saving change that guess
 * can land on the wrong side of the transition. Re-deriving the offset at the
 * corrected instant settles it.
 */
export function zonedToUtcMs(local: string, timeZone: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(local);
  if (!m) return NaN;
  const [, y, mo, d, h, mi] = m.map(Number) as unknown as number[];
  const naive = Date.UTC(y, mo - 1, d, h, mi);
  let ms = naive - zoneOffsetMs(new Date(naive), timeZone);
  ms = naive - zoneOffsetMs(new Date(ms), timeZone);
  return ms;
}

/** An instant as a `YYYY-MM-DDTHH:mm` wall-clock reading in `timeZone`. */
export function utcMsToZoned(ms: number, timeZone: string): string {
  const p = partsIn(new Date(ms), timeZone);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}`;
}

/** `UTC+05:30`, the way an offset is usually written. */
export function offsetLabel(timeZone: string, at: Date = new Date()): string {
  const mins = Math.round(zoneOffsetMs(at, timeZone) / 60000);
  const sign = mins < 0 ? '-' : '+';
  const abs = Math.abs(mins);
  return `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}

export interface TimeZoneSelectViewProps {
  value: string;
  onChange: (timeZone: string) => void;
  size?: SelectInputSize;
  width?: string | number;
  color?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TimeZoneSelectView({
  value, onChange, size = 'md', width = 210, color, disabled, className, style,
}: TimeZoneSelectViewProps) {
  const options = useMemo(() => {
    const now = new Date();
    return timeZoneList().map(z => ({
      value: z,
      // The offset is on the label because it is the part being reasoned about;
      // a zone name alone still leaves "so how far is that from the log".
      label: `${z === localTimeZone() && z !== 'UTC' ? `${z} (local)` : z} \u2014 ${offsetLabel(z, now)}`,
    }));
  }, []);

  return (
    <SelectInputView
      value={value}
      onChange={onChange}
      options={options}
      size={size}
      width={width}
      accentColor={color}
      disabled={disabled}
      className={className}
      style={style}
    />
  );
}
