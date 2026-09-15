import { useState } from 'react';
import { DateTimeInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function DateTimeInputViewExamples() {
  const [when, setWhen] = useState<string | null>('2026-09-15T14:30');
  const [empty, setEmpty] = useState<string | null>(null);
  const [step, setStep] = useState<string | null>('2026-09-15T09:00');

  return (
    <>
      <ExampleCard
        title="A date and a time in one field"
        description="Calendar and clock behind a single popover, returning one ISO string"
        code={'<DateTimeInputView value={when} onChange={setWhen} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <DateTimeInputView value={when} onChange={setWhen} />
          <code style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{when ?? 'null'}</code>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty, and bounded"
        description="null is a real state — nothing scheduled — and min/max keep the picker inside the window that makes sense"
        code={'<DateTimeInputView value={null} minDate="2026-09-01" maxDate="2026-12-31" />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <DateTimeInputView
            value={empty}
            onChange={setEmpty}
            placeholder="Not scheduled"
            minDate="2026-09-01"
            maxDate="2026-12-31"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="12-hour, and coarser minutes"
        description="minuteStep stops a scheduling field offering 1,440 options nobody wants"
        code={'<DateTimeInputView use24Hour={false} minuteStep={15} />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <DateTimeInputView value={step} onChange={setStep} use24Hour={false} minuteStep={15} />
          <DateTimeInputView value={step} onChange={setStep} minuteStep={30} size="sm" />
        </div>
      </ExampleCard>
    </>
  );
}
