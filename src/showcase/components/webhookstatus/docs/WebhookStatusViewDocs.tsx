import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function WebhookStatusViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Health status dot', color: 'var(--color-success)' },
          { label: 'Truncated monospace URL', color: 'var(--color-primary)' },
          { label: 'Optional status code badge', color: 'var(--color-info)' },
          { label: 'Optional last-delivery label', color: 'var(--color-warning)' },
          { label: 'Retry action button', color: '#a855f7' },
          { label: 'DuiSize table density', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'url', type: 'string', required: true, description: 'The webhook endpoint URL, rendered in monospace and truncated with ellipsis if it overflows.' },
          { name: 'health', type: 'WebhookHealth', required: true, description: 'Drives the status dot and status-code color.' },
          { name: 'lastDelivery', type: 'string', description: 'Pre-formatted relative time string, e.g. "2m ago". Omit to hide.' },
          { name: 'statusCode', type: 'number', description: 'Last HTTP response status code from the endpoint. Omit to hide.' },
          { name: 'onRetry', type: '() => void', description: 'When provided, renders a retry icon button. Omit to hide the action entirely (e.g. for disabled endpoints).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls row padding and font size via the DUI table base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocSection title="WebhookHealth enum">
        <EnumTable name="WebhookHealth" values={[
          { value: 'healthy', description: 'Deliveries are succeeding. Green status dot.', color: 'var(--color-success)' },
          { value: 'failing', description: 'Recent deliveries are erroring. Red status dot and status code.', color: 'var(--color-error)' },
          { value: 'disabled', description: 'Endpoint is turned off. Muted gray status dot.', color: 'var(--color-text-muted)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The retry button only renders when onRetry is supplied — omit it for disabled or read-only endpoints instead of passing a no-op handler, so the row correctly communicates that no action is available.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="WebhookStatusView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on WebhookStatusView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTableBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '18px', font: '8px', desc: 'header 10px' },
          { size: 'xs', height: '22px', font: '9px', desc: 'header 10px' },
          { size: 'sm', height: '26px', font: '10px', desc: 'header 9px' },
          { size: 'md', height: '30px', font: '11px', desc: 'header 9px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'header 10px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'header 10px' },
          { size: 'xxl', height: '46px', font: '14px', desc: 'header 10px' },
          { size: 'xxxl', height: '54px', font: '16px', desc: 'header 10px' },
        ]} />
        <DocNote type="info">
          These values come from the Table category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every table-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
