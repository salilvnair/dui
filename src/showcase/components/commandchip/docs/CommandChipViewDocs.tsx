import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function CommandChipViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Click copies the command', color: 'var(--color-primary)' },
          { label: 'Brief confirmation in place', color: 'var(--color-success)' },
          { label: 'Same height tokens as ButtonView', color: 'var(--color-info)' },
          { label: 'copyable={false} for a plain pill', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A command rendered inline, that copies itself when clicked. For docs, empty states and setup panels — the places where a reader is about to retype something they could have taken."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'command', type: 'string', required: true, description: 'The command text — also what is copied on click.' },
          { name: 'size', type: 'DuiSize', description: 'Shares the same height, padding and font tokens as ButtonView.' },
          { name: 'color', type: 'string', description: 'Text and border accent. Defaults to the DUI context colour.' },
          { name: 'copiedLabel', type: 'string', description: 'Confirmation shown briefly after a successful copy.' },
          { name: 'copyable', type: 'boolean', default: 'true', description: 'Set false for a plain, non-interactive command pill.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
