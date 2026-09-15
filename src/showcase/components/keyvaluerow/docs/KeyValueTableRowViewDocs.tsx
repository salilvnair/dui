import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function KeyValueTableRowViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Enable, edit, describe, delete in one row', color: 'var(--color-primary)' },
          { label: 'Auto-masks values under sensitive header names', color: 'var(--color-error)' },
          { label: 'HTTP header autocomplete', color: 'var(--color-info)' },
          { label: 'Read-only pinned mode with a lock', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The row KeyValueTableView is built from, exported so a caller can assemble their own table around it. maskSensitive is the part worth having: a value under Authorization or Cookie should not be on screen by default, and deciding that per call site guarantees somebody forgets."
      >
        <></>
      </DocSection>

      <DocSection title="KeyValueTableRowView props">
        <PropTable props={[
          { name: 'rowKey', type: 'string', required: true, description: 'The key.' },
          { name: 'value', type: 'string', required: true, description: 'The value.' },
          { name: 'description', type: 'string', description: 'A third field, when showDescription is on.' },
          { name: 'enabled', type: 'boolean', description: 'Enabled state. Pass undefined to hide the toggle — use with readOnly for pinned rows.' },
          { name: 'readOnly', type: 'boolean', description: 'Lock icon, dashed border, no editing.' },
          { name: 'masked', type: 'boolean', description: 'Explicitly mask the value with an eye toggle.' },
          { name: 'maskSensitive', type: 'boolean', description: 'Auto-mask when the key matches a known sensitive header.' },
          { name: 'deletable', type: 'boolean', description: 'Show the bin on hover.' },
          { name: 'showDescription', type: 'boolean', description: 'Render the description field.' },
          { name: 'autocompleteKeys', type: 'boolean', description: 'HTTP header key autocomplete — editable mode only.' },
          { name: 'placeholder', type: '{ key?: string; value?: string }', description: 'Per-field placeholders.' },
          { name: 'onKeyChange / onValueChange / onDescriptionChange', type: '(val: string) => void', description: 'Field edits.' },
          { name: 'onEnabledChange', type: '(enabled: boolean) => void', description: 'Toggle.' },
          { name: 'onRemove', type: '() => void', description: 'Bin clicked.' },
          { name: 'size', type: 'DuiSize', description: 'Shared size scale.' },
          { name: 'accentColor', type: 'string', description: 'Accent.' },
        ]} />
      </DocSection>

      <DocSection title="HiddenKeyValueItemView props">
        <PropTable props={[
          { name: 'keyValue', type: 'string', required: true, description: 'The key.' },
          { name: 'value', type: 'string', required: true, description: 'The value.' },
          { name: 'badge', type: 'string', description: 'Small coloured pill on the key — auth, cookie.' },
          { name: 'badgeColor', type: 'string', description: 'Pill colour.' },
          { name: 'icon', type: 'ReactNode', description: 'Override the left lock icon.' },
          { name: 'masked', type: 'boolean', description: 'Mask the value with dots; shows an eye toggle to reveal.' },
          { name: 'onDelete', type: '() => void', description: 'Shows a delete control.' },
          { name: 'deleteTitle', type: 'string', description: 'Tooltip for it.' },
        ]} />
      </DocSection>
    </div>
  );
}
