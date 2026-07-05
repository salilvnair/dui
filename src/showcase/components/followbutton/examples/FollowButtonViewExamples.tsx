import { useState } from 'react';
import { FollowButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  following: boolean;
}

export function FollowButtonViewExamples() {
  const [following, setFollowing] = useState(false);

  const [members, setMembers] = useState<TeamMember[]>([
    { id: 'u1', name: 'Priya Sharma', role: 'API Platform Lead', following: true },
    { id: 'u2', name: 'Marcus Chen', role: 'Backend Engineer', following: false },
    { id: 'u3', name: 'Elena Petrova', role: 'DevRel', following: false },
  ]);

  const toggleMember = (id: string) =>
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, following: !m.following } : m)));

  return (
    <div>
      <ExampleCard
        title="Basic Follow Button"
        description="Hover while following to reveal 'Unfollow'"
        code={`const [following, setFollowing] = useState(false);

<FollowButtonView following={following} onChange={setFollowing} />`}
      >
        <FollowButtonView following={following} onChange={setFollowing} />
      </ExampleCard>

      <ExampleCard
        title="Team Member Directory (interactive)"
        description="Follow individual teammates to get notified about their published API changes"
        code={`const [members, setMembers] = useState([
  { id: 'u1', name: 'Priya Sharma', role: 'API Platform Lead', following: true },
]);

<FollowButtonView
  following={member.following}
  onChange={() => toggleMember(member.id)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {members.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>{m.name}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{m.role}</div>
              </div>
              <FollowButtonView following={m.following} onChange={() => toggleMember(m.id)} />
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color drives the filled 'Follow' background"
        code={`<FollowButtonView following={false} onChange={() => {}} color="var(--color-success)" />
<FollowButtonView following={false} onChange={() => {}} color="#a855f7" />`}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <FollowButtonView following={false} onChange={() => {}} color="var(--color-success)" />
          <FollowButtonView following={false} onChange={() => {}} color="#a855f7" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Different Sizes"
        description="size scales button height, padding, and font"
        code={`<FollowButtonView following={false} onChange={() => {}} size="sm" />
<FollowButtonView following={false} onChange={() => {}} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <FollowButtonView following={false} onChange={() => {}} size="sm" />
          <FollowButtonView following={false} onChange={() => {}} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Already Following (edge case)"
        description="following=true shows an outlined 'Following' label that swaps to red 'Unfollow' text on hover"
        code={`<FollowButtonView following onChange={() => {}} />`}
      >
        <FollowButtonView following onChange={() => {}} />
      </ExampleCard>
    </div>
  );
}
