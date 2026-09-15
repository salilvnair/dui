import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function InlineEditTextViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Reads as text until double-clicked', color: 'var(--color-primary)' },
          { label: 'Enter saves, Escape abandons', color: 'var(--color-success)' },
          { label: 'Auto-growing multiline box', color: 'var(--color-info)' },
          { label: 'Async onSave, with the display dimmed while it runs', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A field that does not look like one. Used where a value is mostly read and occasionally changed — a request name, a description, a label on a board — so the page is not a wall of input boxes around text nobody is editing."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current committed value.' },
          { name: 'onSave', type: '(next: string) => void | Promise<void>', required: true, description: 'Called with the trimmed new value on Enter or blur. May be async — the display dims until it resolves.' },
          { name: 'placeholder', type: 'string', description: 'Shown when the value is empty, and as the edit box placeholder.' },
          { name: 'multiline', type: 'boolean', default: 'true', description: 'The box auto-grows; Shift+Enter inserts a newline, Enter saves.' },
          { name: 'disabled', type: 'boolean', description: 'Readable, not editable.' },
          { name: 'tooltip', type: 'string', default: "'Double-click to edit'", description: 'Hover tooltip on the display span.' },
          { name: 'accentColor', type: 'string', description: 'Focus ring and caret colour.' },
          { name: 'className', type: 'string', description: 'Applied to the display span AND the edit box, so hover affordances style both states.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>

      <DocSection title="Trimming">
        <DocNote type="info">
          onSave receives the trimmed value, so a stray space at either end never becomes part of the
          saved string. The edit box keeps what you typed until it commits.
        </DocNote>
      </DocSection>
    </div>
  );
}
