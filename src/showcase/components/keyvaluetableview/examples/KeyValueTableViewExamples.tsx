import { useState } from 'react';
import { KeyValueTableView } from '@/dui';
import type { KeyValueTableRow, PinnedKeyValueRow } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function makeRow(key = '', value = '', description = '', enabled = true): KeyValueTableRow {
  return { id: crypto.randomUUID(), key, value, description, enabled };
}

const INITIAL_HEADERS: KeyValueTableRow[] = [
  makeRow('Content-Type', 'application/json', 'Request body format', true),
  makeRow('Accept', 'application/json', 'Accepted response formats', true),
  makeRow('Authorization', 'Bearer {{authToken}}', 'Auth credential', true),
  makeRow('X-Request-ID', '{{requestId}}', 'Trace ID', false),
];

const PINNED_HEADERS: PinnedKeyValueRow[] = [
  { id: 'ct', key: 'Content-Type', value: 'application/json', description: 'Auto-computed', masked: false },
];

const INITIAL_PARAMS: KeyValueTableRow[] = [
  makeRow('page', '1', undefined, true),
  makeRow('limit', '20', undefined, true),
  makeRow('sort', 'createdAt', undefined, true),
  makeRow('order', 'desc', undefined, false),
];

const INITIAL_FORM: KeyValueTableRow[] = [
  makeRow('username', 'alice', undefined, true),
  makeRow('password', '{{userPassword}}', undefined, true),
  makeRow('rememberMe', 'true', undefined, true),
];

const INITIAL_ENV: KeyValueTableRow[] = [
  makeRow('BASE_URL', 'https://api.example.com', 'Root endpoint', true),
  makeRow('API_KEY', '{{secret}}', 'Primary API key', true),
  makeRow('TIMEOUT', '30000', 'Request timeout in ms', true),
  makeRow('NODE_ENV', 'production', 'Runtime environment', true),
];

export function KeyValueTableViewExamples() {
  const [headers, setHeaders] = useState<KeyValueTableRow[]>(INITIAL_HEADERS);
  const [params, setParams] = useState<KeyValueTableRow[]>(INITIAL_PARAMS);
  const [formData, setFormData] = useState<KeyValueTableRow[]>(INITIAL_FORM);
  const [envVars, setEnvVars] = useState<KeyValueTableRow[]>(INITIAL_ENV);

  return (
    <div>
      <ExampleCard
        title="Request Headers Table"
        description="maskSensitive hides the Authorization value behind an eye toggle"
        code={`<KeyValueTableView rows={headers} onChange={setHeaders} maskSensitive label="Headers" autocompleteKeys bordered />`}
      >
        <KeyValueTableView
          rows={headers}
          onChange={setHeaders}
          maskSensitive
          autocompleteKeys
          label="Headers"
          bordered
          pinnedTopRows={PINNED_HEADERS}
        />
      </ExampleCard>

      <ExampleCard
        title="Query Parameters Table"
        description="Standard key-value table for URL query params — hover a row to insert above/below"
        code={`<KeyValueTableView rows={params} onChange={setParams} label="Query Params" bordered />`}
      >
        <KeyValueTableView
          rows={params}
          onChange={setParams}
          label="Query Params"
          bordered
        />
      </ExampleCard>

      <ExampleCard
        title="Form Data Table"
        description="multipart/form-data or application/x-www-form-urlencoded fields"
        code={`<KeyValueTableView rows={formData} onChange={setFormData} label="Form Data" bordered />`}
      >
        <KeyValueTableView
          rows={formData}
          onChange={setFormData}
          label="Form Data"
          bordered
        />
      </ExampleCard>

      <ExampleCard
        title="Environment Variables — With Description Column"
        description="showDescription adds a third column for free-text notes"
        code={`<KeyValueTableView rows={envVars} onChange={setEnvVars} showDescription label="Variables" bordered />`}
      >
        <KeyValueTableView
          rows={envVars}
          onChange={setEnvVars}
          showDescription
          label="Variables"
          bordered
        />
      </ExampleCard>

      <ExampleCard
        title="Bulk Operations — Toolbar"
        description="Toolbar offers clear-all and bulk-enable via the BulkEdit icon"
        code={`<KeyValueTableView rows={headers} onChange={setHeaders} label="Headers" accentColor="var(--color-protocol-rest)" bordered />`}
      >
        <KeyValueTableView
          rows={[...INITIAL_HEADERS]}
          onChange={() => {}}
          label="Headers (read-only demo)"
          accentColor="var(--color-protocol-rest)"
          bordered
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size controls row height and input font size — xs/sm for compact views, md/lg for comfortable editing"
        code={`<KeyValueTableView rows={rows} size="xs" label="xs" />
<KeyValueTableView rows={rows} size="sm" label="sm" />
<KeyValueTableView rows={rows} size="md" label="md" />
<KeyValueTableView rows={rows} size="lg" label="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <div key={s}>
              <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 4 }}>size="{s}"</div>
              <KeyValueTableView
                rows={INITIAL_HEADERS.slice(0, 2)}
                onChange={() => {}}
                size={s}
                bordered
              />
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
