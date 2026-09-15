import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function CommandPaletteViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Matches labels and keywords', color: 'var(--color-primary)' },
          { label: 'Keyboard first — arrows, Enter, Escape', color: 'var(--color-success)' },
          { label: 'Shortcut hints on the right of each row', color: 'var(--color-info)' },
          { label: 'Its own empty text', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The Ctrl+K box. Keywords are the part worth knowing: a command called Send request should still be found by typing run or execute, and without them a palette only helps people who already know what the command is called."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether it is showing. The caller owns the shortcut that opens it.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Escape, backdrop, or a command being run.' },
          { name: 'commands', type: 'PaletteCommand[]', required: true, description: 'Everything reachable.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder in the box.' },
          { name: 'emptyText', type: 'string', description: 'Shown when nothing matches.' },
          { name: 'accentColor', type: 'string', description: 'Selection accent.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>

      <DocSection title="PaletteCommand">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable key.' },
          { name: 'label', type: 'string', required: true, description: 'What the row says.' },
          { name: 'action', type: '() => void', required: true, description: 'Run it.' },
          { name: 'hint', type: 'string', description: 'Shortcut shown on the right.' },
          { name: 'icon', type: 'ReactNode', description: 'Glyph before the label.' },
          { name: 'keywords', type: 'string[]', description: 'Other words that should find this command.' },
        ]} />
      </DocSection>
    </div>
  );
}
