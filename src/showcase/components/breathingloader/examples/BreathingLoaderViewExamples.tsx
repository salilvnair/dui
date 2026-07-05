import { BreathingLoaderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function BreathingLoaderViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Loader with Label"
        description="Common default use — a calm loading indicator with an optional caption"
        code={`<BreathingLoaderView label="Syncing…" />`}
      >
        <BreathingLoaderView label="Syncing…" />
      </ExampleCard>

      <ExampleCard
        title="Icon-only (no label)"
        description="Just the breathing circle, for tight inline spaces like a table cell"
        code={`<BreathingLoaderView />`}
      >
        <BreathingLoaderView />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Circle diameter scales with the DUI size token"
        code={`<BreathingLoaderView size="xs" label="xs" />
<BreathingLoaderView size="md" label="md" />
<BreathingLoaderView size="xl" label="xl" />`}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <BreathingLoaderView size="xs" label="xs" />
          <BreathingLoaderView size="md" label="md" />
          <BreathingLoaderView size="xl" label="xl" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Color per Context"
        description="API-testing domain use case — color-coded breathing loaders for different background operations"
        code={`<BreathingLoaderView label="Running collection…" color="var(--color-info)" />
<BreathingLoaderView label="Waiting for webhook…" color="var(--color-warning)" />
<BreathingLoaderView label="Syncing environment…" color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <BreathingLoaderView label="Running collection…" color="var(--color-info)" />
          <BreathingLoaderView label="Waiting for webhook…" color="var(--color-warning)" />
          <BreathingLoaderView label="Syncing environment…" color="var(--color-success)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Error-tinted Variant"
        description="Edge case — using the loader's color prop to signal a degraded/retrying state rather than plain success"
        code={`<BreathingLoaderView label="Reconnecting…" color="var(--color-error)" size="sm" />`}
      >
        <BreathingLoaderView label="Reconnecting…" color="var(--color-error)" size="sm" />
      </ExampleCard>
    </div>
  );
}
