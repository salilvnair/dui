import { useState } from 'react';
import { DescriptionsView, ChipView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function DescriptionsViewExamples() {
  const [request] = useState({
    method: 'POST',
    url: '/api/v2/users',
    status: '201 Created',
    duration: '184 ms',
  });

  return (
    <div>
      <ExampleCard
        title="Request Details"
        description="Key/value grid summarizing a sent request"
        code={`<DescriptionsView
  title="Request Details"
  items={[
    { label: 'Method', value: 'POST' },
    { label: 'Status', value: '200 OK' },
  ]}
/>`}
      >
        <DescriptionsView
          title="Request Details"
          items={[
            { label: 'Method', value: request.method },
            { label: 'URL', value: request.url },
            { label: 'Status', value: request.status },
            { label: 'Duration', value: request.duration },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Single-Column Full-Width Items"
        description="Use span to let long values (like a URL or token) take the full row"
        code={`<DescriptionsView
  columns={2}
  items={[
    { label: 'Endpoint', value: 'https://api.daakia.io/v2/webhooks/8271', span: 2 },
    { label: 'Method', value: 'POST' },
    { label: 'Retries', value: '3' },
  ]}
/>`}
      >
        <DescriptionsView
          columns={2}
          items={[
            { label: 'Endpoint', value: 'https://api.daakia.io/v2/webhooks/8271', span: 2 },
            { label: 'Method', value: 'POST' },
            { label: 'Retries', value: '3' },
            { label: 'Secret', value: '••••••••3f2a', span: 2 },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="sm / md / lg control padding and font scale"
        code={`<DescriptionsView size="sm" items={items} />
<DescriptionsView size="md" items={items} />
<DescriptionsView size="lg" items={items} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <DescriptionsView size="sm" items={[{ label: 'Method', value: 'GET' }, { label: 'Status', value: '200' }]} />
          <DescriptionsView size="md" items={[{ label: 'Method', value: 'GET' }, { label: 'Status', value: '200' }]} />
          <DescriptionsView size="lg" items={[{ label: 'Method', value: 'GET' }, { label: 'Status', value: '200' }]} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Metadata Panel"
        description="Rich ReactNode values — chips, colored text — inside a description grid, as used in an environment inspector"
        code={`<DescriptionsView
  title="Environment: Production"
  columns={2}
  items={[
    { label: 'Base URL', value: 'https://api.daakia.io', span: 2 },
    { label: 'Auth Type', value: <ChipView label="Bearer Token" color="var(--color-info)" size="sm" /> },
    { label: 'Team', value: 'Platform Engineering' },
  ]}
/>`}
      >
        <DescriptionsView
          title="Environment: Production"
          color="var(--color-error)"
          columns={2}
          items={[
            { label: 'Base URL', value: 'https://api.daakia.io', span: 2 },
            { label: 'Auth Type', value: <ChipView label="Bearer Token" color="var(--color-info)" size="sm" /> },
            { label: 'Team', value: 'Platform Engineering' },
            { label: 'Variables', value: <ChipView label="14 vars" color="var(--color-success)" size="sm" /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty Details"
        description="No items — grid renders with just the title and no rows"
        code={`<DescriptionsView title="Webhook Delivery" items={[]} />`}
      >
        <DescriptionsView title="Webhook Delivery" items={[]} />
      </ExampleCard>
    </div>
  );
}
