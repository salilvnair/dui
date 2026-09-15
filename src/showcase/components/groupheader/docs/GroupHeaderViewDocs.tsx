import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function GroupHeaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Small caps — a label, not a heading', color: 'var(--color-primary)' },
          { label: 'Count as a number or a phrase', color: 'var(--color-success)' },
          { label: 'Summary node for whatever else matters', color: 'var(--color-info)' },
          { label: 'Tone tints the name — for the pile nobody owns', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The row above a group of things in a grouped list or a board column. Deliberately set as a label rather than a heading: a list with eight of these in it should not read as eight sections of a document."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'name', type: 'string', required: true, description: 'The group name, set in small caps.' },
          { name: 'count', type: 'number | string', description: 'How many are in it. A string lets you say "12 of 18".' },
          { name: 'summary', type: 'ReactNode', description: 'Anything else worth saying about the group.' },
          { name: 'tone', type: 'string', description: 'Tints the name — for the pile nobody owns.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
