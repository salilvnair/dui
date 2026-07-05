import { useState } from 'react';
import { PathRevealView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PathRevealViewExamples() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <ExampleCard
        title="Basic Wave Path"
        description="Common default use — a single SVG path draws itself on mount instead of fading in"
        code={`<PathRevealView d="M10 50 Q 30 10 50 50 T 90 50" viewBox="0 0 100 100" width={120} height={80} />`}
      >
        <PathRevealView d="M10 50 Q 30 10 50 50 T 90 50" viewBox="0 0 100 100" width={120} height={80} />
      </ExampleCard>

      <ExampleCard
        title="Replay on Demand (interactive)"
        description="Remounting via a changing key retriggers the draw animation — useful for a 'replay' button"
        code={`const [key, setKey] = useState(0);

<PathRevealView key={key} d="M10 80 L30 20 L50 80 L70 20 L90 80" viewBox="0 0 100 100" width={140} height={90} color="var(--color-success)" />
<button onClick={() => setKey(k => k + 1)}>Replay</button>`}
      >
        <PathRevealView key={key} d="M10 80 L30 20 L50 80 L70 20 L90 80" viewBox="0 0 100 100" width={140} height={90} color="var(--color-success)" />
        <button
          onClick={() => setKey(k => k + 1)}
          style={{ marginTop: 8, fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)', cursor: 'pointer' }}
        >
          Replay
        </button>
      </ExampleCard>

      <ExampleCard
        title="Multi-path Diagram (network topology sketch)"
        description="Passing an array of `d` strings draws several paths simultaneously — good for architecture diagrams"
        code={`<PathRevealView
  d={['M10 10 L50 10', 'M50 10 L50 50', 'M50 50 L90 50', 'M50 50 L10 50']}
  viewBox="0 0 100 60"
  width={160}
  height={96}
  color="var(--color-info)"
  duration={1600}
/>`}
      >
        <PathRevealView
          d={['M10 10 L50 10', 'M50 10 L50 50', 'M50 50 L90 50', 'M50 50 L10 50']}
          viewBox="0 0 100 60"
          width={160}
          height={96}
          color="var(--color-info)"
          duration={1600}
        />
      </ExampleCard>

      <ExampleCard
        title="Signature-style Slow Draw"
        description="API-testing domain use case — draws an approval 'signature' checkmark stroke when a request gets approved"
        code={`<PathRevealView
  d="M8 24 L20 36 L44 10"
  viewBox="0 0 52 44"
  width={80}
  height={68}
  color="var(--color-success)"
  strokeWidth={4}
  duration={700}
/>`}
      >
        <PathRevealView
          d="M8 24 L20 36 L44 10"
          viewBox="0 0 52 44"
          width={80}
          height={68}
          color="var(--color-success)"
          strokeWidth={4}
          duration={700}
        />
      </ExampleCard>

      <ExampleCard
        title="Instant Draw (duration = 0)"
        description="Edge case — a duration of 0 effectively disables the animation and the path appears immediately"
        code={`<PathRevealView d="M10 50 L90 50" viewBox="0 0 100 100" width={100} height={40} duration={0} color="var(--color-warning)" />`}
      >
        <PathRevealView d="M10 50 L90 50" viewBox="0 0 100 100" width={100} height={40} duration={0} color="var(--color-warning)" />
      </ExampleCard>
    </div>
  );
}
