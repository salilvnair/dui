import { CommandChipView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CommandChipViewExamples() {
  return (
    <>
      <ExampleCard
        title="Click to copy"
        description="A command in running text that puts itself on the clipboard"
        code={'<CommandChipView command="npm install @salilvnair/dui" />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <CommandChipView command="npm install @salilvnair/dui" />
          <CommandChipView command="npm run dev -- --port 5180" />
          <CommandChipView command="git push origin main" copiedLabel="On the clipboard" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="Shares the exact height and padding tokens as ButtonView, so the two line up in a row"
        code={'<CommandChipView size="sm" command="ls -la" />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <CommandChipView key={s} size={s} command={'dui --' + s} />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Not copyable"
        description="A plain command pill, for a command you are describing rather than offering"
        code={'<CommandChipView command="rm -rf /" copyable={false} />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <CommandChipView command="kubectl get pods" copyable={false} />
          <CommandChipView command="docker compose up" color="var(--color-success)" />
        </div>
      </ExampleCard>
    </>
  );
}
