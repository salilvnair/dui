import { useState } from 'react';
import { MagneticButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MagneticButtonViewExamples() {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <ExampleCard
        title="Default Magnetic Button"
        description="Hover near the button — it gently pulls toward the cursor"
        code={`<MagneticButtonView onClick={() => {}}>Hover me</MagneticButtonView>`}
      >
        <MagneticButtonView onClick={() => {}}>Hover me</MagneticButtonView>
      </ExampleCard>

      <ExampleCard
        title="Send Request CTA (interactive)"
        description="Primary call-to-action with a click handler and live counter"
        code={`const [clicks, setClicks] = useState(0);

<MagneticButtonView onClick={() => setClicks(c => c + 1)} color="var(--color-success)">
  Send Request
</MagneticButtonView>`}
      >
        <MagneticButtonView onClick={() => setClicks(c => c + 1)} color="var(--color-success)">
          Send Request
        </MagneticButtonView>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Sent: {clicks}</div>
      </ExampleCard>

      <ExampleCard
        title="Pull Strength Variants"
        description="strength controls the max pull distance in px — weak, default, strong"
        code={`<MagneticButtonView strength={4}>Subtle</MagneticButtonView>
<MagneticButtonView strength={12}>Default</MagneticButtonView>
<MagneticButtonView strength={28}>Strong</MagneticButtonView>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <MagneticButtonView strength={4}>Subtle</MagneticButtonView>
          <MagneticButtonView strength={12}>Default</MagneticButtonView>
          <MagneticButtonView strength={28}>Strong</MagneticButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size & Color Variants"
        description="sm / md / lg sizing with brand accent colors for different CTAs"
        code={`<MagneticButtonView size="sm" color="var(--color-primary)">Import</MagneticButtonView>
<MagneticButtonView size="md" color="var(--color-info)">Deploy</MagneticButtonView>
<MagneticButtonView size="lg" color="var(--color-error)">Delete Collection</MagneticButtonView>`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <MagneticButtonView size="sm" color="var(--color-primary)">Import</MagneticButtonView>
          <MagneticButtonView size="md" color="var(--color-info)">Deploy</MagneticButtonView>
          <MagneticButtonView size="lg" color="var(--color-error)">Delete Collection</MagneticButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Landing Page Hero CTA"
        description="Realistic marketing usage — large button anchoring an empty-state hero"
        code={`<div style={{ textAlign: 'center', padding: '32px 0' }}>
  <MagneticButtonView size="xl" strength={16} onClick={() => {}}>
    Start Testing APIs Free
  </MagneticButtonView>
</div>`}
      >
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <MagneticButtonView size="xl" strength={16} onClick={() => {}}>
            Start Testing APIs Free
          </MagneticButtonView>
        </div>
      </ExampleCard>
    </div>
  );
}
