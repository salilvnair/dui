import { SplitButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { PlayIcon, SaveIcon, CopyIcon, TrashIcon } from '@/icons';

const ITEMS = [
  { id: 'save-as', label: 'Save As…', shortcut: 'Ctrl+Shift+S', onClick: () => {} },
  { id: 'export', label: 'Export', icon: <CopyIcon size={12} />, onClick: () => {} },
  { id: 'delete', label: 'Delete', icon: <TrashIcon size={12} />, iconColor: 'var(--color-error)', dividerBefore: true, onClick: () => {} },
];

export function SplitButtonViewExamples() {
  return (
    <>
      <ExampleCard
        title="A primary action with alternatives"
        description="The left half runs the default; the right half offers the rest"
        code={'<SplitButtonView label="Save" items={items} onClick={save} />'}
      >
        <SplitButtonView label="Save" icon={<SaveIcon size={12} />} items={ITEMS} onClick={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Variants"
        description="Same three as ButtonView"
        code={'<SplitButtonView variant="danger" label="Delete" items={items} onClick={del} />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <SplitButtonView variant="primary" label="Run" icon={<PlayIcon size={12} />} items={ITEMS} onClick={() => {}} />
          <SplitButtonView variant="secondary" label="Export" items={ITEMS} onClick={() => {}} />
          <SplitButtonView variant="danger" label="Delete" items={ITEMS} onClick={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes and disabled"
        description="Disabling the whole control disables both halves"
        code={'<SplitButtonView size="sm" disabled … />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <SplitButtonView size="sm" label="Small" items={ITEMS} onClick={() => {}} />
          <SplitButtonView size="lg" label="Large" items={ITEMS} onClick={() => {}} />
          <SplitButtonView label="Disabled" items={ITEMS} onClick={() => {}} disabled />
        </div>
      </ExampleCard>
    </>
  );
}
