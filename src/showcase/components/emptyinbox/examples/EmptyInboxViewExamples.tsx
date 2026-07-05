import { EmptyInboxView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function EmptyInboxViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Empty Inbox"
        description="Default title and message — zero-notifications state"
        code={`<EmptyInboxView />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <EmptyInboxView />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Copy for Notification Center"
        description="Override title and message to match a specific notification panel's tone"
        code={`<EmptyInboxView title="Nothing new" message="You'll see request failures and team invites here." />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <EmptyInboxView title="Nothing new" message="You'll see request failures and team invites here." />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Filtered View Empty State"
        description="Reused for an empty result after filtering notifications by type"
        code={`<EmptyInboxView title="No unread mentions" message="You're mentioned notifications will show up here once someone tags you." />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <EmptyInboxView title="No unread mentions" message="You're mentioned notifications will show up here once someone tags you." />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size in a Dropdown Panel"
        description="size='sm' fits a smaller notification bell dropdown"
        code={`<EmptyInboxView size="sm" title="All caught up" message="No new alerts." />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, maxWidth: 280 }}>
          <EmptyInboxView size="sm" title="All caught up" message="No new alerts." />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Message (Title Only)"
        description="Edge case — message can be an empty string to show only the title and icon"
        code={`<EmptyInboxView title="Inbox zero" message="" />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <EmptyInboxView title="Inbox zero" message="" />
        </div>
      </ExampleCard>
    </div>
  );
}
