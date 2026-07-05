import { useState } from 'react';
import { DateInputView, type IsoDate } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function todayIso(offsetDays = 0): IsoDate {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function DateInputViewExamples() {
  const [date, setDate] = useState<IsoDate | null>(todayIso());
  const [expiry, setExpiry] = useState<IsoDate | null>(null);
  const [sizeVal, setSizeVal] = useState<IsoDate | null>(todayIso());
  const [scheduledRun, setScheduledRun] = useState<IsoDate | null>(todayIso(1));

  return (
    <div>
      <ExampleCard
        title="Basic Date Input"
        description="Default date input — click to open the popover calendar"
        code={`const [date, setDate] = useState(todayIso());

<DateInputView value={date} onChange={setDate} placeholder="Select date…" />`}
      >
        <DateInputView value={date} onChange={setDate} placeholder="Select date…" style={{ width: 200 }} />
      </ExampleCard>

      <ExampleCard
        title="Token Expiry Date (interactive, nullable)"
        description="Starts empty (null) — placeholder shows until a date is picked, with a live status readout"
        code={`const [expiry, setExpiry] = useState(null);

<DateInputView value={expiry} onChange={setExpiry} placeholder="No expiry set" color="var(--color-warning)" />`}
      >
        <DateInputView value={expiry} onChange={setExpiry} placeholder="No expiry set" color="var(--color-warning)" style={{ width: 200 }} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {expiry ? `Token expires on ${expiry}` : 'Token never expires'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg / xl sizes, sharing the same InputBase sizing as other DUI inputs"
        code={`{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
  <DateInputView key={sz} value={date} onChange={setDate} size={sz} />
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
            <DateInputView key={sz} value={sizeVal} onChange={setSizeVal} size={sz} style={{ width: 180 }} />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Scheduled Collection Run Date"
        description="Domain-realistic use — bounded date input for scheduling a recurring API collection run, min date is today"
        code={`<DateInputView
  value={scheduledRun}
  onChange={setScheduledRun}
  minDate={todayIso()}
  maxDate={todayIso(90)}
  placeholder="Schedule run date…"
  color="var(--color-info)"
/>`}
      >
        <DateInputView
          value={scheduledRun}
          onChange={setScheduledRun}
          minDate={todayIso()}
          maxDate={todayIso(90)}
          placeholder="Schedule run date…"
          color="var(--color-info)"
          style={{ width: 220 }}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Runs can be scheduled within the next 90 days.
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State (edge case)"
        description="A disabled date input alongside an enabled one with a custom accent color"
        code={`<DateInputView value={date} onChange={setDate} disabled />
<DateInputView value={date} onChange={setDate} color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <DateInputView value={date} onChange={setDate} disabled style={{ width: 180 }} />
          <DateInputView value={date} onChange={setDate} color="var(--color-success)" style={{ width: 180 }} />
        </div>
      </ExampleCard>
    </div>
  );
}
