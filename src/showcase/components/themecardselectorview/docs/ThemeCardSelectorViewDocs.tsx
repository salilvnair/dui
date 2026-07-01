import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function ThemeCardSelectorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Visual theme card grid', color: 'var(--color-primary)' },
          { label: 'Mini color swatch preview', color: 'var(--color-success)' },
          { label: 'Selected state with checkmark badge', color: 'var(--color-info)' },
          { label: 'Optional description per card', color: 'var(--color-warning)' },
          { label: 'Accent border on selection', color: '#a855f7' },
          { label: 'Wrapping flex layout', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="ThemeOption">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique value identifier for this theme option.' },
          { name: 'label', type: 'string', required: true, description: 'Display name shown below the swatch.' },
          { name: 'description', type: 'string', description: 'Optional short description shown in muted text below the label.' },
          { name: 'preview', type: '{ bg, panel, accent, text }', description: 'Optional color preview swatch. Each field is a CSS color string. Renders a mini stripped UI inside the card.' },
        ]} />
      </DocSection>

      <DocSection title="Preview swatch shape">
        <PropTable props={[
          { name: 'bg', type: 'string', required: true, description: 'Background color of the swatch container.' },
          { name: 'panel', type: 'string', required: true, description: 'Panel bar color (top strip in the swatch).' },
          { name: 'accent', type: 'string', required: true, description: 'Accent color strip (represents primary button/highlight).' },
          { name: 'text', type: 'string', required: true, description: 'Text color strip (shown as a semi-transparent bar).' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'ThemeOption[]', required: true, description: 'Array of theme options to display as cards.' },
          { name: 'value', type: 'string', required: true, description: 'Currently selected theme value. Highlights the matching card.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when the user clicks a card.' },
          { name: 'className', type: 'string', description: 'Extra CSS class applied to the flex container.' },
        ]} />
      </DocSection>

      <DocSection title="Card dimensions">
        <DocNote type="info">
          Each card is fixed at 110px wide. The swatch preview area is 48px tall. Cards wrap automatically when the container is narrower than the total width of all cards.
        </DocNote>
        <DocNote type="tip">
          The selected card shows a <code>var(--color-primary)</code> border and a circular checkmark badge. The label turns primary-colored and gains font-weight 600.
        </DocNote>
      </DocSection>
    </div>
  );
}
