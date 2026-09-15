import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function InspectorPanelViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Overlay on the right edge, or embedded in the layout', color: 'var(--color-primary)' },
          { label: 'Title, subtitle and a badges row', color: 'var(--color-success)' },
          { label: 'InspectorSectionView groups the body', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The detail panel beside a list — a pod, a request, a node. embedded is the prop that matters: the same panel is an overlay on a narrow screen and a permanent third column on a wide one, and switching between them should not mean a different component."
      >
        <></>
      </DocSection>

      <DocSection title="InspectorPanelView props">
        <PropTable props={[
          { name: 'title', type: 'ReactNode', required: true, description: 'Primary heading — an entity name.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'The body, usually InspectorSectionView blocks.' },
          { name: 'subtitle', type: 'string', description: 'Small uppercase text under the title — the entity type.' },
          { name: 'badges', type: 'ReactNode', description: 'Chips above the title.' },
          { name: 'onClose', type: '() => void', description: 'Shows a close control.' },
          { name: 'embedded', type: 'boolean', default: 'false', description: 'False is an absolute overlay on the right edge; true sits in the layout.' },
          { name: 'width', type: 'number | string', description: 'Panel width.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>

      <DocSection title="InspectorSectionView props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Small caps section heading.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'The section body.' },
          { name: 'icon', type: 'ReactNode', description: 'Glyph before the label.' },
          { name: 'accentColor', type: 'string', description: 'Tints the label and the icon.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
        ]} />
      </DocSection>
    </div>
  );
}
