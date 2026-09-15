import { ActionButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { PlayIcon, RefreshIcon, TrashIcon, PlusIcon } from '@/icons';

export function ActionButtonViewExamples() {
  return (
    <>
      <ExampleCard
        title="An icon and a word"
        description="The toolbar button — quieter than ButtonView, and sized on the same scale"
        code={'<ActionButtonView icon={<PlayIcon size={12} />} label="Send" onClick={send} />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <ActionButtonView icon={<PlayIcon size={12} />} label="Send" />
          <ActionButtonView icon={<RefreshIcon size={12} />} label="Retry" />
          <ActionButtonView icon={<PlusIcon size={12} />} label="Add header" />
          <ActionButtonView icon={<TrashIcon size={12} />} label="Delete" accentColor="var(--color-error)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="Falls back to the DuiProvider size when omitted"
        code={'<ActionButtonView size="sm" label="Run" />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <ActionButtonView key={s} size={s} icon={<PlayIcon size={12} />} label={s} />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Icon only, and disabled"
        description="Omit the label for a square button; the title becomes the tooltip"
        code={'<ActionButtonView icon={<RefreshIcon size={12} />} title="Refresh" />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <ActionButtonView icon={<RefreshIcon size={12} />} title="Refresh" />
          <ActionButtonView icon={<PlayIcon size={12} />} label="Disabled" disabled />
        </div>
      </ExampleCard>
    </>
  );
}
