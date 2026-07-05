import { useState } from 'react';
import { PickerView, type PickerColumn, type PickerOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const METHOD_OPTIONS: PickerOption[] = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];

const HOUR_OPTIONS: PickerOption[] = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));
const MINUTE_OPTIONS: PickerOption[] = Array.from({ length: 60 }, (_, i) => ({
  value: String(i).padStart(2, '0'),
  label: String(i).padStart(2, '0'),
}));
const MERIDIEM_OPTIONS: PickerOption[] = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
];

const RETRY_OPTIONS: PickerOption[] = [
  { value: '0', label: 'No retries' },
  { value: '1', label: '1 retry' },
  { value: '3', label: '3 retries' },
  { value: '5', label: '5 retries' },
  { value: '10', label: '10 retries' },
];

const REGION_OPTIONS: PickerOption[] = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'eu-west-1', label: 'EU (Ireland)' },
  { value: 'ap-south-1', label: 'AP (Mumbai)' },
  { value: 'ap-southeast-1', label: 'AP (Singapore)', disabled: true },
];

export function PickerViewExamples() {
  const [method, setMethod] = useState('GET');
  const [hour, setHour] = useState('9');
  const [minute, setMinute] = useState('30');
  const [meridiem, setMeridiem] = useState('AM');
  const [sizeVal, setSizeVal] = useState('md');
  const [retries, setRetries] = useState('3');
  const [region, setRegion] = useState('us-east-1');

  const timeColumns: PickerColumn[] = [
    { options: HOUR_OPTIONS, value: hour, onChange: setHour, label: 'Hour' },
    { options: MINUTE_OPTIONS, value: minute, onChange: setMinute, label: 'Min' },
    { options: MERIDIEM_OPTIONS, value: meridiem, onChange: setMeridiem, label: '' },
  ];

  return (
    <div>
      <ExampleCard
        title="Single-column HTTP Method Wheel"
        description="Basic single-column picker bound to options/value/onChange"
        code={`const methodOptions = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];

<PickerView options={methodOptions} value={method} onChange={setMethod} size="md" />`}
      >
        <PickerView options={METHOD_OPTIONS} value={method} onChange={setMethod} size="md" style={{ width: 160 }} />
      </ExampleCard>

      <ExampleCard
        title="Scheduled Run Time (interactive, multi-column)"
        description="Hour / minute / AM-PM wheels for scheduling a collection run, with live readout"
        code={`const [hour, setHour] = useState('9');
const [minute, setMinute] = useState('30');
const [meridiem, setMeridiem] = useState('AM');

<PickerView
  columns={[
    { options: hours, value: hour, onChange: setHour, label: 'Hour' },
    { options: minutes, value: minute, onChange: setMinute, label: 'Min' },
    { options: meridiemOpts, value: meridiem, onChange: setMeridiem },
  ]}
  visibleRows={5}
/>`}
      >
        <PickerView columns={timeColumns} visibleRows={5} style={{ width: 220 }} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Scheduled for <strong style={{ color: 'var(--color-text-primary)' }}>{hour}:{minute} {meridiem}</strong> daily
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg / xl sizes driving wheel item height and font size"
        code={`{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
  <PickerView key={sz} options={sizeOptions} value={size} onChange={setSize} size={sz} />
))}`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
            <div key={sz} style={{ textAlign: 'center' }}>
              <PickerView options={METHOD_OPTIONS} value={sizeVal} onChange={setSizeVal} size={sz} style={{ width: 110 }} />
              <div style={{ marginTop: 4, fontSize: 10, color: 'var(--color-text-muted)' }}>{sz}</div>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Retry Policy Selector"
        description="Domain-realistic use — picking retry count when configuring a request's failure handling"
        code={`<PickerView
  options={[
    { value: '0', label: 'No retries' },
    { value: '1', label: '1 retry' },
    { value: '3', label: '3 retries' },
    { value: '5', label: '5 retries' },
    { value: '10', label: '10 retries' },
  ]}
  value={retries}
  onChange={setRetries}
  color="var(--color-warning)"
/>`}
      >
        <PickerView options={RETRY_OPTIONS} value={retries} onChange={setRetries} color="var(--color-warning)" style={{ width: 180 }} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          On failure, retry <strong style={{ color: 'var(--color-text-primary)' }}>{retries}</strong> time(s) before marking the run failed.
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled Option in a Region Picker"
        description="Edge case — a disabled entry (unavailable region) cannot be selected, and the whole picker can be fully disabled"
        code={`<PickerView options={regionOptions} value={region} onChange={setRegion} disabled={false} />
// ap-southeast-1 has disabled: true and is skipped on scroll/click/arrow keys

<PickerView options={regionOptions} value={region} onChange={setRegion} disabled />`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <PickerView options={REGION_OPTIONS} value={region} onChange={setRegion} style={{ width: 220 }} />
            <div style={{ marginTop: 4, fontSize: 10, color: 'var(--color-text-muted)' }}>Enabled (ap-southeast-1 disabled)</div>
          </div>
          <div>
            <PickerView options={REGION_OPTIONS} value={region} onChange={setRegion} disabled style={{ width: 220 }} />
            <div style={{ marginTop: 4, fontSize: 10, color: 'var(--color-text-muted)' }}>Fully disabled</div>
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
