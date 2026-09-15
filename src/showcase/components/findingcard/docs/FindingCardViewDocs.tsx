import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function FindingCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'critical · warning · info · success', color: 'var(--color-primary)' },
          { label: 'Remediation kept apart from the detail', color: 'var(--color-success)' },
          { label: 'Children take a stack, a table, a chart', color: 'var(--color-info)' },
          { label: 'Actions in the header — Ask AI, dismiss, open', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="One finding from an analysis — a heap check, a thread dump, a lint pass. Remediation is a separate prop rather than another paragraph of detail, because what was found and what to do about it are read by different people at different moments."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'severity', type: "'critical' | 'warning' | 'info' | 'success'", required: true, description: 'Decides the colour.' },
          { name: 'title', type: 'ReactNode', required: true, description: 'What was found.' },
          { name: 'meta', type: 'ReactNode', description: 'Small monospace label after the title — a rule id, a category, a source.' },
          { name: 'detail', type: 'ReactNode', description: 'One or two sentences, with the numbers that matter.' },
          { name: 'remediation', type: 'ReactNode', description: 'What to do about it. Rendered apart from the detail, because it is advice.' },
          { name: 'children', type: 'ReactNode', description: 'Anything structured — a stack, a table, a chart. Sits below the detail.' },
          { name: 'actions', type: 'ReactNode', description: 'Buttons on the right of the header.' },
          { name: 'color', type: 'string', description: 'Colour override; otherwise the severity decides.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
