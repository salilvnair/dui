import { InfoView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { FolderIcon, InfoCircleIcon } from '@/icons';

export function InfoViewExamples() {
  return (
    <>
      <ExampleCard
        title="Explaining where something lives"
        description="Paths get the monospace pill treatment rather than being buried in the sentence"
        code={'<InfoView title="Where collections are stored" paths={["~/.salilvnair/daakia/db"]} />'}
      >
        <InfoView
          icon={<FolderIcon size={16} />}
          title="Where collections are stored"
          description="Everything is local. Nothing is sent anywhere unless you ask it to be."
          paths={['~/.salilvnair/daakia-vsce/db/daakia.db', '~/.salilvnair/daakia/git-sync/']}
        />
      </ExampleCard>

      <ExampleCard
        title="With badges"
        description="Small chips under the paths — a count, a status word"
        code={'badges={[{ label: "12 collections" }, { label: "synced", color: "var(--color-success)" }]}'}
      >
        <InfoView
          icon={<InfoCircleIcon size={16} />}
          title="Workspace sync"
          description="Collections are exported to the workspace folder and committed on every change."
          paths={['.daakia/collections']}
          badges={[
            { label: '12 collections' },
            { label: 'synced', color: 'var(--color-success)' },
            { label: 'git', color: 'var(--color-info)' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Compact"
        description="For a panel that already has a heading above it"
        code={'<InfoView compact title="No environment selected" />'}
      >
        <InfoView
          compact
          title="No environment selected"
          description="Variables in {{braces}} will not resolve until you pick one."
          accentColor="var(--color-warning)"
        />
      </ExampleCard>
    </>
  );
}
