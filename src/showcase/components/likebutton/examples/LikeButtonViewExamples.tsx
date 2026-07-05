import { useState } from 'react';
import { LikeButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface Snippet {
  id: string;
  title: string;
  liked: boolean;
  count: number;
}

export function LikeButtonViewExamples() {
  const [liked, setLiked] = useState(false);

  const [snippets, setSnippets] = useState<Snippet[]>([
    { id: 's1', title: 'Retry-with-backoff interceptor', liked: true, count: 214 },
    { id: 's2', title: 'JWT refresh middleware', liked: false, count: 87 },
    { id: 's3', title: 'GraphQL persisted queries setup', liked: false, count: 12 },
  ]);

  const toggleSnippet = (id: string) =>
    setSnippets(prev =>
      prev.map(s => (s.id === id ? { ...s, liked: !s.liked, count: s.count + (s.liked ? -1 : 1) } : s))
    );

  return (
    <div>
      <ExampleCard
        title="Basic Like Button"
        description="Toggle liked state with a pop animation and a visible count"
        code={`const [liked, setLiked] = useState(false);

<LikeButtonView liked={liked} onChange={setLiked} count={128} />`}
      >
        <LikeButtonView liked={liked} onChange={setLiked} count={128 + (liked ? 1 : 0)} />
      </ExampleCard>

      <ExampleCard
        title="Shared Snippet Gallery (interactive)"
        description="A list of community-shared request/collection snippets, each with independent like state"
        code={`const [snippets, setSnippets] = useState([
  { id: 's1', title: 'Retry-with-backoff interceptor', liked: true, count: 214 },
]);

<LikeButtonView
  liked={snippet.liked}
  count={snippet.count}
  onChange={() => toggleSnippet(snippet.id)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {snippets.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 12.5, color: 'var(--color-text-primary)' }}>{s.title}</span>
              <LikeButtonView liked={s.liked} count={s.count} onChange={() => toggleSnippet(s.id)} />
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color overrides the default error-red heart tint"
        code={`<LikeButtonView liked count={9} onChange={() => {}} color="var(--color-primary)" />
<LikeButtonView liked count={9} onChange={() => {}} color="#a855f7" />`}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <LikeButtonView liked count={9} onChange={() => {}} color="var(--color-primary)" />
          <LikeButtonView liked count={9} onChange={() => {}} color="#a855f7" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Different Sizes"
        description="size scales the heart icon and count text"
        code={`<LikeButtonView liked count={9} onChange={() => {}} size="sm" />
<LikeButtonView liked count={9} onChange={() => {}} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <LikeButtonView liked count={9} onChange={() => {}} size="sm" />
          <LikeButtonView liked count={9} onChange={() => {}} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Count (edge case)"
        description="Omitting count renders just the heart icon with no number — useful for a compact icon-only toolbar"
        code={`<LikeButtonView liked={false} onChange={() => {}} />`}
      >
        <LikeButtonView liked={false} onChange={() => {}} />
      </ExampleCard>
    </div>
  );
}
