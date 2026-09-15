import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function FlameGraphViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Width is cost, depth is the stack', color: 'var(--color-primary)' },
          { label: 'Click a frame to make it the new root', color: 'var(--color-success)' },
          { label: 'minWidth drops cells too narrow to draw', color: 'var(--color-warning)' },
          { label: 'Same HierarchyNode as SunburstView', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The profiler flame graph — a call tree where a frame is as wide as it is expensive. Takes the same HierarchyNode as SunburstView, so the same data renders either way."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'root', type: 'HierarchyNode', required: true, description: 'The call tree.' },
          { name: 'width', type: 'number', description: 'Overall width in px.' },
          { name: 'rowHeight', type: 'number', description: 'Height of one row.' },
          { name: 'maxDepth', type: 'number', description: 'Rows drawn downward.' },
          { name: 'minWidth', type: 'number', description: 'Cells narrower than this fraction of the width are not drawn.' },
          { name: 'format', type: '(value: number) => string', description: 'Formats values in labels and tooltips.' },
          { name: 'onZoom', type: '(cell: FlameCell) => void', description: 'A frame was clicked — the caller decides what becomes the new root.' },
          { name: 'accentColor', type: 'string', description: 'Base of the colour ramp.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
