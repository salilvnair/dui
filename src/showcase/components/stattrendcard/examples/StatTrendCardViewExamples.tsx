import { StatTrendCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function StatTrendCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Card"
        description="Animated count-up value with a sparkline trend"
        code={`<StatTrendCardView label="Requests today" value={1842} trend={[900, 1100, 1400, 1700, 1842]} />`}
      >
        <StatTrendCardView label="Requests today" value={1842} trend={[900, 1100, 1400, 1700, 1842]} />
      </ExampleCard>

      <ExampleCard
        title="With Prefix / Suffix / Precision"
        description="Format the number as currency, a percentage, or with fixed decimal precision"
        code={`<StatTrendCardView label="Monthly revenue" value={48250} prefix="$" trend={[30000, 34000, 41000, 45000, 48250]} color="var(--color-success)" />
<StatTrendCardView label="Uptime" value={99.982} suffix="%" precision={3} trend={[99.9, 99.95, 99.97, 99.98, 99.982]} color="var(--color-info)" />`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <StatTrendCardView label="Monthly revenue" value={48250} prefix="$" trend={[30000, 34000, 41000, 45000, 48250]} color="var(--color-success)" />
          <StatTrendCardView label="Uptime" value={99.982} suffix="%" precision={3} trend={[99.9, 99.95, 99.97, 99.98, 99.982]} color="var(--color-info)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Dashboard Metrics (domain use case)"
        description="A row of trend cards summarizing an API workspace's key stats"
        code={`<StatTrendCardView label="Avg latency (ms)" value={214} trend={[280, 260, 240, 225, 214]} color="var(--color-warning)" />
<StatTrendCardView label="Error rate" value={0.42} suffix="%" precision={2} trend={[1.2, 0.9, 0.7, 0.5, 0.42]} color="var(--color-error)" />
<StatTrendCardView label="Active webhooks" value={37} trend={[18, 22, 28, 33, 37]} color="var(--color-protocol-websocket)" />`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <StatTrendCardView label="Avg latency (ms)" value={214} trend={[280, 260, 240, 225, 214]} color="var(--color-warning)" />
          <StatTrendCardView label="Error rate" value={0.42} suffix="%" precision={2} trend={[1.2, 0.9, 0.7, 0.5, 0.42]} color="var(--color-error)" />
          <StatTrendCardView label="Active webhooks" value={37} trend={[18, 22, 28, 33, 37]} color="var(--color-protocol-websocket)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size"
        description="Use size='sm' for a dense metrics strip"
        code={`<StatTrendCardView label="Teams" value={12} trend={[6, 7, 9, 10, 12]} size="sm" />`}
      >
        <StatTrendCardView label="Teams" value={12} trend={[6, 7, 9, 10, 12]} size="sm" />
      </ExampleCard>

      <ExampleCard
        title="Declining Trend (edge case)"
        description="A downward series still renders correctly — pair with a warning color to signal regression"
        code={`<StatTrendCardView label="Open incidents" value={2} trend={[9, 7, 6, 4, 2]} color="var(--color-success)" />`}
      >
        <StatTrendCardView label="Open incidents" value={2} trend={[9, 7, 6, 4, 2]} color="var(--color-success)" />
      </ExampleCard>
    </div>
  );
}
