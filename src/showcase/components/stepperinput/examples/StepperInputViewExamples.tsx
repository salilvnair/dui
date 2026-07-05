import { useState } from 'react';
import { StepperInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function StepperInputViewExamples() {
  const [retries, setRetries] = useState(3);
  const [timeout_, setTimeout_] = useState(30);
  const [concurrency, setConcurrency] = useState(4);
  const [port, setPort] = useState(8080);

  return (
    <div>
      <ExampleCard
        title="Default Stepper"
        description="Basic numeric stepper with min/max bounds"
        code={`const [value, setValue] = useState(3);

<StepperInputView value={value} onChange={setValue} min={0} max={10} />`}
      >
        <StepperInputView value={retries} onChange={setRetries} min={0} max={10} />
      </ExampleCard>

      <ExampleCard
        title="Request Retry Count (interactive)"
        description="Configure how many times a failed request should be retried before giving up"
        code={`const [retries, setRetries] = useState(3);

<StepperInputView value={retries} onChange={setRetries} min={0} max={10} step={1} />
<span>{retries === 0 ? 'No retries' : \`Retry \${retries}x on failure\`}</span>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StepperInputView value={retries} onChange={setRetries} min={0} max={10} step={1} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
            {retries === 0 ? 'No retries' : `Retry ${retries}x on failure`}
          </span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Timeout (step increments)"
        description="Timeout in seconds, stepping by 5s increments with a wide range"
        code={`const [timeoutSec, setTimeoutSec] = useState(30);

<StepperInputView value={timeoutSec} onChange={setTimeoutSec} min={5} max={120} step={5} color="var(--color-warning)" />`}
      >
        <StepperInputView value={timeout_} onChange={setTimeout_} min={5} max={120} step={5} color="var(--color-warning)" />
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="xs / sm / md / lg for different UI densities"
        code={`<StepperInputView value={1} onChange={() => {}} size="xs" />
<StepperInputView value={1} onChange={() => {}} size="sm" />
<StepperInputView value={1} onChange={() => {}} size="md" />
<StepperInputView value={1} onChange={() => {}} size="lg" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StepperInputView value={concurrency} onChange={setConcurrency} size="xs" min={1} max={16} />
          <StepperInputView value={concurrency} onChange={setConcurrency} size="sm" min={1} max={16} />
          <StepperInputView value={concurrency} onChange={setConcurrency} size="md" min={1} max={16} />
          <StepperInputView value={concurrency} onChange={setConcurrency} size="lg" min={1} max={16} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled at Bound (mock server port)"
        description="Buttons auto-disable at min/max; here the port field is fully disabled to reflect a locked environment"
        code={`<StepperInputView value={8080} onChange={() => {}} min={1024} max={65535} disabled />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StepperInputView value={port} onChange={setPort} min={1024} max={65535} disabled />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Locked while server is running</span>
        </div>
      </ExampleCard>
    </div>
  );
}
