import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SegmentedViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Flat — no track, no sliding indicator', color: 'var(--color-primary)' },
          { label: 'Icons beside labels', color: 'var(--color-success)' },
          { label: 'Shares the DUI size scale', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The quieter cousin of SegmentedControlView. That one is a recessed track with a springy indicator, which reads as a control you operate; this is a flat pair or trio for switching a view, where the emphasis belongs to what is below it rather than to the switch."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'SegmentedOption[]', required: true, description: 'Each with id, label and an optional icon.' },
          { name: 'value', type: 'string', required: true, description: 'Id of the active option.' },
          { name: 'onChange', type: '(id: string) => void', required: true, description: 'Fired with the chosen id.' },
          { name: 'size', type: 'DuiSize', description: 'Shared size scale.' },
          { name: 'accentColor', type: 'string', description: 'Active colour.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
