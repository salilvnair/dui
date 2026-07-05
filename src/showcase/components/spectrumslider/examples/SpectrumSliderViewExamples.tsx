import { useState } from 'react';
import { SpectrumSliderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SpectrumSliderViewExamples() {
  const [value, setValue] = useState(50);
  const [hue, setHue] = useState(220);
  const [latency, setLatency] = useState(120);

  return (
    <div>
      <ExampleCard
        title="Default Gradient Slider"
        description="Common default use — the track itself is a live rendered rainbow spectrum"
        code={`const [value, setValue] = useState(50);

<SpectrumSliderView value={value} onChange={setValue} />`}
      >
        <SpectrumSliderView value={value} onChange={setValue} />
        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Value: <strong style={{ color: 'var(--color-text-primary)' }}>{value}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Hue Picker with Live Preview"
        description="Interactive — a custom hue gradient drives an actual color swatch as you drag"
        code={`const [hue, setHue] = useState(220);

<SpectrumSliderView
  value={hue}
  onChange={setHue}
  min={0}
  max={360}
  gradient="linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red)"
/>
<div style={{ width: 24, height: 24, borderRadius: 6, background: \`hsl(\${hue}, 90%, 55%)\` }} />`}
      >
        <SpectrumSliderView
          value={hue}
          onChange={setHue}
          min={0}
          max={360}
          gradient="linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red)"
        />
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `hsl(${hue}, 90%, 55%)`, border: '1px solid var(--color-surface-border)' }} />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>hsl({hue}, 90%, 55%)</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Width"
        description="Narrow slider for a compact sidebar control"
        code={`<SpectrumSliderView value={70} onChange={() => {}} width={160} />`}
      >
        <SpectrumSliderView value={70} onChange={() => {}} width={160} />
      </ExampleCard>

      <ExampleCard
        title="Mock Latency Severity Slider"
        description="API-testing domain use case — a severity-style gradient (green to red) for setting simulated network latency in a mock server"
        code={`const [latency, setLatency] = useState(120);

<SpectrumSliderView
  value={latency}
  onChange={setLatency}
  min={0}
  max={1000}
  gradient="linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444)"
/>`}
      >
        <SpectrumSliderView
          value={latency}
          onChange={setLatency}
          min={0}
          max={1000}
          gradient="linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444)"
        />
        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Simulated latency: <strong style={{ color: 'var(--color-text-primary)' }}>{latency}ms</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Edge Case: Min Equals Value (0%)"
        description="Handle boundary dragging correctly at the very start of the track"
        code={`<SpectrumSliderView value={0} onChange={() => {}} min={0} max={100} />`}
      >
        <SpectrumSliderView value={0} onChange={() => {}} min={0} max={100} />
      </ExampleCard>
    </div>
  );
}
