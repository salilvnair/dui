import { useEffect, useState } from 'react';
import { SkeletonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SkeletonViewExamples() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Row Skeleton"
        description="Composable avatar + two text lines — the most common list-item loading placeholder"
        code={`<SkeletonView variant="row" />`}
      >
        <SkeletonView variant="row" />
      </ExampleCard>

      <ExampleCard
        title="Collection List Loading (interactive)"
        description="Three stacked row skeletons simulating a request-list load, auto-resolves after 2.5s"
        code={`const [loading, setLoading] = useState(true);
useEffect(() => {
  const id = setTimeout(() => setLoading(false), 2500);
  return () => clearTimeout(id);
}, []);

{loading
  ? Array.from({ length: 3 }, (_, i) => <SkeletonView key={i} variant="row" />)
  : requests.map(r => <RequestRow key={r.id} {...r} />)}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {loading ? (
            Array.from({ length: 3 }, (_, i) => <SkeletonView key={i} variant="row" />)
          ) : (
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              GET /users, POST /users, DELETE /users/:id — loaded.
            </div>
          )}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Text Skeleton (multi-line)"
        description="variant='text' with lines — last line renders shorter to mimic natural paragraph wrap"
        code={`<SkeletonView variant="text" lines={3} />`}
      >
        <SkeletonView variant="text" lines={3} />
      </ExampleCard>

      <ExampleCard
        title="Block and Avatar Primitives"
        description="Composable low-level shapes for building custom loading layouts, e.g. a response-body preview card"
        code={`<SkeletonView variant="avatar" />
<SkeletonView variant="block" height={120} width="100%" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SkeletonView variant="avatar" />
          <SkeletonView variant="block" height={120} width="100%" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Width Text Lines"
        description="Explicit width/height overrides for a JSON-key-like loading effect"
        code={`<SkeletonView variant="text" width={180} height={10} />
<SkeletonView variant="text" width={120} height={10} />
<SkeletonView variant="text" width={220} height={10} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SkeletonView variant="text" width={180} height={10} />
          <SkeletonView variant="text" width={120} height={10} />
          <SkeletonView variant="text" width={220} height={10} />
        </div>
      </ExampleCard>
    </div>
  );
}
