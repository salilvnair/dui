import { useState } from 'react';
import { CascaderView } from '@/dui';
import type { CascaderOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const regions: CascaderOption[] = [
  {
    value: 'us', label: 'United States', children: [
      { value: 'ca', label: 'California' },
      { value: 'ny', label: 'New York' },
      { value: 'tx', label: 'Texas' },
    ],
  },
  {
    value: 'eu', label: 'Europe', children: [
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'nl', label: 'Netherlands' },
    ],
  },
];

const apiCategories: CascaderOption[] = [
  {
    value: 'users', label: 'Users', children: [
      { value: 'users-list', label: 'List users' },
      { value: 'users-create', label: 'Create user' },
      { value: 'users-delete', label: 'Delete user' },
    ],
  },
  {
    value: 'payments', label: 'Payments', children: [
      { value: 'payments-charge', label: 'Create charge' },
      { value: 'payments-refund', label: 'Refund' },
    ],
  },
  {
    value: 'webhooks', label: 'Webhooks', children: [
      { value: 'webhooks-list', label: 'List webhooks' },
      { value: 'webhooks-create', label: 'Register webhook' },
    ],
  },
];

export function CascaderViewExamples() {
  const [path, setPath] = useState<string[]>(['us', 'ca']);
  const [reqPath, setReqPath] = useState<string[]>(['users', 'users-list']);
  const [color, setColor] = useState<string[]>(['payments', 'payments-charge']);

  return (
    <div>
      <ExampleCard
        title="Region Picker"
        description="Two-level cascading select for country / state"
        code={`const [path, setPath] = useState(['us', 'ca']);
const regions = [{ value: 'us', label: 'United States', children: [
  { value: 'ca', label: 'California' }, { value: 'ny', label: 'New York' }
] }];

<CascaderView options={regions} value={path} onChange={setPath} />`}
      >
        <CascaderView options={regions} value={path} onChange={setPath} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected path: {path.join(' / ') || 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Endpoint Category Picker (interactive)"
        description="Navigate the endpoint tree of a saved API collection down to a single operation"
        code={`const [reqPath, setReqPath] = useState(['users', 'users-list']);

<CascaderView options={apiCategories} value={reqPath} onChange={setReqPath} placeholder="Choose an endpoint…" />`}
      >
        <CascaderView options={apiCategories} value={reqPath} onChange={setReqPath} placeholder="Choose an endpoint…" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Operation: <strong style={{ color: 'var(--color-text-primary)' }}>{reqPath.join(' → ')}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="sm / md / lg trigger heights"
        code={`<CascaderView size="sm" options={apiCategories} value={path} onChange={setPath} />
<CascaderView size="md" options={apiCategories} value={path} onChange={setPath} />
<CascaderView size="lg" options={apiCategories} value={path} onChange={setPath} />`}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <CascaderView size="sm" options={apiCategories} value={color} onChange={setColor} />
          <CascaderView size="md" options={apiCategories} value={color} onChange={setColor} />
          <CascaderView size="lg" options={apiCategories} value={color} onChange={setColor} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Color prop tints the focused border and selected-item text — useful to match method or protocol theming"
        code={`<CascaderView options={apiCategories} value={path} onChange={setPath} color="var(--color-method-post)" />`}
      >
        <CascaderView options={apiCategories} value={reqPath} onChange={setReqPath} color="var(--color-method-post)" />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked selector, e.g. while a request is running or the collection is read-only"
        code={`<CascaderView options={apiCategories} value={['webhooks', 'webhooks-list']} onChange={() => {}} disabled />`}
      >
        <CascaderView options={apiCategories} value={['webhooks', 'webhooks-list']} onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
