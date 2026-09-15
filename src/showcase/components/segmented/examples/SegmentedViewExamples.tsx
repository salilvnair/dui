import { useState } from 'react';
import { SegmentedView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { CodeIcon, DocumentIcon, LayersIcon } from '@/icons';

export function SegmentedViewExamples() {
  const [view, setView] = useState('pretty');
  const [size, setSize] = useState('a');

  return (
    <>
      <ExampleCard
        title="Switching a view"
        description="A flat two-or-three-way switch — no track, no sliding indicator"
        code={'<SegmentedView options={opts} value={view} onChange={setView} />'}
      >
        <SegmentedView
          value={view}
          onChange={setView}
          options={[
            { id: 'pretty', label: 'Pretty', icon: <DocumentIcon size={12} /> },
            { id: 'raw', label: 'Raw', icon: <CodeIcon size={12} /> },
            { id: 'preview', label: 'Preview', icon: <LayersIcon size={12} /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="Shares the DUI size scale"
        code={'<SegmentedView size="sm" … />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <SegmentedView
              key={s}
              size={s}
              value={size}
              onChange={setSize}
              options={[{ id: 'a', label: 'One' }, { id: 'b', label: 'Two' }]}
            />
          ))}
        </div>
      </ExampleCard>
    </>
  );
}
