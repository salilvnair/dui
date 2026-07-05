import { useState } from 'react';
import { ResultView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ResultViewExamples() {
  const [status, setStatus] = useState<'success' | 'error' | '404' | '403' | 'warning' | 'info'>('success');

  return (
    <div>
      <ExampleCard
        title="Request Sent Successfully"
        description="Full-page success outcome after firing a request"
        code={`<ResultView status="success" title="Request sent" subtitle="Delivered successfully." />`}
      >
        <ResultView status="success" title="Request sent" subtitle="Delivered successfully." />
      </ExampleCard>

      <ExampleCard
        title="Status Switcher (interactive)"
        description="Cycle through every ResultStatus to preview icon/color per outcome"
        code={`const [status, setStatus] = useState('success');

<ResultView
  status={status}
  title={titleFor(status)}
  subtitle={subtitleFor(status)}
/>`}
      >
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {(['success', 'error', 'warning', 'info', '404', '403'] as const).map(s => (
            <ButtonView key={s} size="sm" variant={status === s ? 'primary' : 'secondary'} onClick={() => setStatus(s)}>
              {s}
            </ButtonView>
          ))}
        </div>
        <ResultView
          status={status}
          title={{
            success: 'Request sent',
            error: 'Request failed',
            warning: 'Deprecated endpoint',
            info: 'New API version available',
            '404': 'Endpoint not found',
            '403': 'Access forbidden',
          }[status]}
          subtitle={{
            success: 'Delivered successfully.',
            error: 'Connection refused by host.',
            warning: 'This endpoint will be removed on 2026-12-01.',
            info: 'v3 of this API is now available with improved rate limits.',
            '404': 'No route matches /api/v2/orders/9981.',
            '403': 'Your API key does not have permission for this resource.',
          }[status]}
        />
      </ExampleCard>

      <ExampleCard
        title="Error with Retry Action"
        description="Actions slot holding buttons for recovery flows"
        code={`<ResultView
  status="error"
  title="Webhook delivery failed"
  subtitle="The endpoint returned a 500 after 3 retry attempts."
  actions={
    <>
      <ButtonView variant="primary">Retry delivery</ButtonView>
      <ButtonView variant="secondary">View logs</ButtonView>
    </>
  }
/>`}
      >
        <ResultView
          status="error"
          title="Webhook delivery failed"
          subtitle="The endpoint returned a 500 after 3 retry attempts."
          actions={
            <>
              <ButtonView variant="primary">Retry delivery</ButtonView>
              <ButtonView variant="secondary">View logs</ButtonView>
            </>
          }
        />
      </ExampleCard>

      <ExampleCard
        title="404 Not Found (empty route)"
        description="Numeric code states render a large code instead of an icon — used when a saved request's collection was deleted"
        code={`<ResultView
  status="404"
  title="Collection not found"
  subtitle="This collection may have been deleted or you no longer have access."
  actions={<ButtonView variant="primary">Back to workspace</ButtonView>}
/>`}
      >
        <ResultView
          status="404"
          title="Collection not found"
          subtitle="This collection may have been deleted or you no longer have access."
          actions={<ButtonView variant="primary">Back to workspace</ButtonView>}
        />
      </ExampleCard>

      <ExampleCard
        title="403 Forbidden — Team Access"
        description="Permission-denied state for a team resource, with no subtitle/actions supplied"
        code={`<ResultView status="403" title="You don't have access to this team" />`}
      >
        <ResultView status="403" title="You don't have access to this team" />
      </ExampleCard>
    </div>
  );
}
