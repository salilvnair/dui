import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SwatchPickerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'A row of colour, not a row of labelled boxes', color: 'var(--color-primary)' },
          { label: 'Label becomes the tooltip and accessible name', color: 'var(--color-success)' },
          { label: 'Optional initials for colours that look alike', color: 'var(--color-info)' },
          { label: 'One size number, in px', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="Choosing between things that are identified by colour — an accent, a method, a tag. The name of each option is deliberately not drawn: a swatch row with six words in it is a list, and the point of a swatch row is that you pick by eye."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'SwatchOption[]', required: true, description: 'The choices.' },
          { name: 'value', type: 'string', required: true, description: 'Id of the selected option.' },
          { name: 'onChange', type: '(id: string) => void', required: true, description: 'Fired with the chosen id.' },
          { name: 'size', type: 'number', description: 'Swatch box, in px.' },
          { name: 'initials', type: 'boolean', description: 'Draw the first letters over the colour.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>

      <DocSection title="SwatchOption">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable key, and what onChange returns.' },
          { name: 'label', type: 'string', required: true, description: 'Shown as the tooltip and the accessible name — never as visible text.' },
          { name: 'color', type: 'string', required: true, description: 'The one colour that stands for this option.' },
        ]} />
      </DocSection>
    </div>
  );
}
