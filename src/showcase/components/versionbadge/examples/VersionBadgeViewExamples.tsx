import { useState } from 'react';
import { VersionBadgeView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function VersionBadgeViewExamples() {
  const [opened, setOpened] = useState<string | null>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Version Badge"
        description="Displays a monospace 'v' + version number in a bordered pill"
        code={`<VersionBadgeView version="2.4.1" />`}
      >
        <VersionBadgeView version="2.4.1" />
      </ExampleCard>

      <ExampleCard
        title="Update Available"
        description="updateAvailable shows a small amber dot next to the version"
        code={`<VersionBadgeView version="2.4.1" updateAvailable />`}
      >
        <VersionBadgeView version="2.4.1" updateAvailable />
      </ExampleCard>

      <ExampleCard
        title="Clickable (opens changelog)"
        description="Passing onClick renders the badge as a button, e.g. to open a changelog modal"
        code={`<VersionBadgeView version="2.4.1" updateAvailable onClick={openChangelog} />`}
      >
        <VersionBadgeView version="2.4.1" updateAvailable onClick={() => setOpened('2.4.1 changelog opened')} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>{opened ?? 'Click the badge to simulate opening a changelog'}</div>
      </ExampleCard>

      <ExampleCard
        title="API Collection Version History"
        description="A realistic use case — versioned collection exports in an API testing tool"
        code={`<div style={{ display: 'flex', gap: 6 }}>
  <VersionBadgeView version="3.1.0" color="var(--color-success)" />
  <VersionBadgeView version="3.0.2" />
  <VersionBadgeView version="2.9.8" />
</div>`}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <VersionBadgeView version="3.1.0" color="var(--color-success)" />
          <VersionBadgeView version="3.0.2" />
          <VersionBadgeView version="2.9.8" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Badge height and font size scale with the DUI size system"
        code={`<VersionBadgeView version="2.4.1" size="sm" />
<VersionBadgeView version="2.4.1" size="md" />
<VersionBadgeView version="2.4.1" size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <VersionBadgeView version="2.4.1" size="sm" />
          <VersionBadgeView version="2.4.1" size="md" />
          <VersionBadgeView version="2.4.1" size="lg" />
        </div>
      </ExampleCard>
    </div>
  );
}
