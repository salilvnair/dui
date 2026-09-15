import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function UnderlineTabsViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Active tab marked by a rule, not a box', color: 'var(--color-primary)' },
          { label: 'Counts beside labels', color: 'var(--color-success)' },
          { label: 'Icons, and disabled tabs that keep their place', color: 'var(--color-info)' },
          { label: 'The hairline can be turned off', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The page-level tab row — the shape GitHub, Linear and most dashboards settled on. Lighter than TabView and less enclosed than PilledTabView, so it works as the top-level navigation of a screen rather than inside a panel."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tabs', type: 'UnderlineTab[]', required: true, description: 'Each with id, label, and optional icon, count and disabled.' },
          { name: 'activeId', type: 'string', required: true, description: 'Id of the active tab.' },
          { name: 'onChange', type: '(id: string) => void', required: true, description: 'Fired with the chosen id.' },
          { name: 'rule', type: 'boolean', default: 'true', description: 'Draw the hairline the tabs sit on.' },
          { name: 'accentColor', type: 'string', description: 'Underline and active label colour.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
