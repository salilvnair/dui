import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function AccordionGroupViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Single or multi-open modes', color: 'var(--color-primary)' },
          { label: 'Built on CollapsibleSectionView', color: 'var(--color-success)' },
          { label: 'Optional count badges per section', color: 'var(--color-info)' },
          { label: 'Controlled default-open state', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Fully managed open/close state', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'AccordionGroupItem[]', required: true, description: 'Sections to render: { id, title, badge?, children }.' },
          { name: 'multiple', type: 'boolean', default: 'false', description: 'When false (default), opening a section closes any other open section (classic accordion). When true, any number of sections can stay open simultaneously.' },
          { name: 'defaultOpen', type: 'string[]', default: '[]', description: 'ids of sections open on initial mount.' },
          { name: 'accentColor', type: 'string', description: 'Accent color forwarded to each CollapsibleSectionView (badge and expand-icon tint).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer stacked container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer stacked container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Set multiple to true for reference/inspector-style panels where users often want several sections open side by side (e.g. Headers + Body together). Keep it false for a true accordion, like a FAQ or step-by-step guide.
      </DocNote>

      <DocNote type="info">
        AccordionGroupView only manages open/close state — it delegates the actual section chrome (border, badge rendering, chevron) to CollapsibleSectionView. Use CollapsibleSectionView directly if you need a single standalone collapsible section outside a group.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AccordionGroupView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          AccordionGroupView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
