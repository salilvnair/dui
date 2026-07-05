import { useState } from 'react';
import { CountdownRingView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CountdownRingViewExamples() {
  const [expired, setExpired] = useState(false);
  const [rateLimitResets, setRateLimitResets] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pollKey, setPollKey] = useState(0);

  return (
    <div>
      <ExampleCard
        title="Session Expiry Countdown"
        description="Common default use — a labeled ring counting down from a fixed duration"
        code={`<CountdownRingView durationSeconds={60} label="Session expires" />`}
      >
        <CountdownRingView durationSeconds={60} label="Session expires" />
      </ExampleCard>

      <ExampleCard
        title="Token Expiry with Completion Handler"
        description="Interactive usage — onComplete fires when the ring reaches zero, updating app state"
        code={`const [expired, setExpired] = useState(false);

<CountdownRingView
  durationSeconds={20}
  label="Access token"
  color="var(--color-warning)"
  onComplete={() => setExpired(true)}
/>
{expired && <p>Token expired — refresh required</p>}`}
      >
        <CountdownRingView
          durationSeconds={20}
          label="Access token"
          color="var(--color-warning)"
          onComplete={() => setExpired(true)}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: expired ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
          {expired ? 'Token expired — refresh required' : 'Token is still valid'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs through xl sizes for different UI densities"
        code={`{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
  <CountdownRingView key={sz} durationSeconds={120} size={sz} />
))}`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
            <CountdownRingView key={sz} durationSeconds={120} size={sz} />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Rate Limit Reset"
        description="Domain-realistic use — showing when the current rate-limit window resets, driven by target Date"
        code={`const [target] = useState(() => new Date(Date.now() + 45_000));

<CountdownRingView
  target={target}
  label="Rate limit reset"
  color="var(--color-error)"
  onComplete={() => refetchRateLimitHeaders()}
/>`}
      >
        <CountdownRingView
          key={pollKey}
          target={new Date(Date.now() + 45_000)}
          label="Rate limit reset"
          color="var(--color-error)"
          onComplete={() => setRateLimitResets(n => n + 1)}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Resets observed: {rateLimitResets}
          <button
            type="button"
            onClick={() => setPollKey(k => k + 1)}
            style={{ marginLeft: 8, fontSize: 11, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--color-surface-border)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
          >
            Restart
          </button>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Paused State"
        description="Edge case — paused freezes the ring and stops the timer, e.g. while a request is retried manually"
        code={`const [paused, setPaused] = useState(false);

<CountdownRingView durationSeconds={30} label="Retry in" paused={paused} />
<button onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</button>`}
      >
        <CountdownRingView durationSeconds={30} label="Retry in" paused={paused} color="var(--color-info)" />
        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            onClick={() => setPaused(p => !p)}
            style={{ fontSize: 11, padding: '4px 10px', borderRadius: 4, border: '1px solid var(--color-surface-border)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
          >
            {paused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </ExampleCard>
    </div>
  );
}
