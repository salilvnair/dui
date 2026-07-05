import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function RadioGroupViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Controlled single-select radio group', color: 'var(--color-primary)' },
          { label: 'Optional per-option description text', color: 'var(--color-success)' },
          { label: 'Vertical or horizontal layout', color: 'var(--color-info)' },
          { label: 'Per-option disabled flag', color: 'var(--color-warning)' },
          { label: 'Group-wide disabled override', color: '#a855f7' },
          { label: 'Custom accent color', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
          { label: 'role="radiogroup" for accessibility', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'RadioOption[]', required: true, description: 'List of selectable options: { value, label, description?, disabled? }.' },
          { name: 'value', type: 'string', required: true, description: 'The currently selected option value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the new value when the user selects a non-disabled option.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size preset controlling the radio dot size and label/description font sizes. Falls back to DuiProvider context.' },
          { name: 'accentColor', type: 'string', default: "ctx.activeColor ?? 'var(--color-primary)'", description: 'Border and fill color for the selected radio dot.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire group regardless of individual option.disabled values.' },
          { name: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Stacks options in a column (vertical) or lays them out in a row (horizontal).' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer radiogroup container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer radiogroup container.' },
        ]} />
      </DocSection>

      <DocSection title="RadioOption shape">
        <EnumTable name="RadioOption fields" values={[
          { value: 'value', description: 'Unique string identifying this option; compared against the value prop to determine selection.', color: 'var(--color-primary)' },
          { value: 'label', description: 'Primary text shown next to the radio dot.', color: 'var(--color-info)' },
          { value: 'description', description: 'Optional secondary text rendered below the label in a muted, smaller font.', color: 'var(--color-success)' },
          { value: 'disabled', description: 'Optional — disables just this option (dimmed, not clickable) even when the group itself is enabled.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="direction enum">
        <EnumTable name="direction" values={[
          { value: 'vertical', description: 'Default. Options stacked in a column with 8px gaps — best for options with descriptions.', color: 'var(--color-primary)' },
          { value: 'horizontal', description: 'Options laid out in a row with 16px gaps — best for short labels like HTTP methods or environments.', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Use description on options whenever the label alone is ambiguous — e.g. distinguishing "Bearer Token" from "API Key" auth strategies. Omit it for short, self-explanatory choices like HTTP methods to keep horizontal groups compact.
      </DocNote>

      <DocNote type="info">
        The whole label — dot, text, and description — is clickable via the wrapping label element's onClick, not just the dot itself, so touch targets stay generous even at small sizes.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RadioGroupView reads <code>size</code>, <code>color</code>, and related style props directly from the DuiProvider context via useDui() rather than through a shared category base hook. Omitting a local size or color prop falls back to the nearest <DuiProvider> value."
      >
        <FeatureGrid features={[
          { label: 'useDui() context read', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color overrides', color: 'var(--color-info)' },
        ]} />
        <DocNote type="info">
          RadioGroupView derives its own local size map from the resolved <code>size</code> value rather than sharing one of the category base hooks (e.g. useInputBase, useButtonBase). Behavior is still provider-aware: change <code>{'<DuiProvider size="...">'}</code> to restyle this component along with the rest of the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
