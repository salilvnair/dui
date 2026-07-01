import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SelectTextInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Unified select + text input combo', color: 'var(--color-primary)' },
          { label: 'HTTP method color coding', color: 'var(--color-success)' },
          { label: 'URL autocomplete suggestions', color: 'var(--color-info)' },
          { label: 'Mock server quick-pick with server icon', color: 'var(--color-warning)' },
          { label: 'Keyboard navigation for suggestions (↑ ↓ Enter Esc)', color: '#a855f7' },
          { label: 'Portal-rendered method + suggestion dropdowns', color: '#ec4899' },
          { label: 'Scroll + resize position tracking', color: '#14b8a6' },
          { label: 'Per-option accent color for select section', color: '#f97316' },
          { label: 'Configurable select section width', color: 'var(--color-primary)' },
          { label: 'DUI container props (width, borderRadius)', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="SelectTextInputView combines a left-side option selector (typically HTTP method) with a right-side text input (typically a URL). Both share a single bordered container that highlights on focus, mirroring a browser URL bar pattern. The two dropdowns (method list and URL suggestions) are portalled independently."
      >
        <DocNote type="info">
          This is the mandatory component for any method + URL input row in DUI. Never build a custom pill-group plus a separate input — always use SelectTextInputView.
        </DocNote>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'selectValue', type: 'string', required: true, description: 'Currently selected option in the left selector (e.g. "GET").' },
          { name: 'selectOptions', type: 'SelectTextOption[]', required: true, description: 'Options shown in the left dropdown.' },
          { name: 'onSelectChange', type: '(value: string) => void', required: true, description: 'Called when the user picks a different option in the left selector.' },
          { name: 'inputValue', type: 'string', required: true, description: 'Current text value of the right input field.' },
          { name: 'onInputChange', type: '(value: string) => void', required: true, description: 'Called on every keystroke in the text input.' },
          { name: 'placeholder', type: 'string', default: "'Enter URL or paste text'", description: 'Placeholder text for the text input.' },
          { name: 'size', type: 'DuiSize', description: 'Falls back to DuiProvider context when omitted.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both the selector and the text input.' },
          { name: 'accentColor', type: 'string', description: 'Accent border color applied when either section is focused.' },
          { name: 'selectWidth', type: 'number', description: 'Override the select section width in pixels. Defaults to a size-based preset.' },
          { name: 'suggestions', type: 'string[]', default: '[]', description: 'URL / text autocomplete suggestions. Filtered as the user types.' },
          { name: 'mockServers', type: 'MockServerSuggestion[]', default: '[]', description: 'Running mock server URLs shown at the top of suggestions with a server icon.' },
          { name: 'onMockServerSelect', type: '(url: string) => void', description: 'Called in addition to onInputChange when the user picks a mock server entry.' },
          { name: 'onKeyDown', type: '(e: KeyboardEvent<HTMLInputElement>) => void', description: 'Key down handler for the text input. Arrow keys and Enter are pre-empted by the suggestion keyboard navigation.' },
          { name: 'width', type: 'DuiWidth', description: 'Width of the entire combined control.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius override.' },
          { name: 'color', type: 'string', description: 'Text color override for the input portion.' },
          { name: 'fontStyle', type: 'DuiFontStyle', description: 'Font style override.' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="SelectTextOption shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Option value (e.g. "GET").' },
          { name: 'label', type: 'string', required: true, description: 'Display label (e.g. "GET").' },
          { name: 'color', type: 'string', description: 'Accent color for this option. Method colors use var(--color-method-get), etc.' },
        ]} />
      </DocSection>

      <DocSection title="MockServerSuggestion shape">
        <PropTable props={[
          { name: 'url', type: 'string', required: true, description: 'Base URL of the running mock server.' },
          { name: 'name', type: 'string', required: true, description: 'Human-readable name of the mock server, shown to the right of the URL.' },
        ]} />
      </DocSection>

      <DocSection title="Default select widths per size">
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '—', desc: '44px' },
          { size: 'xs', height: '—', font: '—', desc: '52px' },
          { size: 'sm', height: '—', font: '—', desc: '64px' },
          { size: 'md', height: '—', font: '—', desc: '80px' },
          { size: 'lg', height: '—', font: '—', desc: '96px' },
          { size: 'xl', height: '—', font: '—', desc: '112px' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Suggestions are filtered client-side to a maximum of 8 items. Mock server entries always appear above regular suggestions, labelled with a "Mock Servers" section header and a server icon.
      </DocNote>
    </div>
  );
}
