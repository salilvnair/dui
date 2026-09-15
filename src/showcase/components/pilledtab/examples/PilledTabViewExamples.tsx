import { useState } from 'react';
import { PilledTabView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const TABS = [
  { id: 'body', label: 'Body' },
  { id: 'headers', label: 'Headers' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'timeline', label: 'Timeline' },
];

export function PilledTabViewExamples() {
  const [a, setA] = useState('body');
  const [b, setB] = useState('headers');

  return (
    <>
      <ExampleCard
        title="Rounded"
        description="The response-panel tab row — a filled pill marks the active one"
        code={'<PilledTabView tabs={tabs} activeId={id} onChange={setId} />'}
      >
        <PilledTabView tabs={TABS} activeId={a} onChange={setA} />
      </ExampleCard>

      <ExampleCard
        title="Fully pilled"
        description="mode='pill' rounds the ends completely"
        code={'<PilledTabView mode="pill" … />'}
      >
        <PilledTabView tabs={TABS} activeId={b} onChange={setB} mode="pill" />
      </ExampleCard>

      <ExampleCard
        title="Another accent"
        description="The active pill takes whatever colour you give it"
        code={'<PilledTabView accentColor="var(--color-success)" … />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <PilledTabView tabs={TABS} activeId={a} onChange={setA} accentColor="var(--color-success)" />
          <PilledTabView tabs={TABS} activeId={a} onChange={setA} accentColor="var(--color-error)" mode="pill" />
        </div>
      </ExampleCard>
    </>
  );
}
