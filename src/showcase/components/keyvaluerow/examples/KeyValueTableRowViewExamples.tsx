import { useState } from 'react';
import { KeyValueTableRowView, HiddenKeyValueItemView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function KeyValueTableRowViewExamples() {
  const [rows, setRows] = useState([
    { id: 1, key: 'Content-Type', value: 'application/json', enabled: true },
    { id: 2, key: 'Authorization', value: 'Bearer eyJhbGciOiJIUzI1NiIs', enabled: true },
    { id: 3, key: 'X-Request-Id', value: '6f3c1a2e', enabled: false, description: 'Correlates with the server log' },
  ]);

  const patch = (id: number, p: Partial<(typeof rows)[number]>) =>
    setRows(r => r.map(row => (row.id === id ? { ...row, ...p } : row)));

  return (
    <>
      <ExampleCard
        title="One row of a key/value table"
        description="The row KeyValueTableView is built from — enable, edit, describe, delete. Authorization masks itself."
        code={'<KeyValueTableRowView rowKey={k} value={v} enabled onKeyChange={…} maskSensitive />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          {rows.map(r => (
            <KeyValueTableRowView
              key={r.id}
              rowKey={r.key}
              value={r.value}
              description={r.description}
              enabled={r.enabled}
              showDescription
              deletable
              maskSensitive
              autocompleteKeys
              onKeyChange={v => patch(r.id, { key: v })}
              onValueChange={v => patch(r.id, { value: v })}
              onDescriptionChange={v => patch(r.id, { description: v })}
              onEnabledChange={v => patch(r.id, { enabled: v })}
              onRemove={() => setRows(list => list.filter(x => x.id !== r.id))}
            />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Pinned and read-only"
        description="A lock, a dashed border, no toggle — for the headers the client adds whatever you do"
        code={'<KeyValueTableRowView readOnly rowKey="User-Agent" value="daakia/3.0.3" />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <KeyValueTableRowView readOnly rowKey="User-Agent" value="daakia/3.0.3" />
          <KeyValueTableRowView readOnly rowKey="Accept-Encoding" value="gzip, deflate, br" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="HiddenKeyValueItemView"
        description="The same pair when it is not editable at all — a computed header, a cookie the jar added"
        code={'<HiddenKeyValueItemView keyValue="Cookie" value="sid=…" masked badge="cookie" />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
          <HiddenKeyValueItemView keyValue="Cookie" value="sid=8f2a1c9e4b7d" masked badge="cookie" badgeColor="var(--color-warning)" />
          <HiddenKeyValueItemView keyValue="X-Api-Key" value="sk_live_51H8ZqL" masked badge="auth" badgeColor="var(--color-error)" onDelete={() => {}} />
          <HiddenKeyValueItemView keyValue="Host" value="api.example.com" />
        </div>
      </ExampleCard>
    </>
  );
}
