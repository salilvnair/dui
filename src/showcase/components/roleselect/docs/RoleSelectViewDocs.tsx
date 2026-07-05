import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function RoleSelectViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Dropdown with per-option description', color: 'var(--color-primary)' },
          { label: 'Portal-rendered menu (no clipping)', color: 'var(--color-info)' },
          { label: 'Click-outside to close', color: 'var(--color-success)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'Disabled state', color: '#a855f7' },
          { label: 'DuiSize + DuiWidth + borderRadius theming', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'RoleOption[]', required: true, description: 'List of { value, label, description? } entries rendered in the dropdown menu.' },
          { name: 'value', type: 'string', required: true, description: 'Currently selected option value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the selected option value when an item is clicked.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls trigger height, padding, and font size via the DUI select base.' },
          { name: 'width', type: 'DuiWidth', description: 'Controls the trigger width.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Overrides the trigger border radius.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the selected option label and open-state border.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="RoleOption shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique identifier for the role, passed to onChange.' },
          { name: 'label', type: 'string', required: true, description: 'Bold text shown in the trigger and menu item.' },
          { name: 'description', type: 'string', description: 'Optional muted helper text shown beneath the label in the menu.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The dropdown menu is rendered via a portal into document.body, so it is never clipped by parent overflow:hidden containers — safe to use inside scrollable tables or modal dialogs.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RoleSelectView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on RoleSelectView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
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
