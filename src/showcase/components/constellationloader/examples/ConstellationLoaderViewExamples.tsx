import { ConstellationLoaderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ConstellationLoaderViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Loading State"
        description="Common default use — drop-in replacement for a spinner while a request is in flight"
        code={`<ConstellationLoaderView />`}
      >
        <ConstellationLoaderView />
      </ExampleCard>

      <ExampleCard
        title="Custom Star Count"
        description="Fewer or more points changes the density of connecting lines"
        code={`<ConstellationLoaderView count={4} />
<ConstellationLoaderView count={7} />
<ConstellationLoaderView count={14} />`}
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <ConstellationLoaderView count={4} />
          <ConstellationLoaderView count={7} />
          <ConstellationLoaderView count={14} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Color and Dimensions"
        description="Match the loader's accent to the surrounding panel"
        code={`<ConstellationLoaderView color="var(--color-success)" width={140} height={80} />`}
      >
        <ConstellationLoaderView color="var(--color-success)" width={140} height={80} />
      </ExampleCard>

      <ExampleCard
        title="Loading a Collection Run Report"
        description="API-testing domain use case — shown while a full collection run's results are being aggregated"
        code={`<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
  <ConstellationLoaderView color="var(--color-info)" width={160} height={90} />
  <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
    Aggregating results from 24 requests…
  </span>
</div>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ConstellationLoaderView color="var(--color-info)" width={160} height={90} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Aggregating results from 24 requests…</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Minimal / Compact Inline Variant"
        description="Edge case — a tiny 1-star footprint for a dense inline loading indicator next to a button"
        code={`<button disabled style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
  <ConstellationLoaderView count={3} width={40} height={24} color="var(--color-text-muted)" />
  Sending…
</button>`}
      >
        <button disabled style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
          <ConstellationLoaderView count={3} width={40} height={24} color="var(--color-text-muted)" />
          Sending…
        </button>
      </ExampleCard>
    </div>
  );
}
