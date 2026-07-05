import { useState } from 'react';
import { WebhookStatusView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function WebhookStatusViewExamples() {
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 1200);
  };

  return (
    <div>
      <ExampleCard
        title="Healthy Webhook"
        description="A successfully delivering webhook endpoint"
        code={`<WebhookStatusView url="https://api.example.com/hooks/deploy" health="healthy" statusCode={200} lastDelivery="2m ago" />`}
      >
        <WebhookStatusView url="https://api.example.com/hooks/deploy" health="healthy" statusCode={200} lastDelivery="2m ago" />
      </ExampleCard>

      <ExampleCard
        title="Interactive Retry on Failure"
        description="Failing webhook with a working retry action and loading text while retrying"
        code={`const [retrying, setRetrying] = useState(false);
const retry = () => { setRetrying(true); setTimeout(() => setRetrying(false), 1200); };

<WebhookStatusView
  url="https://hooks.example.com/services/T000/B000/XXXX"
  health="failing"
  statusCode={503}
  lastDelivery={retrying ? 'retrying…' : '14m ago'}
  onRetry={retry}
/>`}
      >
        <WebhookStatusView
          url="https://hooks.example.com/services/T000/B000/XXXX"
          health="failing"
          statusCode={503}
          lastDelivery={retrying ? 'retrying…' : '14m ago'}
          onRetry={retry}
        />
      </ExampleCard>

      <ExampleCard
        title="Webhook Endpoint List"
        description="Multiple registered endpoints for a project's outgoing webhooks"
        code={`<WebhookStatusView url="https://api.acme.com/hooks/orders" health="healthy" statusCode={200} lastDelivery="just now" />
<WebhookStatusView url="https://api.acme.com/hooks/refunds" health="disabled" />
<WebhookStatusView url="https://api.acme.com/hooks/invoices" health="failing" statusCode={500} lastDelivery="1h ago" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <WebhookStatusView url="https://api.acme.com/hooks/orders" health="healthy" statusCode={200} lastDelivery="just now" />
          <WebhookStatusView url="https://api.acme.com/hooks/refunds" health="disabled" />
          <WebhookStatusView url="https://api.acme.com/hooks/invoices" health="failing" statusCode={500} lastDelivery="1h ago" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size"
        description="size='sm' for tighter dashboard cards showing many webhooks at once"
        code={`<WebhookStatusView url="https://api.acme.com/hooks/ping" health="healthy" statusCode={204} lastDelivery="30s ago" size="sm" />`}
      >
        <WebhookStatusView url="https://api.acme.com/hooks/ping" health="healthy" statusCode={204} lastDelivery="30s ago" size="sm" />
      </ExampleCard>

      <ExampleCard
        title="Disabled Endpoint (No Retry Action)"
        description="Disabled webhooks omit statusCode/lastDelivery and hide the retry button entirely when onRetry is not passed"
        code={`<WebhookStatusView url="https://api.acme.com/hooks/legacy" health="disabled" />`}
      >
        <WebhookStatusView url="https://api.acme.com/hooks/legacy" health="disabled" />
      </ExampleCard>
    </div>
  );
}
