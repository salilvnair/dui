import { useState } from 'react';
import { UnderlineTabsView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { DocumentIcon, LayersIcon, GaugeIcon } from '@/icons';

export function UnderlineTabsViewExamples() {
  const [a, setA] = useState('overview');
  const [b, setB] = useState('issues');

  return (
    <>
      <ExampleCard
        title="A page-level tab row"
        description="The active tab is marked by a rule under it, not a box around it"
        code={'<UnderlineTabsView tabs={tabs} activeId={id} onChange={setId} />'}
      >
        <UnderlineTabsView
          activeId={a}
          onChange={setA}
          tabs={[
            { id: 'overview', label: 'Overview', icon: <DocumentIcon size={12} /> },
            { id: 'requests', label: 'Requests', icon: <LayersIcon size={12} /> },
            { id: 'metrics', label: 'Metrics', icon: <GaugeIcon size={12} /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Counts and disabled tabs"
        description="A count rides beside the label; a disabled tab stays visible so the set does not reflow"
        code={'tabs={[{ id: "issues", label: "Issues", count: 24 }]}'}
      >
        <UnderlineTabsView
          activeId={b}
          onChange={setB}
          tabs={[
            { id: 'issues', label: 'Issues', count: 24 },
            { id: 'prs', label: 'Pull requests', count: 3 },
            { id: 'actions', label: 'Actions', count: '99+' },
            { id: 'wiki', label: 'Wiki', disabled: true },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Without the hairline"
        description="rule={false} drops the line the tabs sit on, for a row already inside a bordered box"
        code={'<UnderlineTabsView rule={false} … />'}
      >
        <UnderlineTabsView
          activeId={a}
          onChange={setA}
          rule={false}
          accentColor="var(--color-success)"
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'requests', label: 'Requests' },
            { id: 'metrics', label: 'Metrics' },
          ]}
        />
      </ExampleCard>
    </>
  );
}
