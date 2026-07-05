import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function CalendarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Single / range / multi selection modes', color: 'var(--color-primary)' },
          { label: 'Scrollable month & year dropdowns', color: 'var(--color-success)' },
          { label: "Range styles: 'tint' or connected 'block' snake", color: 'var(--color-info)' },
          { label: 'min/max date bounds', color: 'var(--color-warning)' },
          { label: 'Custom disabledDates predicate', color: '#a855f7' },
          { label: 'Slide animation between months', color: '#ec4899' },
          { label: "Today's ring indicator", color: '#14b8a6' },
          { label: 'Portal-rendered dropdown menus', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'mode', type: 'CalendarMode', default: "'single'", description: "Selection mode: 'single', 'range', or 'multi'." },
          { name: 'value', type: 'IsoDate | null | [IsoDate | null, IsoDate | null] | IsoDate[]', required: true, description: "Selected value. single: IsoDate | null. range: [IsoDate | null, IsoDate | null]. multi: IsoDate[]." },
          { name: 'onChange', type: '(value: IsoDate | [IsoDate | null, IsoDate | null] | IsoDate[]) => void', required: true, description: 'Called with the new value whenever a day is picked.' },
          { name: 'minDate', type: 'IsoDate', description: 'Earliest selectable date (inclusive).' },
          { name: 'maxDate', type: 'IsoDate', description: 'Latest selectable date (inclusive).' },
          { name: 'disabledDates', type: '(date: Date) => boolean', description: 'Predicate to disable arbitrary dates, e.g. weekends or holidays.' },
          { name: 'rangeStyle', type: 'CalendarRangeStyle', default: "'tint'", description: "Visual treatment for in-range days in range mode. 'tint' = soft background on in-range days. 'block' = solid connected snake of boxes." },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size of the calendar, controlling cell size and font. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset for the calendar container.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius preset or raw pixel value.' },
          { name: 'color', type: 'string', default: "'var(--color-primary)'", description: "Accent color for selected day(s) and today's ring." },
          { name: 'className', type: 'string', description: 'Additional CSS class names on the outer container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="CalendarMode enum">
        <EnumTable name="CalendarMode" values={[
          { value: 'single', description: 'Pick exactly one date. value is IsoDate | null.', color: 'var(--color-primary)' },
          { value: 'range', description: 'Pick a start and end date. value is a 2-tuple, either entry may be null.', color: 'var(--color-success)' },
          { value: 'multi', description: 'Pick any number of non-contiguous dates. value is an IsoDate[]; clicking a selected day removes it.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="CalendarRangeStyle enum">
        <EnumTable name="CalendarRangeStyle" values={[
          { value: 'tint', description: 'Soft translucent background on in-range days (default).', color: 'var(--color-info)' },
          { value: 'block', description: 'Solid connected "snake" of boxes spanning the range.', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocNote type="info">
        IsoDate is a plain YYYY-MM-DD string. In range mode, clicking a new start date after a completed range resets it to [newDate, null]; clicking a date before the current start swaps start/end automatically.
      </DocNote>

      <DocNote type="warning">
        disabledDates, minDate, and maxDate are combined — a date is disabled if it fails any one of them. The predicate receives a native Date, not an IsoDate string.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CalendarView reads its dimensions from the shared date category base hook (useDateBase). Omitting size, width, borderRadius, or color on CalendarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every date-category component at once."
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
