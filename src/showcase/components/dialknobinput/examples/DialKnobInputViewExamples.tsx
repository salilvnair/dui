import { useState } from 'react';
import { DialKnobInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function DialKnobInputViewExamples() {
  const [timeout_, setTimeout_] = useState(30);
  const [volume, setVolume] = useState(65);
  const [retries, setRetries] = useState(3);
  const [concurrency, setConcurrency] = useState(4);

  return (
    <div>
      <ExampleCard
        title="Request Timeout Knob"
        description="Common default use — tune a numeric setting with a labeled value readout"
        code={`const [timeout, setTimeout] = useState(30);

<DialKnobInputView value={timeout} onChange={setTimeout} label="Timeout (s)" />`}
      >
        <DialKnobInputView value={timeout_} onChange={setTimeout_} label="Timeout (s)" />
      </ExampleCard>

      <ExampleCard
        title="Interactive Retry Count"
        description="Stateful knob with a coarse tick sweep — value snaps to whole retries"
        code={`const [retries, setRetries] = useState(3);

<DialKnobInputView
  value={retries}
  onChange={setRetries}
  min={0}
  max={5}
  ticks={5}
  label="Max retries"
  color="var(--color-warning)"
/>`}
      >
        <DialKnobInputView
          value={retries}
          onChange={setRetries}
          min={0}
          max={5}
          ticks={5}
          label="Max retries"
          color="var(--color-warning)"
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Knob diameter scales with the DUI size token"
        code={`<DialKnobInputView value={40} onChange={() => {}} size="xs" label="xs" />
<DialKnobInputView value={40} onChange={() => {}} size="md" label="md" />
<DialKnobInputView value={40} onChange={() => {}} size="xl" label="xl" />`}
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          <DialKnobInputView value={40} onChange={() => {}} size="xs" label="xs" />
          <DialKnobInputView value={40} onChange={() => {}} size="md" label="md" />
          <DialKnobInputView value={40} onChange={() => {}} size="xl" label="xl" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Variable Concurrency Limiter"
        description="API-testing use case — cap parallel requests fired from a collection runner"
        code={`const [concurrency, setConcurrency] = useState(4);

<DialKnobInputView
  value={concurrency}
  onChange={setConcurrency}
  min={1}
  max={20}
  ticks={19}
  label="Parallel requests"
  color="var(--color-info)"
/>`}
      >
        <DialKnobInputView
          value={concurrency}
          onChange={setConcurrency}
          min={1}
          max={20}
          ticks={19}
          label="Parallel requests"
          color="var(--color-info)"
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Runner will fire up to <strong style={{ color: 'var(--color-text-primary)' }}>{concurrency}</strong> requests at once.
        </div>
      </ExampleCard>

      <ExampleCard
        title="Fine-grained Sweep (many ticks)"
        description="Edge case — a high tick count for near-continuous feeling control, e.g. audio-style output volume"
        code={`const [volume, setVolume] = useState(65);

<DialKnobInputView
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  ticks={50}
  label="Mock latency jitter %"
  color="var(--color-success)"
/>`}
      >
        <DialKnobInputView
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          ticks={50}
          label="Mock latency jitter %"
          color="var(--color-success)"
        />
      </ExampleCard>
    </div>
  );
}
