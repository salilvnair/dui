import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function SelectInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Portal-rendered dropdown', color: 'var(--color-primary)' },
          { label: 'Smart viewport positioning (flip up/down)', color: 'var(--color-success)' },
          { label: 'Scroll + resize tracking', color: 'var(--color-info)' },
          { label: 'Keyboard navigation (↑ ↓ Enter Escape)', color: 'var(--color-warning)' },
          { label: 'Option icons', color: '#a855f7' },
          { label: 'Badge chips on options', color: '#ec4899' },
          { label: 'Group headers with auto-dividers', color: '#14b8a6' },
          { label: 'Disabled state', color: '#f97316' },
          { label: 'Custom accent focus ring', color: 'var(--color-primary)' },
          { label: 'Rounded or square corners', color: 'var(--color-success)' },
          { label: 'Per-option color', color: 'var(--color-info)' },
          { label: 'DUI container props', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'SelectOption[]', required: true, description: 'Array of options to display. Use isHeader: true for non-selectable group label rows.' },
          { name: 'value', type: 'string', required: true, description: 'Currently selected option value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when the user picks an option.' },
          { name: 'size', type: 'SelectInputSize', default: "'default'", description: "'default' maps to 'md'. All DuiSize values accepted." },
          { name: 'rounded', type: 'boolean', default: 'true', description: 'true = size-derived border radius. false = 0px square.' },
          { name: 'placeholder', type: 'string', description: 'Text shown when no option is selected.' },
          { name: 'accentColor', type: 'string', description: 'Override focus border and selected-item highlight color.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, the trigger is not interactive and shows at 50% opacity.' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer wrapper div.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles for the outer wrapper div.' },
          { name: 'width', type: 'string | number', description: 'Width override for the select trigger. CSS string or pixel number.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius override.' },
        ]} />
      </DocSection>

      <DocSection title="SelectOption shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique value identifier for the option.' },
          { name: 'label', type: 'string', required: true, description: 'Display label for the option.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon rendered before the label in both trigger and dropdown.' },
          { name: 'color', type: 'string', description: 'Override text color for this option in the dropdown.' },
          { name: 'isHeader', type: 'boolean', description: 'When true, renders as a non-selectable group header with an auto-divider above it.' },
          { name: 'badge', type: '{ label: string; color: string }', description: 'Colored pill chip rendered before the label. Takes priority over icon in the trigger.' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xs', height: '20px', font: '10px', desc: 'Dense' },
          { size: 'sm', height: '24px', font: '11px', desc: 'Compact' },
          { size: 'md', height: '28px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '32px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '36px', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The dropdown is portalled to document.body at z-index 99999. It automatically flips between opening below and above the trigger based on available viewport space, and repositions on scroll and resize.
      </DocNote>

      <DocNote type="tip">
        Use isHeader: true on an option to create group separators. Headers are rendered with an uppercase label and a horizontal divider above them (except for the very first group). They are not selectable and not focusable via keyboard.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SelectInputView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on SelectInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
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
