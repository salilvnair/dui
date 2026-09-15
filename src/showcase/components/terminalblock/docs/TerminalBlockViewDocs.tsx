import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function TerminalBlockViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Terminal ground, monospace, optional title bar', color: 'var(--color-primary)' },
          { label: 'Follows the app theme, or pins itself dark', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="For commands and their output. Distinct from CodeBlockView, which is syntax-highlighted source with a copy button; this is a terminal, and it looks like one whether it holds what you type or what came back."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'code', type: 'string', required: true, description: 'The contents. Newlines are preserved.' },
          { name: 'title', type: 'string', description: 'Title bar text.' },
          { name: 'dark', type: 'boolean', description: 'Defaults to following the DuiProvider data-theme.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
        ]} />
      </DocSection>
    </div>
  );
}
