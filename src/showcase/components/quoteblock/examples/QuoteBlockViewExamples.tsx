import { QuoteBlockView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function QuoteBlockViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Quote with Attribution"
        description="Attribution and role render below the quote in a footer"
        code={`<QuoteBlockView attribution="Jordan Lee" role="Platform Engineer">
  Daakia cut our API testing time in half.
</QuoteBlockView>`}
      >
        <QuoteBlockView attribution="Jordan Lee" role="Platform Engineer">
          Daakia cut our API testing time in half.
        </QuoteBlockView>
      </ExampleCard>

      <ExampleCard
        title="With Avatar"
        description="Pass an avatar node alongside attribution for a testimonial-style layout"
        code={`<QuoteBlockView
  attribution="Priya Nair"
  role="Engineering Manager, Fintech Co."
  avatar={<img src="/avatars/priya.png" style={{ width: 36, height: 36, borderRadius: '999px' }} />}
>
  We migrated our entire QA suite to Daakia collections in a single sprint.
</QuoteBlockView>`}
      >
        <QuoteBlockView
          attribution="Priya Nair"
          role="Engineering Manager, Fintech Co."
          avatar={<span style={{ width: 36, height: 36, borderRadius: '999px', background: 'var(--color-primary)', display: 'inline-block' }} />}
        >
          We migrated our entire QA suite to Daakia collections in a single sprint.
        </QuoteBlockView>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="The left border and quote font size scale from the accent color and size prop"
        code={`<QuoteBlockView attribution="Alex Chen" color="var(--color-info)">
  The mock server saved us from blocking on the backend team entirely.
</QuoteBlockView>`}
      >
        <QuoteBlockView attribution="Alex Chen" color="var(--color-info)">
          The mock server saved us from blocking on the backend team entirely.
        </QuoteBlockView>
      </ExampleCard>

      <ExampleCard
        title="No Attribution (bare quote)"
        description="attribution, role, and avatar are all optional"
        code={`<QuoteBlockView>Simplicity is the ultimate sophistication.</QuoteBlockView>`}
      >
        <QuoteBlockView>Simplicity is the ultimate sophistication.</QuoteBlockView>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Quote font size and left-padding scale with the DUI size system"
        code={`<QuoteBlockView attribution="Team" size="sm">Small quote.</QuoteBlockView>
<QuoteBlockView attribution="Team" size="md">Medium quote.</QuoteBlockView>
<QuoteBlockView attribution="Team" size="lg">Large quote.</QuoteBlockView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <QuoteBlockView attribution="Team" size="sm">Small quote.</QuoteBlockView>
          <QuoteBlockView attribution="Team" size="md">Medium quote.</QuoteBlockView>
          <QuoteBlockView attribution="Team" size="lg">Large quote.</QuoteBlockView>
        </div>
      </ExampleCard>
    </div>
  );
}
