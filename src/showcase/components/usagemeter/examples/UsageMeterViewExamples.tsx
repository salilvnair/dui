import { useState } from 'react';
import { UsageMeterView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function UsageMeterViewExamples() {
  const [used, setUsed] = useState(420);

  return (
    <div>
      <ExampleCard
        title="Basic Quota Bar"
        description="Default usage meter for a monthly API call quota"
        code={`<UsageMeterView used={82} limit={100} label="API calls" />`}
      >
        <div style={{ maxWidth: 320 }}>
          <UsageMeterView used={82} limit={100} label="API calls" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive Simulated Usage"
        description="Drag a slider to simulate calls accumulating against a plan limit — color shifts as thresholds are crossed"
        code={`const [used, setUsed] = useState(420);

<UsageMeterView used={used} limit={500} label="Requests this billing cycle" />
<input type="range" min={0} max={550} value={used} onChange={e => setUsed(Number(e.target.value))} />`}
      >
        <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <UsageMeterView used={used} limit={500} label="Requests this billing cycle" />
          <input type="range" min={0} max={550} value={used} onChange={e => setUsed(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Warning & Danger Thresholds"
        description="Custom warningAt / dangerAt fractions change the color earlier for stricter quotas"
        code={`<UsageMeterView used={60} limit={100} label="Strict quota" warningAt={0.5} dangerAt={0.7} />
<UsageMeterView used={95} limit={100} label="Default thresholds" />`}
      >
        <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <UsageMeterView used={60} limit={100} label="Strict quota" warningAt={0.5} dangerAt={0.7} />
          <UsageMeterView used={95} limit={100} label="Default thresholds" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Multiple Quotas (Team Plan Dashboard)"
        description="Stack several meters to show workspace-level usage across resources"
        code={`<UsageMeterView used={4} limit={10} label="Team members" size="sm" />
<UsageMeterView used={18} limit={20} label="Environments" size="sm" />
<UsageMeterView used={950} limit={1000} label="Mock server requests" size="sm" />`}
      >
        <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <UsageMeterView used={4} limit={10} label="Team members" size="sm" />
          <UsageMeterView used={18} limit={20} label="Environments" size="sm" />
          <UsageMeterView used={950} limit={1000} label="Mock server requests" size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Zero Limit Edge Case"
        description="When limit is 0, the meter renders an empty bar instead of dividing by zero"
        code={`<UsageMeterView used={0} limit={0} label="No plan assigned" />`}
      >
        <div style={{ maxWidth: 320 }}>
          <UsageMeterView used={0} limit={0} label="No plan assigned" />
        </div>
      </ExampleCard>
    </div>
  );
}
