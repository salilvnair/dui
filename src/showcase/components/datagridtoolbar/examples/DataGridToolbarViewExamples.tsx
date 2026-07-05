import { useState } from 'react';
import { DataGridToolbarView, type DataGridDensity } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const requestColumns = [
  { key: 'method', label: 'Method' },
  { key: 'path', label: 'Path' },
  { key: 'status', label: 'Status' },
  { key: 'latency', label: 'Latency' },
  { key: 'team', label: 'Team' },
];

export function DataGridToolbarViewExamples() {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(['method', 'path', 'status']);
  const [density, setDensity] = useState<DataGridDensity>('default');
  const [exportCount, setExportCount] = useState(0);

  return (
    <div>
      <ExampleCard
        title="Default Toolbar"
        description="Search input plus column-visibility menu over a request log table"
        code={`<DataGridToolbarView
  search=""
  onSearchChange={setSearch}
  columns={[
    { key: 'method', label: 'Method' },
    { key: 'path', label: 'Path' },
    { key: 'status', label: 'Status' },
  ]}
  visibleColumns={['method', 'path', 'status']}
  onVisibleColumnsChange={setVisible}
/>`}
      >
        <DataGridToolbarView
          search=""
          onSearchChange={() => {}}
          columns={requestColumns.slice(0, 3)}
          visibleColumns={['method', 'path', 'status']}
          onVisibleColumnsChange={() => {}}
        />
      </ExampleCard>

      <ExampleCard
        title="Interactive Search + Column Visibility"
        description="Fully wired — type to filter, toggle columns, watch state update below"
        code={`const [search, setSearch] = useState('');
const [visible, setVisible] = useState(['method', 'path', 'status']);

<DataGridToolbarView
  search={search}
  onSearchChange={setSearch}
  columns={requestColumns}
  visibleColumns={visible}
  onVisibleColumnsChange={setVisible}
/>`}
      >
        <DataGridToolbarView
          search={search}
          onSearchChange={setSearch}
          columns={requestColumns}
          visibleColumns={visible}
          onVisibleColumnsChange={setVisible}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Search: "{search || '(empty)'}" · Visible: {visible.join(', ')}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes and Colors"
        description="size and color props flow through to the search field and column-visibility trigger"
        code={`<DataGridToolbarView size="sm" color="var(--color-info)" search="" onSearchChange={fn} />
<DataGridToolbarView size="lg" color="var(--color-warning)" search="" onSearchChange={fn} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DataGridToolbarView size="sm" color="var(--color-info)" search="" onSearchChange={() => {}} />
          <DataGridToolbarView size="lg" color="var(--color-warning)" search="" onSearchChange={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Full Toolbar: Search, Columns, Density, Export"
        description="Domain-realistic: complete toolbar for a webhook delivery grid — search, column toggle, density cycle, CSV export"
        code={`const [density, setDensity] = useState<DataGridDensity>('default');
const [exportCount, setExportCount] = useState(0);

<DataGridToolbarView
  search={search}
  onSearchChange={setSearch}
  columns={requestColumns}
  visibleColumns={visible}
  onVisibleColumnsChange={setVisible}
  density={density}
  onDensityChange={setDensity}
  onExport={() => setExportCount(c => c + 1)}
  color="var(--color-protocol-rest)"
/>`}
      >
        <DataGridToolbarView
          search={search}
          onSearchChange={setSearch}
          columns={requestColumns}
          visibleColumns={visible}
          onVisibleColumnsChange={setVisible}
          density={density}
          onDensityChange={setDensity}
          onExport={() => setExportCount(c => c + 1)}
          color="var(--color-protocol-rest)"
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Density: {density} · Exports triggered: {exportCount}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Search-Only (no columns/density/export)"
        description="Edge case: all optional slots omitted — the toolbar degrades gracefully to just a search field"
        code={`<DataGridToolbarView search="" onSearchChange={setSearch} />
{/* no columns, density, or export handlers passed — those controls simply don't render */}`}
      >
        <DataGridToolbarView search="" onSearchChange={() => {}} />
      </ExampleCard>
    </div>
  );
}
