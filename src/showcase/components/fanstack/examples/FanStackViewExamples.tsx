import { useState } from 'react';
import { FanStackView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { PlayIcon, PlusIcon, SettingsIcon, SearchIcon, TrashIcon } from '@/icons';

const ITEMS = [
  { id: 'run', icon: <PlayIcon size={14} />, label: 'Run', color: 'var(--color-success)' },
  { id: 'add', icon: <PlusIcon size={14} />, label: 'Add', color: 'var(--color-primary)' },
  { id: 'find', icon: <SearchIcon size={14} />, label: 'Find', color: 'var(--color-info)' },
  { id: 'settings', icon: <SettingsIcon size={14} />, label: 'Settings' },
  { id: 'delete', icon: <TrashIcon size={14} />, label: 'Delete', color: 'var(--color-error)' },
];

export function FanStackViewExamples() {
  const [open, setOpen] = useState(false);
  const [arc, setArc] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <>
      <ExampleCard
        title="Actions that fan out of their anchor"
        description="Straight up by default; angleStep sweeps them into an arc"
        code={'<FanStackView items={items} open={open} onSelect={pick} />'}
      >
        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-end', minHeight: 260, paddingTop: 170 }}>
          <div style={{ position: 'relative' }}>
            <ButtonView size="sm" onClick={() => setOpen(v => !v)}>Stack</ButtonView>
            <FanStackView items={ITEMS} open={open} onSelect={id => { setPicked(id); setOpen(false); }} />
          </div>
          <div style={{ position: 'relative' }}>
            <ButtonView size="sm" variant="secondary" onClick={() => setArc(v => !v)}>Arc</ButtonView>
            <FanStackView
              items={ITEMS}
              open={arc}
              angleStep={18}
              direction="up-right"
              onSelect={id => { setPicked(id); setArc(false); }}
            />
          </div>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {picked ? 'picked: ' + picked : 'nothing picked'}
          </span>
        </div>
      </ExampleCard>
    </>
  );
}
