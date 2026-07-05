import { useState } from 'react';
import { PresenceDotView, AvatarView } from '@/dui';
import type { PresenceStatus } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PresenceDotViewExamples() {
  const [status, setStatus] = useState<PresenceStatus>('online');

  return (
    <div>
      <ExampleCard
        title="Default Status Dot"
        description="A bare status primitive — smallest building block for presence indicators"
        code={`<PresenceDotView status="online" />`}
      >
        <PresenceDotView status="online" />
      </ExampleCard>

      <ExampleCard
        title="All Statuses"
        description="online / away / busy / offline side by side, labeled — e.g. a team member list"
        code={`<PresenceDotView status="online" />
<PresenceDotView status="away" />
<PresenceDotView status="busy" />
<PresenceDotView status="offline" />`}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          {(['online', 'away', 'busy', 'offline'] as PresenceStatus[]).map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PresenceDotView status={s} />
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{s}</span>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="My Status Selector (interactive)"
        description="Click a dot to set your own presence — common in a workspace header user menu"
        code={`const [status, setStatus] = useState('online');

{(['online', 'away', 'busy', 'offline']).map(s => (
  <button key={s} onClick={() => setStatus(s)}>
    <PresenceDotView status={s} />
  </button>
))}`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {(['online', 'away', 'busy', 'offline'] as PresenceStatus[]).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: 4, opacity: status === s ? 1 : 0.4 }}
            >
              <PresenceDotView status={s} />
            </button>
          ))}
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', marginLeft: 4 }}>Current: {status}</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Ring Variant (overlaid on avatar)"
        description="ring adds a surface-colored border, needed when overlapping an image or colored background"
        code={`<span style={{ position: 'relative', display: 'inline-flex' }}>
  <AvatarView name="Tomas Ruiz" />
  <span style={{ position: 'absolute', bottom: 0, right: 0 }}>
    <PresenceDotView status="busy" ring />
  </span>
</span>`}
      >
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <AvatarView name="Tomas Ruiz" />
          <span style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <PresenceDotView status="busy" ring />
          </span>
        </span>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="Dot size scales with DuiSize, from a dense sidebar list to a large profile header"
        code={`<PresenceDotView status="online" size="xs" />
<PresenceDotView status="online" size="sm" />
<PresenceDotView status="online" size="md" />
<PresenceDotView status="online" size="lg" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PresenceDotView status="online" size="xs" />
          <PresenceDotView status="online" size="sm" />
          <PresenceDotView status="online" size="md" />
          <PresenceDotView status="online" size="lg" />
        </div>
      </ExampleCard>
    </div>
  );
}
