import { useState } from 'react';
import { FeedbackWidgetView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FeedbackWidgetViewExamples() {
  const [vote1, setVote1] = useState<'up' | 'down' | null>(null);
  const [vote2, setVote2] = useState<'up' | 'down' | null>(null);
  const [comment2, setComment2] = useState('');
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [vote3, setVote3] = useState<'up' | 'down' | null>('up');
  const [vote4, setVote4] = useState<'up' | 'down' | null>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Thumbs Vote"
        description="Simple up/down vote with the default question text"
        code={`const [vote, setVote] = useState<'up' | 'down' | null>(null);
<FeedbackWidgetView vote={vote} onVote={setVote} />`}
      >
        <FeedbackWidgetView vote={vote1} onVote={setVote1} />
      </ExampleCard>

      <ExampleCard
        title="Docs Page Feedback (with comment + submit)"
        description="Voting reveals a comment field; onSubmit fires when the user sends feedback"
        code={`const [vote, setVote] = useState(null);
const [comment, setComment] = useState('');
<FeedbackWidgetView
  question="Was this API reference page helpful?"
  vote={vote}
  onVote={setVote}
  comment={comment}
  onCommentChange={setComment}
  onSubmit={() => submitFeedback(vote, comment)}
/>`}
      >
        <FeedbackWidgetView
          question="Was this API reference page helpful?"
          vote={vote2}
          onVote={setVote2}
          comment={comment2}
          onCommentChange={setComment2}
          onSubmit={() => setSubmitted(p => [...p, `${vote2}: ${comment2 || '(no comment)'}`])}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Submitted: {submitted.length > 0 ? submitted[submitted.length - 1] : 'none yet'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Color"
        description="Match the accent color to a themed feedback surface"
        code={`<FeedbackWidgetView question="Rate this response" vote={vote} onVote={setVote} color="var(--color-info)" />`}
      >
        <FeedbackWidgetView question="Rate this response" vote={vote3} onVote={setVote3} color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Button size and label font scale with the DUI size system"
        code={`<FeedbackWidgetView vote={vote} onVote={setVote} size="sm" />
<FeedbackWidgetView vote={vote} onVote={setVote} size="md" />
<FeedbackWidgetView vote={vote} onVote={setVote} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FeedbackWidgetView vote={vote4} onVote={setVote4} size="sm" />
          <FeedbackWidgetView vote={vote4} onVote={setVote4} size="md" />
          <FeedbackWidgetView vote={vote4} onVote={setVote4} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Pre-selected Vote (already answered)"
        description="Rendering with an initial vote value skips straight to the comment field"
        code={`<FeedbackWidgetView
  question="Did this mock server response look correct?"
  vote="up"
  onVote={() => {}}
/>`}
      >
        <FeedbackWidgetView question="Did this mock server response look correct?" vote="up" onVote={() => {}} />
      </ExampleCard>
    </div>
  );
}
