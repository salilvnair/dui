import { SparklineView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SparklineViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Sparkline"
        description="Filled area line, no axes — sized for a table cell or stat card"
        code={`<SparklineView data={[4, 8, 6, 9, 12, 10, 14]} width={100} height={28} />`}
      >
        <SparklineView data={[4, 8, 6, 9, 12, 10, 14]} width={100} height={28} />
      </ExampleCard>

      <ExampleCard
        title="Unfilled Line"
        description="Set filled={false} for a bare stroke with no area fill"
        code={`<SparklineView data={[20, 18, 22, 19, 25, 21, 27]} filled={false} color="var(--color-info)" />`}
      >
        <SparklineView data={[20, 18, 22, 19, 25, 21, 27]} filled={false} color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Colored by Trend Direction"
        description="Choose the color programmatically based on whether the series trended up or down"
        code={`const rising = [3, 5, 4, 7, 9, 12];
const falling = [40, 35, 33, 28, 22, 15];
const risingColor = rising.at(-1)! >= rising[0] ? 'var(--color-success)' : 'var(--color-error)';
const fallingColor = falling.at(-1)! >= falling[0] ? 'var(--color-success)' : 'var(--color-error)';

<SparklineView data={rising} color={risingColor} />
<SparklineView data={falling} color={fallingColor} />`}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <SparklineView data={[3, 5, 4, 7, 9, 12]} color="var(--color-success)" />
          <SparklineView data={[40, 35, 33, 28, 22, 15]} color="var(--color-error)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Latency Table Cell (API-testing use case)"
        description="Embed a tiny trend line next to a metric in a monitoring/analytics table row"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
  <span>GET /v2/orders</span>
  <SparklineView data={[120, 180, 95, 340, 210, 130, 90]} width={70} height={20} color="var(--color-warning)" strokeWidth={1.25} />
  <span>avg 166ms</span>
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
          <span style={{ color: 'var(--color-text-primary)', fontFamily: 'monospace' }}>GET /v2/orders</span>
          <SparklineView data={[120, 180, 95, 340, 210, 130, 90]} width={70} height={20} color="var(--color-warning)" strokeWidth={1.25} />
          <span style={{ color: 'var(--color-text-muted)' }}>avg 166ms</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Flat / Single-Value Series (edge case)"
        description="Fewer than 2 points renders an empty path — always provide at least 2 data points for a visible line"
        code={`<SparklineView data={[7]} />  {/* renders nothing visible */}
<SparklineView data={[7, 7, 7, 7]} color="var(--color-text-muted)" />  {/* flat line */}`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <SparklineView data={[7]} />
          <SparklineView data={[7, 7, 7, 7]} color="var(--color-text-muted)" />
        </div>
      </ExampleCard>
    </div>
  );
}
