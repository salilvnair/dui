import { useState } from 'react';
import { AvatarView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AvatarViewExamples() {
  const [status, setStatus] = useState<'online' | 'away' | 'busy' | 'offline'>('online');

  return (
    <div>
      <ExampleCard
        title="Name-derived Initials with Presence"
        description="No src — initials are auto-derived from name, with an online status dot"
        code={`<AvatarView name="Salil Vasa Nair" status="online" />`}
      >
        <AvatarView name="Salil Vasa Nair" status="online" />
      </ExampleCard>

      <ExampleCard
        title="Team Member Presence (interactive)"
        description="Cycle through presence states for a workspace member avatar"
        code={`const [status, setStatus] = useState('online');

<AvatarView name="Priya Sharma" status={status} />
<ButtonView onClick={() => setStatus(next(status))}>Cycle status</ButtonView>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvatarView name="Priya Sharma" status={status} />
          <button
            type="button"
            onClick={() => setStatus(s => (s === 'online' ? 'away' : s === 'away' ? 'busy' : s === 'busy' ? 'offline' : 'online'))}
            style={{ fontSize: 11, color: 'var(--color-primary)', background: 'none', border: '1px solid var(--color-surface-border)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}
          >
            Cycle status ({status})
          </button>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Image Source with Fallback"
        description="src is used when it loads; explicit initials override the name-derived fallback"
        code={`<AvatarView src="https://i.pravatar.cc/64?img=12" name="Jordan Lee" />
<AvatarView src={null} initials="JL" name="Jordan Lee" />`}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <AvatarView src="https://i.pravatar.cc/64?img=12" name="Jordan Lee" />
          <AvatarView src={null} initials="JL" name="Jordan Lee" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="xs through xl for different UI contexts (comment threads vs. profile headers)"
        code={`<AvatarView name="Amara Okafor" size="xs" />
<AvatarView name="Amara Okafor" size="sm" />
<AvatarView name="Amara Okafor" size="md" />
<AvatarView name="Amara Okafor" size="lg" />
<AvatarView name="Amara Okafor" size="xl" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvatarView name="Amara Okafor" size="xs" />
          <AvatarView name="Amara Okafor" size="sm" />
          <AvatarView name="Amara Okafor" size="md" />
          <AvatarView name="Amara Okafor" size="lg" />
          <AvatarView name="Amara Okafor" size="xl" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Unknown User (empty state)"
        description="No name or initials provided — falls back to a '?' placeholder"
        code={`<AvatarView />`}
      >
        <AvatarView />
      </ExampleCard>
    </div>
  );
}
