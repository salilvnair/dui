import { useState } from 'react';
import { TreeSelectView, type TreeSelectNode } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TreeSelectViewExamples() {
  const [value1, setValue1] = useState<string[]>(['ca']);

  const geoNodes: TreeSelectNode[] = [
    { id: 'us', label: 'United States', children: [{ id: 'ca', label: 'California' }, { id: 'ny', label: 'New York' }, { id: 'tx', label: 'Texas' }] },
    { id: 'in', label: 'India', children: [{ id: 'mh', label: 'Maharashtra' }, { id: 'ka', label: 'Karnataka' }] },
  ];
  const [value2, setValue2] = useState<string[]>([]);

  const endpointNodes: TreeSelectNode[] = [
    {
      id: 'users', label: 'Users API', children: [
        { id: 'users-get', label: 'GET /users' },
        { id: 'users-post', label: 'POST /users' },
        { id: 'users-delete', label: 'DELETE /users/{id}' },
      ],
    },
    {
      id: 'orders', label: 'Orders API', children: [
        { id: 'orders-get', label: 'GET /orders' },
        { id: 'orders-post', label: 'POST /orders' },
      ],
    },
  ];
  const [value3, setValue3] = useState<string[]>(['users-get', 'orders-get']);

  const permissionNodes: TreeSelectNode[] = [
    {
      id: 'workspace', label: 'Workspace "Payments"', children: [
        { id: 'read', label: 'Read collections' },
        { id: 'write', label: 'Write collections' },
        { id: 'admin', label: 'Manage members' },
      ],
    },
  ];
  const [value4, setValue4] = useState<string[]>(['read']);

  return (
    <div>
      <ExampleCard
        title="Default Tree"
        description="Tri-state parent checkboxes — checking a parent checks all descendants"
        code={`function Preview() {
  const [value, setValue] = useState(['ca']);
  return <TreeSelectView nodes={[{ id: 'us', label: 'United States', children: [{ id: 'ca', label: 'California' }] }]} value={value} onChange={setValue} />;
}`}
      >
        <TreeSelectView nodes={geoNodes.slice(0, 1)} value={value1} onChange={setValue1} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Selected: {value1.join(', ') || 'none'}</div>
      </ExampleCard>

      <ExampleCard
        title="Multi-Region Geography (interactive)"
        description="Two top-level groups, each with expandable children — auto-expanded at depth 0"
        code={`<TreeSelectView
  nodes={[
    { id: 'us', label: 'United States', children: [{ id: 'ca', label: 'California' }, { id: 'ny', label: 'New York' }, { id: 'tx', label: 'Texas' }] },
    { id: 'in', label: 'India', children: [{ id: 'mh', label: 'Maharashtra' }, { id: 'ka', label: 'Karnataka' }] },
  ]}
  value={value}
  onChange={setValue}
/>`}
      >
        <TreeSelectView nodes={geoNodes} value={value2} onChange={setValue2} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Selected: {value2.length > 0 ? value2.join(', ') : 'none'}</div>
      </ExampleCard>

      <ExampleCard
        title="API Endpoint Picker (domain use case)"
        description="Select specific endpoints to include in a generated test suite or mock server, grouped by resource"
        code={`<TreeSelectView
  nodes={[
    { id: 'users', label: 'Users API', children: [{ id: 'users-get', label: 'GET /users' }, { id: 'users-post', label: 'POST /users' }, { id: 'users-delete', label: 'DELETE /users/{id}' }] },
    { id: 'orders', label: 'Orders API', children: [{ id: 'orders-get', label: 'GET /orders' }, { id: 'orders-post', label: 'POST /orders' }] },
  ]}
  value={value}
  onChange={setValue}
  color="var(--color-protocol-rest)"
/>`}
      >
        <TreeSelectView nodes={endpointNodes} value={value3} onChange={setValue3} color="var(--color-protocol-rest)" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>{value3.length} endpoint(s) selected</div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size for Permissions Panel"
        description="Use size='sm' to fit a workspace permissions tree inside a settings sidebar"
        code={`<TreeSelectView nodes={permissionNodes} value={value} onChange={setValue} size="sm" color="var(--color-warning)" />`}
      >
        <TreeSelectView nodes={permissionNodes} value={value4} onChange={setValue4} size="sm" color="var(--color-warning)" />
      </ExampleCard>

      <ExampleCard
        title="Empty Tree (edge case)"
        description="No nodes provided — renders an empty container; pair with a fallback message"
        code={`<TreeSelectView nodes={[]} value={[]} onChange={() => {}} />
{nodes.length === 0 && <p>No resources available to select.</p>}`}
      >
        <TreeSelectView nodes={[]} value={[]} onChange={() => {}} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No resources available to select.</div>
      </ExampleCard>
    </div>
  );
}
