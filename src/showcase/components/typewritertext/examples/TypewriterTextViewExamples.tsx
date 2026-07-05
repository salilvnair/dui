import { TypewriterTextView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TypewriterTextViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Single String"
        description="Types out once and stops (loop disabled)"
        code={`<TypewriterTextView text="Build APIs. Test flows. Ship faster." loop={false} />`}
      >
        <TypewriterTextView text="Build APIs. Test flows. Ship faster." loop={false} />
      </ExampleCard>

      <ExampleCard
        title="Cycling Hero Taglines"
        description="Array of strings — types, pauses, deletes, and cycles forever"
        code={`<TypewriterTextView text={['Build APIs.', 'Test flows.', 'Ship faster.']} />`}
      >
        <TypewriterTextView text={['Build APIs.', 'Test flows.', 'Ship faster.']} />
      </ExampleCard>

      <ExampleCard
        title="Speed & Pause Tuning"
        description="Faster typing with a shorter hold between cycles"
        code={`<TypewriterTextView
  text={['Fast typist demo', 'Quick cycling']}
  speed={18}
  pause={600}
/>`}
      >
        <TypewriterTextView text={['Fast typist demo', 'Quick cycling']} speed={18} pause={600} />
      </ExampleCard>

      <ExampleCard
        title="Size & Color Variants"
        description="Larger, colored typewriter text for empty-state screens"
        code={`<TypewriterTextView text="Loading your workspace…" size="lg" color="var(--color-info)" />`}
      >
        <TypewriterTextView text="Loading your workspace…" size="lg" color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Empty Collection Placeholder"
        description="Realistic Daakia empty-state usage — animated hint text in an empty request list"
        code={`<div style={{ textAlign: 'center', padding: 24, border: '1px dashed var(--color-surface-border)', borderRadius: 8 }}>
  <TypewriterTextView
    text={['No requests yet…', 'Press ⌘N to create one…', 'Or import a cURL command…']}
    size="sm"
    color="var(--color-text-muted)"
  />
</div>`}
      >
        <div style={{ textAlign: 'center', padding: 24, border: '1px dashed var(--color-surface-border)', borderRadius: 8 }}>
          <TypewriterTextView
            text={['No requests yet…', 'Press ⌘N to create one…', 'Or import a cURL command…']}
            size="sm"
            color="var(--color-text-muted)"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
