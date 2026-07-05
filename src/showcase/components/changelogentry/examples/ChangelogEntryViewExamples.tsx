import { ChangelogEntryView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ChangelogEntryViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Entry"
        description="A single version with one feature change"
        code={`<ChangelogEntryView version="2.4.0" date="July 2, 2026" changes={[{ type: 'feature', description: 'Added mock servers' }]} />`}
      >
        <ChangelogEntryView version="2.4.0" date="July 2, 2026" changes={[{ type: 'feature', description: 'Added mock servers' }]} />
      </ExampleCard>

      <ExampleCard
        title="Full Release Notes (All Change Types)"
        description="A realistic release with feature, fix, improvement, and breaking changes"
        code={`<ChangelogEntryView
  version="3.0.0"
  date="July 3, 2026"
  changes={[
    { type: 'feature', description: 'GraphQL subscriptions support in the request builder' },
    { type: 'improvement', description: 'Faster environment variable resolution' },
    { type: 'fix', description: 'Fixed webhook retries not respecting backoff' },
    { type: 'breaking', description: 'Removed legacy v1 collection export format' },
  ]}
/>`}
      >
        <ChangelogEntryView
          version="3.0.0"
          date="July 3, 2026"
          changes={[
            { type: 'feature', description: 'GraphQL subscriptions support in the request builder' },
            { type: 'improvement', description: 'Faster environment variable resolution' },
            { type: 'fix', description: 'Fixed webhook retries not respecting backoff' },
            { type: 'breaking', description: 'Removed legacy v1 collection export format' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Stacked Changelog Feed"
        description="Multiple entries in a scrollable changelog panel, newest first"
        code={`<ChangelogEntryView version="2.4.0" date="July 2, 2026" changes={[{ type: 'feature', description: 'Added mock servers' }]} />
<ChangelogEntryView version="2.3.1" date="June 28, 2026" changes={[{ type: 'fix', description: 'Fixed OAuth2 token refresh loop' }]} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ChangelogEntryView version="2.4.0" date="July 2, 2026" changes={[{ type: 'feature', description: 'Added mock servers' }]} />
          <ChangelogEntryView version="2.3.1" date="June 28, 2026" changes={[{ type: 'fix', description: 'Fixed OAuth2 token refresh loop' }]} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Rich Description Content"
        description="Change descriptions accept ReactNode, so links or inline code can be embedded"
        code={`<ChangelogEntryView
  version="2.5.0"
  date="July 5, 2026"
  changes={[{ type: 'improvement', description: <>Upgraded internal HTTP client — see <code>CHANGELOG.md</code> for details</> }]}
/>`}
      >
        <ChangelogEntryView
          version="2.5.0"
          date="July 5, 2026"
          changes={[{ type: 'improvement', description: <>Upgraded internal HTTP client — see <code>CHANGELOG.md</code> for details</> }]}
        />
      </ExampleCard>

      <ExampleCard
        title="No Changes Listed (Edge Case)"
        description="An empty changes array still renders the version header with no change rows"
        code={`<ChangelogEntryView version="2.4.1" date="July 2, 2026" changes={[]} />`}
      >
        <ChangelogEntryView version="2.4.1" date="July 2, 2026" changes={[]} />
      </ExampleCard>
    </div>
  );
}
