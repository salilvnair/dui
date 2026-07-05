import { useState, useEffect } from 'react';
import { AudioWaveformView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AudioWaveformViewExamples() {
  const [progress, setProgress] = useState(0.4);
  const [liveProgress, setLiveProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLiveProgress(p => (p >= 1 ? 0 : p + 0.02)), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Static Waveform"
        description="Deterministic placeholder pattern with partial playback progress"
        code={`<AudioWaveformView progress={0.4} animated />`}
      >
        <AudioWaveformView progress={0.4} animated />
      </ExampleCard>

      <ExampleCard
        title="Interactive — Scrubbable Progress"
        description="Drag the slider to move the played/unplayed boundary, like scrubbing an audio clip"
        code={`const [progress, setProgress] = useState(0.4);

<input type="range" min={0} max={1} step={0.01} value={progress} onChange={e => setProgress(Number(e.target.value))} />
<AudioWaveformView progress={progress} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input type="range" min={0} max={1} step={0.01} value={progress} onChange={e => setProgress(Number(e.target.value))} style={{ width: '100%' }} />
          <AudioWaveformView progress={progress} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Live Recording Indicator"
        description="animated + auto-incrementing progress simulates a live recording or streaming voice note"
        code={`const [progress, setProgress] = useState(0);

useEffect(() => {
  const id = setInterval(() => setProgress(p => p >= 1 ? 0 : p + 0.02), 200);
  return () => clearInterval(id);
}, []);

<AudioWaveformView progress={progress} animated color="var(--color-error)" />`}
      >
        <AudioWaveformView progress={liveProgress} animated color="var(--color-error)" />
      </ExampleCard>

      <ExampleCard
        title="Custom Samples & Color"
        description="Pass real amplitude samples (e.g. decoded from an audio API response) instead of the placeholder pattern"
        code={`const samples = [0.2, 0.6, 0.9, 0.4, 0.7, 0.3, 0.8, 0.5, 0.2, 0.6, 0.9, 0.4];

<AudioWaveformView samples={samples} progress={0.5} color="var(--color-protocol-mqtt)" height={32} />`}
      >
        <AudioWaveformView
          samples={[0.2, 0.6, 0.9, 0.4, 0.7, 0.3, 0.8, 0.5, 0.2, 0.6, 0.9, 0.4, 0.3, 0.7, 0.5, 0.8]}
          progress={0.5}
          color="var(--color-protocol-mqtt)"
          height={32}
        />
      </ExampleCard>

      <ExampleCard
        title="Voice Note Attachment (API Testing Context)"
        description="Embedded inside a compact message-style row, e.g. a voice note left on a team comment thread"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
  <button aria-label="Play">▶</button>
  <AudioWaveformView progress={0.3} height={24} style={{ flex: 1 }} />
  <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>0:18</span>
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid var(--color-surface-border)', borderRadius: 8, maxWidth: 320 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>▶</span>
          <AudioWaveformView progress={0.3} height={24} style={{ flex: 1 }} />
          <span style={{ fontSize: 10, color: 'var(--color-text-muted)', flexShrink: 0 }}>0:18</span>
        </div>
      </ExampleCard>
    </div>
  );
}
