import { useState } from 'react';
import { TimeTravelSliderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const REQUEST_COUNTS = [12, 18, 15, 30, 42, 38, 50];

interface DebugState { label: string; requests: number; }
const REDUX_STATES: DebugState[] = [
  { label: 'Init', requests: 0 },
  { label: 'Fetch users', requests: 1 },
  { label: 'Users loaded', requests: 1 },
  { label: 'Fetch orders', requests: 2 },
  { label: 'Filter applied', requests: 2 },
  { label: 'Orders loaded', requests: 2 },
  { label: 'Sort applied', requests: 2 },
];

export function TimeTravelSliderViewExamples() {
  const [index, setIndex] = useState(REQUEST_COUNTS.length - 1);
  const [debugIndex, setDebugIndex] = useState(3);
  const [latencyIndex, setLatencyIndex] = useState(4);

  return (
    <div>
      <ExampleCard
        title="Request Volume Sparkline"
        description="Scrub across hourly request counts, playhead follows the value"
        code={`const states = [12, 18, 15, 30, 42, 38, 50];
const [index, setIndex] = useState(states.length - 1);

<TimeTravelSliderView
  states={states}
  index={index}
  onScrub={setIndex}
  toValue={s => s}
  toLabel={s => 'Value: ' + s}
/>`}
      >
        <TimeTravelSliderView
          states={REQUEST_COUNTS}
          index={index}
          onScrub={setIndex}
          toValue={s => s}
          toLabel={s => `Requests: ${s}`}
        />
      </ExampleCard>

      <ExampleCard
        title="Time-travel Action Timeline"
        description="Object states with a custom label extractor — scrubbing shows the action name"
        code={`interface DebugState { label: string; requests: number; }
const states: DebugState[] = [
  { label: 'Init', requests: 0 },
  { label: 'Fetch users', requests: 1 },
  // ...
];

<TimeTravelSliderView
  states={states}
  index={debugIndex}
  onScrub={setDebugIndex}
  toValue={s => s.requests}
  toLabel={(s, i) => \`#\${i} \${s.label}\`}
/>`}
      >
        <TimeTravelSliderView
          states={REDUX_STATES}
          index={debugIndex}
          onScrub={setDebugIndex}
          toValue={s => s.requests}
          toLabel={(s, i) => `#${i} ${s.label}`}
        />
      </ExampleCard>

      <ExampleCard
        title="Latency Trend Scrubber"
        description="Custom color and dimensions for a compact latency-over-time widget"
        code={`<TimeTravelSliderView
  states={[220, 180, 340, 410, 190, 160, 145]}
  index={latencyIndex}
  onScrub={setLatencyIndex}
  toValue={s => s}
  toLabel={s => s + 'ms'}
  color="var(--color-warning)"
  width={260}
  height={48}
/>`}
      >
        <TimeTravelSliderView
          states={[220, 180, 340, 410, 190, 160, 145]}
          index={latencyIndex}
          onScrub={setLatencyIndex}
          toValue={s => s}
          toLabel={s => `${s}ms`}
          color="var(--color-warning)"
          width={260}
          height={48}
        />
      </ExampleCard>

      <ExampleCard
        title="Without Label"
        description="toLabel is optional — omit it for a minimal sparkline-only scrubber"
        code={`<TimeTravelSliderView states={[1, 4, 2, 8, 5]} index={2} onScrub={() => {}} toValue={s => s} />`}
      >
        <TimeTravelSliderView states={[1, 4, 2, 8, 5]} index={2} onScrub={() => {}} toValue={s => s} />
      </ExampleCard>

      <ExampleCard
        title="Single-State Edge Case"
        description="Only one historical state — playhead is fixed, no scrubbing range"
        code={`<TimeTravelSliderView states={[42]} index={0} onScrub={() => {}} toValue={s => s} toLabel={s => 'Only state: ' + s} />`}
      >
        <TimeTravelSliderView states={[42]} index={0} onScrub={() => {}} toValue={s => s} toLabel={s => `Only state: ${s}`} />
      </ExampleCard>
    </div>
  );
}
