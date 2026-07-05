import { useState } from 'react';
import { MessageBannerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MessageBannerViewExamples() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <ExampleCard
        title="All Four Variants"
        description="success / error / warning / info — each with a matching icon and left border accent"
        code={`<MessageBannerView variant="success">Environment saved.</MessageBannerView>
<MessageBannerView variant="error">Failed to save environment.</MessageBannerView>
<MessageBannerView variant="warning">This environment has unsaved changes.</MessageBannerView>
<MessageBannerView variant="info">Environment variables are encrypted at rest.</MessageBannerView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <MessageBannerView variant="success">Environment saved.</MessageBannerView>
          <MessageBannerView variant="error">Failed to save environment.</MessageBannerView>
          <MessageBannerView variant="warning">This environment has unsaved changes.</MessageBannerView>
          <MessageBannerView variant="info">Environment variables are encrypted at rest.</MessageBannerView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Dismissible Banner"
        description="onDismiss renders a close button and lets you remove the banner from state"
        code={`const [visible, setVisible] = useState(true);
{visible && (
  <MessageBannerView variant="warning" onDismiss={() => setVisible(false)}>
    Your API key expires in 3 days.
  </MessageBannerView>
)}`}
      >
        {visible ? (
          <MessageBannerView variant="warning" onDismiss={() => setVisible(false)}>
            Your API key expires in 3 days.
          </MessageBannerView>
        ) : (
          <button type="button" onClick={() => setVisible(true)} style={{ fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Show banner again
          </button>
        )}
      </ExampleCard>

      <ExampleCard
        title="Request Validation Error"
        description="A realistic API-testing use case — inline validation feedback in a request builder"
        code={`<MessageBannerView variant="error">
  Request body is not valid JSON: Unexpected token at position 42.
</MessageBannerView>`}
      >
        <MessageBannerView variant="error">
          Request body is not valid JSON: Unexpected token at position 42.
        </MessageBannerView>
      </ExampleCard>

      <ExampleCard
        title="Default Variant (info)"
        description="Omitting variant falls back to info"
        code={`<MessageBannerView>Requests in this collection run against the staging environment.</MessageBannerView>`}
      >
        <MessageBannerView>Requests in this collection run against the staging environment.</MessageBannerView>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Padding and font scale with the DUI size system"
        code={`<MessageBannerView variant="success" size="sm">Saved.</MessageBannerView>
<MessageBannerView variant="success" size="md">Saved.</MessageBannerView>
<MessageBannerView variant="success" size="lg">Saved.</MessageBannerView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <MessageBannerView variant="success" size="sm">Saved.</MessageBannerView>
          <MessageBannerView variant="success" size="md">Saved.</MessageBannerView>
          <MessageBannerView variant="success" size="lg">Saved.</MessageBannerView>
        </div>
      </ExampleCard>
    </div>
  );
}
