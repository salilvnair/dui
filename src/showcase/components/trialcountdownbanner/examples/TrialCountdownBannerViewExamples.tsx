import { useState } from 'react';
import { TrialCountdownBannerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TrialCountdownBannerViewExamples() {
  const [daysLeft, setDaysLeft] = useState(14);

  return (
    <div>
      <ExampleCard
        title="Basic Trial Banner"
        description="Standard days-left notice with an upgrade CTA"
        code={`<TrialCountdownBannerView daysLeft={3} onUpgrade={upgrade} />`}
      >
        <TrialCountdownBannerView daysLeft={3} onUpgrade={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Plan Simulator"
        description="Adjust remaining trial days with a slider — banner turns error-colored (urgent) at 3 days or fewer"
        code={`const [daysLeft, setDaysLeft] = useState(14);

<TrialCountdownBannerView daysLeft={daysLeft} onUpgrade={() => alert('Redirect to billing')} />
<input type="range" min={0} max={14} value={daysLeft} onChange={e => setDaysLeft(Number(e.target.value))} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TrialCountdownBannerView daysLeft={daysLeft} onUpgrade={() => {}} />
          <input type="range" min={0} max={14} value={daysLeft} onChange={e => setDaysLeft(Number(e.target.value))} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Ample Time Left (Non-urgent)"
        description="More than 3 days left renders with the accent color instead of the error color"
        code={`<TrialCountdownBannerView daysLeft={11} onUpgrade={upgrade} />`}
      >
        <TrialCountdownBannerView daysLeft={11} onUpgrade={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Match the upgrade button to a workspace brand color when not urgent"
        code={`<TrialCountdownBannerView daysLeft={9} onUpgrade={upgrade} color="var(--color-protocol-graphql)" />`}
      >
        <TrialCountdownBannerView daysLeft={9} onUpgrade={() => {}} color="var(--color-protocol-graphql)" />
      </ExampleCard>

      <ExampleCard
        title="Trial Ends Today (Edge Case)"
        description="daysLeft=0 renders special copy: 'Your trial ends today'"
        code={`<TrialCountdownBannerView daysLeft={0} onUpgrade={upgrade} />`}
      >
        <TrialCountdownBannerView daysLeft={0} onUpgrade={() => {}} />
      </ExampleCard>
    </div>
  );
}
