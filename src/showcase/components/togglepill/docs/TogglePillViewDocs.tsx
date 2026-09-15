import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function TogglePillViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'A chip that is a control, not a label', color: 'var(--color-primary)' },
          { label: 'Accent-lit active state with a tinted ground', color: 'var(--color-success)' },
          { label: 'Count rides inside the pill', color: 'var(--color-info)' },
          { label: 'go variant for a pill that starts something', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The pill above a list that switches a facet on and off. Distinct from ChipView, which labels a thing and does not respond, and from a button, which does something once rather than staying pressed."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'The label.' },
          { name: 'active', type: 'boolean', description: 'Lit in the accent, with a tinted ground and a matching border.' },
          { name: 'onClick', type: '() => void', description: 'Fired on click.' },
          { name: 'icon', type: 'ReactNode', description: 'A glyph before the label.' },
          { name: 'count', type: 'number | string', description: 'A number or short string carried inside the pill.' },
          { name: 'variant', type: "'default' | 'go'", default: "'default'", description: 'go is for a pill that starts something.' },
          { name: 'accentColor', type: 'string', description: 'Overrides the active colour.' },
          { name: 'disabled', type: 'boolean', description: 'Non-interactive.' },
          { name: 'title', type: 'string', description: 'Native tooltip.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
