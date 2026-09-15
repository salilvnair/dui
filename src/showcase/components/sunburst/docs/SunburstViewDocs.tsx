import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SunburstViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'A ring per level, drawn outward from the centre', color: 'var(--color-primary)' },
          { label: 'Parents are the sum of their children', color: 'var(--color-success)' },
          { label: 'minShare drops slivers too thin to read', color: 'var(--color-warning)' },
          { label: 'Centre label follows the hover', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="Where a total went, one level at a time — a heap by package, a bundle by directory, disk by folder. Shares its layout with FlameGraphView; the same HierarchyNode drives either, so switching between the two is a change of component and nothing else."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'root', type: 'HierarchyNode', required: true, description: 'The tree. A node with children is their sum; its own value is ignored.' },
          { name: 'size', type: 'number', description: 'Outer diameter in px.' },
          { name: 'maxDepth', type: 'number', description: 'Rings drawn outward from the centre.' },
          { name: 'minShare', type: 'number', description: 'Slices thinner than this share of the whole are dropped.' },
          { name: 'centerLabel', type: 'string', description: 'Shown in the hole when nothing is hovered.' },
          { name: 'format', type: '(value: number) => string', description: 'Formats the centre label and tooltips.' },
          { name: 'onSelect', type: '(slice: SunburstSlice) => void', description: 'A slice was clicked.' },
          { name: 'accentColor', type: 'string', description: 'Base of the colour ramp.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>

      <DocSection title="HierarchyNode">
        <PropTable props={[
          { name: 'name', type: 'string', required: true, description: 'Node label.' },
          { name: 'value', type: 'number', description: 'Own size. Ignored when there are children — the parent is their sum.' },
          { name: 'children', type: 'HierarchyNode[]', description: 'Nested nodes.' },
          { name: 'meta', type: 'unknown', description: 'Anything the caller wants back on the laid-out slice.' },
        ]} />
      </DocSection>
    </div>
  );
}
