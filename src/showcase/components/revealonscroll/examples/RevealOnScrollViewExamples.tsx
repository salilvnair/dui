import { RevealOnScrollView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RevealOnScrollViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Reveal (scroll the card into view)"
        description="Fades and slides up once when it enters the viewport"
        code={`<RevealOnScrollView direction="up">
  <div style={{ padding: 16, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
    New response schema detected
  </div>
</RevealOnScrollView>`}
      >
        <RevealOnScrollView direction="up">
          <div style={{ padding: 16, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
            New response schema detected
          </div>
        </RevealOnScrollView>
      </ExampleCard>

      <ExampleCard
        title="Direction Variants"
        description="up / down / left / right / fade — pick the entrance direction"
        code={`<RevealOnScrollView direction="left">From left</RevealOnScrollView>
<RevealOnScrollView direction="right">From right</RevealOnScrollView>
<RevealOnScrollView direction="fade">Fade only</RevealOnScrollView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RevealOnScrollView direction="left">
            <div style={{ padding: 10, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>From left</div>
          </RevealOnScrollView>
          <RevealOnScrollView direction="right">
            <div style={{ padding: 10, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>From right</div>
          </RevealOnScrollView>
          <RevealOnScrollView direction="fade">
            <div style={{ padding: 10, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>Fade only</div>
          </RevealOnScrollView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Staggered List Reveal"
        description="Sequential delay per item creates a staggered cascade effect"
        code={`{items.map((item, i) => (
  <RevealOnScrollView key={item} direction="up" delay={i * 80}>
    <div>{item}</div>
  </RevealOnScrollView>
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['GET /users', 'POST /users', 'GET /users/:id', 'DELETE /users/:id'].map((item, i) => (
            <RevealOnScrollView key={item} direction="up" delay={i * 80}>
              <div style={{ padding: 8, border: '1px solid var(--color-surface-border)', borderRadius: 6, fontSize: 12, fontFamily: 'var(--font-mono, monospace)' }}>
                {item}
              </div>
            </RevealOnScrollView>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Duration Tuning"
        description="Faster vs slower transition duration in ms"
        code={`<RevealOnScrollView direction="up" duration={200}>Fast (200ms)</RevealOnScrollView>
<RevealOnScrollView direction="up" duration={1000}>Slow (1000ms)</RevealOnScrollView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RevealOnScrollView direction="up" duration={200}>
            <div style={{ padding: 10, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>Fast (200ms)</div>
          </RevealOnScrollView>
          <RevealOnScrollView direction="up" duration={1000}>
            <div style={{ padding: 10, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>Slow (1000ms)</div>
          </RevealOnScrollView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Repeating Reveal (leaves and re-enters)"
        description="repeat re-triggers every time the element crosses the viewport threshold — useful for a live activity feed"
        code={`<RevealOnScrollView direction="up" repeat>
  <div>Webhook delivered — 200 OK</div>
</RevealOnScrollView>`}
      >
        <RevealOnScrollView direction="up" repeat>
          <div style={{ padding: 10, border: '1px solid var(--color-surface-border)', borderRadius: 8, color: 'var(--color-success)' }}>
            Webhook delivered — 200 OK
          </div>
        </RevealOnScrollView>
      </ExampleCard>
    </div>
  );
}
