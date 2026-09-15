import { LoadingStateView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { GlobeIcon, FolderIcon } from '@/icons';

export function LoadingStateViewExamples() {
  return (
    <>
      <ExampleCard
        title="The subject, not a spinner"
        description="The icon says what is being waited for before the reader gets to the words"
        code={'<LoadingStateView icon={<GlobeIcon size={22} />} title="Connecting to the cluster" />'}
      >
        <LoadingStateView
          icon={<GlobeIcon size={22} />}
          title="Connecting to the cluster"
          message="Reading your kubeconfig and negotiating with the API server."
        />
      </ExampleCard>

      <ExampleCard
        title="Step by step"
        description="Hints say what is happening, so a long wait stops looking like a hang"
        code={'hints={[{ key: "1", text: "Reading kubeconfig" }]}'}
      >
        <LoadingStateView
          icon={<FolderIcon size={22} />}
          title="Importing collection"
          message="Parsing the OpenAPI document."
          hints={[
            { key: '142', text: 'paths found' },
            { key: '38', text: 'schemas resolved' },
            { key: '0', text: 'errors' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="When it goes long"
        description="After slowAfterSeconds the message changes and an escape is offered — a cluster behind a VPN answers in seconds, and the reader cannot tell that from a hang"
        code={'<LoadingStateView slowAfterSeconds={3} slowMessage="Still going…" action={{ label: "Cancel", onClick: stop }} />'}
      >
        <LoadingStateView
          icon={<GlobeIcon size={22} />}
          title="Waiting for the API server"
          message="This usually takes a moment."
          slowAfterSeconds={3}
          slowMessage="Still going. The cluster may be behind a VPN, or asleep."
          action={{ label: 'Cancel', onClick: () => {} }}
        />
      </ExampleCard>

      <ExampleCard
        title="Compact"
        description="Matches EmptyStateView, so the two swap without the layout moving"
        code={'<LoadingStateView compact title="Loading…" />'}
      >
        <LoadingStateView compact title="Loading requests…" />
      </ExampleCard>
    </>
  );
}
