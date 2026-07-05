import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StatusPageRowViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Service + status dot + uptime% layout', color: 'var(--color-primary)' },
          { label: '4 semantic status states', color: 'var(--color-success)' },
          { label: 'Auto-formatted uptime (2dp)', color: 'var(--color-info)' },
          { label: 'DuiSize table density', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'service', type: 'string', required: true, description: 'Name of the monitored service or endpoint.' },
          { name: 'status', type: 'ServiceStatus', required: true, description: 'Current health state, drives the status-dot color and label.' },
          { name: 'uptime', type: 'number', required: true, description: 'Uptime percentage, formatted to 2 decimal places automatically (toFixed(2)).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls row padding and font size via the DUI table base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocSection title="ServiceStatus enum">
        <EnumTable name="ServiceStatus" values={[
          { value: 'operational', description: 'Fully healthy — green dot.', color: 'var(--color-success)' },
          { value: 'degraded', description: 'Partial or intermittent issues — amber dot.', color: 'var(--color-warning)' },
          { value: 'outage', description: 'Service is down — red dot.', color: 'var(--color-error)' },
          { value: 'maintenance', description: 'Planned downtime in progress — blue dot.', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Stack multiple rows inside a bordered container to build a full status page, as shown in the public status page example — StatusPageRowView is a single-row primitive and does not manage the list itself.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StatusPageRowView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on StatusPageRowView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
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
