import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function PilledTabViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Filled pill marks the active tab', color: 'var(--color-primary)' },
          { label: 'rounded or fully pilled ends', color: 'var(--color-success)' },
          { label: 'Any accent colour', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A compact tab row for inside a panel, where TabView would be too much chrome. Used across the response panes — Body, Headers, Cookies — and anywhere a small group of views share one box."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tabs', type: 'PilledTab[]', required: true, description: 'Each with an id and a label.' },
          { name: 'activeId', type: 'string', required: true, description: 'Id of the active tab.' },
          { name: 'onChange', type: '(id: string) => void', required: true, description: 'Fired with the chosen id.' },
          { name: 'mode', type: "'rounded' | 'pill'", default: "'rounded'", description: 'How round the active pill is.' },
          { name: 'accentColor', type: 'string', description: 'Active pill background. Defaults to indigo.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
