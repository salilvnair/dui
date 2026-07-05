import { useState } from 'react';
import { CountUpNumberView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CountUpNumberViewExamples() {
  const [requests, setRequests] = useState(1284);
  const [latency, setLatency] = useState(0.982);

  return (
    <div>
      <ExampleCard
        title="Total Requests Counter"
        description="Default count-up with a suffix label, e.g. a dashboard KPI tile"
        code={`<CountUpNumberView value={1284} suffix=" reqs" />`}
      >
        <CountUpNumberView value={1284} suffix=" reqs" />
      </ExampleCard>

      <ExampleCard
        title="Live-Updating Metric (interactive)"
        description="Re-triggers the count-up animation whenever the underlying value changes — click to simulate new traffic"
        code={`const [requests, setRequests] = useState(1284);

<CountUpNumberView value={requests} suffix=" reqs" />
<ButtonView onClick={() => setRequests(r => r + Math.floor(Math.random() * 400))}>
  Simulate traffic
</ButtonView>`}
      >
        <CountUpNumberView value={requests} suffix=" reqs" />
        <div style={{ marginTop: 8 }}>
          <ButtonView size="sm" onClick={() => setRequests(r => r + Math.floor(Math.random() * 400))}>
            Simulate traffic
          </ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Currency & Precision Formatting"
        description="prefix, suffix, and precision combined for a cost dashboard"
        code={`<CountUpNumberView value={482.5} prefix="$" precision={2} suffix=" / mo" />`}
      >
        <CountUpNumberView value={482.5} prefix="$" precision={2} suffix=" / mo" />
      </ExampleCard>

      <ExampleCard
        title="Success Rate Percentage"
        description="Precision + suffix for a decimal percentage, colored to match status"
        code={`<CountUpNumberView value={99.982} precision={3} suffix="%" color="var(--color-success)" />`}
      >
        <CountUpNumberView value={latency} precision={3} suffix="%" color="var(--color-success)" />
        <div style={{ marginTop: 8 }}>
          <ButtonView size="sm" onClick={() => setLatency(v => Math.max(90, Math.min(100, v + (Math.random() * 2 - 1))))}>
            Refresh
          </ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants & Zero State"
        description="sm / md / lg sizing, and a zero-value edge case for a brand-new empty workspace"
        code={`<CountUpNumberView value={0} suffix=" reqs" size="sm" color="var(--color-text-muted)" />
<CountUpNumberView value={42} suffix=" reqs" size="md" />
<CountUpNumberView value={1284} suffix=" reqs" size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <CountUpNumberView value={0} suffix=" reqs" size="sm" color="var(--color-text-muted)" />
          <CountUpNumberView value={42} suffix=" reqs" size="md" />
          <CountUpNumberView value={1284} suffix=" reqs" size="lg" />
        </div>
      </ExampleCard>
    </div>
  );
}
