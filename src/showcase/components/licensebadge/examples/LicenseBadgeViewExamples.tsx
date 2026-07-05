import { LicenseBadgeView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function LicenseBadgeViewExamples() {
  return (
    <div>
      <ExampleCard
        title="All Three Tiers"
        description="The three built-in plan tiers side by side"
        code={`<LicenseBadgeView tier="free" />
<LicenseBadgeView tier="pro" />
<LicenseBadgeView tier="enterprise" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <LicenseBadgeView tier="free" />
          <LicenseBadgeView tier="pro" />
          <LicenseBadgeView tier="enterprise" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="In a Workspace Switcher"
        description="Common placement — next to a workspace name to signal its plan"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span style={{ fontWeight: 600 }}>Acme Platform Team</span>
  <LicenseBadgeView tier="enterprise" />
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 13 }}>Acme Platform Team</span>
          <LicenseBadgeView tier="enterprise" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Pricing Card Header"
        description="Domain example: labeling a plan comparison card in a billing/upgrade page"
        code={`<div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 10, padding: 16, width: 200 }}>
  <LicenseBadgeView tier="pro" />
  <div style={{ marginTop: 8, fontSize: 20, fontWeight: 700 }}>$29/mo</div>
  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Unlimited requests, 5 environments</div>
</div>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 10, padding: 16, width: 220 }}>
          <LicenseBadgeView tier="pro" />
          <div style={{ marginTop: 8, fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)' }}>$29/mo</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Unlimited requests, 5 environments</div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Free Tier (outlined style)"
        description="The free tier renders as a neutral outlined badge instead of the gradient fill used for paid tiers"
        code={`<LicenseBadgeView tier="free" />`}
      >
        <LicenseBadgeView tier="free" />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Badge height, padding, and font scale with the DUI size system"
        code={`<LicenseBadgeView tier="enterprise" size="sm" />
<LicenseBadgeView tier="enterprise" size="md" />
<LicenseBadgeView tier="enterprise" size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <LicenseBadgeView tier="enterprise" size="sm" />
          <LicenseBadgeView tier="enterprise" size="md" />
          <LicenseBadgeView tier="enterprise" size="lg" />
        </div>
      </ExampleCard>
    </div>
  );
}
