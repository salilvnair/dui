import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function LineDiffViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Side-by-side diff with no Monaco required', color: 'var(--color-primary)' },
          { label: 'Labels and notes per side', color: 'var(--color-success)' },
          { label: 'A long line wraps rather than scrolling away', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="Two texts with the changed lines marked. This is what DiffEditorView falls back to when Monaco is absent, and it is worth using directly wherever a diff is incidental — a sync preview, a settings conflict — and pulling in an editor would be absurd."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'left', type: 'string', required: true, description: 'The original text.' },
          { name: 'right', type: 'string', required: true, description: 'The changed text.' },
          { name: 'leftLabel / rightLabel', type: 'string', description: 'Headings over each pane.' },
          { name: 'leftNote / rightNote', type: 'string', description: 'Shown beside the label — a filename, or "not present".' },
          { name: 'height', type: 'number | string', description: 'A fixed height, or omit to fill a flex parent.' },
        ]} />
      </DocSection>
    </div>
  );
}
