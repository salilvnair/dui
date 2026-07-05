import { GradientTextView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function GradientTextViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Hero Headline"
        description="Default 3-color gradient shifting over 4 seconds"
        code={`<GradientTextView>Ship faster with Daakia</GradientTextView>`}
      >
        <div style={{ fontSize: 22 }}>
          <GradientTextView>Ship faster with Daakia</GradientTextView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Two-Color Gradient"
        description="Brand-specific color pair for a marketing banner"
        code={`<GradientTextView colors={['#f97316', '#ec4899']}>
  Introducing Environments 2.0
</GradientTextView>`}
      >
        <div style={{ fontSize: 20 }}>
          <GradientTextView colors={['#f97316', '#ec4899']}>Introducing Environments 2.0</GradientTextView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg / xl sizing driven by DuiSize"
        code={`<GradientTextView size="sm">Small</GradientTextView>
<GradientTextView size="md">Medium</GradientTextView>
<GradientTextView size="lg">Large</GradientTextView>
<GradientTextView size="xl">Extra Large</GradientTextView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <GradientTextView size="sm">Small</GradientTextView>
          <GradientTextView size="md">Medium</GradientTextView>
          <GradientTextView size="lg">Large</GradientTextView>
          <GradientTextView size="xl">Extra Large</GradientTextView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Animation Speed Control"
        description="Faster/slower gradient shift via the duration prop, in seconds"
        code={`<GradientTextView duration={1.5}>Fast shift</GradientTextView>
<GradientTextView duration={4}>Default speed</GradientTextView>
<GradientTextView duration={10}>Slow, ambient shift</GradientTextView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16 }}>
          <GradientTextView duration={1.5}>Fast shift</GradientTextView>
          <GradientTextView duration={4}>Default speed</GradientTextView>
          <GradientTextView duration={10}>Slow, ambient shift</GradientTextView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Testing Dashboard Callout"
        description="Highlighting a live metric inline in a status line — realistic Daakia dashboard usage"
        code={`<div>
  Collection health:{' '}
  <GradientTextView colors={['var(--color-success)', 'var(--color-info)']} size="md">
    98.4% uptime
  </GradientTextView>
  {' '}across all monitored environments.
</div>`}
      >
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Collection health:{' '}
          <GradientTextView colors={['var(--color-success)', 'var(--color-info)']} size="md">
            98.4% uptime
          </GradientTextView>
          {' '}across all monitored environments.
        </div>
      </ExampleCard>
    </div>
  );
}
