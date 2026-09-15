import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SortableViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'You draw the row; it supplies the drag', color: 'var(--color-primary)' },
          { label: 'Fires once per completed drag, with indices', color: 'var(--color-success)' },
          { label: 'Renders as div or li, for real lists', color: 'var(--color-info)' },
          { label: 'disabled renders the rows bare', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="Reordering, for rows the caller renders. RearrangeView is the finished control with labels and checkboxes; this is the mechanism under it, for a list whose rows are anything at all."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'rows', type: 'SortableRow[]', required: true, description: 'Each with an id and a node — whatever the row should look like.' },
          { name: 'onReorder', type: '(fromIndex, toIndex) => void', required: true, description: 'Fired once per completed drag.' },
          { name: 'as', type: "'div' | 'li'", default: "'div'", description: 'Wrapper element per row — use li inside a ul or ol.' },
          { name: 'disabled', type: 'boolean', description: 'Disables all dragging; rows render bare.' },
          { name: 'accentColor', type: 'string', description: 'Drop indicator and handle hover.' },
          { name: 'rowClassName', type: 'string', description: 'Extra class per row wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
