import { useState } from 'react';
import { ActionSheetView, ButtonView } from '@/dui';
import type { ActionSheetItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { DuplicateIcon, TrashIcon, ExportIcon, RenameIcon } from '../../../../icons';

export function ActionSheetViewExamples() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [titledOpen, setTitledOpen] = useState(false);
  const [customCancelOpen, setCustomCancelOpen] = useState(false);
  const [disabledOpen, setDisabledOpen] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Basic Action Sheet"
        description="Bottom sheet list of actions, with destructive styling and a cancel row"
        code={`function Preview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>
      <ActionSheetView
        open={open}
        items={[{ label: 'Duplicate', onClick: () => {} }, { label: 'Delete', danger: true, onClick: () => {} }]}
        onClose={() => setOpen(false)}
      />
    </>
  );
}`}
      >
        <ButtonView onClick={() => setBasicOpen(true)}>Open</ButtonView>
        <ActionSheetView
          open={basicOpen}
          items={[{ label: 'Duplicate', onClick: () => {} }, { label: 'Delete', danger: true, onClick: () => {} }]}
          onClose={() => setBasicOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Request Row Actions (interactive)"
        description="Icons + a real onClick per action, tracking the last chosen action"
        code={`const [last, setLast] = useState('');
const items = [
  { label: 'Duplicate request', icon: <DuplicateIcon />, onClick: () => setLast('Duplicated') },
  { label: 'Export as cURL', icon: <ExportIcon />, onClick: () => setLast('Exported') },
  { label: 'Rename', icon: <RenameIcon />, onClick: () => setLast('Renamed') },
  { label: 'Delete request', icon: <TrashIcon />, danger: true, onClick: () => setLast('Deleted') },
];

<ActionSheetView open={open} items={items} onClose={() => setOpen(false)} />`}
      >
        <ButtonView onClick={() => setRequestOpen(true)} variant="secondary">Request actions…</ButtonView>
        <ActionSheetView
          open={requestOpen}
          items={[
            { label: 'Duplicate request', icon: <DuplicateIcon size={16} />, onClick: () => setLastAction('Duplicated') },
            { label: 'Export as cURL', icon: <ExportIcon size={16} />, onClick: () => setLastAction('Exported') },
            { label: 'Rename', icon: <RenameIcon size={16} />, onClick: () => setLastAction('Renamed') },
            { label: 'Delete request', icon: <TrashIcon size={16} />, danger: true, onClick: () => setLastAction('Deleted') },
          ] as ActionSheetItem[]}
          onClose={() => setRequestOpen(false)}
        />
        {lastAction && <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Last action: {lastAction}</div>}
      </ExampleCard>

      <ExampleCard
        title="With Title"
        description="An optional header label above the action group, describing the target item"
        code={`<ActionSheetView
  open={open}
  title="Users API Collection"
  items={[{ label: 'Share', onClick: () => {} }, { label: 'Archive', onClick: () => {} }]}
  onClose={() => setOpen(false)}
/>`}
      >
        <ButtonView onClick={() => setTitledOpen(true)} variant="secondary">Collection actions…</ButtonView>
        <ActionSheetView
          open={titledOpen}
          title="Users API Collection"
          items={[{ label: 'Share', onClick: () => {} }, { label: 'Archive', onClick: () => {} }]}
          onClose={() => setTitledOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Cancel Label"
        description="cancelLabel overrides the default 'Cancel' text"
        code={`<ActionSheetView open={open} items={items} cancelLabel="Dismiss" onClose={() => setOpen(false)} />`}
      >
        <ButtonView onClick={() => setCustomCancelOpen(true)} variant="secondary">Open (custom cancel)</ButtonView>
        <ActionSheetView
          open={customCancelOpen}
          items={[{ label: 'Mark as read', onClick: () => {} }]}
          cancelLabel="Dismiss"
          onClose={() => setCustomCancelOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled Item (edge case)"
        description="Individual items can be disabled, e.g. an action unavailable on a read-only collection"
        code={`<ActionSheetView
  open={open}
  items={[
    { label: 'Edit', disabled: true, onClick: () => {} },
    { label: 'Delete', danger: true, onClick: () => {} },
  ]}
  onClose={() => setOpen(false)}
/>`}
      >
        <ButtonView onClick={() => setDisabledOpen(true)} variant="secondary">Open (read-only collection)</ButtonView>
        <ActionSheetView
          open={disabledOpen}
          items={[
            { label: 'Edit', disabled: true, onClick: () => {} },
            { label: 'Delete', danger: true, onClick: () => {} },
          ]}
          onClose={() => setDisabledOpen(false)}
        />
      </ExampleCard>
    </div>
  );
}
