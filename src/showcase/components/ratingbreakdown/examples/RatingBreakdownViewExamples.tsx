import { RatingBreakdownView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RatingBreakdownViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Breakdown"
        description="Counts per star level, index 0 = 1 star … index 4 = 5 stars, bars scale relative to the max"
        code={`<RatingBreakdownView counts={[2, 4, 10, 28, 56]} />`}
      >
        <div style={{ maxWidth: 260 }}>
          <RatingBreakdownView counts={[2, 4, 10, 28, 56]} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Color"
        description="Override the default warning/gold accent with a brand color"
        code={`<RatingBreakdownView counts={[1, 2, 5, 15, 30]} color="var(--color-primary)" />`}
      >
        <div style={{ maxWidth: 260 }}>
          <RatingBreakdownView counts={[1, 2, 5, 15, 30]} color="var(--color-primary)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Connector Marketplace Rating (domain use case)"
        description="Rating distribution for a published community connector, next to an overall score"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
  <div>
    <div style={{ fontSize: 28, fontWeight: 800 }}>4.6</div>
    <div>312 ratings</div>
  </div>
  <RatingBreakdownView counts={[3, 5, 20, 84, 200]} />
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text-primary)' }}>4.6</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>312 ratings</div>
          </div>
          <div style={{ maxWidth: 240, flex: 1 }}>
            <RatingBreakdownView counts={[3, 5, 20, 84, 200]} />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size"
        description="Use size='sm' for a denser breakdown inside a sidebar card"
        code={`<RatingBreakdownView counts={[0, 1, 3, 8, 12]} size="sm" />`}
      >
        <div style={{ maxWidth: 220 }}>
          <RatingBreakdownView counts={[0, 1, 3, 8, 12]} size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Ratings Yet (edge case)"
        description="All-zero counts still render — every bar shows at 0 width against a max floor of 1"
        code={`<RatingBreakdownView counts={[0, 0, 0, 0, 0]} />`}
      >
        <div style={{ maxWidth: 260 }}>
          <RatingBreakdownView counts={[0, 0, 0, 0, 0]} />
        </div>
      </ExampleCard>
    </div>
  );
}
