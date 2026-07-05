import { ParticleBackgroundView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ParticleBackgroundViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Background"
        description="40 subtly animated particles, default height"
        code={`<ParticleBackgroundView height={160} />`}
      >
        <ParticleBackgroundView height={160} />
      </ExampleCard>

      <ExampleCard
        title="Content Overlay"
        description="Children render above the particle layer — a hero panel with a message on top"
        code={`<ParticleBackgroundView height={160} color="var(--color-primary)">
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>No active connections</div>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Waiting for WebSocket clients…</div>
    </div>
  </div>
</ParticleBackgroundView>`}
      >
        <ParticleBackgroundView height={160} color="var(--color-primary)">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>No active connections</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Waiting for WebSocket clients…</div>
            </div>
          </div>
        </ParticleBackgroundView>
      </ExampleCard>

      <ExampleCard
        title="Particle Density Variants"
        description="count controls how many particles render — sparse vs dense"
        code={`<ParticleBackgroundView count={12} height={100} />
<ParticleBackgroundView count={80} height={100} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ParticleBackgroundView count={12} height={100} />
          <ParticleBackgroundView count={80} height={100} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Color Themes"
        description="Different accent colors for different sections of a dashboard"
        code={`<ParticleBackgroundView color="var(--color-success)" height={90} />
<ParticleBackgroundView color="var(--color-error)" height={90} />
<ParticleBackgroundView color="var(--color-protocol-graphql)" height={90} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ParticleBackgroundView color="var(--color-success)" height={90} />
          <ParticleBackgroundView color="var(--color-error)" height={90} />
          <ParticleBackgroundView color="var(--color-protocol-graphql)" height={90} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Workspace Hero"
        description="Realistic full-width usage as a landing/onboarding hero backdrop"
        code={`<ParticleBackgroundView height={220} count={60}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
    <div style={{ fontWeight: 700, fontSize: 18 }}>Welcome to Daakia</div>
    <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Create your first collection to get started</div>
  </div>
</ParticleBackgroundView>`}
      >
        <ParticleBackgroundView height={220} count={60}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Welcome to Daakia</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Create your first collection to get started</div>
          </div>
        </ParticleBackgroundView>
      </ExampleCard>
    </div>
  );
}
