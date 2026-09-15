import { useState } from 'react';
import { TimeZoneSelectView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TimeZoneSelectViewExamples() {
  const [tz, setTz] = useState('Asia/Kolkata');
  const [other, setOther] = useState('America/Chicago');

  const now = new Date();
  const inZone = (zone: string) => {
    try {
      return new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit' }).format(now);
    } catch {
      return '--:--';
    }
  };

  return (
    <>
      <ExampleCard
        title="Every zone the platform knows"
        description="Searchable, and the value is the IANA name — which is what you store"
        code={'<TimeZoneSelectView value={tz} onChange={setTz} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <TimeZoneSelectView value={tz} onChange={setTz} width={300} />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            <code>{tz}</code> — it is {inZone(tz)} there
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Two of them, which is the point"
        description="A schedule is usually written in one zone and read in another"
        code={'<TimeZoneSelectView size="sm" value={tz} onChange={setTz} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <TimeZoneSelectView value={tz} onChange={setTz} size="sm" width={260} />
          <TimeZoneSelectView value={other} onChange={setOther} size="sm" width={260} />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {inZone(tz)} here is {inZone(other)} there
          </div>
        </div>
      </ExampleCard>
    </>
  );
}
