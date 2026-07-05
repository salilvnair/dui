import { TypingIndicatorView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TypingIndicatorViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default (dots only)"
        description="Bare animated dots, no label — used inline at the bottom of a message list"
        code={`<TypingIndicatorView />`}
      >
        <TypingIndicatorView />
      </ExampleCard>

      <ExampleCard
        title="With Named Label"
        description="Show who is typing in a 1:1 or small group chat"
        code={`<TypingIndicatorView label="Jordan is typing…" />`}
      >
        <TypingIndicatorView label="Jordan is typing…" />
      </ExampleCard>

      <ExampleCard
        title="Group Chat Label"
        description="Summarize multiple typers in a busy channel"
        code={`<TypingIndicatorView label="3 people are typing…" />`}
      >
        <TypingIndicatorView label="3 people are typing…" />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Match the dot color to a status or theme, e.g. a support bot's brand color"
        code={`<TypingIndicatorView label="Support bot is typing…" color="var(--color-info)" />`}
      >
        <TypingIndicatorView label="Support bot is typing…" color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Dot size and label font scale with the DUI size system"
        code={`<TypingIndicatorView label="typing" size="sm" />
<TypingIndicatorView label="typing" size="md" />
<TypingIndicatorView label="typing" size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TypingIndicatorView label="typing" size="sm" />
          <TypingIndicatorView label="typing" size="md" />
          <TypingIndicatorView label="typing" size="lg" />
        </div>
      </ExampleCard>
    </div>
  );
}
