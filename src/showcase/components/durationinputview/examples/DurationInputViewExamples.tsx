import { useState } from 'react';
import { DurationInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function DurationInputViewExamples() {
  const [reqTimeout, setReqTimeout] = useState(30_000);    // 30s
  const [connTimeout, setConnTimeout] = useState(5_000);   // 5s
  const [retryDelay, setRetryDelay] = useState(500);        // 500ms
  const [rateWindow, setRateWindow] = useState(60_000);    // 1m
  const [longTimeout, setLongTimeout] = useState(3_600_000); // 1hr

  function label(ms: number) {
    if (ms === 0) return '0 ms';
    if (ms >= 3_600_000 && ms % 3_600_000 === 0) return `${ms / 3_600_000} hr`;
    if (ms >= 60_000 && ms % 60_000 === 0) return `${ms / 60_000} min`;
    if (ms >= 1_000 && ms % 1_000 === 0) return `${ms / 1_000} s`;
    return `${ms} ms`;
  }

  return (
    <div>
      <ExampleCard
        title="Request Timeout Selector"
        description="Default 30 s — click the unit badge to switch between ms / s / m / hr"
        code={`<DurationInputView value={30_000} onChange={setReqTimeout} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <DurationInputView value={reqTimeout} onChange={setReqTimeout} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>= {label(reqTimeout)}</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Connection Timeout"
        description="Short timeout for TCP connection establishment (5 s)"
        code={`<DurationInputView value={5_000} onChange={setConnTimeout} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <DurationInputView value={connTimeout} onChange={setConnTimeout} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>= {label(connTimeout)}</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Retry Delay"
        description="Millisecond-range delay between retry attempts (500 ms)"
        code={`<DurationInputView value={500} onChange={setRetryDelay} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <DurationInputView value={retryDelay} onChange={setRetryDelay} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>= {label(retryDelay)}</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Rate Limit Window"
        description="Minute-scale window for rate-limit tracking (1 m)"
        code={`<DurationInputView value={60_000} onChange={setRateWindow} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <DurationInputView value={rateWindow} onChange={setRateWindow} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>= {label(rateWindow)}</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Long Timeout — 1 Hour"
        description="Hour-range timeout for slow batch operations"
        code={`<DurationInputView value={3_600_000} onChange={setLongTimeout} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <DurationInputView value={longTimeout} onChange={setLongTimeout} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>= {label(longTimeout)}</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size prop controls input height and font size"
        code={`<DurationInputView value={5000} size="sm" />
<DurationInputView value={5000} size="md" />
<DurationInputView value={5000} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)', width: 20 }}>{s}</span>
              <DurationInputView value={30_000} onChange={() => {}} size={s} />
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
