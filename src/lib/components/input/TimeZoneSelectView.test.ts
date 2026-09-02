import { describe, it, expect } from 'vitest';
import { zonedToUtcMs, utcMsToZoned, offsetLabel } from './TimeZoneSelectView';

describe('zonedToUtcMs', () => {
  it('reads a wall clock in UTC as that instant', () => {
    expect(zonedToUtcMs('2026-08-01T00:00', 'UTC')).toBe(Date.parse('2026-08-01T00:00:00Z'));
  });

  it('shifts by the zone offset, not the browser one', () => {
    // Chicago in August is CDT, UTC-5: midnight local is 05:00 UTC.
    expect(zonedToUtcMs('2026-08-01T00:00', 'America/Chicago'))
      .toBe(Date.parse('2026-08-01T05:00:00Z'));
  });

  it('handles a half-hour zone', () => {
    // Kolkata is UTC+5:30 year round.
    expect(zonedToUtcMs('2026-08-01T00:00', 'Asia/Kolkata'))
      .toBe(Date.parse('2026-07-31T18:30:00Z'));
  });

  it('uses the offset in force on the day, not today’s', () => {
    // January in Chicago is CST, UTC-6 — an hour different from August.
    expect(zonedToUtcMs('2026-01-15T00:00', 'America/Chicago'))
      .toBe(Date.parse('2026-01-15T06:00:00Z'));
  });

  it('round-trips through the zone it was read in', () => {
    for (const z of ['UTC', 'America/Chicago', 'Asia/Kolkata', 'Australia/Sydney']) {
      const local = '2026-08-01T13:45';
      expect(utcMsToZoned(zonedToUtcMs(local, z), z)).toBe(local);
    }
  });

  it('labels offsets the way people write them', () => {
    expect(offsetLabel('UTC', new Date('2026-08-01T00:00:00Z'))).toBe('UTC+00:00');
    expect(offsetLabel('Asia/Kolkata', new Date('2026-08-01T00:00:00Z'))).toBe('UTC+05:30');
    expect(offsetLabel('America/Chicago', new Date('2026-08-01T00:00:00Z'))).toBe('UTC-05:00');
  });
});
