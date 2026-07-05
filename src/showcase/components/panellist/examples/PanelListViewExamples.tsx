import { useState } from 'react';
import { PanelListView } from '@/dui';
import { FolderIcon, ServerIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PanelListViewExamples() {
  const [tab, setTab] = useState('collections');
  const [selected, setSelected] = useState('users');
  const [envTab, setEnvTab] = useState('dev');

  const requestItems = [
    { value: 'users', label: 'Users API' },
    { value: 'orders', label: 'Orders API' },
    { value: 'payments', label: 'Payments API' },
  ];

  const historyItems = [
    { value: 'h1', label: 'GET /users/8842 — 200 OK' },
    { value: 'h2', label: 'POST /orders — 201 Created' },
    { value: 'h3', label: 'DELETE /sessions/9 — 204 No Content' },
  ];

  return (
    <div>
      <ExampleCard
        title="Default Panel with Tabs"
        description="Heading + tabbed sections, filterable, matching the workspace sidebar pattern"
        code={`const [tab, setTab] = useState('collections');
<PanelListView
  heading="Workspace"
  tabs={[{ id: 'collections', label: 'Collections' }, { id: 'history', label: 'History' }]}
  activeTab={tab}
  onTabChange={setTab}
  items={[{ value: 'users', label: 'Users API' }, { value: 'orders', label: 'Orders API' }]}
/>`}
      >
        <PanelListView
          heading="Workspace"
          tabs={[{ id: 'collections', label: 'Collections' }, { id: 'history', label: 'History' }]}
          activeTab={tab}
          onTabChange={setTab}
          items={tab === 'collections' ? requestItems : historyItems}
        />
      </ExampleCard>

      <ExampleCard
        title="Interactive Selectable List"
        description="Each item's onClick updates the active selection, reflected via the active prop"
        code={`const [selected, setSelected] = useState('users');
<PanelListView
  heading="Collections"
  items={items.map(i => ({ ...i, active: i.value === selected, onClick: () => setSelected(i.value) }))}
/>`}
      >
        <PanelListView
          heading="Collections"
          items={requestItems.map(i => ({
            ...i,
            icon: <FolderIcon size={14} />,
            active: i.value === selected,
            onClick: () => setSelected(i.value),
          }))}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Selected: {selected}</div>
      </ExampleCard>

      <ExampleCard
        title="Environments Panel with Icons"
        description="Domain-realistic: environment list with server icons and a color accent"
        code={`<PanelListView
  heading="Environments"
  tabs={[{ id: 'dev', label: 'Dev' }, { id: 'staging', label: 'Staging' }, { id: 'prod', label: 'Prod' }]}
  activeTab={envTab}
  onTabChange={setEnvTab}
  color="var(--color-warning)"
  items={[{ value: 'base-url', label: 'base_url', icon: <ServerIcon size={14} /> }]}
/>`}
      >
        <PanelListView
          heading="Environments"
          tabs={[{ id: 'dev', label: 'Dev' }, { id: 'staging', label: 'Staging' }, { id: 'prod', label: 'Prod' }]}
          activeTab={envTab}
          onTabChange={setEnvTab}
          color="var(--color-warning)"
          items={[
            { value: 'base-url', label: 'base_url', icon: <ServerIcon size={14} /> },
            { value: 'api-key', label: 'api_key', icon: <ServerIcon size={14} /> },
            { value: 'timeout', label: 'timeout_ms', icon: <ServerIcon size={14} /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants, No Search"
        description="searchable=false hides the filter input for a compact, non-searchable panel"
        code={`<PanelListView size="sm" heading="Recent" searchable={false} items={items} />
<PanelListView size="lg" heading="Recent" searchable={false} items={items} />`}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <PanelListView size="sm" heading="Recent" searchable={false} items={historyItems} />
          </div>
          <div style={{ flex: 1 }}>
            <PanelListView size="lg" heading="Recent" searchable={false} items={historyItems} />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Matches (edge case)"
        description="An items list that filters down to zero results shows the built-in 'No matches' state — type in the filter box to try it"
        code={`<PanelListView heading="Collections" items={[{ value: 'users', label: 'Users API' }]} />
// type "zzz" into the filter input to see the empty state`}
      >
        <PanelListView heading="Collections" items={[{ value: 'users', label: 'Users API' }]} />
      </ExampleCard>
    </div>
  );
}
