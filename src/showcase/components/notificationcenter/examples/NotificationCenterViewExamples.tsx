import { useState } from 'react';
import { NotificationCenterView, type NotificationItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function NotificationCenterViewExamples() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', title: 'Deploy succeeded', description: 'api-gateway v2.4.1 is live in production.', timestamp: '5m ago' },
    { id: '2', title: 'New team member', description: 'Priya Nair joined the Platform workspace.', timestamp: '1h ago', read: true },
    { id: '3', title: 'Webhook failed', description: 'stripe.webhook returned 500 three times.', timestamp: '3h ago' },
  ]);

  const basic: NotificationItem[] = [
    { id: '1', title: 'Deploy succeeded', timestamp: '5m ago' },
    { id: '2', title: 'Weekly usage report ready', timestamp: '2h ago', read: true },
  ];

  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Bell with Unread Badge"
        description="Unread notifications show a red dot on the bell icon"
        code={`<NotificationCenterView
  notifications={[
    { id: '1', title: 'Deploy succeeded', timestamp: '5m ago' },
    { id: '2', title: 'Weekly usage report ready', timestamp: '2h ago', read: true },
  ]}
/>`}
      >
        <NotificationCenterView notifications={basic} />
      </ExampleCard>

      <ExampleCard
        title="Mark All Read"
        description="onMarkAllRead adds a header action to clear the unread count"
        code={`<NotificationCenterView
  notifications={notifications}
  onMarkAllRead={() => setNotifications(n => n.map(x => ({ ...x, read: true })))}
/>`}
      >
        <NotificationCenterView
          notifications={notifications}
          onMarkAllRead={() => setNotifications(n => n.map(x => ({ ...x, read: true })))}
        />
      </ExampleCard>

      <ExampleCard
        title="Per-Item Click Handler"
        description="Each notification can carry its own onClick, e.g. to navigate to the failed webhook's log"
        code={`<NotificationCenterView
  notifications={[
    { id: '3', title: 'Webhook failed', description: 'stripe.webhook returned 500', timestamp: '3h ago', onClick: () => openLog('stripe.webhook') },
  ]}
/>`}
      >
        <NotificationCenterView
          notifications={[
            { id: '3', title: 'Webhook failed', description: 'stripe.webhook returned 500 three times.', timestamp: '3h ago', onClick: () => setClicked('Webhook failed') },
          ]}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Last clicked: {clicked ?? 'none — open the bell and click a notification'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Icons per Type"
        description="Icon nodes tint with the accent color to distinguish notification categories"
        code={`<NotificationCenterView
  notifications={[
    { id: '1', title: 'Deploy succeeded', timestamp: '5m ago', icon: <CheckCircleIcon size={14} /> },
    { id: '2', title: 'Webhook failed', timestamp: '3h ago', icon: <WarningTriangleIcon size={14} /> },
  ]}
  color="var(--color-info)"
/>`}
      >
        <NotificationCenterView
          notifications={[
            { id: '1', title: 'Deploy succeeded', timestamp: '5m ago' },
            { id: '2', title: 'Webhook failed', timestamp: '3h ago' },
          ]}
          color="var(--color-info)"
        />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="An empty notifications array shows a centered 'No notifications' message"
        code={`<NotificationCenterView notifications={[]} />`}
      >
        <NotificationCenterView notifications={[]} />
      </ExampleCard>
    </div>
  );
}
