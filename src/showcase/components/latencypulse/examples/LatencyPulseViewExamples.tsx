import { useState } from 'react';
import { LatencyPulseView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function LatencyPulseViewExamples() {
  const [latency, setLatency] = useState(180);

  return (
    <div>
      <ExampleCard
        title="Healthy Latency"
        description="Default — beats green and steady at a normal response time"
        code={`<LatencyPulseView latencyMs={180} />`}
      >
        <LatencyPulseView latencyMs={180} />
      </ExampleCard>

      <ExampleCard
        title="Live Endpoint Monitor (interactive)"
        description="Simulate incoming latency samples — the beat speed and color react in real time"
        code={`const [latency, setLatency] = useState(180);

<LatencyPulseView latencyMs={latency} />
<ButtonView onClick={() => setLatency(Math.round(50 + Math.random() * 700))}>
  Sample next request
</ButtonView>`}
      >
        <LatencyPulseView latencyMs={latency} />
        <div style={{ marginTop: 8 }}>
          <ButtonView size="sm" onClick={() => setLatency(Math.round(50 + Math.random() * 700))}>
            Sample next request
          </ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Critical Latency (edge case)"
        description="Past the criticalMs threshold, the beat auto-switches to error red and beats faster"
        code={`<LatencyPulseView latencyMs={850} criticalMs={500} />`}
      >
        <LatencyPulseView latencyMs={850} criticalMs={500} />
      </ExampleCard>

      <ExampleCard
        title="Custom Threshold & Color Override"
        description="Stricter SLA threshold (200ms) and an explicit accent color instead of auto success/error"
        code={`<LatencyPulseView latencyMs={140} criticalMs={200} color="var(--color-info)" />`}
      >
        <LatencyPulseView latencyMs={140} criticalMs={200} color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Environment Comparison Row"
        description="Multiple compact pulses side by side — production vs staging vs local"
        code={`<div style={{ display: 'flex', gap: 16 }}>
  <LatencyPulseView latencyMs={92} width={140} height={40} />
  <LatencyPulseView latencyMs={310} width={140} height={40} />
  <LatencyPulseView latencyMs={18} width={140} height={40} />
</div>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 2 }}>Production</div>
            <LatencyPulseView latencyMs={92} width={140} height={40} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 2 }}>Staging</div>
            <LatencyPulseView latencyMs={310} width={140} height={40} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 2 }}>Local</div>
            <LatencyPulseView latencyMs={18} width={140} height={40} />
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
