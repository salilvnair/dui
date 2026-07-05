import { useState } from 'react';
import { ListView, ChipView, AvatarView } from '@/dui';
import type { ListViewItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ListViewExamples() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string[]>(['2']);

  const togglePin = (id: string) =>
    setPinned(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const collectionItems: ListViewItem[] = [
    { id: '1', title: 'Users API', subtitle: '12 requests' },
    { id: '2', title: 'Payments API', subtitle: '8 requests' },
    { id: '3', title: 'Webhooks', subtitle: '5 requests' },
  ];

  return (
    <div>
      <ExampleCard
        title="Basic Collection List"
        description="Simple title/subtitle rows without avatars or actions"
        code={`<ListView items={[{ id: '1', title: 'Users API', subtitle: '12 requests' }]} />`}
      >
        <ListView items={collectionItems} />
      </ExampleCard>

      <ExampleCard
        title="Clickable Request Selector (interactive)"
        description="Each row has an onClick handler; the selected row is highlighted below the list"
        code={`const [selected, setSelected] = useState(null);

<ListView items={requests.map(r => ({
  id: r.id,
  title: r.name,
  subtitle: r.method + ' ' + r.url,
  onClick: () => setSelected(r.id),
}))} />`}
      >
        <ListView
          items={[
            { id: 'r1', title: 'Get user profile', subtitle: 'GET /api/v2/users/:id', onClick: () => setSelected('r1') },
            { id: 'r2', title: 'Create order', subtitle: 'POST /api/v2/orders', onClick: () => setSelected('r2') },
            { id: 'r3', title: 'Delete session', subtitle: 'DELETE /api/v2/sessions/:id', onClick: () => setSelected('r3') },
          ]}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: {selected ?? 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Avatars + Method Chips"
        description="Rich rows combining AvatarView, ChipView badges, and title/subtitle text"
        code={`<ListView items={[
  {
    id: '1',
    avatar: <AvatarView name="Priya Shah" size="sm" />,
    title: 'Priya Shah',
    subtitle: 'Updated "Payments API" collection',
    actions: <ChipView label="POST" color="var(--color-method-post)" size="sm" />,
  },
]} />`}
      >
        <ListView
          items={[
            {
              id: '1',
              avatar: <AvatarView name="Priya Shah" size="sm" />,
              title: 'Priya Shah',
              subtitle: 'Updated "Payments API" collection',
              actions: <ChipView label="POST" color="var(--color-method-post)" size="sm" />,
            },
            {
              id: '2',
              avatar: <AvatarView name="Marcus Lee" size="sm" />,
              title: 'Marcus Lee',
              subtitle: 'Added new webhook to "Order Events"',
              actions: <ChipView label="WEBHOOK" color="var(--color-protocol-sse)" size="sm" />,
            },
            {
              id: '3',
              avatar: <AvatarView name="Anika Verma" size="sm" />,
              title: 'Anika Verma',
              subtitle: 'Ran 24 tests in "Auth Suite"',
              actions: <ChipView label="200 OK" color="var(--color-success)" size="sm" />,
            },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Team Members with Pin Action"
        description="Domain-realistic list — workspace teammates with a toggleable pin/star action per row"
        code={`const [pinned, setPinned] = useState(['2']);

<ListView items={members.map(m => ({
  id: m.id,
  avatar: <AvatarView name={m.name} size="sm" />,
  title: m.name,
  subtitle: m.role,
  actions: (
    <ChipView
      label={pinned.includes(m.id) ? 'Pinned' : 'Pin'}
      active={pinned.includes(m.id)}
      onClick={() => togglePin(m.id)}
      size="sm"
    />
  ),
}))} />`}
      >
        <ListView
          items={[
            { id: '1', avatar: <AvatarView name="Devon Cruz" size="sm" />, title: 'Devon Cruz', subtitle: 'Owner', actions: <ChipView label={pinned.includes('1') ? 'Pinned' : 'Pin'} active={pinned.includes('1')} onClick={() => togglePin('1')} size="sm" /> },
            { id: '2', avatar: <AvatarView name="Sofia Reyes" size="sm" />, title: 'Sofia Reyes', subtitle: 'Admin', actions: <ChipView label={pinned.includes('2') ? 'Pinned' : 'Pin'} active={pinned.includes('2')} onClick={() => togglePin('2')} size="sm" /> },
            { id: '3', avatar: <AvatarView name="Ken Watanabe" size="sm" />, title: 'Ken Watanabe', subtitle: 'Editor', actions: <ChipView label={pinned.includes('3') ? 'Pinned' : 'Pin'} active={pinned.includes('3')} onClick={() => togglePin('3')} size="sm" /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty List"
        description="Edge case — no items to render, e.g. a freshly created empty collection"
        code={`<ListView items={[]} />`}
      >
        <ListView items={[]} />
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', padding: '8px 2px' }}>
          (Renders nothing — pair with your own empty-state message.)
        </div>
      </ExampleCard>
    </div>
  );
}
