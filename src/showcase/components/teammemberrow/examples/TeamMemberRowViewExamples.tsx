import { useState } from 'react';
import { TeamMemberRowView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TeamMemberRowViewExamples() {
  const [members, setMembers] = useState([
    { id: 1, name: 'Jordan Lee', role: 'Platform Engineer' },
    { id: 2, name: 'Priya Sharma', role: 'API Architect' },
    { id: 3, name: 'Alex Kim', role: 'QA Lead' },
  ]);

  return (
    <div>
      <ExampleCard
        title="Basic Row"
        description="Default row with placeholder avatar circle"
        code={`<TeamMemberRowView name="Jordan Lee" role="Platform Engineer" onRemove={remove} />`}
      >
        <TeamMemberRowView name="Jordan Lee" role="Platform Engineer" onRemove={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Team List"
        description="Removable member list — clicking remove filters the member out of state"
        code={`const [members, setMembers] = useState([
  { id: 1, name: 'Jordan Lee', role: 'Platform Engineer' },
  { id: 2, name: 'Priya Sharma', role: 'API Architect' },
]);

{members.map(m => (
  <TeamMemberRowView key={m.id} name={m.name} role={m.role} onRemove={() => setMembers(ms => ms.filter(x => x.id !== m.id))} />
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {members.map(m => (
            <TeamMemberRowView
              key={m.id}
              name={m.name}
              role={m.role}
              onRemove={() => setMembers(ms => ms.filter(x => x.id !== m.id))}
            />
          ))}
          {members.length === 0 && (
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', padding: 8 }}>No team members left.</div>
          )}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Avatar"
        description="Pass an initials or image avatar instead of the default placeholder"
        code={`<TeamMemberRowView
  name="Priya Sharma"
  role="API Architect"
  avatar={<span style={{ width: 32, height: 32, borderRadius: '999px', background: 'var(--color-protocol-graphql)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>PS</span>}
  onRemove={remove}
/>`}
      >
        <TeamMemberRowView
          name="Priya Sharma"
          role="API Architect"
          avatar={<span style={{ width: 32, height: 32, borderRadius: '999px', background: 'var(--color-protocol-graphql)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>PS</span>}
          onRemove={() => {}}
        />
      </ExampleCard>

      <ExampleCard
        title="Read-only Row (No Remove)"
        description="Omit onRemove for viewers who cannot manage team membership"
        code={`<TeamMemberRowView name="Alex Kim" role="QA Lead" />`}
      >
        <TeamMemberRowView name="Alex Kim" role="QA Lead" />
      </ExampleCard>

      <ExampleCard
        title="Compact Size for Sidebar List"
        description="size='sm' fits a narrower sidebar members panel"
        code={`<TeamMemberRowView name="Sam Patel" role="DevOps" size="sm" onRemove={remove} />`}
      >
        <TeamMemberRowView name="Sam Patel" role="DevOps" size="sm" onRemove={() => {}} />
      </ExampleCard>
    </div>
  );
}
