import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function DonutViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Per-slice colour, with a sane default ramp', color: 'var(--color-primary)' },
          { label: 'maxSlices rolls the tail into one remainder', color: 'var(--color-success)' },
          { label: 'Optional legend beside the ring', color: 'var(--color-info)' },
          { label: 'Ring thickness as a fraction of the radius', color: 'var(--color-warning)' },
          { label: 'onSelect gives back the slice, meta included', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A share-of-total ring. maxSlices matters more than it looks: a donut with nine slices in it is unreadable, and the honest fix is to roll the tail into one named remainder rather than to draw nine wedges nobody can compare."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: '{ name, value, color?, meta? }[]', required: true, description: 'The slices.' },
          { name: 'size', type: 'number', description: 'Outer diameter in px.' },
          { name: 'thickness', type: 'number', description: 'Ring thickness as a fraction of the radius.' },
          { name: 'maxSlices', type: 'number', description: 'Slices past this are rolled into one named remainder.' },
          { name: 'legend', type: 'boolean', description: 'Draw the name and value list beside the ring.' },
          { name: 'centerLabel', type: 'string', description: 'Shown in the hole.' },
          { name: 'format', type: '(value: number) => string', description: 'Formats every number drawn.' },
          { name: 'onSelect', type: '(slice: DonutSlice) => void', description: 'A slice was clicked — meta comes back with it.' },
          { name: 'accentColor', type: 'string', description: 'Base of the default colour ramp.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
