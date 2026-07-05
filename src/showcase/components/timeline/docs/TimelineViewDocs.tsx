import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TimelineViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Vertical or horizontal orientation', color: 'var(--color-primary)' },
          { label: 'Per-entry icon node', color: 'var(--color-success)' },
          { label: 'Per-entry accent color', color: 'var(--color-info)' },
          { label: 'Optional timestamp and rich content', color: 'var(--color-warning)' },
          { label: 'Connecting rail between nodes', color: '#a855f7' },
          { label: 'DUI size + color context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'entries', type: 'TimelineEntry[]', required: true, description: 'Ordered list of events to render as nodes along the timeline.' },
          { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction of the event trail.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Font size for titles/timestamps/content. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Default node fill color, used when an entry does not specify its own color.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="TimelineEntry shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique key for the entry.' },
          { name: 'icon', type: 'ReactNode', description: 'Node rendered inside the circular marker.' },
          { name: 'title', type: 'ReactNode', required: true, description: 'Primary label for the event.' },
          { name: 'timestamp', type: 'string', description: 'Time or step label shown next to (vertical) or under (horizontal) the title.' },
          { name: 'content', type: 'ReactNode', description: 'Additional detail rendered below the title (vertical orientation only).' },
          { name: 'color', type: 'string', description: 'Overrides the marker color for this entry only.' },
        ]} />
      </DocSection>

      <DocSection title="orientation enum">
        <EnumTable name="orientation" values={[
          { value: 'vertical', description: 'Default. Top-to-bottom trail, supports the content field.', color: 'var(--color-primary)' },
          { value: 'horizontal', description: 'Left-to-right trail, compact — content field is not rendered.', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        In horizontal orientation, the content field is intentionally not rendered — only title and timestamp. Switch to vertical if you need the extra detail line.
      </DocNote>

      <DocNote type="tip">
        For a feed grouped by calendar day rather than a linear sequence, use ActivityFeedView instead.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TimelineView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on TimelineView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
