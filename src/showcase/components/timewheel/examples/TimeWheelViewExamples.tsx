import { useState } from 'react';
import { TimeWheelView, type TimeWheelValue } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TimeWheelViewExamples() {
  const [time, setTime] = useState<TimeWheelValue>({ hour: 9, minute: 30, meridiem: 'AM' });
  const [reminderTime, setReminderTime] = useState<TimeWheelValue>({ hour: 6, minute: 0, meridiem: 'PM' });
  const [time24, setTime24] = useState<TimeWheelValue>({ hour: 14, minute: 45 });
  const [scheduleTime, setScheduleTime] = useState<TimeWheelValue>({ hour: 2, minute: 0, meridiem: 'AM' });
  const [disabledTime] = useState<TimeWheelValue>({ hour: 12, minute: 0, meridiem: 'PM' });

  const format = (t: TimeWheelValue, use24 = false) =>
    use24 ? `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}` : `${t.hour}:${String(t.minute).padStart(2, '0')} ${t.meridiem}`;

  return (
    <div>
      <ExampleCard
        title="Default 12-Hour Wheel"
        description="Common time picker with hour, minute, and AM/PM wheels"
        code={`const [time, setTime] = useState<TimeWheelValue>({ hour: 9, minute: 30, meridiem: 'AM' });

<TimeWheelView value={time} onChange={setTime} />`}
      >
        <TimeWheelView value={time} onChange={setTime} style={{ width: 220 }} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: {format(time)}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive Reminder Time"
        description="Stateful usage that computes and displays a human-readable reminder summary"
        code={`const [time, setTime] = useState<TimeWheelValue>({ hour: 6, minute: 0, meridiem: 'PM' });

<TimeWheelView value={time} onChange={setTime} color="var(--color-info)" />
<p>Reminder fires daily at {formatted}</p>`}
      >
        <TimeWheelView value={reminderTime} onChange={setReminderTime} color="var(--color-info)" style={{ width: 220 }} />
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          Reminder fires daily at <strong>{format(reminderTime)}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="24-Hour & Size Variants"
        description="use24Hour drops the meridiem wheel; size controls wheel density"
        code={`<TimeWheelView value={time} onChange={setTime} use24Hour size="sm" />
<TimeWheelView value={time} onChange={setTime} use24Hour size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <TimeWheelView value={time24} onChange={setTime24} use24Hour size="sm" style={{ width: 140 }} />
          <TimeWheelView value={time24} onChange={setTime24} use24Hour size="lg" style={{ width: 180 }} />
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          24h value: {format(time24, true)}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Scheduled Request Trigger (5-min steps)"
        description="Configuring a recurring API request schedule with a coarser minute step, relevant to a scheduled-runs feature"
        code={`const [time, setTime] = useState<TimeWheelValue>({ hour: 2, minute: 0, meridiem: 'AM' });

<TimeWheelView value={time} onChange={setTime} minuteStep={5} color="var(--color-success)" />
<p>Collection "Nightly Health Checks" runs daily at {formatted}</p>`}
      >
        <TimeWheelView value={scheduleTime} onChange={setScheduleTime} minuteStep={5} color="var(--color-success)" style={{ width: 220 }} />
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          Collection "Nightly Health Checks" runs daily at <strong>{format(scheduleTime)}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked time picker, e.g. while an existing scheduled run is being saved"
        code={`<TimeWheelView value={time} onChange={setTime} disabled />`}
      >
        <TimeWheelView value={disabledTime} onChange={() => {}} disabled style={{ width: 220 }} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Locked while the schedule is saving…
        </div>
      </ExampleCard>
    </div>
  );
}
