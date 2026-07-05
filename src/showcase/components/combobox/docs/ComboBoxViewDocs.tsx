import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function ComboBoxViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Free-text input with filtered suggestions', color: 'var(--color-primary)' },
          { label: 'freeSolo mode for arbitrary values', color: 'var(--color-success)' },
          { label: 'Restricted-choice mode (freeSolo=false)', color: 'var(--color-info)' },
          { label: 'Portal-rendered dropdown', color: 'var(--color-warning)' },
          { label: 'Case-insensitive substring filtering', color: '#a855f7' },
          { label: 'Custom width / radius / color', color: '#ec4899' },
          { label: 'Disabled state', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'ComboBoxOption[]', required: true, description: 'Full list of suggestions. Filtered live against the current query text.' },
          { name: 'value', type: 'string', required: true, description: 'Controlled current value (option value, or arbitrary free text when freeSolo).' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called as the user types (when freeSolo), on option select, and on blur to commit the typed text.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text shown when the input is empty.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input and dims it.' },
          { name: 'freeSolo', type: 'boolean', default: 'true', description: 'When true, any typed text is accepted as the value even if it does not match an option. When false, use it as a searchable restricted-choice select.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls input height, font size, padding. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Input width token (sm / md / default / lg / fullWidth / maxContent / fw / mx).' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius token or explicit pixel value.' },
          { name: 'color', type: 'string', description: 'Accent color for the focused border. Defaults to var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer inline-block wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="ComboBoxOption shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'The underlying value passed to onChange when this option is selected.' },
          { name: 'label', type: 'string', required: true, description: 'Display text shown in the dropdown and copied into the input on select.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        Even with freeSolo={'{false}'}, ComboBoxView does not currently reject arbitrary typed text on its own — it is a UI convention, not enforced validation. Validate the committed value yourself if only known options should be accepted.
      </DocNote>

      <DocNote type="tip">
        Use freeSolo (the default) for fields like header names or query params where common values should be suggested but anything is valid. Set freeSolo={'{false}'} for closed sets like environment or method pickers where you still want type-ahead filtering.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ComboBoxView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on ComboBoxView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useSelectBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'item padY 2px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'item padY 3px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'item padY 4px' },
          { size: 'md', height: '28px', font: '11px', desc: 'item padY 5px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'item padY 7px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'item padY 9px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'item padY 11px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'item padY 14px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Select category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every select-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
