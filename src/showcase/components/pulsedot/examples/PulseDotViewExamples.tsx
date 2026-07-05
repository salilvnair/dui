import { PulseDotView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PulseDotViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Pulse Dot"
        description="Default error-colored pulsing dot, e.g. an unread badge"
        code={`<PulseDotView />`}
      >
        <PulseDotView />
      </ExampleCard>

      <ExampleCard
        title="Live Recording Indicator"
        description="Success-colored dot next to a label — 'recording' / 'live' style indicator"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
  <PulseDotView color="var(--color-success)" />
  <span style={{ fontSize: 12, fontWeight: 600 }}>Live — Mock Server Running</span>
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <PulseDotView color="var(--color-success)" />
          <span style={{ fontSize: 12, fontWeight: 600 }}>Live — Mock Server Running</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg dot sizes"
        code={`<PulseDotView size="xs" />
<PulseDotView size="sm" />
<PulseDotView size="md" />
<PulseDotView size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <PulseDotView size="xs" />
          <PulseDotView size="sm" />
          <PulseDotView size="md" />
          <PulseDotView size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Notification Badge on Icon"
        description="Positioned over a nav icon to indicate unread activity — realistic app-shell usage"
        code={`<div style={{ position: 'relative', display: 'inline-block' }}>
  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)' }} />
  <div style={{ position: 'absolute', top: -2, right: -2 }}>
    <PulseDotView size="sm" color="var(--color-error)" />
  </div>
</div>`}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)' }} />
          <div style={{ position: 'absolute', top: -2, right: -2 }}>
            <PulseDotView size="sm" color="var(--color-error)" />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Status Row"
        description="Multiple dots signaling different environment states in a list"
        code={`{envs.map(e => (
  <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <PulseDotView size="xs" color={e.color} />
    <span style={{ fontSize: 12 }}>{e.name}</span>
  </div>
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { name: 'Production — degraded', color: 'var(--color-warning)' },
            { name: 'Staging — down', color: 'var(--color-error)' },
            { name: 'Local — active', color: 'var(--color-success)' },
          ].map(e => (
            <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PulseDotView size="xs" color={e.color} />
              <span style={{ fontSize: 12 }}>{e.name}</span>
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
