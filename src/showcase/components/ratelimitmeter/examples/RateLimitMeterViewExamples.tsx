import { useState, useEffect } from 'react';
import { RateLimitMeterView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RateLimitMeterViewExamples() {
  const [remaining, setRemaining] = useState(342);

  useEffect(() => {
    const id = setInterval(() => setRemaining(r => (r <= 0 ? 1000 : r - 7)), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Basic Ring Gauge"
        description="Requests remaining out of a plan's rate limit"
        code={`<RateLimitMeterView remaining={342} limit={1000} resetLabel="in 12m" />`}
      >
        <RateLimitMeterView remaining={342} limit={1000} resetLabel="in 12m" />
      </ExampleCard>

      <ExampleCard
        title="Live Countdown Simulation"
        description="Simulates requests draining the limit in real time, cycling the ring color through success → warning → danger"
        code={`const [remaining, setRemaining] = useState(342);
useEffect(() => {
  const id = setInterval(() => setRemaining(r => (r <= 0 ? 1000 : r - 7)), 800);
  return () => clearInterval(id);
}, []);

<RateLimitMeterView remaining={remaining} limit={1000} resetLabel="in 1h" />`}
      >
        <RateLimitMeterView remaining={remaining} limit={1000} resetLabel="in 1h" />
      </ExampleCard>

      <ExampleCard
        title="Near Limit (Warning)"
        description="Ratio at or below 30% turns the ring warning-colored"
        code={`<RateLimitMeterView remaining={220} limit={1000} resetLabel="in 45s" />`}
      >
        <RateLimitMeterView remaining={220} limit={1000} resetLabel="in 45s" />
      </ExampleCard>

      <ExampleCard
        title="Rate Limited (Danger)"
        description="Ratio at or below 10% turns the ring error-colored — a near-exhausted API quota"
        code={`<RateLimitMeterView remaining={35} limit={1000} resetLabel="in 5s" />`}
      >
        <RateLimitMeterView remaining={35} limit={1000} resetLabel="in 5s" />
      </ExampleCard>

      <ExampleCard
        title="Exhausted (Zero Remaining)"
        description="Edge case — remaining is 0, the ring is fully drawn and error-colored"
        code={`<RateLimitMeterView remaining={0} limit={1000} resetLabel="in 60s" />`}
      >
        <RateLimitMeterView remaining={0} limit={1000} resetLabel="in 60s" />
      </ExampleCard>
    </div>
  );
}
