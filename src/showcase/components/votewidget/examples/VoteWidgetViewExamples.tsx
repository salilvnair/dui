import { useState } from 'react';
import { VoteWidgetView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface Answer {
  id: string;
  text: string;
  score: number;
  userVote: 'up' | 'down' | null;
}

export function VoteWidgetViewExamples() {
  const [score, setScore] = useState(42);
  const [vote, setVote] = useState<'up' | 'down' | null>(null);

  const [answers, setAnswers] = useState<Answer[]>([
    { id: 'a1', text: 'Use exponential backoff with jitter for webhook retries.', score: 128, userVote: 'up' },
    { id: 'a2', text: 'Set a max-retries cap and dead-letter failed deliveries.', score: 64, userVote: null },
    { id: 'a3', text: 'Just retry every 5 seconds forever.', score: -12, userVote: null },
  ]);

  const handleVote = (id: string, dir: 'up' | 'down' | null) => {
    setAnswers(prev =>
      prev.map(a => {
        if (a.id !== id || dir === null) return a;
        const wasUp = a.userVote === 'up';
        const wasDown = a.userVote === 'down';
        const nextVote = a.userVote === dir ? null : dir;
        let delta = 0;
        if (nextVote === 'up') delta = wasDown ? 2 : 1;
        else if (nextVote === 'down') delta = wasUp ? -2 : -1;
        else delta = wasUp ? -1 : 1;
        return { ...a, score: a.score + delta, userVote: nextVote };
      })
    );
  };

  return (
    <div>
      <ExampleCard
        title="Basic Vote Widget"
        description="Click up or down to vote; clicking the active direction again clears the vote"
        code={`const [score, setScore] = useState(42);
const [vote, setVote] = useState(null);

<VoteWidgetView
  score={score}
  userVote={vote}
  onVote={v => { setVote(v); setScore(s => s + (v ? 1 : -1)); }}
/>`}
      >
        <VoteWidgetView
          score={score}
          userVote={vote}
          onVote={v => {
            setVote(v);
            setScore(s => (v === 'up' ? s + 1 : v === 'down' ? s - 1 : s + (vote === 'up' ? -1 : 1)));
          }}
        />
      </ExampleCard>

      <ExampleCard
        title="Q&A Answer List (interactive)"
        description="Forum/Q&A-style answers with independent vote state per answer — StackOverflow pattern"
        code={`const [answers, setAnswers] = useState([
  { id: 'a1', text: 'Use exponential backoff with jitter...', score: 128, userVote: 'up' },
]);

<VoteWidgetView
  score={answer.score}
  userVote={answer.userVote}
  onVote={dir => handleVote(answer.id, dir)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {answers.map(a => (
            <div key={a.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <VoteWidgetView score={a.score} userVote={a.userVote} onVote={dir => handleVote(a.id, dir)} />
              <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', paddingTop: 2 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color tints the active arrow"
        code={`<VoteWidgetView score={17} userVote="up" onVote={() => {}} color="var(--color-success)" />`}
      >
        <VoteWidgetView score={17} userVote="up" onVote={() => {}} color="var(--color-success)" />
      </ExampleCard>

      <ExampleCard
        title="Different Sizes"
        description="size scales the icon and score font"
        code={`<VoteWidgetView score={9} userVote={null} onVote={() => {}} size="sm" />
<VoteWidgetView score={9} userVote={null} onVote={() => {}} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <VoteWidgetView score={9} userVote={null} onVote={() => {}} size="sm" />
          <VoteWidgetView score={9} userVote={null} onVote={() => {}} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Negative Score (edge case)"
        description="A downvoted, unhelpful answer with a negative net score"
        code={`<VoteWidgetView score={-12} userVote="down" onVote={() => {}} />`}
      >
        <VoteWidgetView score={-12} userVote="down" onVote={() => {}} />
      </ExampleCard>
    </div>
  );
}
