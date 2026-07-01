import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function HighlightedInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '{{variable}} token highlighting', color: 'var(--color-primary)' },
          { label: 'contentEditable div (not textarea)', color: 'var(--color-success)' },
          { label: 'URL history dropdown suggestions', color: 'var(--color-info)' },
          { label: 'Mock server suggestions with server icon', color: 'var(--color-warning)' },
          { label: 'Portal-rendered dropdown (fixed position)', color: '#a855f7' },
          { label: 'Keyboard nav: ↑↓ Enter Escape', color: '#ec4899' },
          { label: 'IME / composition support', color: '#14b8a6' },
          { label: 'Cursor position preserved on external value sync', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Controlled input value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with plain text value on every edit.' },
          { name: 'onKeyDown', type: '(e: React.KeyboardEvent) => void', description: 'Additional keydown handler called after internal navigation handling.' },
          { name: 'onBlur', type: '() => void', description: 'Called when the editor loses focus.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text shown when value is empty.' },
          { name: 'suggestions', type: 'string[]', default: '[]', description: 'URL history strings for the dropdown. Filtered to match current input.' },
          { name: 'mockServers', type: 'MockServerSuggestion[]', default: '[]', description: 'Running mock server URLs shown at top of dropdown with a server icon.' },
          { name: 'disabled', type: 'boolean', description: 'Disables editing. Applies opacity class.' },
          { name: 'accentColor', type: 'string', description: 'Border highlight color when focused.' },
          { name: 'size', type: 'DuiSize', description: 'Size token for height and font size. Falls back to DuiProvider.' },
          { name: 'height', type: 'number', description: 'Raw height override in px. Prefer size for token-aligned sizing.' },
          { name: 'borderRadius', type: 'number', default: '0', description: 'Border radius of the input in px. Default 0 matches URL bar usage; set 6 for standalone rounded use.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the root container.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root container.' },
        ]} />
      </DocSection>

      <DocSection title="MockServerSuggestion">
        <PropTable props={[
          { name: 'url', type: 'string', required: true, description: 'The full URL of the running mock server.' },
          { name: 'name', type: 'string', required: true, description: 'Display name shown on the right side of the dropdown row.' },
        ]} />
      </DocSection>

      <DocSection title="Token patterns highlighted">
        <DocNote type="info">
          Two token patterns are highlighted: <code>{'{{varName}}'}</code> and <code>${'{varName}'}</code>. A third escape pattern <code>$daakia_{'{varName}'}_$</code> is also highlighted but with a different class. Highlighting is done via HTML injection in a backdrop div layered under a transparent textarea.
        </DocNote>
        <DocNote type="warning">
          This component uses a <code>contentEditable</code> div rather than a native input. Avoid nesting it inside forms that submit on Enter — the Enter key is explicitly prevented inside this component.
        </DocNote>
      </DocSection>
    </div>
  );
}
