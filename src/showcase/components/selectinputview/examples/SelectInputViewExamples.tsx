import { useState } from 'react';
import { SelectInputView } from '@/dui';
import type { SelectOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const METHOD_OPTIONS: SelectOption[] = [
  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
  { value: 'PUT',    label: 'PUT',    color: 'var(--color-method-put)' },
  { value: 'PATCH',  label: 'PATCH',  color: 'var(--color-method-patch)' },
  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
];

const CONTENT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'application/json',                  label: 'application/json' },
  { value: 'application/x-www-form-urlencoded', label: 'application/x-www-form-urlencoded' },
  { value: 'multipart/form-data',               label: 'multipart/form-data' },
  { value: 'text/plain',                        label: 'text/plain' },
  { value: 'application/xml',                   label: 'application/xml' },
  { value: 'application/octet-stream',          label: 'application/octet-stream' },
];

const AUTH_OPTIONS: SelectOption[] = [
  { value: 'none',    label: 'None' },
  { value: 'bearer',  label: 'Bearer Token' },
  { value: 'basic',   label: 'Basic Auth' },
  { value: 'api-key', label: 'API Key' },
  { value: 'oauth2',  label: 'OAuth 2.0' },
  { value: 'digest',  label: 'Digest Auth' },
];

const SCHEMA_OPTIONS: SelectOption[] = [
  { value: 'h1', label: 'TypeScript', isHeader: true },
  { value: 'typescript',   label: 'TypeScript / Interfaces', badge: { label: 'TS',  color: 'var(--color-method-put)' } },
  { value: 'zod',          label: 'TypeScript / Zod',        badge: { label: 'ZOD', color: 'var(--color-protocol-mqtt)' } },
  { value: 'h2', label: 'JavaScript', isHeader: true },
  { value: 'js',           label: 'JavaScript / JSDoc',      badge: { label: 'JS',  color: 'var(--color-warning)' } },
  { value: 'h3', label: 'Schemas', isHeader: true },
  { value: 'json-schema',  label: 'JSON Schema',             badge: { label: 'JSON', color: 'var(--color-protocol-rest)' } },
  { value: 'openapi',      label: 'OpenAPI 3.0',             badge: { label: 'OAS',  color: 'var(--color-protocol-graphql)' } },
];

export function SelectInputViewExamples() {
  const [method, setMethod]       = useState('GET');
  const [contentType, setContentType] = useState('application/json');
  const [auth, setAuth]           = useState('bearer');
  const [schema, setSchema]       = useState('typescript');
  const [sizeVal, setSizeVal]     = useState('GET');

  return (
    <div>
      <ExampleCard
        title="Method Selector"
        description="HTTP method dropdown — always use SelectInputView, never a native select"
        code={`const METHOD_OPTIONS = [
  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
];

<SelectInputView
  options={METHOD_OPTIONS}
  value={method}
  onChange={setMethod}
  style={{ width: 110 }}
/>`}
      >
        <SelectInputView
          options={METHOD_OPTIONS}
          value={method}
          onChange={setMethod}
          style={{ width: 110 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Content-Type Selector"
        description="Body content type picker in the request body tab"
        code={`<SelectInputView
  options={CONTENT_TYPE_OPTIONS}
  value={contentType}
  onChange={setContentType}
  style={{ width: 260 }}
/>`}
      >
        <SelectInputView
          options={CONTENT_TYPE_OPTIONS}
          value={contentType}
          onChange={setContentType}
          style={{ width: 260 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Auth Type Selector"
        description="Authentication method dropdown in the Auth tab"
        code={`const AUTH_OPTIONS = [
  { value: 'none',    label: 'None' },
  { value: 'bearer',  label: 'Bearer Token' },
  { value: 'basic',   label: 'Basic Auth' },
  { value: 'api-key', label: 'API Key' },
  { value: 'oauth2',  label: 'OAuth 2.0' },
];

<SelectInputView
  options={AUTH_OPTIONS}
  value={auth}
  onChange={setAuth}
  accentColor="var(--color-warning)"
  style={{ width: 160 }}
/>`}
      >
        <SelectInputView
          options={AUTH_OPTIONS}
          value={auth}
          onChange={setAuth}
          accentColor="var(--color-warning)"
          style={{ width: 160 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Grouped with Badge Chips"
        description="Grouped options with badges — e.g. Data Schema Generator language picker"
        code={`const options = [
  { value: 'h1', label: 'TypeScript', isHeader: true },
  { value: 'typescript', label: 'TypeScript / Interfaces', badge: { label: 'TS', color: 'var(--color-method-put)' } },
  { value: 'zod',        label: 'TypeScript / Zod',        badge: { label: 'ZOD', color: 'var(--color-protocol-mqtt)' } },
];

<SelectInputView
  options={options}
  value={schema}
  onChange={setSchema}
  accentColor="var(--color-protocol-ai)"
  style={{ width: 260 }}
/>`}
      >
        <SelectInputView
          options={SCHEMA_OPTIONS}
          value={schema}
          onChange={setSchema}
          accentColor="var(--color-protocol-ai)"
          style={{ width: 260 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="default / sm / md / lg / xl — match the toolbar height of adjacent inputs"
        code={`<SelectInputView options={opts} value={val} onChange={set} size="default" />
<SelectInputView options={opts} value={val} onChange={set} size="sm" />
<SelectInputView options={opts} value={val} onChange={set} size="md" />
<SelectInputView options={opts} value={val} onChange={set} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <SelectInputView options={METHOD_OPTIONS} value={sizeVal} onChange={setSizeVal} size="default" style={{ width: 100 }} />
          <SelectInputView options={METHOD_OPTIONS} value={sizeVal} onChange={setSizeVal} size="sm"      style={{ width: 90  }} />
          <SelectInputView options={METHOD_OPTIONS} value={sizeVal} onChange={setSizeVal} size="md"      style={{ width: 100 }} />
          <SelectInputView options={METHOD_OPTIONS} value={sizeVal} onChange={setSizeVal} size="lg"      style={{ width: 100 }} />
          <SelectInputView options={METHOD_OPTIONS} value={sizeVal} onChange={setSizeVal} size="xl"      style={{ width: 100 }} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked dropdowns — e.g. inherited or read-only environment config"
        code={`<SelectInputView options={METHOD_OPTIONS} value="GET" onChange={() => {}} disabled />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <SelectInputView options={METHOD_OPTIONS} value="GET"    onChange={() => {}} disabled style={{ width: 110 }} />
          <SelectInputView options={AUTH_OPTIONS}   value="bearer" onChange={() => {}} disabled style={{ width: 160 }} />
        </div>
      </ExampleCard>
    </div>
  );
}
