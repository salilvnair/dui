import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function RearrangeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Drag to reorder, tick to enable, in one list', color: 'var(--color-primary)' },
          { label: 'Checkboxes can be dropped entirely', color: 'var(--color-success)' },
          { label: 'Fires the whole new list on any change', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The column picker shape: which fields to show, and in what order. Both questions in one list, because splitting them into a checkbox group and a separate ordering control makes the reader hold the mapping in their head."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'RearrangeItem[]', required: true, description: 'Each with an id, a label, an optional icon and an enabled flag.' },
          { name: 'onChange', type: '(items: RearrangeItem[]) => void', required: true, description: 'Fired with the new ordered and toggled list on any change.' },
          { name: 'selectable', type: 'boolean', default: 'true', description: 'Show an enable/disable checkbox per row.' },
          { name: 'accentColor', type: 'string', description: 'Drop indicator and checkbox accent.' },
          { name: 'size', type: 'DuiSize', description: 'Shared size scale.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
