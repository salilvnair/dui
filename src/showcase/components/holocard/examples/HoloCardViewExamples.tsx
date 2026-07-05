import { HoloCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function HoloCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Pricing Plan Callout"
        description="Common default use — a premium 'wow' card for a plan/feature highlight"
        code={`<HoloCardView>
  <div style={{ fontWeight: 700 }}>Pro Plan</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Move your mouse over this card.</div>
</HoloCardView>`}
      >
        <HoloCardView>
          <div style={{ fontWeight: 700 }}>Pro Plan</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Move your mouse over this card.</div>
        </HoloCardView>
      </ExampleCard>

      <ExampleCard
        title="Feature Comparison Cards"
        description="Multiple holo cards side by side, each with richer content"
        code={`<HoloCardView>
  <div style={{ fontWeight: 700, marginBottom: 4 }}>Team</div>
  <div style={{ fontSize: 20, fontWeight: 700 }}>$29/mo</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Up to 10 members</div>
</HoloCardView>
<HoloCardView>
  <div style={{ fontWeight: 700, marginBottom: 4 }}>Enterprise</div>
  <div style={{ fontSize: 20, fontWeight: 700 }}>Custom</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>SSO, audit logs, SLA</div>
</HoloCardView>`}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <HoloCardView>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Team</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>$29/mo</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Up to 10 members</div>
          </HoloCardView>
          <HoloCardView>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Enterprise</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Custom</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>SSO, audit logs, SLA</div>
          </HoloCardView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Padding and border-radius scale with the DUI size token"
        code={`<HoloCardView size="sm">Compact</HoloCardView>
<HoloCardView size="lg">Spacious</HoloCardView>`}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <HoloCardView size="sm">Compact</HoloCardView>
          <HoloCardView size="lg">Spacious</HoloCardView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Key Reveal Card"
        description="API-testing domain use case — a one-time secret display that deserves visual emphasis"
        code={`<HoloCardView>
  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>New API Key</div>
  <code style={{ fontSize: 13, fontFamily: 'monospace' }}>sk_live_51N••••••••••••wX2q</code>
  <div style={{ fontSize: 11, color: 'var(--color-warning)', marginTop: 6 }}>Copy this now — it won't be shown again.</div>
</HoloCardView>`}
      >
        <HoloCardView>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>New API Key</div>
          <code style={{ fontSize: 13, fontFamily: 'monospace' }}>sk_live_51N••••••••••••wX2q</code>
          <div style={{ fontSize: 11, color: 'var(--color-warning)', marginTop: 6 }}>Copy this now — it won't be shown again.</div>
        </HoloCardView>
      </ExampleCard>

      <ExampleCard
        title="Custom Style Override"
        description="Edge case — narrow fixed-width card with a custom border color via style prop"
        code={`<HoloCardView style={{ width: 180, borderColor: 'var(--color-success)' }}>
  <div style={{ fontWeight: 700, color: 'var(--color-success)' }}>Verified</div>
</HoloCardView>`}
      >
        <HoloCardView style={{ width: 180, border: '1px solid var(--color-success)' }}>
          <div style={{ fontWeight: 700, color: 'var(--color-success)' }}>Verified</div>
        </HoloCardView>
      </ExampleCard>
    </div>
  );
}
