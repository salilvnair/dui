import { useState } from 'react';
import { EditableCellView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface HeaderRow {
  id: string;
  key: string;
  value: string;
}

export function EditableCellViewExamples() {
  const [value, setValue] = useState('https://api.daakia.dev/v2/users');
  const [headers, setHeaders] = useState<HeaderRow[]>([
    { id: 'h1', key: 'Content-Type', value: 'application/json' },
    { id: 'h2', key: 'Authorization', value: 'Bearer eyJhbGciOi...' },
    { id: 'h3', key: 'X-Request-Id', value: '' },
  ]);

  const updateHeader = (id: string, next: string) =>
    setHeaders(prev => prev.map(h => h.id === id ? { ...h, value: next } : h));

  return (
    <div>
      <ExampleCard
        title="Default Editable Cell"
        description="Click to edit, Enter to commit, Escape to cancel"
        code={`<EditableCellView value={value} onChange={setValue} />`}
      >
        <EditableCellView value="https://api.daakia.dev/v2/users" onChange={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Request URL Field"
        description="Fully wired with useState — edit the URL and see the committed value below"
        code={`const [value, setValue] = useState('https://api.daakia.dev/v2/users');

<EditableCellView value={value} onChange={setValue} placeholder="Enter request URL" />`}
      >
        <EditableCellView value={value} onChange={setValue} placeholder="Enter request URL" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Committed value: <code>{value || '(empty)'}</code>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes and Colors"
        description="size controls font/padding, color controls the edit-mode border accent"
        code={`<EditableCellView size="sm" color="var(--color-info)" value="staging" onChange={fn} />
<EditableCellView size="md" color="var(--color-warning)" value="production" onChange={fn} />
<EditableCellView size="lg" color="var(--color-success)" value="local" onChange={fn} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 220 }}>
          <EditableCellView size="sm" color="var(--color-info)" value="staging" onChange={() => {}} />
          <EditableCellView size="md" color="var(--color-warning)" value="production" onChange={() => {}} />
          <EditableCellView size="lg" color="var(--color-success)" value="local" onChange={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Headers Table"
        description="Domain-realistic: an editable key/value headers panel like a request builder"
        code={`const [headers, setHeaders] = useState([
  { id: 'h1', key: 'Content-Type', value: 'application/json' },
  { id: 'h2', key: 'Authorization', value: 'Bearer eyJhbGciOi...' },
  { id: 'h3', key: 'X-Request-Id', value: '' },
]);

{headers.map(h => (
  <div key={h.id} style={{ display: 'flex', gap: 8 }}>
    <span>{h.key}</span>
    <EditableCellView
      value={h.value}
      placeholder="Add value"
      onChange={next => updateHeader(h.id, next)}
    />
  </div>
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {headers.map(h => (
            <div key={h.id} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>{h.key}</span>
              <EditableCellView value={h.value} placeholder="Add value" onChange={next => updateHeader(h.id, next)} />
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Value with Placeholder"
        description="When value is empty, the placeholder (or an em dash fallback) is shown in muted text until clicked"
        code={`<EditableCellView value="" placeholder="No description" onChange={fn} />
<EditableCellView value="" onChange={fn} />{/* falls back to — */}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 220 }}>
          <EditableCellView value="" placeholder="No description" onChange={() => {}} />
          <EditableCellView value="" onChange={() => {}} />
        </div>
      </ExampleCard>
    </div>
  );
}
