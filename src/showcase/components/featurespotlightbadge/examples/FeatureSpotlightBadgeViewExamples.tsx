import { FeatureSpotlightBadgeView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FeatureSpotlightBadgeViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default New Badge"
        description="Default label reads 'New' with the primary accent color"
        code={`<FeatureSpotlightBadgeView label="New" />`}
      >
        <FeatureSpotlightBadgeView label="New" />
      </ExampleCard>

      <ExampleCard
        title="Sidebar Nav Item with Badge"
        description="Attach next to a nav label to spotlight a newly shipped feature"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span>Mock Servers</span>
  <FeatureSpotlightBadgeView label="New" />
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Mock Servers</span>
          <FeatureSpotlightBadgeView label="New" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Labels for Feature Rollout Stages"
        description="Beyond 'New' — use for Beta / Preview / Updated markers across a changelog"
        code={`<FeatureSpotlightBadgeView label="Beta" color="var(--color-info)" />
<FeatureSpotlightBadgeView label="Updated" color="var(--color-success)" />
<FeatureSpotlightBadgeView label="Preview" color="var(--color-protocol-graphql)" />`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <FeatureSpotlightBadgeView label="Beta" color="var(--color-info)" />
          <FeatureSpotlightBadgeView label="Updated" color="var(--color-success)" />
          <FeatureSpotlightBadgeView label="Preview" color="var(--color-protocol-graphql)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs through xl for different placement contexts, from dense menus to hero banners"
        code={`<FeatureSpotlightBadgeView label="New" size="xs" />
<FeatureSpotlightBadgeView label="New" size="sm" />
<FeatureSpotlightBadgeView label="New" size="md" />
<FeatureSpotlightBadgeView label="New" size="lg" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FeatureSpotlightBadgeView label="New" size="xs" />
          <FeatureSpotlightBadgeView label="New" size="sm" />
          <FeatureSpotlightBadgeView label="New" size="md" />
          <FeatureSpotlightBadgeView label="New" size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Long Label (Overflow Behavior)"
        description="Edge case — a longer label still renders inline without wrapping, useful for short promotional tags"
        code={`<FeatureSpotlightBadgeView label="Just Shipped" color="var(--color-warning)" />`}
      >
        <FeatureSpotlightBadgeView label="Just Shipped" color="var(--color-warning)" />
      </ExampleCard>
    </div>
  );
}
