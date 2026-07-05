import { useEffect, useState } from 'react';
import { ProgressBarView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ProgressBarViewExamples() {
  const [downloadPct, setDownloadPct] = useState(20);
  const [bufferPct, setBufferPct] = useState(45);

  useEffect(() => {
    const id = setInterval(() => {
      setDownloadPct(p => (p >= 100 ? 0 : p + 5));
      setBufferPct(b => (b >= 100 ? 30 : b + 3));
    }, 350);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Buffered Fill"
        description="Primary fill plus a secondary lighter buffer fill — e.g. response streaming ahead of render"
        code={`<ProgressBarView value={45} buffer={70} />`}
      >
        <ProgressBarView value={45} buffer={70} />
      </ExampleCard>

      <ExampleCard
        title="Indeterminate (striped, animated)"
        description="Omit value for an animated indeterminate bar — e.g. waiting on a request with unknown duration"
        code={`<ProgressBarView />`}
      >
        <ProgressBarView />
      </ExampleCard>

      <ExampleCard
        title="Collection Run Progress (interactive)"
        description="Simulated test-run progress ticking up, with the response-buffer visualization layered on"
        code={`const [pct, setPct] = useState(20);
const [buffer, setBuffer] = useState(45);
useEffect(() => {
  const id = setInterval(() => {
    setPct(p => (p >= 100 ? 0 : p + 5));
    setBuffer(b => (b >= 100 ? 30 : b + 3));
  }, 350);
  return () => clearInterval(id);
}, []);

<ProgressBarView value={pct} buffer={buffer} color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ProgressBarView value={downloadPct} buffer={bufferPct} color="var(--color-success)" />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Running 'Users API' collection: {downloadPct}%</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Width Variants"
        description="sm / md / lg / fullWidth presets"
        code={`<ProgressBarView value={60} width="sm" />
<ProgressBarView value={60} width="md" />
<ProgressBarView value={60} width="lg" />
<ProgressBarView value={60} width="fullWidth" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ProgressBarView value={60} width="sm" />
          <ProgressBarView value={60} width="md" />
          <ProgressBarView value={60} width="lg" />
          <ProgressBarView value={60} width="fullWidth" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Error State (custom color)"
        description="A failed upload — override color to signal failure, frozen at partial progress"
        code={`<ProgressBarView value={38} color="var(--color-error)" trackColor="var(--color-surface-border)" />`}
      >
        <ProgressBarView value={38} color="var(--color-error)" trackColor="var(--color-surface-border)" />
      </ExampleCard>
    </div>
  );
}
