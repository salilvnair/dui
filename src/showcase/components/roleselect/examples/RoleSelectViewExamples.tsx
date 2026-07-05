import { useState } from 'react';
import { RoleSelectView } from '@/dui';
import type { RoleOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const BASIC_OPTIONS: RoleOption[] = [
  { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
  { value: 'editor', label: 'Editor', description: 'Can edit content' },
];

const WORKSPACE_OPTIONS: RoleOption[] = [
  { value: 'owner', label: 'Owner', description: 'Full control, including billing and deletion' },
  { value: 'admin', label: 'Admin', description: 'Manage members, environments, and settings' },
  { value: 'member', label: 'Member', description: 'Create and edit requests and collections' },
  { value: 'guest', label: 'Guest', description: 'View-only access to shared collections' },
];

export function RoleSelectViewExamples() {
  const [role1, setRole1] = useState('editor');
  const [role2, setRole2] = useState('member');
  const [role3, setRole3] = useState('admin');

  return (
    <div>
      <ExampleCard
        title="Basic Role Dropdown"
        description="Two roles with descriptions shown beneath each label"
        code={`function Preview() {
  const [role, setRole] = useState('editor');
  return (
    <RoleSelectView
      options={[
        { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
        { value: 'editor', label: 'Editor', description: 'Can edit content' },
      ]}
      value={role}
      onChange={setRole}
    />
  );
}`}
      >
        <RoleSelectView options={BASIC_OPTIONS} value={role1} onChange={setRole1} />
      </ExampleCard>

      <ExampleCard
        title="Workspace Member Role Picker"
        description="Realistic 4-tier workspace role selector for a team-management page"
        code={`const options = [
  { value: 'owner', label: 'Owner', description: 'Full control, including billing and deletion' },
  { value: 'admin', label: 'Admin', description: 'Manage members, environments, and settings' },
  { value: 'member', label: 'Member', description: 'Create and edit requests and collections' },
  { value: 'guest', label: 'Guest', description: 'View-only access to shared collections' },
];

<RoleSelectView options={options} value={role} onChange={setRole} width="lg" />`}
      >
        <RoleSelectView options={WORKSPACE_OPTIONS} value={role2} onChange={setRole2} width="lg" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: <strong style={{ color: 'var(--color-text-primary)' }}>{role2}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Theming the selected label and border with a brand color"
        code={`<RoleSelectView options={options} value={role} onChange={setRole} color="var(--color-protocol-graphql)" />`}
      >
        <RoleSelectView options={WORKSPACE_OPTIONS} value={role3} onChange={setRole3} color="var(--color-protocol-graphql)" />
      </ExampleCard>

      <ExampleCard
        title="Rounded & Compact Size"
        description="borderRadius='full' pill trigger, size='sm' for a dense invite modal row"
        code={`<RoleSelectView options={basicOptions} value={role} onChange={setRole} size="sm" borderRadius="full" />`}
      >
        <RoleSelectView options={BASIC_OPTIONS} value="viewer" onChange={() => {}} size="sm" borderRadius="full" />
      </ExampleCard>

      <ExampleCard
        title="Disabled Selector"
        description="Locked role field, e.g. for the workspace owner's own row which cannot be changed"
        code={`<RoleSelectView options={workspaceOptions} value="owner" onChange={() => {}} disabled />`}
      >
        <RoleSelectView options={WORKSPACE_OPTIONS} value="owner" onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
