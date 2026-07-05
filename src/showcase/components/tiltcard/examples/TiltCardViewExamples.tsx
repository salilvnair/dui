import { TiltCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TiltCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Tilt Card"
        description="Move your cursor across the card — it tilts in 3D toward the pointer"
        code={`<TiltCardView>
  <div style={{ fontWeight: 600 }}>Production API</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>api.daakia.io</div>
</TiltCardView>`}
      >
        <TiltCardView>
          <div style={{ fontWeight: 600 }}>Production API</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>api.daakia.io</div>
        </TiltCardView>
      </ExampleCard>

      <ExampleCard
        title="Tilt Intensity Variants"
        description="maxTilt controls the max rotation angle in degrees — subtle vs dramatic"
        code={`<TiltCardView maxTilt={4}>Subtle (4°)</TiltCardView>
<TiltCardView maxTilt={10}>Default (10°)</TiltCardView>
<TiltCardView maxTilt={20}>Dramatic (20°)</TiltCardView>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <TiltCardView maxTilt={4}><div style={{ fontSize: 13 }}>Subtle (4°)</div></TiltCardView>
          <TiltCardView maxTilt={10}><div style={{ fontSize: 13 }}>Default (10°)</div></TiltCardView>
          <TiltCardView maxTilt={20}><div style={{ fontSize: 13 }}>Dramatic (20°)</div></TiltCardView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg control internal padding and corner radius"
        code={`<TiltCardView size="sm">Compact</TiltCardView>
<TiltCardView size="md">Default</TiltCardView>
<TiltCardView size="lg">Spacious</TiltCardView>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <TiltCardView size="sm"><div style={{ fontSize: 12 }}>Compact</div></TiltCardView>
          <TiltCardView size="md"><div style={{ fontSize: 13 }}>Default</div></TiltCardView>
          <TiltCardView size="lg"><div style={{ fontSize: 14 }}>Spacious</div></TiltCardView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Card Grid"
        description="Realistic Daakia usage — a grid of environment selector cards with tilt feedback"
        code={`<div style={{ display: 'flex', gap: 12 }}>
  {environments.map(env => (
    <TiltCardView key={env.name} maxTilt={8}>
      <div style={{ fontWeight: 600 }}>{env.name}</div>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{env.host}</div>
    </TiltCardView>
  ))}
</div>`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { name: 'Production', host: 'api.daakia.io' },
            { name: 'Staging', host: 'staging.daakia.io' },
            { name: 'Local', host: 'localhost:3000' },
          ].map(env => (
            <TiltCardView key={env.name} maxTilt={8}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{env.name}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{env.host}</div>
            </TiltCardView>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Rich Content Card"
        description="Nested content — chips, text, and metrics inside a tilting card"
        code={`<TiltCardView maxTilt={6} style={{ width: 220 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <strong>Orders Service</strong>
    <span style={{ color: 'var(--color-success)' }}>Healthy</span>
  </div>
  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
    p99 latency: 142ms · 99.98% uptime
  </div>
</TiltCardView>`}
      >
        <TiltCardView maxTilt={6} style={{ width: 220 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <strong>Orders Service</strong>
            <span style={{ color: 'var(--color-success)' }}>Healthy</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
            p99 latency: 142ms · 99.98% uptime
          </div>
        </TiltCardView>
      </ExampleCard>
    </div>
  );
}
