import { useState } from 'react';
import { RadioGroupView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RadioGroupViewExamples() {
  const [bodyType, setBodyType] = useState('json');
  const [authType, setAuthType] = useState('bearer');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [environment, setEnvironment] = useState('staging');
  const [method, setMethod] = useState('get');

  return (
    <div>
      <ExampleCard
        title="Request Body Type"
        description="Common default use — a vertical radio group with descriptions, for choosing a request body format"
        code={`const [bodyType, setBodyType] = useState('json');

<RadioGroupView
  value={bodyType}
  onChange={setBodyType}
  options={[
    { value: 'json', label: 'JSON', description: 'application/json request body' },
    { value: 'form', label: 'Form Data', description: 'multipart/form-data' },
    { value: 'raw', label: 'Raw', description: 'Plain text body' },
  ]}
/>`}
      >
        <RadioGroupView
          value={bodyType}
          onChange={setBodyType}
          options={[
            { value: 'json', label: 'JSON', description: 'application/json request body' },
            { value: 'form', label: 'Form Data', description: 'multipart/form-data' },
            { value: 'raw', label: 'Raw', description: 'Plain text body' },
          ]}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: <strong>{bodyType}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Auth Type Selector (interactive)"
        description="Stateful usage — swaps a downstream auth-config panel based on the chosen strategy"
        code={`const [authType, setAuthType] = useState('bearer');

<RadioGroupView
  value={authType}
  onChange={setAuthType}
  accentColor="var(--color-info)"
  options={[
    { value: 'none', label: 'No Auth' },
    { value: 'bearer', label: 'Bearer Token', description: 'Sends an Authorization: Bearer <token> header' },
    { value: 'basic', label: 'Basic Auth', description: 'Sends username/password as a base64 header' },
    { value: 'apikey', label: 'API Key', description: 'Sends a custom header or query param' },
  ]}
/>`}
      >
        <RadioGroupView
          value={authType}
          onChange={setAuthType}
          accentColor="var(--color-info)"
          options={[
            { value: 'none', label: 'No Auth' },
            { value: 'bearer', label: 'Bearer Token', description: 'Sends an Authorization: Bearer <token> header' },
            { value: 'basic', label: 'Basic Auth', description: 'Sends username/password as a base64 header' },
            { value: 'apikey', label: 'API Key', description: 'Sends a custom header or query param' },
          ]}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {authType === 'none' && 'Requests will be sent without an Authorization header.'}
          {authType === 'bearer' && 'A Bearer token field will appear in the Auth tab.'}
          {authType === 'basic' && 'Username and password fields will appear in the Auth tab.'}
          {authType === 'apikey' && 'Key name and value fields will appear in the Auth tab.'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg sizes for different UI densities"
        code={`<RadioGroupView value={size} onChange={setSize} size="sm" options={sizes} direction="horizontal" />
<RadioGroupView value={size} onChange={setSize} size="lg" options={sizes} direction="horizontal" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(['sm', 'md', 'lg'] as const).map(sz => (
            <RadioGroupView
              key={sz}
              value={size}
              onChange={v => setSize(v as 'sm' | 'md' | 'lg')}
              size={sz}
              direction="horizontal"
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
              ]}
            />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Selector"
        description="Domain-realistic use — choosing the active environment for a request, e.g. above the URL bar"
        code={`const [environment, setEnvironment] = useState('staging');

<RadioGroupView
  value={environment}
  onChange={setEnvironment}
  direction="horizontal"
  accentColor="var(--color-success)"
  options={[
    { value: 'local', label: 'Local' },
    { value: 'staging', label: 'Staging' },
    { value: 'production', label: 'Production', description: 'Live traffic — use with caution' },
  ]}
/>`}
      >
        <RadioGroupView
          value={environment}
          onChange={setEnvironment}
          direction="horizontal"
          accentColor="var(--color-success)"
          options={[
            { value: 'local', label: 'Local' },
            { value: 'staging', label: 'Staging' },
            { value: 'production', label: 'Production', description: 'Live traffic — use with caution' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled Options (edge case)"
        description="Per-option disabled flag alongside a group-wide disabled override — e.g. DELETE is unavailable on a read-only collection"
        code={`<RadioGroupView
  value={method}
  onChange={setMethod}
  direction="horizontal"
  options={[
    { value: 'get', label: 'GET' },
    { value: 'post', label: 'POST' },
    { value: 'delete', label: 'DELETE', disabled: true },
  ]}
/>
<RadioGroupView value={method} onChange={setMethod} options={allDisabledOptions} disabled />`}
      >
        <RadioGroupView
          value={method}
          onChange={setMethod}
          direction="horizontal"
          accentColor="var(--color-warning)"
          options={[
            { value: 'get', label: 'GET' },
            { value: 'post', label: 'POST' },
            { value: 'delete', label: 'DELETE', disabled: true },
          ]}
        />
        <div style={{ marginTop: 12 }}>
          <RadioGroupView
            value="get"
            onChange={() => {}}
            disabled
            direction="horizontal"
            options={[
              { value: 'get', label: 'GET' },
              { value: 'post', label: 'POST' },
            ]}
          />
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          DELETE is disabled on this read-only collection; the second group is entirely locked while permissions load.
        </div>
      </ExampleCard>
    </div>
  );
}
