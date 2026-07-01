import { useState } from 'react';
import { DataTableView } from '@/dui';
import type { DataTableColumn } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Types ────────────────────────────────────────────────────────────────────
interface HistoryRow extends Record<string, unknown> {
  id: string;
  method: string;
  url: string;
  status: number;
  time: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────
const historyRows: HistoryRow[] = [
  { id: '1', method: 'GET',    url: '/api/users',           status: 200, time: '142ms' },
  { id: '2', method: 'POST',   url: '/api/users',           status: 201, time: '89ms'  },
  { id: '3', method: 'PUT',    url: '/api/users/42',        status: 200, time: '201ms' },
  { id: '4', method: 'DELETE', url: '/api/users/17',        status: 204, time: '55ms'  },
  { id: '5', method: 'GET',    url: '/api/users?role=admin',status: 500, time: '3.8s'  },
];

// ─── Method badge renderer ────────────────────────────────────────────────────
const METHOD_COLOR: Record<string, string> = {
  GET:    'var(--color-protocol-rest)',
  POST:   'var(--color-success)',
  PUT:    'var(--color-warning)',
  DELETE: 'var(--color-error)',
  PATCH:  'var(--color-info)',
};

function MethodBadge({ method }: { method: string }) {
  const color = METHOD_COLOR[method] ?? 'var(--color-text-muted)';
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
      background: `color-mix(in srgb, ${color} 12%, transparent)`,
      color, fontFamily: 'monospace', letterSpacing: '0.03em',
    }}>
      {method}
    </span>
  );
}

function StatusBadge({ status }: { status: number }) {
  const color = status >= 500 ? 'var(--color-error)' : status >= 400 ? 'var(--color-warning)' : 'var(--color-success)';
  return (
    <span style={{ color, fontWeight: 700, fontFamily: 'monospace', fontSize: 12 }}>{status}</span>
  );
}

// ─── Column definitions ───────────────────────────────────────────────────────
const historyColumns: DataTableColumn<HistoryRow>[] = [
  {
    key: 'method', label: 'Method', width: '80px',
    renderCell: (row) => <MethodBadge method={row.method} />,
  },
  { key: 'url',    label: 'URL',     width: '1fr', sortable: true },
  {
    key: 'status', label: 'Status',  width: '70px', sortable: true, align: 'center',
    renderCell: (row) => <StatusBadge status={row.status} />,
  },
  { key: 'time',   label: 'Time',    width: '70px', align: 'right' },
];

// ─── Request history table ────────────────────────────────────────────────────
function HistoryTableDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div>
      {selected && (
        <div style={{ marginBottom: 10, padding: '6px 10px', borderRadius: 6, background: 'var(--color-panel)', fontSize: 12, color: 'var(--color-text-secondary)' }}>
          Selected row ID: <strong style={{ color: 'var(--color-text-primary)' }}>{selected}</strong>
        </div>
      )}
      <DataTableView
        columns={historyColumns}
        rows={historyRows}
        onRowClick={row => setSelected(row.id)}
        maxHeight="300px"
      />
    </div>
  );
}

// ─── Sortable by status ───────────────────────────────────────────────────────
function SortableTableDemo() {
  return (
    <DataTableView
      columns={historyColumns}
      rows={historyRows}
      maxHeight="260px"
    />
  );
}

// ─── Striped rows ─────────────────────────────────────────────────────────────
function StripedTableDemo() {
  return (
    <DataTableView
      columns={historyColumns}
      rows={historyRows}
      striped
      maxHeight="260px"
    />
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyTableDemo() {
  return (
    <DataTableView
      columns={historyColumns}
      rows={[]}
      emptyTitle="No history yet"
      emptyMessage="Send a request to see it appear here."
      maxHeight="200px"
    />
  );
}

// ─── Expanded row with detail ─────────────────────────────────────────────────
function ExpandableTableDemo() {
  return (
    <DataTableView
      columns={historyColumns}
      rows={historyRows}
      renderExpanded={row => (
        <div style={{ padding: '10px 16px', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>{row.method} {row.url}</strong>
          <br />
          Status: <StatusBadge status={row.status} /> · Time: {row.time}
        </div>
      )}
    />
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function DataTableViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Request History Table"
        description="Method badge + status badge + row click handler — click a row to select it"
        code={`<DataTableView
  columns={[
    { key: 'method', label: 'Method', renderCell: row => <MethodBadge method={row.method} /> },
    { key: 'url',    label: 'URL',    sortable: true },
    { key: 'status', label: 'Status', renderCell: row => <StatusBadge status={row.status} /> },
  ]}
  rows={historyRows}
  onRowClick={row => setSelected(row.id)}
/>`}
      >
        <HistoryTableDemo />
      </ExampleCard>

      <ExampleCard
        title="Sortable by Status Code"
        description="Click the Status or URL column header to sort — chevron indicates direction"
        code={`<DataTableView columns={[
  { key: 'url',    label: 'URL',    sortable: true },
  { key: 'status', label: 'Status', sortable: true, align: 'center' },
]} rows={historyRows} />`}
      >
        <SortableTableDemo />
      </ExampleCard>

      <ExampleCard
        title="Striped Rows"
        description="striped=true — alternating row backgrounds improve readability for dense data"
        code={`<DataTableView columns={...} rows={historyRows} striped />`}
      >
        <StripedTableDemo />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="rows=[] triggers EmptyStateView with custom title and message"
        code={`<DataTableView columns={columns} rows={[]}
  emptyTitle="No history yet"
  emptyMessage="Send a request to see it appear here." />`}
      >
        <EmptyTableDemo />
      </ExampleCard>

      <ExampleCard
        title="Expandable Rows"
        description="renderExpanded — click the chevron to expand a row and show detail"
        code={`<DataTableView columns={columns} rows={historyRows}
  renderExpanded={row => <DetailPanel row={row} />} />`}
      >
        <ExpandableTableDemo />
      </ExampleCard>
    </div>
  );
}
