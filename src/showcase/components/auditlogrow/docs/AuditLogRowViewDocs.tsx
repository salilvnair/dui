import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function AuditLogRowViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Monospace timestamp column', color: 'var(--color-primary)' },
          { label: 'Optional actor avatar slot', color: 'var(--color-success)' },
          { label: 'Actor / action / target layout', color: 'var(--color-info)' },
          { label: 'Target text truncation', color: 'var(--color-warning)' },
          { label: 'DuiSize table density', color: '#a855f7' },
          { label: 'Row bottom-border for stacked lists', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'timestamp', type: 'string', required: true, description: 'Pre-formatted timestamp string, rendered in a fixed-width monospace column.' },
          { name: 'actor', type: 'string', required: true, description: 'Name of the user or system that performed the action.' },
          { name: 'actorAvatar', type: 'ReactNode', description: 'Optional avatar element rendered before the actor name.' },
          { name: 'action', type: 'string', required: true, description: 'Verb describing what happened, e.g. "deleted", "updated", "invited".' },
          { name: 'target', type: 'string', required: true, description: 'The object the action was performed on. Truncates with ellipsis if it overflows.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls row padding and font size via the DUI table base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        AuditLogRowView is a single-row primitive — stack multiple instances inside a bordered container (as shown in the examples) to build a full audit trail list; it does not paginate or virtualize on its own, so use VirtualizedListView for very large logs.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AuditLogRowView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on AuditLogRowView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
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
