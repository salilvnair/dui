import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function MarkdownEditorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Rich text and raw Markdown over one value', color: 'var(--color-primary)' },
          { label: 'Mode controlled or left to the editor', color: 'var(--color-success)' },
          { label: 'Toolbar slot for your own controls', color: 'var(--color-info)' },
          { label: 'Link and Image asked for in-page, never through a host dialog', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A rich editor over one Markdown document. Link and Image prompt in the page rather than through window.prompt, because the host — a VS Code webview, an embedded frame — may simply refuse to show one, and an editor whose link button silently does nothing is worse than one without it."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'The Markdown source.' },
          { name: 'onChange', type: '(markdown: string) => void', required: true, description: 'Fired with the new source, from either mode.' },
          { name: 'mode', type: "'rich' | 'markdown'", description: 'Controlled view. Left uncontrolled, the editor keeps its own.' },
          { name: 'onModeChange', type: '(mode) => void', description: 'The view was switched.' },
          { name: 'showModeToggle', type: 'boolean', default: 'true', description: 'Hides the switch when the caller draws its own.' },
          { name: 'toolbarRight', type: 'ReactNode', description: 'Extra controls at the toolbar right-hand end — a Save button, say.' },
          { name: 'placeholder', type: 'string', description: 'Shown when empty.' },
          { name: 'readOnly', type: 'boolean', description: 'Drops the toolbar with it.' },
          { name: 'size', type: 'DuiSize', description: 'Shared size scale.' },
          { name: 'accentColor', type: 'string', description: 'Accent for the toolbar and focus.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
