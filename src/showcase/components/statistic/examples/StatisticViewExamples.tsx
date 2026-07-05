import { useState } from 'react';
import { StatisticView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function StatisticViewExamples() {
  const [requestsToday, setRequestsToday] = useState(1420);

  return (
    <div>
      <ExampleCard
        title="Basic Stat"
        description="A labeled number that count-up animates on mount"
        code={`<StatisticView label="Requests today" value={1420} />`}
      >
        <StatisticView label="Requests today" value={1420} />
      </ExampleCard>

      <ExampleCard
        title="Live Counter (interactive)"
        description="Value updates trigger a fresh animated count from the previous value"
        code={`const [count, setCount] = useState(1420);

<StatisticView label="Requests today" value={count} />
<ButtonView onClick={() => setCount(c => c + Math.floor(Math.random() * 40) + 1)}>
  Simulate incoming request
</ButtonView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <StatisticView label="Requests today" value={requestsToday} />
          <ButtonView size="sm" onClick={() => setRequestsToday(c => c + Math.floor(Math.random() * 40) + 1)}>
            Simulate incoming request
          </ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Prefix / Suffix / Precision"
        description="Currency, percentage, and unit-suffixed stats"
        code={`<StatisticView label="Monthly spend" value={482.5} prefix="$" precision={2} />
<StatisticView label="Uptime" value={99.982} suffix="%" precision={3} />
<StatisticView label="Avg latency" value={214} suffix=" ms" />`}
      >
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <StatisticView label="Monthly spend" value={482.5} prefix="$" precision={2} />
          <StatisticView label="Uptime" value={99.982} suffix="%" precision={3} />
          <StatisticView label="Avg latency" value={214} suffix=" ms" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Dashboard Stat Row"
        description="Multiple statistics with semantic colors summarizing a workspace's health"
        code={`<StatisticView label="Total collections"   value={38}   color="var(--color-primary)" />
<StatisticView label="Passing tests"        value={214}  color="var(--color-success)" />
<StatisticView label="Failing tests"        value={6}    color="var(--color-error)" />
<StatisticView label="Avg response time"    value={182}  suffix=" ms" color="var(--color-info)" />`}
      >
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <StatisticView label="Total collections" value={38} color="var(--color-primary)" />
          <StatisticView label="Passing tests" value={214} color="var(--color-success)" />
          <StatisticView label="Failing tests" value={6} color="var(--color-error)" />
          <StatisticView label="Avg response time" value={182} suffix=" ms" color="var(--color-info)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Zero Value / No Animation"
        description="Edge case — empty workspace stat with animation disabled for instant render"
        code={`<StatisticView label="Requests today" value={0} animate={false} color="var(--color-text-muted)" />`}
      >
        <StatisticView label="Requests today" value={0} animate={false} color="var(--color-text-muted)" />
      </ExampleCard>
    </div>
  );
}
