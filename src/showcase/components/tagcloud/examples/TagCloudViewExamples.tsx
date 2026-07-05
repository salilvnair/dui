import { useState } from 'react';
import { TagCloudView, type TagCloudEntry } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TagCloudViewExamples() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const protocolTags: TagCloudEntry[] = [
    { label: 'rest', weight: 42 },
    { label: 'graphql', weight: 24 },
    { label: 'websocket', weight: 11 },
    { label: 'grpc', weight: 8 },
    { label: 'soap', weight: 3 },
    { label: 'mqtt', weight: 5 },
    { label: 'sse', weight: 6 },
  ];

  const clickableTags: TagCloudEntry[] = [
    { label: 'auth', weight: 30, onClick: () => setLastClicked('auth') },
    { label: 'pagination', weight: 22, onClick: () => setLastClicked('pagination') },
    { label: 'rate-limiting', weight: 18, onClick: () => setLastClicked('rate-limiting') },
    { label: 'caching', weight: 14, onClick: () => setLastClicked('caching') },
    { label: 'webhooks', weight: 10, onClick: () => setLastClicked('webhooks') },
    { label: 'retries', weight: 7, onClick: () => setLastClicked('retries') },
  ];

  return (
    <div>
      <ExampleCard
        title="Basic Weighted Cloud"
        description="Font size scales with each tag's relative weight"
        code={`<TagCloudView tags={[{ label: 'rest', weight: 40 }, { label: 'graphql', weight: 20 }]} />`}
      >
        <TagCloudView tags={[{ label: 'rest', weight: 40 }, { label: 'graphql', weight: 20 }]} />
      </ExampleCard>

      <ExampleCard
        title="Clickable Topic Tags (interactive)"
        description="Each tag has an onClick — click one to see it reflected below, e.g. filtering docs by topic"
        code={`const [lastClicked, setLastClicked] = useState<string | null>(null);

<TagCloudView
  tags={[
    { label: 'auth', weight: 30, onClick: () => setLastClicked('auth') },
    { label: 'pagination', weight: 22, onClick: () => setLastClicked('pagination') },
  ]}
/>`}
      >
        <TagCloudView tags={clickableTags} color="var(--color-info)" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Last clicked: {lastClicked ?? 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Protocol Usage Cloud"
        description="Domain-realistic use — visualizing which protocols dominate a workspace's API collections"
        code={`<TagCloudView
  tags={[
    { label: 'rest', weight: 42 },
    { label: 'graphql', weight: 24 },
    { label: 'websocket', weight: 11 },
    { label: 'grpc', weight: 8 },
    { label: 'mqtt', weight: 5 },
    { label: 'sse', weight: 6 },
    { label: 'soap', weight: 3 },
  ]}
  color="var(--color-primary)"
/>`}
      >
        <TagCloudView tags={protocolTags} />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color drives every tag's text color; opacity still varies with weight"
        code={`<TagCloudView tags={tags} color="var(--color-success)" />
<TagCloudView tags={tags} color="var(--color-error)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TagCloudView tags={protocolTags.slice(0, 4)} color="var(--color-success)" />
          <TagCloudView tags={protocolTags.slice(0, 4)} color="var(--color-error)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Tag / Empty States"
        description="Edge cases — a single-item cloud renders at max size; an empty array renders nothing"
        code={`<TagCloudView tags={[{ label: 'rest', weight: 10 }]} />
<TagCloudView tags={[]} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TagCloudView tags={[{ label: 'rest', weight: 10 }]} />
          <TagCloudView tags={[]} />
        </div>
      </ExampleCard>
    </div>
  );
}
