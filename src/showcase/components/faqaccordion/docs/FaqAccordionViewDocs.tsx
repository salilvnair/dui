import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function FaqAccordionViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Pre-styled question/answer accordion', color: 'var(--color-primary)' },
          { label: 'Single-open or multiple-open mode', color: 'var(--color-success)' },
          { label: 'Built directly on AccordionGroupView', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'faqs', type: 'FaqEntry[]', required: true, description: 'List of { id, question, answer } entries to render.' },
          { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple questions open at once. When false, opening one closes the others.' },
          { name: 'accentColor', type: 'string', description: 'Accent color passed through to the underlying AccordionGroupView/CollapsibleSectionView for the expand icon and active border.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="FaqEntry shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier used to track open/closed state.' },
          { name: 'question', type: 'string', required: true, description: 'Rendered as the collapsible section title.' },
          { name: 'answer', type: 'string', required: true, description: 'Rendered as plain paragraph text inside the expanded section.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        FaqAccordionView is a thin, opinionated wrapper around AccordionGroupView (which itself wraps CollapsibleSectionView) — it exists purely to save you from mapping question/answer objects into AccordionGroupItem yourself. Use AccordionGroupView directly if you need rich JSX in the answer body instead of plain text.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FaqAccordionView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          FaqAccordionView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
