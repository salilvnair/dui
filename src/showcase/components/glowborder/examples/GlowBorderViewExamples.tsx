import { GlowBorderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function GlowBorderViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Glow Border"
        description="Default primary→success animated gradient border"
        code={`<GlowBorderView>
  <div style={{ fontWeight: 600 }}>Featured Collection</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Payments API v2</div>
</GlowBorderView>`}
      >
        <GlowBorderView>
          <div style={{ fontWeight: 600 }}>Featured Collection</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Payments API v2</div>
        </GlowBorderView>
      </ExampleCard>

      <ExampleCard
        title="Custom Color Pair"
        description="Two-stop gradient tuned to a status theme"
        code={`<GlowBorderView colors={['var(--color-error)', 'var(--color-warning)']}>
  <div style={{ fontWeight: 600 }}>3 Failing Tests</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Run #482 — checkout suite</div>
</GlowBorderView>`}
      >
        <GlowBorderView colors={['var(--color-error)', 'var(--color-warning)']}>
          <div style={{ fontWeight: 600 }}>3 Failing Tests</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Run #482 — checkout suite</div>
        </GlowBorderView>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg control internal padding and corner radius"
        code={`<GlowBorderView size="sm">Compact</GlowBorderView>
<GlowBorderView size="md">Default</GlowBorderView>
<GlowBorderView size="lg">Spacious</GlowBorderView>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <GlowBorderView size="sm"><div style={{ fontSize: 12 }}>Compact</div></GlowBorderView>
          <GlowBorderView size="md"><div style={{ fontSize: 13 }}>Default</div></GlowBorderView>
          <GlowBorderView size="lg"><div style={{ fontSize: 14 }}>Spacious</div></GlowBorderView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="AI Assistant Highlight Panel"
        description="Realistic Daakia usage — glow border drawing attention to an AI-generated suggestion"
        code={`<GlowBorderView colors={['var(--color-primary)', '#a855f7']} style={{ width: 280 }}>
  <div style={{ fontWeight: 600, fontSize: 13 }}>AI Suggestion</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
    Add a retry policy to this webhook — 4 deliveries failed in the last hour.
  </div>
</GlowBorderView>`}
      >
        <GlowBorderView colors={['var(--color-primary)', '#a855f7']} style={{ width: 280 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>AI Suggestion</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
            Add a retry policy to this webhook — 4 deliveries failed in the last hour.
          </div>
        </GlowBorderView>
      </ExampleCard>

      <ExampleCard
        title="Pricing / Plan Card"
        description="Marketing-style usage highlighting a recommended plan"
        code={`<GlowBorderView colors={['#f97316', '#ec4899']} size="lg" style={{ width: 220, textAlign: 'center' }}>
  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Most Popular</div>
  <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>Team — $29/mo</div>
</GlowBorderView>`}
      >
        <GlowBorderView colors={['#f97316', '#ec4899']} size="lg" style={{ width: 220, textAlign: 'center' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Most Popular</div>
          <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>Team — $29/mo</div>
        </GlowBorderView>
      </ExampleCard>
    </div>
  );
}
