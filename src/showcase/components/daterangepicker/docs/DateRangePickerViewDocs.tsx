import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function DateRangePickerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Built-in Today / 7d / 30d / This month presets', color: 'var(--color-primary)' },
          { label: 'Custom preset lists via getRange()', color: 'var(--color-success)' },
          { label: 'panel and single layout variants', color: 'var(--color-info)' },
          { label: 'block or tint in-range visual style', color: 'var(--color-warning)' },
          { label: 'min / max date bounds', color: '#a855f7' },
          { label: 'Size, width, radius, color overrides', color: '#ec4899' },
          { label: 'Built on CalendarView range mode', color: '#14b8a6' },
          { label: 'Controlled [start, end] tuple value', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: '[IsoDate | null, IsoDate | null]', required: true, description: 'Controlled [start, end] date tuple. Either side may be null while the range is incomplete.' },
          { name: 'onChange', type: '(value: [IsoDate | null, IsoDate | null]) => void', required: true, description: 'Fired whenever the range changes, including partial selections (only start picked).' },
          { name: 'presets', type: 'DateRangePreset[]', default: 'DEFAULT_DATE_RANGE_PRESETS', description: 'List of quick-select presets. Pass [] to hide the presets area entirely. Each preset has a label and a getRange() function returning [IsoDate, IsoDate].' },
          { name: 'variant', type: 'DateRangePickerVariant', default: "'panel'", description: 'panel = presets sidebar beside the calendar in one bordered box. single = one unified box with presets as a chip row above the calendar.' },
          { name: 'rangeStyle', type: 'CalendarRangeStyle', default: "'block'", description: 'Visual treatment for in-range days (see CalendarView). Defaults to block here — a connected "snake" of boxes reads better in a range picker than the tint style.' },
          { name: 'minDate', type: 'IsoDate', description: 'Earliest selectable date (inclusive).' },
          { name: 'maxDate', type: 'IsoDate', description: 'Latest selectable date (inclusive).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size preset controlling font size, padding, and gap. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset override, passed through to the internal DateBase layout.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border-radius preset or raw px number for the outer container.' },
          { name: 'color', type: 'string', default: "'var(--color-primary)'", description: 'Accent color used for selected days, active presets, and the range highlight.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="DateRangePickerVariant enum">
        <EnumTable name="DateRangePickerVariant" values={[
          { value: 'panel', description: 'Default. Presets rendered as a sidebar list beside the calendar, both inside one bordered box.', color: 'var(--color-primary)' },
          { value: 'single', description: 'One unified box with presets shown as a horizontal chip row above the calendar.', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection title="CalendarRangeStyle enum">
        <EnumTable name="CalendarRangeStyle" values={[
          { value: 'block', description: 'Default for range pickers. Connected "snake" of square boxes spanning the range.', color: 'var(--color-warning)' },
          { value: 'tint', description: 'Soft translucent background fill across in-range days instead of connected blocks.', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocNote type="info">
        value is always a two-element tuple, even before a full range is picked — the second element stays null until the user clicks an end date. Handle partial selections gracefully in onChange consumers (e.g. don't run a query until both dates are non-null).
      </DocNote>

      <DocNote type="tip">
        Pass presets={'{[]}'} to suppress the built-in Today / 7d / 30d / This month shortcuts entirely, or supply your own DateRangePreset[] — useful for domain-specific ranges like "Last 24h" for webhook delivery logs or "Since last deploy" in an API monitoring dashboard.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DateRangePickerView reads its dimensions from the shared date category base hook (useDateBase). Omitting size, width, borderRadius, or color on DateRangePickerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every date-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDateBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '18px cell', font: '8px', desc: 'ring 40px' },
          { size: 'xs', height: '22px cell', font: '9px', desc: 'ring 52px' },
          { size: 'sm', height: '26px cell', font: '10px', desc: 'ring 64px' },
          { size: 'md', height: '30px cell', font: '11px', desc: 'ring 80px' },
          { size: 'lg', height: '34px cell', font: '12px', desc: 'ring 100px' },
          { size: 'xl', height: '38px cell', font: '13px', desc: 'ring 120px' },
          { size: 'xxl', height: '44px cell', font: '14px', desc: 'ring 144px' },
          { size: 'xxxl', height: '50px cell', font: '16px', desc: 'ring 168px' },
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
          These values come from the Date category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every date-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
