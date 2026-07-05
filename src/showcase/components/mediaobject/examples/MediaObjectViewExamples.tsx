import { useState } from 'react';
import { MediaObjectView, AvatarView, IconButtonView, ButtonView, ChipView } from '@/dui';
import { MoreHorizontalIcon, ServerIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MediaObjectViewExamples() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Default Comment Row"
        description="Avatar + content + overflow action — the canonical Media Object usage"
        code={`<MediaObjectView media={<AvatarView name="Jordan Lee" />} actions={<IconButtonView icon={<MoreHorizontalIcon />} />}>
  <b>Jordan Lee</b> commented on your request
</MediaObjectView>`}
      >
        <MediaObjectView media={<AvatarView name="Jordan Lee" />} actions={<IconButtonView icon={<MoreHorizontalIcon />} />}>
          <b>Jordan Lee</b> commented on your request
        </MediaObjectView>
      </ExampleCard>

      <ExampleCard
        title="Interactive Notification (dismissible)"
        description="Actions slot holding a real click handler that dismisses the row"
        code={`const [dismissed, setDismissed] = useState(false);
{!dismissed && (
  <MediaObjectView
    media={<AvatarView name="System" />}
    actions={<ButtonView size="sm" variant="ghost" onClick={() => setDismissed(true)}>Dismiss</ButtonView>}
  >
    Your API key <code>pk_live_***3F2</code> expires in 3 days.
  </MediaObjectView>
)}`}
      >
        {!dismissed ? (
          <MediaObjectView
            media={<AvatarView name="System" />}
            actions={<ButtonView size="sm" variant="ghost" onClick={() => setDismissed(true)}>Dismiss</ButtonView>}
          >
            Your API key <code>pk_live_***3F2</code> expires in 3 days.
          </MediaObjectView>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Notification dismissed.</div>
        )}
      </ExampleCard>

      <ExampleCard
        title="Icon Media Instead of Avatar"
        description="media accepts any ReactNode — an icon in a colored badge works for system/service rows"
        code={`<MediaObjectView
  media={<div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ServerIcon color="#fff" size={16} /></div>}
  actions={<ChipView label="Healthy" color="var(--color-success)" active size="sm" />}
>
  <b>orders-api.prod.internal</b><br />Last health check 12s ago
</MediaObjectView>`}
      >
        <MediaObjectView
          media={
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ServerIcon color="#fff" size={16} />
            </div>
          }
          actions={<ChipView label="Healthy" color="var(--color-success)" active size="sm" />}
        >
          <b>orders-api.prod.internal</b><br />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Last health check 12s ago</span>
        </MediaObjectView>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size scales the gap between media, content, and actions"
        code={`<MediaObjectView size="sm" media={<AvatarView name="Priya Nair" size="sm" />}>Priya Nair joined the workspace</MediaObjectView>
<MediaObjectView size="lg" media={<AvatarView name="Priya Nair" size="lg" />} actions={<ButtonView size="sm">View</ButtonView>}>Priya Nair shared the "Payments" collection</MediaObjectView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MediaObjectView size="sm" media={<AvatarView name="Priya Nair" size="sm" />}>
            Priya Nair joined the workspace
          </MediaObjectView>
          <MediaObjectView size="lg" media={<AvatarView name="Priya Nair" size="lg" />} actions={<ButtonView size="sm">View</ButtonView>}>
            Priya Nair shared the "Payments" collection
          </MediaObjectView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Nested Threaded Replies (edge case)"
        description="MediaObjectView nested inside itself to render a reply thread, with no actions on the child"
        code={`<MediaObjectView media={<AvatarView name="Alex Chen" />} actions={<IconButtonView icon={<MoreHorizontalIcon />} />}>
  <b>Alex Chen</b> flagged this endpoint as flaky
  <MediaObjectView media={<AvatarView name="Jordan Lee" size="sm" />} style={{ marginTop: 8 }}>
    <b>Jordan Lee</b> confirmed — retried 3x, fails intermittently on cold start
  </MediaObjectView>
</MediaObjectView>`}
      >
        <MediaObjectView media={<AvatarView name="Alex Chen" />} actions={<IconButtonView icon={<MoreHorizontalIcon />} />}>
          <b>Alex Chen</b> flagged this endpoint as flaky
          <MediaObjectView media={<AvatarView name="Jordan Lee" size="sm" />} style={{ marginTop: 8 }}>
            <b>Jordan Lee</b> confirmed — retried 3x, fails intermittently on cold start
          </MediaObjectView>
        </MediaObjectView>
      </ExampleCard>
    </div>
  );
}
