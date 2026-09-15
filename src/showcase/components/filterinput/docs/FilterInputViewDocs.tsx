import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function FilterInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Keeps saying it is a filter, not a search', color: 'var(--color-primary)' },
          { label: 'Icon takes the accent while active', color: 'var(--color-success)' },
          { label: 'Built-in clear button', color: 'var(--color-info)' },
          { label: 'Full DUI size scale', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The box above a list that narrows it. Distinct from SearchFieldView, which runs something when you press Enter — a filter acts on every keystroke and never leaves the page."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current filter text.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Fired on every keystroke.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
          { name: 'size', type: 'DuiSize', default: "'md'", description: 'Shared size scale.' },
          { name: 'width', type: 'string | number', description: 'Explicit width; otherwise sizes to its container.' },
          { name: 'accentColor', type: 'string', description: 'Colour the icon takes once the filter is doing something.' },
          { name: 'suffix', type: 'ReactNode', description: 'Replaces the clear button, for a caller that needs its own control.' },
          { name: 'onKeyDown', type: '(e: KeyboardEvent) => void', description: 'Key handler on the input.' },
          { name: 'autoFocus', type: 'boolean', description: 'Focus on mount.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
