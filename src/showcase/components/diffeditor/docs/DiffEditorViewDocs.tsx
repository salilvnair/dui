import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function DiffEditorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Monaco diff when installed, LineDiffView when not', color: 'var(--color-primary)' },
          { label: 'Side-by-side or inline', color: 'var(--color-success)' },
          { label: 'Word wrap, font size, theme', color: 'var(--color-info)' },
          { label: 'Read-only by default', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The diff twin of EditorView, and it follows the same rule: it renders a lightweight line diff out of the box and upgrades itself to Monaco the moment a consumer imports the monaco-setup subpath. Nothing in the main package entry references Monaco, so a consumer who never wants it never ships it."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'original', type: 'string', required: true, description: 'The left-hand text.' },
          { name: 'modified', type: 'string', required: true, description: 'The right-hand text.' },
          { name: 'language', type: 'string', description: 'Syntax, when Monaco is present.' },
          { name: 'height', type: 'number | string', description: 'Editor height.' },
          { name: 'readOnly', type: 'boolean', description: 'Whether the modified side can be edited.' },
          { name: 'renderSideBySide', type: 'boolean', default: 'true', description: 'False stacks the two, for a narrow pane.' },
          { name: 'wordWrap', type: 'boolean', description: 'Wrap long lines.' },
          { name: 'fontSize', type: 'number', description: 'Editor font size.' },
          { name: 'theme', type: 'string', description: 'Monaco theme name.' },
          { name: 'onMount', type: '(editor, monaco) => void', description: 'Monaco mounted — only fires on the Monaco path.' },
        ]} />
      </DocSection>
    </div>
  );
}
