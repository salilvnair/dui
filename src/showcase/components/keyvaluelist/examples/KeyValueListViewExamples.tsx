import { KeyValueListView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function KeyValueListViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Plan Details"
        description="Simple label:value pairs with no toolbar or edit affordance"
        code={`<KeyValueListView entries={[{ key: 'Plan', value: 'Pro' }, { key: 'Seats', value: '12' }]} />`}
      >
        <div style={{ maxWidth: 260 }}>
          <KeyValueListView entries={[{ key: 'Plan', value: 'Pro' }, { key: 'Seats', value: '12' }]} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Metadata"
        description="A realistic API-testing use case — summary panel of a sent request's details"
        code={`<KeyValueListView
  entries={[
    { key: 'Method', value: 'POST' },
    { key: 'Status', value: '201 Created' },
    { key: 'Time', value: '184 ms' },
    { key: 'Size', value: '2.1 KB' },
  ]}
/>`}
      >
        <div style={{ maxWidth: 260 }}>
          <KeyValueListView
            entries={[
              { key: 'Method', value: 'POST' },
              { key: 'Status', value: '201 Created' },
              { key: 'Time', value: '184 ms' },
              { key: 'Size', value: '2.1 KB' },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Rich ReactNode Values"
        description="value accepts any ReactNode — combine with ChipView or colored text for emphasis"
        code={`<KeyValueListView
  entries={[
    { key: 'Environment', value: <span style={{ color: 'var(--color-error)', fontWeight: 700 }}>Production</span> },
    { key: 'Owner', value: 'Jordan Lee' },
  ]}
/>`}
      >
        <div style={{ maxWidth: 260 }}>
          <KeyValueListView
            entries={[
              { key: 'Environment', value: <span style={{ color: 'var(--color-error)', fontWeight: 700 }}>Production</span> },
              { key: 'Owner', value: 'Jordan Lee' },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Long Value Wrapping"
        description="Values right-align and wrap naturally when content is longer than the label"
        code={`<KeyValueListView
  entries={[
    { key: 'Endpoint', value: 'https://api.daakia.app/v2/payments/webhooks/confirm' },
  ]}
/>`}
      >
        <div style={{ maxWidth: 260 }}>
          <KeyValueListView entries={[{ key: 'Endpoint', value: 'https://api.daakia.app/v2/payments/webhooks/confirm' }]} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty List"
        description="An empty entries array renders nothing — pair with your own empty-state message"
        code={`<KeyValueListView entries={[]} />
{entries.length === 0 && <p>No metadata available.</p>}`}
      >
        <div style={{ maxWidth: 260 }}>
          <KeyValueListView entries={[]} />
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>No metadata available.</div>
        </div>
      </ExampleCard>
    </div>
  );
}
