import { useState } from 'react';
import { ArticleCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ArticleCardViewExamples() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Article Card"
        description="Title, excerpt, and meta line — no image"
        code={`<ArticleCardView
  title="What's new in v2.0"
  excerpt="Faster requests, smarter mocks, and a redesigned collection runner."
  meta="5 min read"
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <ArticleCardView
            title="What's new in v2.0"
            excerpt="Faster requests, smarter mocks, and a redesigned collection runner."
            meta="5 min read"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Cover Image"
        description="An image prop renders a 16:9 cover banner above the text"
        code={`<ArticleCardView
  image="https://picsum.photos/seed/api/480/270"
  title="Designing resilient webhook retries"
  excerpt="A deep dive into exponential backoff, dead-letter queues, and idempotency keys."
  meta="Engineering · 8 min read"
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <ArticleCardView
            image="https://picsum.photos/seed/api/480/270"
            title="Designing resilient webhook retries"
            excerpt="A deep dive into exponential backoff, dead-letter queues, and idempotency keys."
            meta="Engineering · 8 min read"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Clickable (navigates on click)"
        description="Passing onClick renders the card as a button and adds pointer cursor"
        code={`<ArticleCardView
  title="Rate limiting your public API"
  excerpt="Token bucket vs sliding window — which strategy fits your traffic pattern?"
  meta="Guides · 6 min read"
  onClick={() => navigate('/blog/rate-limiting')}
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <ArticleCardView
            title="Rate limiting your public API"
            excerpt="Token bucket vs sliding window — which strategy fits your traffic pattern?"
            meta="Guides · 6 min read"
            onClick={() => setClicked('Rate limiting your public API')}
          />
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Last clicked: {clicked ?? 'none yet'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Blog Listing Grid"
        description="Multiple article cards in a responsive grid — a typical changelog/blog index layout"
        code={`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
  <ArticleCardView title="v2.0 release notes" meta="Jul 1" />
  <ArticleCardView title="New GraphQL playground" meta="Jun 24" />
  <ArticleCardView title="Team workspaces are here" meta="Jun 12" />
</div>`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          <ArticleCardView title="v2.0 release notes" excerpt="Collection runner, mock server v2, and more." meta="Jul 1" />
          <ArticleCardView title="New GraphQL playground" excerpt="Explore schemas and run queries inline." meta="Jun 24" />
          <ArticleCardView title="Team workspaces are here" excerpt="Share environments and collections with your org." meta="Jun 12" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Title Only (no excerpt)"
        description="excerpt and meta are both optional — a bare title still renders cleanly"
        code={`<ArticleCardView title="Draft: upcoming CLI changes" />`}
      >
        <div style={{ maxWidth: 320 }}>
          <ArticleCardView title="Draft: upcoming CLI changes" />
        </div>
      </ExampleCard>
    </div>
  );
}
