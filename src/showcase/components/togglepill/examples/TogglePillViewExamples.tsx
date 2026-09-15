import { useState } from 'react';
import { TogglePillView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { CheckIcon, FilterIcon, PlayIcon } from '@/icons';

export function TogglePillViewExamples() {
  const [on, setOn] = useState<Record<string, boolean>>({ errors: true, cached: false, mocked: false });
  const toggle = (k: string) => setOn(p => ({ ...p, [k]: !p[k] }));

  return (
    <>
      <ExampleCard
        title="A filter you can switch"
        description="Lit in the accent with a tinted ground when active — a chip that is a control, not a label"
        code={'<TogglePillView active={on} onClick={toggle}>Errors</TogglePillView>'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <TogglePillView active={on.errors} onClick={() => toggle('errors')} icon={<FilterIcon size={11} />}>Errors</TogglePillView>
          <TogglePillView active={on.cached} onClick={() => toggle('cached')}>Cached</TogglePillView>
          <TogglePillView active={on.mocked} onClick={() => toggle('mocked')}>Mocked</TogglePillView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="With a count"
        description="The number rides inside the pill rather than beside it"
        code={'<TogglePillView count={12} active>Failed</TogglePillView>'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <TogglePillView active count={12}>Failed</TogglePillView>
          <TogglePillView count={148}>All</TogglePillView>
          <TogglePillView count={'3 new'}>Alerts</TogglePillView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="The go variant"
        description="For the pill that starts something rather than filtering it"
        code={'<TogglePillView variant="go" icon={<PlayIcon size={11} />}>Run</TogglePillView>'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <TogglePillView variant="go" icon={<PlayIcon size={11} />}>Run</TogglePillView>
          <TogglePillView variant="go" active icon={<CheckIcon size={11} />}>Running</TogglePillView>
          <TogglePillView disabled>Disabled</TogglePillView>
        </div>
      </ExampleCard>
    </>
  );
}
