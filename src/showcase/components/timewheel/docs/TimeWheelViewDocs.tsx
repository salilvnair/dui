import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function TimeWheelViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Scroll wheel picker', color: 'var(--color-primary)' },
          { label: '12-hour (with AM/PM) or 24-hour mode', color: 'var(--color-success)' },
          { label: 'Configurable minute step (1, 5, 15…)', color: 'var(--color-info)' },
          { label: 'Adjustable visible row count', color: 'var(--color-warning)' },
          { label: 'Built on the shared PickerView wheel engine', color: '#a855f7' },
          { label: 'Disabled state', color: '#ec4899' },
          { label: 'Size, width, radius, color overrides', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'TimeWheelValue', required: true, description: 'Controlled value: { hour, minute, meridiem? }. hour is 1-12 in 12-hour mode or 0-23 in 24-hour mode. meridiem is only read when use24Hour is false.' },
          { name: 'onChange', type: '(value: TimeWheelValue) => void', required: true, description: 'Fired whenever the user scrolls, clicks, or arrow-keys to a new hour, minute, or meridiem.' },
          { name: 'use24Hour', type: 'boolean', default: 'false', description: 'When true, shows a 0-23 hour wheel and hides the AM/PM column. When false, shows a 1-12 hour wheel plus a meridiem wheel.' },
          { name: 'minuteStep', type: 'number', default: '1', description: 'Interval between minute options, e.g. 5 renders :00, :05, :10 ... :55.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size preset controlling wheel item height and font size. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset for the overall picker container.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border-radius preset or raw px number for the outer container.' },
          { name: 'color', type: 'string', default: "'var(--color-primary)' (via context)", description: 'Accent color for the center selection highlight band.' },
          { name: 'visibleRows', type: 'number', default: '5', description: 'Odd number of rows visible per wheel. Even numbers are bumped up by 1 internally.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables scrolling/clicking/keyboard interaction and dims the picker.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="TimeWheelValue shape">
        <EnumTable name="TimeWheelValue fields" values={[
          { value: 'hour', description: '1-12 when use24Hour is false, 0-23 when use24Hour is true.', color: 'var(--color-primary)' },
          { value: 'minute', description: '0-59, filtered by minuteStep in the rendered wheel.', color: 'var(--color-info)' },
          { value: 'meridiem', description: "'AM' | 'PM' — only present/used in 12-hour mode.", color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        TimeWheelView is a thin composition over PickerView with two or three synchronized columns (hour, minute, and optionally meridiem). Any prop not listed here — like custom column labels — is not currently exposed; use PickerView directly for that level of control.
      </DocNote>

      <DocNote type="tip">
        When switching use24Hour at runtime, remember hour ranges differ (1-12 vs 0-23) — remap the stored value rather than passing it through unchanged, or the wheel will clamp to an unexpected hour.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TimeWheelView accepts a local size prop but forwards it down to the nested DUI primitives it composes (inputs / buttons / cells), rather than resolving sizing itself. Those inner primitives fall back to the nearest <DuiProvider> context value when size is omitted."
      >
        <FeatureGrid features={[
          { label: 'Delegates sizing to nested primitives', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
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
          There is no dedicated size reference table for TimeWheelView itself — its visual size comes from whichever DUI input/button/cell primitives it renders internally, each following its own category base hook.
        </DocNote>
      </DocSection>
      </div>
  );
}
