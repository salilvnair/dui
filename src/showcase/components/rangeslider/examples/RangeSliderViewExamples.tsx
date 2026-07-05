import { useState } from 'react';
import { RangeSliderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RangeSliderViewExamples() {
  const [range, setRange] = useState<[number, number]>([20, 80]);
  const [latencyRange, setLatencyRange] = useState<[number, number]>([50, 400]);
  const [statusRange, setStatusRange] = useState<[number, number]>([200, 299]);
  const [disabledRange] = useState<[number, number]>([10, 90]);

  return (
    <div>
      <ExampleCard
        title="Basic Range Slider"
        description="Dual-handle min/max control with value display"
        code={`const [range, setRange] = useState([20, 80]);

<RangeSliderView value={range} onChange={setRange} showValue />`}
      >
        <RangeSliderView value={range} onChange={setRange} showValue />
      </ExampleCard>

      <ExampleCard
        title="Latency Filter (interactive)"
        description="Filtering a request log by response time range — a real API-testing use case"
        code={`const [latencyRange, setLatencyRange] = useState([50, 400]);

<RangeSliderView
  value={latencyRange}
  onChange={setLatencyRange}
  min={0}
  max={1000}
  step={10}
  width={260}
  showValue
  accentColor="var(--color-warning)"
/>`}
      >
        <RangeSliderView
          value={latencyRange}
          onChange={setLatencyRange}
          min={0}
          max={1000}
          step={10}
          width={260}
          showValue
          accentColor="var(--color-warning)"
        />
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Showing requests between {latencyRange[0]}ms and {latencyRange[1]}ms
        </div>
      </ExampleCard>

      <ExampleCard
        title="HTTP Status Code Range"
        description="Selecting a status code band, e.g. to filter for all 2xx responses"
        code={`const [statusRange, setStatusRange] = useState([200, 299]);

<RangeSliderView
  value={statusRange}
  onChange={setStatusRange}
  min={100}
  max={599}
  step={1}
  accentColor="var(--color-success)"
  showValue
/>`}
      >
        <RangeSliderView
          value={statusRange}
          onChange={setStatusRange}
          min={100}
          max={599}
          step={1}
          accentColor="var(--color-success)"
          showValue
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Width + Size"
        description="width controls track length; size affects overall control density"
        code={`<RangeSliderView value={[10, 90]} onChange={() => {}} width={320} size="sm" />
<RangeSliderView value={[10, 90]} onChange={() => {}} width={120} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <RangeSliderView value={[10, 90]} onChange={() => {}} width={320} size="sm" showValue />
          <RangeSliderView value={[10, 90]} onChange={() => {}} width={120} size="lg" showValue />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="disabled dims the track and locks both handles"
        code={`<RangeSliderView value={[10, 90]} onChange={() => {}} disabled showValue />`}
      >
        <RangeSliderView value={disabledRange} onChange={() => {}} disabled showValue />
      </ExampleCard>
    </div>
  );
}
