import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function PriorityMarkViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Five levels, each a differently-filled ring', color: 'var(--color-primary)' },
          { label: 'Readable as a ring alone in a dense table', color: 'var(--color-success)' },
          { label: 'The word can be overridden — P0, Sev1', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The priority marker on an issue row. The ring is the signal and the word is a courtesy, which is why showLabel can go: in a table of forty rows, forty copies of the word Medium is noise, while forty rings still sort by eye."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'level', type: "'urgent' | 'high' | 'medium' | 'low' | 'none'", required: true, description: 'Which ring to draw.' },
          { name: 'showLabel', type: 'boolean', default: 'true', description: 'Show the word as well as the ring.' },
          { name: 'label', type: 'string', description: 'Override the word — for a tracker that calls Urgent something else.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
