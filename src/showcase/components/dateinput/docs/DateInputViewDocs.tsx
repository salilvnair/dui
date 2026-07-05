import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function DateInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Text-input-styled trigger button', color: 'var(--color-primary)' },
          { label: 'Popover CalendarView (single mode)', color: 'var(--color-success)' },
          { label: 'Portal-rendered, auto-positioned popover', color: 'var(--color-info)' },
          { label: 'Closes on outside click or selection', color: 'var(--color-warning)' },
          { label: 'min/max date bounds', color: '#a855f7' },
          { label: 'Localized display formatting', color: '#ec4899' },
          { label: 'Shares InputBase sizing with other inputs', color: '#14b8a6' },
          { label: 'Disabled state', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'IsoDate | null', required: true, description: 'Currently selected date, or null when empty.' },
          { name: 'onChange', type: '(value: IsoDate) => void', required: true, description: 'Called with the newly picked ISO date when the user selects a day.' },
          { name: 'placeholder', type: 'string', default: "'Select date…'", description: 'Text shown in place of a formatted date when value is null.' },
          { name: 'minDate', type: 'IsoDate', description: 'Earliest selectable date, forwarded to the internal CalendarView.' },
          { name: 'maxDate', type: 'IsoDate', description: 'Latest selectable date, forwarded to the internal CalendarView.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size of the input trigger and popover calendar. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset for the input trigger.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius preset or raw pixel value.' },
          { name: 'color', type: 'string', default: "'var(--color-primary)'", description: 'Accent color for the focused border and the popover calendar selection.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger and prevents the popover from opening.' },
          { name: 'className', type: 'string', description: 'Additional CSS class names on the outer wrapper.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        DateInputView is a thin composition of a styled trigger button and a portal-rendered CalendarView in mode="single" — it always operates on a single IsoDate, not ranges or multi-select. For range input, use DateRangePickerView.
      </DocNote>

      <DocNote type="tip">
        The displayed text is formatted with toLocaleDateString (e.g. "Jul 3, 2026") while the underlying value/onChange contract always uses the raw YYYY-MM-DD IsoDate string — safe for sorting and API payloads.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DateInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on DateInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useInputBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
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
          These values come from the Input category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every input-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
