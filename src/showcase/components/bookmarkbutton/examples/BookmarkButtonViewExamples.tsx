import { useState } from 'react';
import { BookmarkButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface Request {
  id: string;
  method: string;
  path: string;
  saved: boolean;
}

export function BookmarkButtonViewExamples() {
  const [saved, setSaved] = useState(false);

  const [requests, setRequests] = useState<Request[]>([
    { id: 'r1', method: 'GET', path: '/api/v1/users/:id', saved: true },
    { id: 'r2', method: 'POST', path: '/api/v1/orders', saved: false },
    { id: 'r3', method: 'DELETE', path: '/api/v1/sessions/:id', saved: false },
  ]);

  const toggleRequest = (id: string) =>
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, saved: !r.saved } : r)));

  return (
    <div>
      <ExampleCard
        title="Basic Bookmark Toggle"
        description="Pop animation on save"
        code={`const [saved, setSaved] = useState(false);

<BookmarkButtonView saved={saved} onChange={setSaved} />`}
      >
        <BookmarkButtonView saved={saved} onChange={setSaved} />
      </ExampleCard>

      <ExampleCard
        title="Saved Requests List (interactive)"
        description="Bookmark individual requests in a history list — click the icon to add/remove from favorites"
        code={`const [requests, setRequests] = useState([
  { id: 'r1', method: 'GET', path: '/api/v1/users/:id', saved: true },
]);

<BookmarkButtonView
  saved={req.saved}
  onChange={() => toggleRequest(req.id)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {requests.map(r => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BookmarkButtonView saved={r.saved} onChange={() => toggleRequest(r.id)} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', width: 50 }}>{r.method}</span>
              <span style={{ fontSize: 12.5, color: 'var(--color-text-primary)' }}>{r.path}</span>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color overrides the default primary tint when saved"
        code={`<BookmarkButtonView saved onChange={() => {}} color="var(--color-warning)" />
<BookmarkButtonView saved onChange={() => {}} color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <BookmarkButtonView saved onChange={() => {}} color="var(--color-warning)" />
          <BookmarkButtonView saved onChange={() => {}} color="var(--color-success)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Different Sizes"
        description="size scales the bookmark icon"
        code={`<BookmarkButtonView saved onChange={() => {}} size="sm" />
<BookmarkButtonView saved onChange={() => {}} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <BookmarkButtonView saved onChange={() => {}} size="sm" />
          <BookmarkButtonView saved onChange={() => {}} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Unsaved State (edge case)"
        description="Default outline state before anything has been bookmarked"
        code={`<BookmarkButtonView saved={false} onChange={() => {}} />`}
      >
        <BookmarkButtonView saved={false} onChange={() => {}} />
      </ExampleCard>
    </div>
  );
}
