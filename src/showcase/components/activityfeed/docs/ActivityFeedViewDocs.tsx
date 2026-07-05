import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ActivityFeedViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Automatic day grouping', color: 'var(--color-primary)' },
          { label: '"Today" / "Yesterday" relative labels', color: 'var(--color-success)' },
          { label: 'Optional per-entry avatar', color: 'var(--color-info)' },
          { label: 'Fallback placeholder avatar', color: 'var(--color-warning)' },
          { label: 'DUI size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'entries', type: 'ActivityEntry[]', required: true, description: 'Activity items to render, grouped by their day field. Grouping preserves the order entries first appear in.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Font size for headers, actor names, and action text. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="ActivityEntry shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique key for the entry.' },
          { name: 'actor', type: 'string', required: true, description: 'Name of the person or system that performed the action, rendered bold.' },
          { name: 'avatar', type: 'ReactNode', description: 'Custom avatar node. Falls back to a plain gray circle when omitted.' },
          { name: 'action', type: 'string', required: true, description: 'Description of what the actor did, rendered after the actor name.' },
          { name: 'timestamp', type: 'string', required: true, description: 'Time label shown right-aligned on the row.' },
          { name: 'day', type: 'string', required: true, description: 'ISO date string (e.g. "2026-07-02") used purely to group entries under a day header — does not need to match `timestamp` format.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Day headers use JavaScript's Date parsing on the `day` field and compare against the current date to label "Today" and "Yesterday"; anything older prints a full localized date. Pass entries pre-sorted — ActivityFeedView does not sort by day or timestamp itself, only groups.
      </DocNote>

      <DocNote type="tip">
        For a linear, non-grouped sequence of milestone events (e.g. a request's lifecycle or a deployment pipeline), use TimelineView instead.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ActivityFeedView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on ActivityFeedView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
