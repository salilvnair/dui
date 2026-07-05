import { useState } from 'react';
import { AvatarGroupView } from '@/dui';
import type { AvatarGroupMember } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const TEAM: AvatarGroupMember[] = [
  { name: 'Salil Vasa Nair' },
  { name: 'Jordan Lee' },
  { name: 'Amara Okafor' },
  { name: 'Priya Sharma' },
  { name: 'Tomas Ruiz' },
];

export function AvatarGroupViewExamples() {
  const [max, setMax] = useState(4);

  return (
    <div>
      <ExampleCard
        title="Default Overflow Group"
        description="Stacked overlapping avatars, collapsing extras into a '+N' bubble"
        code={`const members = [
  { name: 'Salil Vasa Nair' }, { name: 'Jordan Lee' }, { name: 'Amara Okafor' },
  { name: 'Priya Sharma' }, { name: 'Tomas Ruiz' },
];

<AvatarGroupView members={members} max={4} />`}
      >
        <AvatarGroupView members={TEAM} max={4} />
      </ExampleCard>

      <ExampleCard
        title="Adjustable Max (interactive)"
        description="Change how many avatars show before collapsing — useful for a 'Shared with' collection permissions row"
        code={`const [max, setMax] = useState(4);

<AvatarGroupView members={members} max={max} />
<StepperInputView value={max} onChange={setMax} min={1} max={5} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AvatarGroupView members={TEAM} max={max} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button type="button" onClick={() => setMax(m => Math.max(1, m - 1))} style={{ width: 22, height: 22, border: '1px solid var(--color-surface-border)', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}>−</button>
            <span style={{ fontSize: 12, minWidth: 12, textAlign: 'center' }}>{max}</span>
            <button type="button" onClick={() => setMax(m => Math.min(5, m + 1))} style={{ width: 22, height: 22, border: '1px solid var(--color-surface-border)', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}>+</button>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Image Sources"
        description="Members can mix image src and name-derived initials fallback"
        code={`<AvatarGroupView members={[
  { src: 'https://i.pravatar.cc/64?img=12', name: 'Jordan Lee' },
  { src: 'https://i.pravatar.cc/64?img=32', name: 'Amara Okafor' },
  { name: 'Priya Sharma' },
]} />`}
      >
        <AvatarGroupView members={[
          { src: 'https://i.pravatar.cc/64?img=12', name: 'Jordan Lee' },
          { src: 'https://i.pravatar.cc/64?img=32', name: 'Amara Okafor' },
          { name: 'Priya Sharma' },
        ]} />
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="sm / md / lg group sizing, driven by the same DuiSize as AvatarView"
        code={`<AvatarGroupView members={members} size="sm" />
<AvatarGroupView members={members} size="md" />
<AvatarGroupView members={members} size="lg" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <AvatarGroupView members={TEAM} size="sm" />
          <AvatarGroupView members={TEAM} size="md" />
          <AvatarGroupView members={TEAM} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Member / Empty States"
        description="Groups gracefully handle a single collaborator or nobody assigned yet"
        code={`<AvatarGroupView members={[{ name: 'Salil Vasa Nair' }]} />
<AvatarGroupView members={[]} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <AvatarGroupView members={[{ name: 'Salil Vasa Nair' }]} />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>No collaborators:</span>
          <AvatarGroupView members={[]} />
        </div>
      </ExampleCard>
    </div>
  );
}
