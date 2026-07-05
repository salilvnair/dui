import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function PickerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Scrollable wheel picker', color: 'var(--color-primary)' },
          { label: 'Single-column or multi-column sync', color: 'var(--color-success)' },
          { label: 'Perspective/scale "cover flow" effect', color: 'var(--color-info)' },
          { label: 'Snap-to-nearest on scroll settle', color: 'var(--color-warning)' },
          { label: 'Arrow-key navigation', color: '#a855f7' },
          { label: 'Per-option disabled entries', color: '#ec4899' },
          { label: 'Configurable visible row count', color: '#14b8a6' },
          { label: 'Inherits DuiProvider size/color context', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'PickerOption[]', description: 'Single-column mode — array of selectable options. Mutually exclusive with columns.' },
          { name: 'value', type: 'string', description: 'Selected value for single-column mode.' },
          { name: 'onChange', type: '(value: string) => void', description: 'Change handler for single-column mode.' },
          { name: 'columns', type: 'PickerColumn[]', description: 'Multi-column mode — renders multiple synchronized wheels side by side (e.g. hour / minute / meridiem). Each column carries its own options/value/onChange/label/flex.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size of the picker, controlling item height and font size. Falls back to DuiProvider context.' },
          { name: 'visibleRows', type: 'number', default: '5', description: 'Odd number of rows visible in the wheel. Even numbers are bumped up by 1.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset for the picker container.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius preset or raw pixel value.' },
          { name: 'color', type: 'string', default: "'var(--color-primary)' (or DuiProvider activeColor)", description: 'Accent color for the selection highlight band.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interaction and dims the picker.' },
          { name: 'className', type: 'string', description: 'Additional CSS class names on the outer container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="PickerOption / PickerColumn shape">
        <PropTable props={[
          { name: 'options[].value', type: 'string', required: true, description: 'Underlying value for the option.' },
          { name: 'options[].label', type: 'string', required: true, description: 'Text displayed in the wheel row.' },
          { name: 'options[].disabled', type: 'boolean', description: 'When true, the row cannot be selected via click, scroll settle, or arrow keys.' },
          { name: 'columns[].label', type: 'string', description: 'Optional caption rendered under the wheel, e.g. "Hour" / "Min".' },
          { name: 'columns[].flex', type: 'number', default: '1', description: 'Flex-grow weight relative to other columns in the same picker.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Use options/value/onChange together for a single wheel, or columns for multiple synchronized wheels — the two modes are mutually exclusive. If both are omitted or options is passed without onChange, the picker renders no columns.
      </DocNote>

      <DocNote type="tip">
        visibleRows should stay odd so the highlighted row sits exactly in the center band; passing an even number is automatically bumped up by one.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PickerView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on PickerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
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
