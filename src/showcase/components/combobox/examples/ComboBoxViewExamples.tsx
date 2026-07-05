import { useState } from 'react';
import { ComboBoxView } from '@/dui';
import type { ComboBoxOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const methods: ComboBoxOption[] = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];

const headerNames: ComboBoxOption[] = [
  { value: 'Content-Type', label: 'Content-Type' },
  { value: 'Authorization', label: 'Authorization' },
  { value: 'Accept', label: 'Accept' },
  { value: 'X-Request-Id', label: 'X-Request-Id' },
  { value: 'X-Api-Key', label: 'X-Api-Key' },
  { value: 'User-Agent', label: 'User-Agent' },
];

const environments: ComboBoxOption[] = [
  { value: 'prod', label: 'Production' },
  { value: 'staging', label: 'Staging' },
  { value: 'dev', label: 'Development' },
  { value: 'local', label: 'Local' },
];

export function ComboBoxViewExamples() {
  const [method, setMethod] = useState('GET');
  const [header, setHeader] = useState('');
  const [env, setEnv] = useState('prod');
  const [locked, setLocked] = useState('Production');

  return (
    <div>
      <ExampleCard
        title="HTTP Method Selector"
        description="Type-ahead select restricted to known method suggestions"
        code={`const [value, setValue] = useState('GET');

<ComboBoxView
  options={[{ value: 'GET', label: 'GET' }, { value: 'POST', label: 'POST' }]}
  value={value}
  onChange={setValue}
/>`}
      >
        <ComboBoxView options={methods} value={method} onChange={setMethod} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: <strong style={{ color: 'var(--color-text-primary)' }}>{method}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Free-Solo Header Name Input"
        description="freeSolo (default true) lets testers type any custom header name while still suggesting common ones"
        code={`const [header, setHeader] = useState('');

<ComboBoxView
  options={headerNames}
  value={header}
  onChange={setHeader}
  placeholder="Header name…"
  freeSolo
/>`}
      >
        <ComboBoxView
          options={headerNames}
          value={header}
          onChange={setHeader}
          placeholder="Header name…"
          freeSolo
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Current value: <strong style={{ color: 'var(--color-text-primary)' }}>{header || '(empty)'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes & Width"
        description="sm / md / lg heights with a wider trigger"
        code={`<ComboBoxView size="sm" width="sm" options={methods} value={method} onChange={setMethod} />
<ComboBoxView size="md" width="md" options={methods} value={method} onChange={setMethod} />
<ComboBoxView size="lg" width="lg" options={methods} value={method} onChange={setMethod} />`}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <ComboBoxView size="sm" width="sm" options={methods} value={method} onChange={setMethod} />
          <ComboBoxView size="md" width="md" options={methods} value={method} onChange={setMethod} />
          <ComboBoxView size="lg" width="lg" options={methods} value={method} onChange={setMethod} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Switcher"
        description="Restricted-choice combo (freeSolo=false) used to select an active environment before sending a request"
        code={`const [env, setEnv] = useState('prod');

<ComboBoxView
  options={environments}
  value={env}
  onChange={setEnv}
  freeSolo={false}
  color="var(--color-success)"
/>`}
      >
        <ComboBoxView
          options={environments}
          value={env}
          onChange={setEnv}
          freeSolo={false}
          color="var(--color-success)"
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled / Locked Environment"
        description="Edge case — combo box locked while a request is in-flight against the selected environment"
        code={`<ComboBoxView options={environments} value="Production" onChange={() => {}} disabled />`}
      >
        <ComboBoxView options={environments} value={locked} onChange={setLocked} disabled />
      </ExampleCard>
    </div>
  );
}
