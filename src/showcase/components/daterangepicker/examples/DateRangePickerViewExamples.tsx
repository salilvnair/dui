import { useState } from 'react';
import { DateRangePickerView, DEFAULT_DATE_RANGE_PRESETS, type IsoDate } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function toIso(d: Date): IsoDate {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysAgo(n: number): IsoDate {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toIso(d);
}

export function DateRangePickerViewExamples() {
  const [range, setRange] = useState<[IsoDate | null, IsoDate | null]>([daysAgo(6), toIso(new Date())]);
  const [analyticsRange, setAnalyticsRange] = useState<[IsoDate | null, IsoDate | null]>([daysAgo(29), toIso(new Date())]);
  const [singleRange, setSingleRange] = useState<[IsoDate | null, IsoDate | null]>([null, null]);
  const [logRange, setLogRange] = useState<[IsoDate | null, IsoDate | null]>([daysAgo(1), toIso(new Date())]);
  const [boundedRange, setBoundedRange] = useState<[IsoDate | null, IsoDate | null]>([null, null]);

  return (
    <div>
      <ExampleCard
        title="Default Range Picker"
        description="Panel variant with the built-in presets sidebar beside the calendar"
        code={`const [range, setRange] = useState<[IsoDate | null, IsoDate | null]>([null, null]);

<DateRangePickerView value={range} onChange={setRange} />`}
      >
        <DateRangePickerView value={range} onChange={setRange} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: {range[0] ?? '—'} to {range[1] ?? '—'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive Analytics Range"
        description="Stateful usage driving a mock request-volume summary as the range changes"
        code={`const [range, setRange] = useState<[IsoDate | null, IsoDate | null]>([daysAgo(29), today]);

<DateRangePickerView value={range} onChange={setRange} variant="single" color="var(--color-info)" />

<p>Showing request analytics from {range[0]} to {range[1]}</p>`}
      >
        <DateRangePickerView value={analyticsRange} onChange={setAnalyticsRange} variant="single" color="var(--color-info)" />
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
          Showing request analytics from <strong>{analyticsRange[0] ?? '—'}</strong> to <strong>{analyticsRange[1] ?? '—'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Variant & Color Showcase"
        description="panel vs single variant, with rangeStyle and color overrides"
        code={`<DateRangePickerView value={range} onChange={setRange} variant="panel" rangeStyle="block" />
<DateRangePickerView value={range} onChange={setRange} variant="single" rangeStyle="tint" color="var(--color-warning)" />`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <DateRangePickerView value={singleRange} onChange={setSingleRange} variant="panel" rangeStyle="block" size="sm" />
          <DateRangePickerView value={singleRange} onChange={setSingleRange} variant="single" rangeStyle="tint" color="var(--color-warning)" size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook Delivery Log Filter"
        description="Filtering webhook delivery logs by a custom preset list relevant to API tooling"
        code={`const webhookPresets: DateRangePreset[] = [
  { label: 'Last 24h', getRange: () => [daysAgo(1), today] },
  { label: 'Last 3 days', getRange: () => [daysAgo(3), today] },
  { label: 'Last 7 days', getRange: () => [daysAgo(7), today] },
];

<DateRangePickerView
  value={range}
  onChange={setRange}
  presets={webhookPresets}
  variant="single"
  color="var(--color-success)"
/>`}
      >
        <DateRangePickerView
          value={logRange}
          onChange={setLogRange}
          presets={[
            { label: 'Last 24h', getRange: () => [daysAgo(1), toIso(new Date())] },
            { label: 'Last 3 days', getRange: () => [daysAgo(3), toIso(new Date())] },
            { label: 'Last 7 days', getRange: () => [daysAgo(7), toIso(new Date())] },
          ]}
          variant="single"
          color="var(--color-success)"
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Filtering webhook deliveries {logRange[0] ?? '—'} → {logRange[1] ?? '—'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Bounded Range (min / max, no presets)"
        description="Restricts selection to a fixed 30-day trial window with presets hidden"
        code={`<DateRangePickerView
  value={range}
  onChange={setRange}
  presets={[]}
  minDate={daysAgo(30)}
  maxDate={today}
  color="var(--color-error)"
/>`}
      >
        <DateRangePickerView
          value={boundedRange}
          onChange={setBoundedRange}
          presets={[]}
          minDate={daysAgo(30)}
          maxDate={toIso(new Date())}
          color="var(--color-error)"
          size="sm"
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Trial data retention window — only the last 30 days are selectable ({DEFAULT_DATE_RANGE_PRESETS.length === 4 ? 'presets hidden' : ''})
        </div>
      </ExampleCard>
    </div>
  );
}
