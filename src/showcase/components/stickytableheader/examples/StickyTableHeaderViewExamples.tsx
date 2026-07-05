import { useState } from 'react';
import { StickyTableHeaderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface EndpointRow {
  id: number;
  method: string;
  path: string;
  status: number;
  latency: number;
  owner: string;
}

const endpoints: EndpointRow[] = [
  { id: 1, method: 'GET', path: '/api/v1/users', status: 200, latency: 42, owner: 'Platform Team' },
  { id: 2, method: 'POST', path: '/api/v1/users', status: 201, latency: 88, owner: 'Platform Team' },
  { id: 3, method: 'GET', path: '/api/v1/orders/:id', status: 200, latency: 61, owner: 'Commerce Team' },
  { id: 4, method: 'DELETE', path: '/api/v1/orders/:id', status: 204, latency: 33, owner: 'Commerce Team' },
  { id: 5, method: 'PATCH', path: '/api/v1/webhooks/:id', status: 200, latency: 120, owner: 'Integrations' },
  { id: 6, method: 'POST', path: '/api/v1/auth/login', status: 200, latency: 55, owner: 'Auth Team' },
  { id: 7, method: 'GET', path: '/api/v1/teams/:id/members', status: 200, latency: 74, owner: 'Platform Team' },
  { id: 8, method: 'POST', path: '/api/v1/environments', status: 201, latency: 39, owner: 'DevEx' },
];

export function StickyTableHeaderViewExamples() {
  const [rows] = useState(endpoints);
  const [wideRows] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Endpoint ${i + 1}`, extra: `Extra data column ${i + 1}` }))
  );

  return (
    <div>
      <ExampleCard
        title="Basic Sticky Table"
        description="Default table with a sticky header row over API endpoint rows"
        code={`<StickyTableHeaderView
  keyField="id"
  rows={rows}
  columns={[
    { key: 'method', label: 'Method', render: r => r.method },
    { key: 'path', label: 'Path', render: r => r.path },
    { key: 'status', label: 'Status', render: r => r.status },
  ]}
/>`}
      >
        <StickyTableHeaderView
          keyField="id"
          rows={rows}
          maxHeight={220}
          columns={[
            { key: 'method', label: 'Method', render: r => r.method },
            { key: 'path', label: 'Path', render: r => r.path },
            { key: 'status', label: 'Status', render: r => r.status },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Frozen First Column (interactive)"
        description="Toggle freezeFirstColumn to pin the path column while scrolling a wide table horizontally"
        code={`const [frozen, setFrozen] = useState(true);

<StickyTableHeaderView
  keyField="id"
  rows={wideRows}
  freezeFirstColumn={frozen}
  columns={[{ key: 'name', label: 'Endpoint', width: 160, render: r => r.name }, ...]}
/>`}
      >
        <FrozenColumnDemo rows={wideRows} />
      </ExampleCard>

      <ExampleCard
        title="Owner + Latency Table"
        description="Domain-realistic: request analytics table with owning team and p95 latency columns"
        code={`<StickyTableHeaderView
  keyField="id"
  rows={endpoints}
  maxHeight={260}
  columns={[
    { key: 'method', label: 'Method', width: 80, render: r => r.method },
    { key: 'path', label: 'Path', render: r => r.path },
    { key: 'latency', label: 'Latency', width: 90, render: r => r.latency + 'ms' },
    { key: 'owner', label: 'Owner', width: 140, render: r => r.owner },
  ]}
/>`}
      >
        <StickyTableHeaderView
          keyField="id"
          rows={endpoints}
          maxHeight={260}
          columns={[
            { key: 'method', label: 'Method', width: 80, render: r => r.method },
            { key: 'path', label: 'Path', render: r => r.path },
            { key: 'latency', label: 'Latency', width: 90, render: r => `${r.latency}ms` },
            { key: 'owner', label: 'Owner', width: 140, render: r => r.owner },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Size"
        description="size prop controls header/cell font sizing and padding density"
        code={`<StickyTableHeaderView keyField="id" rows={rows} size="sm" columns={[...]} />
<StickyTableHeaderView keyField="id" rows={rows} size="lg" columns={[...]} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <StickyTableHeaderView
            keyField="id"
            rows={rows.slice(0, 3)}
            size="sm"
            maxHeight={140}
            columns={[
              { key: 'method', label: 'Method', render: r => r.method },
              { key: 'path', label: 'Path', render: r => r.path },
            ]}
          />
          <StickyTableHeaderView
            keyField="id"
            rows={rows.slice(0, 3)}
            size="lg"
            maxHeight={160}
            columns={[
              { key: 'method', label: 'Method', render: r => r.method },
              { key: 'path', label: 'Path', render: r => r.path },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Result Set"
        description="No rows — the sticky header still renders so the table shape stays consistent"
        code={`<StickyTableHeaderView
  keyField="id"
  rows={[]}
  columns={[{ key: 'path', label: 'Path', render: r => r.path }]}
/>`}
      >
        <StickyTableHeaderView
          keyField="id"
          rows={[]}
          maxHeight={100}
          columns={[
            { key: 'method', label: 'Method', render: (r: EndpointRow) => r.method },
            { key: 'path', label: 'Path', render: (r: EndpointRow) => r.path },
          ]}
        />
        <div style={{ marginTop: -60, textAlign: 'center', fontSize: 12, color: 'var(--color-text-muted)', position: 'relative' }}>
          No endpoints match the current filter
        </div>
      </ExampleCard>
    </div>
  );
}

function FrozenColumnDemo({ rows }: { rows: { id: number; name: string; extra: string }[] }) {
  const [frozen, setFrozen] = useState(true);
  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
        <input type="checkbox" checked={frozen} onChange={e => setFrozen(e.target.checked)} />
        Freeze first column
      </label>
      <StickyTableHeaderView
        keyField="id"
        rows={rows}
        freezeFirstColumn={frozen}
        maxHeight={200}
        columns={[
          { key: 'name', label: 'Endpoint', width: 160, render: r => r.name },
          { key: 'c1', label: 'Column A', width: 160, render: r => r.extra },
          { key: 'c2', label: 'Column B', width: 160, render: r => r.extra },
          { key: 'c3', label: 'Column C', width: 160, render: r => r.extra },
          { key: 'c4', label: 'Column D', width: 160, render: r => r.extra },
        ]}
      />
    </div>
  );
}
