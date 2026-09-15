import { useState } from 'react';
import { CommandPaletteView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { PlayIcon, SettingsIcon, PlusIcon, SearchIcon, TrashIcon } from '@/icons';

export function CommandPaletteViewExamples() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  const commands = [
    { id: 'send', label: 'Send request', hint: 'Ctrl+Enter', icon: <PlayIcon size={13} />, keywords: ['run', 'execute'], action: () => setLast('Send request') },
    { id: 'new', label: 'New request', hint: 'Ctrl+N', icon: <PlusIcon size={13} />, keywords: ['create', 'add'], action: () => setLast('New request') },
    { id: 'find', label: 'Search collections', hint: 'Ctrl+P', icon: <SearchIcon size={13} />, keywords: ['find', 'open'], action: () => setLast('Search collections') },
    { id: 'settings', label: 'Open settings', hint: 'Ctrl+,', icon: <SettingsIcon size={13} />, keywords: ['prefs', 'config'], action: () => setLast('Open settings') },
    { id: 'clear', label: 'Clear history', icon: <TrashIcon size={13} />, keywords: ['delete', 'purge'], action: () => setLast('Clear history') },
  ];

  return (
    <>
      <ExampleCard
        title="Everything, behind one box"
        description="Type to narrow by label or keywords; Enter runs. Keywords are why searching run finds Send request."
        code={'<CommandPaletteView open={open} onClose={close} commands={commands} />'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ButtonView onClick={() => setOpen(true)}>Open the palette</ButtonView>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {last ? 'ran: ' + last : 'nothing run yet'}
          </span>
        </div>
        <CommandPaletteView
          open={open}
          onClose={() => setOpen(false)}
          commands={commands}
          placeholder="Type a command…"
          emptyText="No command matches"
        />
      </ExampleCard>
    </>
  );
}
