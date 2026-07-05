import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function PromptLibraryViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Overview">
        <DocNote type="info">
          PromptLibraryView consists of two cooperating components: <strong>PromptLibraryListView</strong> (the searchable tree sidebar) and <strong>PromptLibraryEditorView</strong> (the detail panel with preview/edit modes). Use them side-by-side in a split layout.
        </DocNote>
      </DocSection>

      <DocSection title="Features — PromptLibraryListView">
        <FeatureGrid features={[
          { label: 'Three-level tree: Sections → Categories → Items', color: 'var(--color-primary)' },
          { label: 'Built-in search with live filtering', color: 'var(--color-success)' },
          { label: 'Total count badge in search bar', color: 'var(--color-info)' },
          { label: 'Collapsible sections and categories', color: 'var(--color-warning)' },
          { label: 'PromptCardView rows with hover actions', color: '#a855f7' },
          { label: 'isCustom + isModified flags per item', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Features — PromptLibraryEditorView">
        <FeatureGrid features={[
          { label: 'Preview mode: variable pills highlighted', color: 'var(--color-primary)' },
          { label: 'Edit mode: syntax-highlighted textarea', color: 'var(--color-success)' },
          { label: 'Variable insertion chips', color: 'var(--color-info)' },
          { label: 'Tab bar with optional icons', color: 'var(--color-warning)' },
          { label: 'isDirty / unsaved indicator', color: '#a855f7' },
          { label: 'Save button (active when dirty)', color: '#ec4899' },
          { label: 'Trigger breadcrumb label', color: '#14b8a6' },
          { label: 'Avatar with initials', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="PromptLibraryListView Props">
        <PropTable props={[
          { name: 'sections', type: 'PromptLibrarySection[]', required: true, description: 'Top-level sections, each with an id, title, and array of categories.' },
          { name: 'activeId', type: 'string', description: 'ID of the currently selected prompt.' },
          { name: 'onSelect', type: '(id: string) => void', description: 'Called when a prompt card is clicked.' },
          { name: 'search', type: 'string', default: "''", description: 'Controlled search query string.' },
          { name: 'onSearchChange', type: '(v: string) => void', description: 'Called when the user types in the search box.' },
          { name: 'accentColor', type: 'string', description: 'Accent color for badges and section count chips.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="PromptLibraryEditorView Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'Prompt title shown in the header. Used for initials generation.' },
          { name: 'content', type: 'string', required: true, description: 'Full prompt text — shown in preview or editable in edit mode.' },
          { name: 'onContentChange', type: '(content: string) => void', description: 'Called when the user edits the prompt text.' },
          { name: 'description', type: 'string', description: 'Optional description shown below the title.' },
          { name: 'triggerLabel', type: 'string', description: 'Breadcrumb label shown in italic below the description (e.g. the trigger phrase).' },
          { name: 'avatarColor', type: 'string', description: 'Background color of the avatar circle.' },
          { name: 'isCustom', type: 'boolean', default: 'false', description: 'Shows a CUSTOM badge.' },
          { name: 'isDirty', type: 'boolean', default: 'false', description: 'When true, shows an "unsaved" indicator and activates the Save button.' },
          { name: 'variables', type: 'PromptLibraryVariable[]', description: 'Variable chips shown above the editor. Clicking inserts the variable text.' },
          { name: 'tabs', type: 'PromptLibraryEditorTab[]', description: 'Tab bar tabs shown above the content area.' },
          { name: 'activeTabId', type: 'string', description: 'Controlled active tab ID.' },
          { name: 'onTabChange', type: '(id: string) => void', description: 'Called when the user switches tabs.' },
          { name: 'viewMode', type: "'preview' | 'edit'", default: "'preview'", description: 'Controlled view mode. Can also be uncontrolled.' },
          { name: 'onViewModeChange', type: '(mode) => void', description: 'Called when user toggles preview/edit. If omitted, component is uncontrolled.' },
          { name: 'onSave', type: '() => void', description: 'Called when Save button is clicked. Renders the button only when provided.' },
          { name: 'onVariableInsert', type: '(insert: string) => void', description: 'Called when a variable chip is clicked.' },
          { name: 'accentColor', type: 'string', description: 'Accent color for tabs, toggles, and save button.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Variable syntax">
        <DocNote type="info">
          Variables are detected by the regex <code>{'{{varName}}'}</code> or <code>{'{varName}'}</code>. In preview mode they render as colored inline pills. In edit mode the textarea uses a backdrop overlay to highlight them without breaking cursor position.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PromptLibraryListView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          PromptLibraryListView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
