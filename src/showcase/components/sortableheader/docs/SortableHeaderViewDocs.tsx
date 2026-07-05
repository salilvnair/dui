import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SortableHeaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Click-to-sort column header', color: 'var(--color-primary)' },
          { label: 'Asc / desc / unsorted arrow states', color: 'var(--color-success)' },
          { label: 'Accent color on active sort', color: 'var(--color-info)' },
          { label: 'Muted, dimmed arrow when unsorted', color: 'var(--color-warning)' },
          { label: 'Custom size and color', color: '#a855f7' },
          { label: 'Built on useTableBase', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Column header text.' },
          { name: 'direction', type: 'SortDirection', required: true, description: 'Current sort direction for this column. Controls arrow orientation and active/inactive color.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Called when the header is clicked. Typically cycles direction: asc → desc → null.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls header font size and letter spacing.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color applied to the label and arrow when direction is not null.' },
          { name: 'className', type: 'string', description: 'Additional class names on the underlying button element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the underlying button element.' },
        ]} />
      </DocSection>

      <DocSection title="SortDirection enum">
        <EnumTable name="SortDirection" values={[
          { value: 'asc', description: 'Ascending — shows an up-facing chevron, accent color active.', color: 'var(--color-success)' },
          { value: 'desc', description: 'Descending — shows a down-facing chevron, accent color active.', color: 'var(--color-info)' },
          { value: 'null', description: 'Unsorted — dimmed chevron (up, 35% opacity), muted text color.', color: 'var(--color-text-muted)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        SortableHeaderView is stateless — it only renders the visual indicator and forwards clicks. Implement the asc → desc → null cycle (or your own cycle) in the parent's onClick handler, and drive the actual row sorting from that same state.
      </DocNote>

      <DocNote type="info">
        Pairs naturally with StickyTableHeaderView: render one SortableHeaderView per column inside a sticky <code>th</code>, keeping the sort key and direction in a single piece of parent state.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SortableHeaderView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on SortableHeaderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
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
