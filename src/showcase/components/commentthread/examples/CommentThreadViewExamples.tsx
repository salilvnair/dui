import { useState } from 'react';
import { CommentThreadView, type CommentNode } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CommentThreadViewExamples() {
  const [replies, setReplies] = useState<string[]>([]);

  const prReview: CommentNode[] = [
    {
      id: '1',
      author: 'Jordan Lee',
      timestamp: '2h ago',
      content: 'LGTM, but can we add a timeout to the retry loop before merging?',
    },
    {
      id: '2',
      author: 'Priya Nair',
      timestamp: '1h ago',
      content: 'Good catch — pushed a fix with a 5s timeout and exponential backoff.',
    },
  ];

  const nested: CommentNode[] = [
    {
      id: '1',
      author: 'Alex Chen',
      timestamp: '3h ago',
      content: 'Should this endpoint require an API key even in dev mode?',
      replies: [
        {
          id: '1a',
          author: 'Sam Rivera',
          timestamp: '2h ago',
          content: 'Yes, dev keys are rate-limited separately so it should stay required.',
          replies: [
            { id: '1a-i', author: 'Alex Chen', timestamp: '1h ago', content: 'Makes sense, updating the docs now.' },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <ExampleCard
        title="Basic PR Review Thread"
        description="Flat list of comments — GitHub/PR style, no nesting"
        code={`<CommentThreadView
  comments={[
    { id: '1', author: 'Jordan Lee', timestamp: '2h ago', content: 'LGTM, add a retry timeout?' },
    { id: '2', author: 'Priya Nair', timestamp: '1h ago', content: 'Pushed a fix with backoff.' },
  ]}
/>`}
      >
        <CommentThreadView comments={prReview} />
      </ExampleCard>

      <ExampleCard
        title="Nested Replies (3 levels)"
        description="Each CommentNode can carry its own replies array, indented per depth"
        code={`<CommentThreadView
  comments={[{
    id: '1', author: 'Alex Chen', timestamp: '3h ago',
    content: 'Should this endpoint require an API key even in dev mode?',
    replies: [{
      id: '1a', author: 'Sam Rivera', timestamp: '2h ago',
      content: 'Yes, dev keys are rate-limited separately.',
      replies: [{ id: '1a-i', author: 'Alex Chen', timestamp: '1h ago', content: 'Makes sense, updating docs.' }],
    }],
  }]}
/>`}
      >
        <CommentThreadView comments={nested} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Reply Handler"
        description="onReply fires with the comment id — wire it up to open a reply composer"
        code={`const [replies, setReplies] = useState<string[]>([]);
<CommentThreadView
  comments={comments}
  onReply={(id) => setReplies(prev => [...prev, id])}
/>`}
      >
        <CommentThreadView
          comments={prReview}
          onReply={id => setReplies(prev => [...prev, id])}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Reply clicked on comment ids: {replies.length > 0 ? replies.join(', ') : 'none yet'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Custom Avatars"
        description="Pass avatar per comment node — falls back to a neutral circle placeholder"
        code={`<CommentThreadView
  comments={[{
    id: '1', author: 'Morgan Yu', timestamp: 'just now',
    avatar: <img src="/avatars/morgan.png" style={{ width: 26, height: 26, borderRadius: '999px' }} />,
    content: 'Ran the load test — p99 latency dropped to 120ms.',
  }]}
/>`}
      >
        <CommentThreadView
          comments={[{
            id: '1',
            author: 'Morgan Yu',
            timestamp: 'just now',
            avatar: <span style={{ width: 26, height: 26, borderRadius: '999px', background: 'var(--color-primary)', display: 'inline-block' }} />,
            content: 'Ran the load test — p99 latency dropped to 120ms.',
          }]}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty Thread"
        description="No comments yet — render an empty array and pair with your own empty-state message"
        code={`<CommentThreadView comments={[]} />
{comments.length === 0 && <p>No comments yet. Be the first to reply.</p>}`}
      >
        <CommentThreadView comments={[]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>No comments yet. Be the first to reply.</div>
      </ExampleCard>
    </div>
  );
}
