import { useState } from 'react';
import { ColumnVisibilityMenuView, type ColumnVisibilityOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const requestColumns: ColumnVisibilityOption[] = [
  { key: 'method', label: 'Method' },
  { key: 'path', label: 'Path' },
  { key: 'status', label: 'Status' },
  { key: 'latency', label: 'Latency' },
  { key: 'team', label: 'Team' },
];

export function ColumnVisibilityMenuViewExamples() {
  const [visible, setVisible] = useState(['method', 'path', 'status']);

  return (
    <div>
      <ExampleCard
        title="Default Menu"
        description="Click the Columns trigger to open a checkbox list of toggleable columns"
        code={`<ColumnVisibilityMenuView
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
  ]}
  visible={visible}
  onChange={setVisible}
/>`}
      >
        <ColumnVisibilityMenuView
          columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }]}
          visible={['name', 'status']}
          onChange={() => {}}
        />
      </ExampleCard>

      <ExampleCard
        title="Interactive Column Toggle"
        description="Fully wired with useState — toggle checkboxes and see the visible set update live"
        code={`const [visible, setVisible] = useState(['method', 'path', 'status']);

<ColumnVisibilityMenuView
  columns={requestColumns}
  visible={visible}
  onChange={setVisible}
/>`}
      >
        <ColumnVisibilityMenuView columns={requestColumns} visible={visible} onChange={setVisible} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Visible columns: {visible.length > 0 ? visible.join(', ') : 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes and Colors"
        description="size controls trigger button density; color tints the checkbox accent"
        code={`<ColumnVisibilityMenuView size="sm" color="var(--color-info)" columns={cols} visible={visible} onChange={fn} />
<ColumnVisibilityMenuView size="lg" color="var(--color-warning)" columns={cols} visible={visible} onChange={fn} />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ColumnVisibilityMenuView size="sm" color="var(--color-info)" columns={requestColumns} visible={visible} onChange={setVisible} />
          <ColumnVisibilityMenuView size="lg" color="var(--color-warning)" columns={requestColumns} visible={visible} onChange={setVisible} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Response Table Column Picker"
        description="Domain-realistic: pick which response-table columns are shown for a large API test result grid"
        code={`<ColumnVisibilityMenuView
  columns={[
    { key: 'endpoint', label: 'Endpoint' },
    { key: 'method', label: 'Method' },
    { key: 'statusCode', label: 'Status Code' },
    { key: 'responseTime', label: 'Response Time' },
    { key: 'responseSize', label: 'Response Size' },
    { key: 'assertions', label: 'Assertions Passed' },
  ]}
  visible={['endpoint', 'statusCode', 'responseTime']}
  onChange={setVisible}
  color="var(--color-protocol-graphql)"
/>`}
      >
        <ColumnVisibilityMenuView
          columns={[
            { key: 'endpoint', label: 'Endpoint' },
            { key: 'method', label: 'Method' },
            { key: 'statusCode', label: 'Status Code' },
            { key: 'responseTime', label: 'Response Time' },
            { key: 'responseSize', label: 'Response Size' },
            { key: 'assertions', label: 'Assertions Passed' },
          ]}
          visible={['endpoint', 'statusCode', 'responseTime']}
          onChange={() => {}}
          color="var(--color-protocol-graphql)"
        />
      </ExampleCard>

      <ExampleCard
        title="All Columns Hidden"
        description="Edge case: every column toggled off — visible is an empty array, and the underlying table would show no columns"
        code={`<ColumnVisibilityMenuView
  columns={requestColumns}
  visible={[]}
  onChange={setVisible}
/>`}
      >
        <ColumnVisibilityMenuView columns={requestColumns} visible={[]} onChange={() => {}} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-warning)' }}>
          Warning: no columns visible — the table body would be empty.
        </div>
      </ExampleCard>
    </div>
  );
}
