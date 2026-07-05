import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function KeyValueTableViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Enable/disable per row checkbox', color: 'var(--color-primary)' },
          { label: 'Bulk edit mode (textarea)', color: 'var(--color-success)' },
          { label: 'Insert row divider between rows', color: 'var(--color-info)' },
          { label: 'HTTP header key autocomplete', color: 'var(--color-warning)' },
          { label: 'Sensitive key masking with eye toggle', color: '#a855f7' },
          { label: 'Pinned / computed read-only rows', color: '#ec4899' },
          { label: 'Confirm dialog on clear-all', color: '#14b8a6' },
          { label: 'Optional description column', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="KeyValueTableRow">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique row identifier (use crypto.randomUUID()).' },
          { name: 'key', type: 'string', required: true, description: 'Key field value.' },
          { name: 'value', type: 'string', required: true, description: 'Value field value.' },
          { name: 'description', type: 'string', description: 'Optional description column value.' },
          { name: 'enabled', type: 'boolean', required: true, description: 'Whether the row is enabled (checked).' },
          { name: 'type', type: "'text' | 'file'", default: "'text'", description: 'Row type — used by FormDataTableView subclass.' },
        ]} />
      </DocSection>

      <DocSection title="PinnedKeyValueRow">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique row identifier.' },
          { name: 'key', type: 'string', required: true, description: 'Key value (read-only).' },
          { name: 'value', type: 'string', required: true, description: 'Value (read-only).' },
          { name: 'description', type: 'string', description: 'Optional description.' },
          { name: 'deletable', type: 'boolean', description: 'When true, shows a trash icon on hover and calls onPinnedRemove.' },
          { name: 'masked', type: 'boolean', description: 'When true, value is masked with an eye toggle.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'rows', type: 'KeyValueTableRow[]', required: true, description: 'Controlled array of editable rows.' },
          { name: 'onChange', type: '(rows: KeyValueTableRow[]) => void', required: true, description: 'Called with the updated rows array on any change.' },
          { name: 'showDescription', type: 'boolean', default: 'false', description: 'Add a third Description column to the grid.' },
          { name: 'placeholder', type: '{ key?, value? }', description: 'Placeholder text for key and value inputs.' },
          { name: 'autocompleteKeys', type: 'boolean', default: 'false', description: 'Enable HTTP header key autocomplete in the key column.' },
          { name: 'maskSensitive', type: 'boolean', default: 'false', description: 'Automatically mask values for known sensitive keys (Authorization, token, etc.).' },
          { name: 'hideToolbar', type: 'boolean', default: 'false', description: 'Hides the entire toolbar row.' },
          { name: 'label', type: 'string', description: 'Left-side column header label (default "Key").' },
          { name: 'accentColor', type: 'string', description: 'Accent color for insert divider and toolbar highlights.' },
          { name: 'toolbarExtra', type: 'ReactNode', description: 'Extra nodes rendered in the toolbar right side, before the trash icon.' },
          { name: 'size', type: 'DuiSize', description: 'Controls input height and font size. Falls back to DuiProvider or "md".' },
          { name: 'bordered', type: 'boolean', default: 'false', description: 'Wraps the table in a rounded border panel.' },
          { name: 'pinnedTopRows', type: 'PinnedKeyValueRow[]', description: 'Computed rows shown above editable rows with lock icon. Hidden by default — revealed via eye icon.' },
          { name: 'onPinnedRemove', type: '(id: string) => void', description: 'Called when a deletable pinned row is removed.' },
        ]} />
      </DocSection>

      <DocSection title="Bulk edit format">
        <DocNote type="info">
          In bulk edit mode, each line is a <code>key: value</code> pair. Prepend <code>#</code> to disable a row. Switching back to table mode parses the textarea content back into rows.
        </DocNote>
        <DocNote type="tip">
          Pinned rows are ideal for computed/auto-generated headers (e.g. Content-Type derived from the request body). Show them only when the user clicks the eye icon to avoid visual clutter.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="KeyValueTableView accepts a local size prop but forwards it down to the nested DUI primitives it composes (inputs / buttons / cells), rather than resolving sizing itself. Those inner primitives fall back to the nearest <DuiProvider> context value when size is omitted."
      >
        <FeatureGrid features={[
          { label: 'Delegates sizing to nested primitives', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
        ]} />
        <DocNote type="info">
          There is no dedicated size reference table for KeyValueTableView itself — its visual size comes from whichever DUI input/button/cell primitives it renders internally, each following its own category base hook.
        </DocNote>
      </DocSection>
      </div>
  );
}
