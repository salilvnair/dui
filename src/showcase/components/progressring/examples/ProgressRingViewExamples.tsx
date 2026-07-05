import { useEffect, useState } from 'react';
import { ProgressRingView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ProgressRingViewExamples() {
  const [uploadPct, setUploadPct] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setUploadPct(p => (p >= 100 ? 0 : Math.min(100, p + 8)));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Determinate Progress"
        description="A fixed percentage value with the label shown"
        code={`<ProgressRingView value={70} />`}
      >
        <ProgressRingView value={70} />
      </ExampleCard>

      <ExampleCard
        title="Indeterminate (loading)"
        description="Omit value entirely for a spinning, unbounded ring"
        code={`<ProgressRingView />  {/* indeterminate */}`}
      >
        <ProgressRingView />
      </ExampleCard>

      <ExampleCard
        title="File Upload Progress (interactive)"
        description="Simulated collection import progress ticking up over time"
        code={`const [pct, setPct] = useState(0);
useEffect(() => {
  const id = setInterval(() => setPct(p => (p >= 100 ? 0 : p + 8)), 400);
  return () => clearInterval(id);
}, []);

<ProgressRingView value={pct} color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ProgressRingView value={uploadPct} color="var(--color-success)" />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Importing postman_collection.json…</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="xs / sm / md / lg / xl ring diameters"
        code={`<ProgressRingView value={60} size="xs" />
<ProgressRingView value={60} size="sm" />
<ProgressRingView value={60} size="md" />
<ProgressRingView value={60} size="lg" />
<ProgressRingView value={60} size="xl" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ProgressRingView value={60} size="xs" />
          <ProgressRingView value={60} size="sm" />
          <ProgressRingView value={60} size="md" />
          <ProgressRingView value={60} size="lg" />
          <ProgressRingView value={60} size="xl" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Label + Custom Track Color"
        description="showLabel={false} for a bare ring; trackColor tints the unfilled portion"
        code={`<ProgressRingView value={45} showLabel={false} color="var(--color-warning)" trackColor="var(--color-surface-border)" />`}
      >
        <ProgressRingView value={45} showLabel={false} color="var(--color-warning)" trackColor="var(--color-surface-border)" />
      </ExampleCard>
    </div>
  );
}
