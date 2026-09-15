import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SplitButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Default action and a menu of alternatives in one control', color: 'var(--color-primary)' },
          { label: 'Shortcuts, icons and dividers in the menu', color: 'var(--color-success)' },
          { label: 'primary / secondary / danger', color: 'var(--color-info)' },
          { label: 'Shares the DUI size scale', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="For a button whose action has close relatives — Save with Save As and Export behind it, Run with Run and Debug. Keeps the common case one click away instead of hiding it inside a menu with everything else."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'The default action word.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Runs the default action — the left half.' },
          { name: 'items', type: 'SplitButtonViewItem[]', required: true, description: 'The alternatives behind the right half.' },
          { name: 'icon', type: 'ReactNode', description: 'Glyph before the label.' },
          { name: 'variant', type: "'primary' | 'secondary' | 'danger'", default: "'primary'", description: 'Same three as ButtonView.' },
          { name: 'disabled', type: 'boolean', description: 'Disables both halves.' },
          { name: 'size', type: 'DuiSize', description: 'Falls back to the DuiProvider size.' },
          { name: 'accentColor', type: 'string', description: 'Accent override.' },
        ]} />
      </DocSection>

      <DocSection title="SplitButtonViewItem">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable key.' },
          { name: 'label', type: 'string', required: true, description: 'Row text.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Chosen.' },
          { name: 'icon', type: 'ReactNode', description: 'Glyph before the row.' },
          { name: 'iconColor', type: 'string', description: 'Tints just that icon — a red bin on Delete.' },
          { name: 'shortcut', type: 'string', description: 'Right-aligned key hint.' },
          { name: 'dividerBefore', type: 'boolean', description: 'A rule above this row, to separate the destructive one.' },
        ]} />
      </DocSection>
    </div>
  );
}
