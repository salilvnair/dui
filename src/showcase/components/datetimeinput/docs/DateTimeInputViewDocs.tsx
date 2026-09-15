import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function DateTimeInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Date and time in one field, one ISO string out', color: 'var(--color-primary)' },
          { label: 'null is a real state, not an empty string', color: 'var(--color-success)' },
          { label: 'min and max bounds', color: 'var(--color-info)' },
          { label: '12 or 24 hour, and a minute step', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="For a moment rather than a day — a scheduled run, an expiry, a window start. Where only the date matters, DateInputView is the smaller control; where a range matters, DateRangePickerView."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'IsoDateTime | null', required: true, description: 'An ISO local date-time, or null for nothing chosen.' },
          { name: 'onChange', type: '(value: IsoDateTime) => void', required: true, description: 'Fired with the new value.' },
          { name: 'placeholder', type: 'string', description: 'Shown while empty.' },
          { name: 'minDate / maxDate', type: 'IsoDate', description: 'Bounds on the calendar.' },
          { name: 'use24Hour', type: 'boolean', description: '24-hour clock.' },
          { name: 'minuteStep', type: 'number', description: 'Granularity of the minute wheel.' },
          { name: 'size', type: 'DuiSize', description: 'Shared size scale.' },
          { name: 'width', type: 'DuiWidth', description: 'Shared width scale.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Radius override.' },
          { name: 'color', type: 'string', description: 'Accent.' },
          { name: 'disabled', type: 'boolean', description: 'Non-interactive.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
