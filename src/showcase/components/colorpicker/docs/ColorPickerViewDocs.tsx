import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function ColorPickerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Swatch grid trigger + popover', color: 'var(--color-primary)' },
          { label: 'Native color input fallback', color: 'var(--color-success)' },
          { label: 'Free-text hex entry', color: 'var(--color-info)' },
          { label: 'Custom swatch palettes', color: 'var(--color-warning)' },
          { label: 'Portal-rendered menu (escapes overflow)', color: '#a855f7' },
          { label: 'Click-outside to close', color: '#ec4899' },
          { label: 'DuiSize / DuiWidth / DuiRadius aware', color: '#14b8a6' },
          { label: 'Disabled state', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Currently selected color, as a hex string (e.g. "#6366F1"). Rendered as the swatch preview and label on the trigger.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the new hex value when a swatch is clicked, the native color input changes, or a valid hex is typed into the text field.' },
          { name: 'swatches', type: 'string[]', default: 'DEFAULT_SWATCHES (18 colors)', description: 'Custom palette of hex colors to show in the grid, overriding the built-in 18-color default palette.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button; the popover cannot be opened.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls trigger height, padding, font size, and icon size. Falls back to DuiProvider context when omitted.' },
          { name: 'width', type: 'DuiWidth', description: 'Controls the trigger button width preset.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius of the trigger button — a DuiRadius token or a raw pixel number.' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="DuiSize enum">
        <EnumTable name="DuiSize" values={[
          { value: 'xxs', description: 'Smallest trigger size.', color: '#f97316' },
          { value: 'xs', description: 'Extra small.', color: '#ec4899' },
          { value: 'sm', description: 'Small — compact toolbars.', color: 'var(--color-success)' },
          { value: 'md', description: 'Default medium size.', color: 'var(--color-primary)' },
          { value: 'lg', description: 'Large.', color: 'var(--color-info)' },
          { value: 'xl', description: 'Extra large.', color: '#a855f7' },
          { value: 'xxl', description: 'Very large.', color: '#14b8a6' },
          { value: 'xxxl', description: 'Largest preset.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The value prop is not validated against the swatches list — any hex string works, including colors picked via the native input or typed by hand. The trigger always reflects value directly.
      </DocNote>

      <DocNote type="tip">
        Typing into the hex text field only calls onChange once the string matches a valid 3- or 6-digit hex pattern (#RGB or #RRGGBB), so partial input while typing won't produce invalid colors downstream.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ColorPickerView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on ColorPickerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
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
