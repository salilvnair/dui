import { useState } from 'react';
import { SortableHeaderView, type SortDirection } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const requests = [
  { name: 'GET /users', status: 200, latency: 42 },
  { name: 'POST /orders', status: 201, latency: 118 },
  { name: 'GET /webhooks', status: 200, latency: 65 },
  { name: 'DELETE /sessions', status: 204, latency: 21 },
];

export function SortableHeaderViewExamples() {
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [sortKey, setSortKey] = useState<'name' | 'status' | 'latency'>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const sorted = [...requests].sort((a, b) => {
    if (sortDir === null) return 0;
    const mul = sortDir === 'asc' ? 1 : -1;
    return a[sortKey] > b[sortKey] ? mul : a[sortKey] < b[sortKey] ? -mul : 0;
  });

  const onSort = (key: 'name' | 'status' | 'latency') => {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc'); return; }
    setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
  };

  return (
    <div>
      <ExampleCard
        title="Default Column Header"
        description="A single sortable header cell with an ascending arrow indicator"
        code={`<SortableHeaderView label="Name" direction="asc" onClick={() => {}} />`}
      >
        <SortableHeaderView label="Name" direction="asc" onClick={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Toggle"
        description="Click to cycle through asc → desc — direction is tracked in state"
        code={`const [direction, setDirection] = useState<SortDirection>('asc');

<SortableHeaderView
  label="Latency"
  direction={direction}
  onClick={() => setDirection(d => d === 'asc' ? 'desc' : 'asc')}
/>`}
      >
        <SortableHeaderView
          label="Latency"
          direction={direction}
          onClick={() => setDirection(d => d === 'asc' ? 'desc' : 'asc')}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Current direction: <strong style={{ color: 'var(--color-text-primary)' }}>{direction ?? 'none'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes and Colors"
        description="size and color props control font size, padding, and active accent"
        code={`<SortableHeaderView label="Name" direction="asc" size="sm" color="var(--color-info)" onClick={fn} />
<SortableHeaderView label="Name" direction="desc" size="md" color="var(--color-warning)" onClick={fn} />
<SortableHeaderView label="Name" direction="asc" size="lg" color="var(--color-success)" onClick={fn} />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <SortableHeaderView label="Name" direction="asc" size="sm" color="var(--color-info)" onClick={() => {}} />
          <SortableHeaderView label="Name" direction="desc" size="md" color="var(--color-warning)" onClick={() => {}} />
          <SortableHeaderView label="Name" direction="asc" size="lg" color="var(--color-success)" onClick={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Full Request Table Header Row"
        description="Domain-realistic: three sortable columns driving a request-log table, with a 3-state cycle (asc → desc → unsorted)"
        code={`const [sortKey, setSortKey] = useState<'name' | 'status' | 'latency'>('name');
const [sortDir, setSortDir] = useState<SortDirection>('asc');

const onSort = (key) => {
  if (sortKey !== key) { setSortKey(key); setSortDir('asc'); return; }
  setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
};

<div style={{ display: 'flex', gap: 24 }}>
  <SortableHeaderView label="Request" direction={sortKey === 'name' ? sortDir : null} onClick={() => onSort('name')} />
  <SortableHeaderView label="Status" direction={sortKey === 'status' ? sortDir : null} onClick={() => onSort('status')} />
  <SortableHeaderView label="Latency (ms)" direction={sortKey === 'latency' ? sortDir : null} onClick={() => onSort('latency')} />
</div>`}
      >
        <div style={{ display: 'flex', gap: 24, marginBottom: 10 }}>
          <SortableHeaderView label="Request" direction={sortKey === 'name' ? sortDir : null} onClick={() => onSort('name')} />
          <SortableHeaderView label="Status" direction={sortKey === 'status' ? sortDir : null} onClick={() => onSort('status')} />
          <SortableHeaderView label="Latency (ms)" direction={sortKey === 'latency' ? sortDir : null} onClick={() => onSort('latency')} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {sorted.map(r => (
            <div key={r.name} style={{ display: 'flex', gap: 24, padding: '3px 0' }}>
              <span style={{ width: 140 }}>{r.name}</span>
              <span style={{ width: 60 }}>{r.status}</span>
              <span>{r.latency}ms</span>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Unsorted / Null Direction"
        description="direction=null renders a dimmed arrow and muted label color — the neutral, not-yet-sorted state"
        code={`<SortableHeaderView label="Response Size" direction={null} onClick={() => {}} />`}
      >
        <SortableHeaderView label="Response Size" direction={null} onClick={() => {}} />
      </ExampleCard>
    </div>
  );
}
