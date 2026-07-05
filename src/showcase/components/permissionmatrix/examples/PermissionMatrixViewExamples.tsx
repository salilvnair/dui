import { useState } from 'react';
import { PermissionMatrixView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PermissionMatrixViewExamples() {
  const [matrix, setMatrix] = useState([
    [true, true, false],
    [true, false, false],
  ]);
  const [wsMatrix, setWsMatrix] = useState([
    [true, true, true, false],
    [true, true, false, false],
    [true, false, false, false],
  ]);

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<boolean[][]>>,
  ) => (ri: number, pi: number, v: boolean) =>
    setter(m => m.map((row, i) => (i === ri ? row.map((c, j) => (j === pi ? v : c)) : row)));

  return (
    <div>
      <ExampleCard
        title="Basic Role x Permission Grid"
        description="Two roles, three permissions — click a cell to toggle it"
        code={`const [matrix, setMatrix] = useState([[true, true, false], [true, false, false]]);

<PermissionMatrixView
  roles={['Viewer', 'Editor']}
  permissions={['Read', 'Write', 'Delete']}
  matrix={matrix}
  onChange={(ri, pi, v) => setMatrix(m => m.map((row, i) => i === ri ? row.map((c, j) => j === pi ? v : c) : row))}
/>`}
      >
        <PermissionMatrixView
          roles={['Viewer', 'Editor']}
          permissions={['Read', 'Write', 'Delete']}
          matrix={matrix}
          onChange={toggle(setMatrix)}
        />
      </ExampleCard>

      <ExampleCard
        title="Workspace Access Control (Daakia-style)"
        description="A realistic API-workspace permission matrix for Admin / Member / Guest roles"
        code={`<PermissionMatrixView
  roles={['Admin', 'Member', 'Guest']}
  permissions={['View collections', 'Edit requests', 'Manage environments', 'Delete workspace']}
  matrix={wsMatrix}
  onChange={handleChange}
/>`}
      >
        <PermissionMatrixView
          roles={['Admin', 'Member', 'Guest']}
          permissions={['View collections', 'Edit requests', 'Manage environments', 'Delete workspace']}
          matrix={wsMatrix}
          onChange={toggle(setWsMatrix)}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Override the checked-cell color to match a workspace theme"
        code={`<PermissionMatrixView
  roles={['Owner', 'Collaborator']}
  permissions={['Read', 'Write']}
  matrix={matrix}
  onChange={handleChange}
  color="var(--color-protocol-graphql)"
/>`}
      >
        <PermissionMatrixView
          roles={['Owner', 'Collaborator']}
          permissions={['Read', 'Write']}
          matrix={[[true, false], [true, true]]}
          onChange={() => {}}
          color="var(--color-protocol-graphql)"
        />
      </ExampleCard>

      <ExampleCard
        title="Compact Size"
        description="size='sm' for dense settings pages with many roles"
        code={`<PermissionMatrixView
  roles={['A', 'B', 'C', 'D']}
  permissions={['Read', 'Write']}
  matrix={matrix}
  onChange={handleChange}
  size="sm"
/>`}
      >
        <PermissionMatrixView
          roles={['A', 'B', 'C', 'D']}
          permissions={['Read', 'Write']}
          matrix={[[true, true], [true, false], [false, false], [true, true]]}
          onChange={() => {}}
          size="sm"
        />
      </ExampleCard>

      <ExampleCard
        title="No Permissions (Empty State)"
        description="Empty permissions array collapses to a header-only table — a real state before roles are configured"
        code={`<PermissionMatrixView roles={['Admin', 'Member']} permissions={[]} matrix={[]} onChange={handleChange} />`}
      >
        <PermissionMatrixView roles={['Admin', 'Member']} permissions={[]} matrix={[]} onChange={() => {}} />
      </ExampleCard>
    </div>
  );
}
