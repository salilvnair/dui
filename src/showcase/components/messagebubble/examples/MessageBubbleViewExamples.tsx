import { MessageBubbleView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MessageBubbleViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Conversation"
        description="Sent bubbles are right-aligned and filled; received bubbles are left-aligned and neutral"
        code={`<MessageBubbleView variant="received" timestamp="10:01 AM">Hey, is the staging environment up?</MessageBubbleView>
<MessageBubbleView variant="sent" timestamp="10:02 AM">Sounds good, sending now.</MessageBubbleView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <MessageBubbleView variant="received" timestamp="10:01 AM">Hey, is the staging environment up?</MessageBubbleView>
          <MessageBubbleView variant="sent" timestamp="10:02 AM">Sounds good, sending now.</MessageBubbleView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Avatars"
        description="Pass an avatar node to identify the sender in a group thread"
        code={`<MessageBubbleView variant="received" avatar={<Avatar name="Jordan" />} timestamp="9:14 AM">
  Can you review the webhook payload schema?
</MessageBubbleView>
<MessageBubbleView variant="sent" avatar={<Avatar name="You" />} timestamp="9:16 AM">
  On it — checking the mock server now.
</MessageBubbleView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <MessageBubbleView
            variant="received"
            timestamp="9:14 AM"
            avatar={<span style={{ width: 26, height: 26, borderRadius: '999px', background: 'var(--color-surface-border)', display: 'inline-block' }} />}
          >
            Can you review the webhook payload schema?
          </MessageBubbleView>
          <MessageBubbleView
            variant="sent"
            timestamp="9:16 AM"
            avatar={<span style={{ width: 26, height: 26, borderRadius: '999px', background: 'var(--color-primary)', display: 'inline-block' }} />}
          >
            On it — checking the mock server now.
          </MessageBubbleView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Override the sent-bubble fill color per conversation or channel"
        code={`<MessageBubbleView variant="sent" color="var(--color-success)" timestamp="2:40 PM">
  Deploy to prod succeeded.
</MessageBubbleView>
<MessageBubbleView variant="sent" color="var(--color-error)" timestamp="2:41 PM">
  Rollback triggered on api-gateway.
</MessageBubbleView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <MessageBubbleView variant="sent" color="var(--color-success)" timestamp="2:40 PM">Deploy to prod succeeded.</MessageBubbleView>
          <MessageBubbleView variant="sent" color="var(--color-error)" timestamp="2:41 PM">Rollback triggered on api-gateway.</MessageBubbleView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Bubble padding and font scale with the DUI size system"
        code={`<MessageBubbleView variant="sent" size="sm">Compact bubble</MessageBubbleView>
<MessageBubbleView variant="sent" size="md">Default bubble</MessageBubbleView>
<MessageBubbleView variant="sent" size="lg">Large bubble</MessageBubbleView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
          <MessageBubbleView variant="sent" size="sm">Compact bubble</MessageBubbleView>
          <MessageBubbleView variant="sent" size="md">Default bubble</MessageBubbleView>
          <MessageBubbleView variant="sent" size="lg">Large bubble</MessageBubbleView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Support Thread with Rich Content"
        description="Children accept any ReactNode — useful for embedding a code snippet or link in a bubble"
        code={`<MessageBubbleView variant="received" timestamp="11:05 AM">
  Try setting <code>Content-Type: application/json</code> on the request.
</MessageBubbleView>
<MessageBubbleView variant="sent" timestamp="11:06 AM">That fixed it, thank you!</MessageBubbleView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <MessageBubbleView variant="received" timestamp="11:05 AM">
            Try setting <code>Content-Type: application/json</code> on the request.
          </MessageBubbleView>
          <MessageBubbleView variant="sent" timestamp="11:06 AM">That fixed it, thank you!</MessageBubbleView>
        </div>
      </ExampleCard>
    </div>
  );
}
