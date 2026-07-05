import { useEffect, useState } from 'react';
import { AIStreamingTextView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const FULL_SUMMARY = "Here's a summary of your API traffic: 1,284 requests in the last hour, 99.2% success rate, and one recurring 429 from the /orders endpoint around 14:32 UTC.";

export function AIStreamingTextViewExamples() {
  const [streamed, setStreamed] = useState('');

  useEffect(() => {
    let i = 0;
    const words = FULL_SUMMARY.split(' ');
    const interval = setInterval(() => {
      i++;
      setStreamed(words.slice(0, i).join(' '));
      if (i >= words.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Completed Message"
        description="Full text already present — fades in once, cursor blinks at the end"
        code={`<AIStreamingTextView text="Here's a summary of your API traffic." streaming />`}
      >
        <AIStreamingTextView text="Here's a summary of your API traffic." streaming />
      </ExampleCard>

      <ExampleCard
        title="Live Token Stream (interactive)"
        description="Text grows incrementally, as new tokens arrive from an LLM stream — each new word fades in"
        code={`const [text, setText] = useState('');
// as tokens arrive: setText(prev => prev + nextToken)

<AIStreamingTextView text={text} streaming />`}
      >
        <AIStreamingTextView text={streamed} streaming />
      </ExampleCard>

      <ExampleCard
        title="Thinking State (edge case)"
        description="Before the first token arrives, show a shimmering 'Thinking…' placeholder"
        code={`<AIStreamingTextView text="" thinking streaming={false} />`}
      >
        <AIStreamingTextView text="" thinking streaming={false} />
      </ExampleCard>

      <ExampleCard
        title="Finished, No Cursor"
        description="streaming=false hides the blinking cursor once the response is fully rendered"
        code={`<AIStreamingTextView
  text="Your webhook has been reconfigured with a 3x retry policy."
  streaming={false}
/>`}
      >
        <AIStreamingTextView text="Your webhook has been reconfigured with a 3x retry policy." streaming={false} />
      </ExampleCard>

      <ExampleCard
        title="Size & Color Variants"
        description="sm / md sizes with a themed accent color for an AI assistant panel"
        code={`<AIStreamingTextView text="Analyzing schema drift…" size="sm" color="var(--color-info)" streaming />
<AIStreamingTextView text="3 breaking changes found in v2 response body." size="md" color="var(--color-error)" streaming={false} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <AIStreamingTextView text="Analyzing schema drift…" size="sm" color="var(--color-info)" streaming />
          <AIStreamingTextView text="3 breaking changes found in v2 response body." size="md" color="var(--color-error)" streaming={false} />
        </div>
      </ExampleCard>
    </div>
  );
}
