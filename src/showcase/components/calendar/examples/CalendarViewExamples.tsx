import { useState } from 'react';
import { CalendarView, type IsoDate } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function todayIso(offsetDays = 0): IsoDate {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function CalendarViewExamples() {
  const [single, setSingle] = useState<IsoDate | null>(todayIso());
  const [range, setRange] = useState<[IsoDate | null, IsoDate | null]>([todayIso(-3), todayIso(2)]);
  const [multi, setMulti] = useState<IsoDate[]>([todayIso(), todayIso(4), todayIso(9)]);
  const [scheduleDate, setScheduleDate] = useState<IsoDate | null>(todayIso(1));

  return (
    <div>
      <ExampleCard
        title="Single Date Selection"
        description="Default single-date calendar — click a month/year dropdown to jump quickly"
        code={`const [date, setDate] = useState(todayIso());

<CalendarView mode="single" value={date} onChange={setDate} />`}
      >
        <CalendarView mode="single" value={single} onChange={v => setSingle(v as IsoDate)} />
      </ExampleCard>

      <ExampleCard
        title="Request Scheduling Window (interactive range)"
        description="Range mode with the connected 'block' style, used to pick a monitoring run window"
        code={`const [range, setRange] = useState([todayIso(-3), todayIso(2)]);

<CalendarView
  mode="range"
  value={range}
  onChange={setRange}
  color="var(--color-success)"
/>`}
      >
        <CalendarView mode="range" value={range} onChange={v => setRange(v as [IsoDate | null, IsoDate | null])} color="var(--color-success)" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Window: <strong style={{ color: 'var(--color-text-primary)' }}>{range[0] ?? '—'}</strong> to{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>{range[1] ?? '—'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants & Range Styles"
        description="xs vs default size, and rangeStyle 'block' (connected snake) vs 'tint' (soft background)"
        code={`<CalendarView mode="single" value={date} onChange={setDate} size="xs" />
<CalendarView mode="range" value={range} onChange={setRange} rangeStyle="tint" color="var(--color-warning)" />`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div>
            <CalendarView mode="single" value={single} onChange={v => setSingle(v as IsoDate)} size="xs" />
            <div style={{ marginTop: 4, fontSize: 10, color: 'var(--color-text-muted)' }}>size="xs"</div>
          </div>
          <div>
            <CalendarView mode="range" value={range} onChange={v => setRange(v as [IsoDate | null, IsoDate | null])} rangeStyle="tint" color="var(--color-warning)" />
            <div style={{ marginTop: 4, fontSize: 10, color: 'var(--color-text-muted)' }}>rangeStyle="tint"</div>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Multi-Select Test Run Days"
        description="Domain-realistic use — selecting multiple non-contiguous days to schedule a recurring collection run"
        code={`const [days, setDays] = useState([todayIso(), todayIso(4), todayIso(9)]);

<CalendarView mode="multi" value={days} onChange={setDays} color="var(--color-warning)" />`}
      >
        <CalendarView mode="multi" value={multi} onChange={v => setMulti(v as IsoDate[])} color="var(--color-warning)" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Run scheduled on {multi.length} day(s): {multi.join(', ') || 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Bounded Date Range (edge case)"
        description="minDate/maxDate restrict selectable days — dates outside the webhook retry window are disabled"
        code={`<CalendarView
  mode="single"
  value={date}
  onChange={setDate}
  minDate={todayIso(-5)}
  maxDate={todayIso(10)}
  disabledDates={d => d.getDay() === 0 || d.getDay() === 6}
/>`}
      >
        <CalendarView
          mode="single"
          value={scheduleDate}
          onChange={v => setScheduleDate(v as IsoDate)}
          minDate={todayIso(-5)}
          maxDate={todayIso(10)}
          disabledDates={d => d.getDay() === 0 || d.getDay() === 6}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Weekends disabled; only {todayIso(-5)} through {todayIso(10)} selectable.
        </div>
      </ExampleCard>
    </div>
  );
}
