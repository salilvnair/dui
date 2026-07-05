import { useState } from 'react';
import { NotificationBadgeView, IconButtonView, AvatarView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { BellIcon } from '../../../../icons';

export function NotificationBadgeViewExamples() {
  const [unread, setUnread] = useState(5);

  return (
    <div>
      <ExampleCard
        title="Count Badge on Icon Button"
        description="Overlay a numeric count on any anchor element"
        code={`<NotificationBadgeView count={3}>
  <IconButtonView icon={<BellIcon />} />
</NotificationBadgeView>`}
      >
        <NotificationBadgeView count={3}>
          <IconButtonView icon={<BellIcon />} />
        </NotificationBadgeView>
      </ExampleCard>

      <ExampleCard
        title="Unread Notifications (interactive)"
        description="Click the bell to clear unread count — badge disappears at 0"
        code={`const [unread, setUnread] = useState(5);

<NotificationBadgeView count={unread}>
  <IconButtonView icon={<BellIcon />} onClick={() => setUnread(0)} />
</NotificationBadgeView>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NotificationBadgeView count={unread}>
            <IconButtonView icon={<BellIcon />} onClick={() => setUnread(0)} />
          </NotificationBadgeView>
          <ButtonView size="sm" variant="ghost" onClick={() => setUnread(n => n + 1)}>Simulate new event</ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Dot Badge on Avatar"
        description="dot={true} shows a plain indicator dot instead of a count — e.g. unsaved changes on a workspace avatar"
        code={`<NotificationBadgeView dot color="var(--color-warning)">
  <AvatarView name="Salil Vasa Nair" />
</NotificationBadgeView>`}
      >
        <NotificationBadgeView dot color="var(--color-warning)">
          <AvatarView name="Salil Vasa Nair" />
        </NotificationBadgeView>
      </ExampleCard>

      <ExampleCard
        title="Overflow Cap (max)"
        description="Counts above max render as '{max}+' — e.g. 128 unread with max=99"
        code={`<NotificationBadgeView count={128} max={99}>
  <IconButtonView icon={<BellIcon />} />
</NotificationBadgeView>`}
      >
        <NotificationBadgeView count={128} max={99}>
          <IconButtonView icon={<BellIcon />} />
        </NotificationBadgeView>
      </ExampleCard>

      <ExampleCard
        title="Hidden / Zero State"
        description="hidden forces the badge off entirely, regardless of count — useful for muted channels"
        code={`<NotificationBadgeView count={7} hidden>
  <IconButtonView icon={<BellIcon />} />
</NotificationBadgeView>
{/* count omitted/0 with no dot also renders nothing */}
<NotificationBadgeView count={0}>
  <IconButtonView icon={<BellIcon />} />
</NotificationBadgeView>`}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <NotificationBadgeView count={7} hidden>
            <IconButtonView icon={<BellIcon />} />
          </NotificationBadgeView>
          <NotificationBadgeView count={0}>
            <IconButtonView icon={<BellIcon />} />
          </NotificationBadgeView>
        </div>
      </ExampleCard>
    </div>
  );
}
