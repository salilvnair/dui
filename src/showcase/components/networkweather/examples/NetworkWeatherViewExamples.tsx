import { useState, useEffect } from 'react';
import { NetworkWeatherView } from '@/dui';
import type { NetworkWeatherCondition } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function NetworkWeatherViewExamples() {
  const [condition, setCondition] = useState<NetworkWeatherCondition>('stormy');
  const [live, setLive] = useState<NetworkWeatherCondition>('sunny');

  useEffect(() => {
    const sequence: NetworkWeatherCondition[] = ['sunny', 'cloudy', 'stormy', 'cloudy'];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % sequence.length;
      setLive(sequence[i]);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Service Disruption Indicator"
        description="Common default use — stormy weather flags an active incident on a status page"
        code={`<NetworkWeatherView condition="stormy" />`}
      >
        <NetworkWeatherView condition="stormy" />
      </ExampleCard>

      <ExampleCard
        title="Interactive Condition Picker"
        description="Toggle through all three health conditions to compare their visuals"
        code={`const [condition, setCondition] = useState<NetworkWeatherCondition>('stormy');

<NetworkWeatherView condition={condition} />
<select value={condition} onChange={e => setCondition(e.target.value)}>
  <option value="sunny">sunny</option>
  <option value="cloudy">cloudy</option>
  <option value="stormy">stormy</option>
</select>`}
      >
        <NetworkWeatherView condition={condition} />
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {(['sunny', 'cloudy', 'stormy'] as NetworkWeatherCondition[]).map(c => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
                border: `1px solid var(--color-surface-border)`,
                background: condition === c ? 'var(--color-primary)' : 'var(--color-surface)',
                color: condition === c ? '#fff' : 'var(--color-text-primary)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Label"
        description="Override the default status text with something specific to the monitored service"
        code={`<NetworkWeatherView condition="cloudy" label="Payments API — degraded" />`}
      >
        <NetworkWeatherView condition="cloudy" label="Payments API — degraded" />
      </ExampleCard>

      <ExampleCard
        title="Environment Health Dashboard Row"
        description="API-testing domain use case — per-environment health glanceable in a workspace overview"
        code={`<NetworkWeatherView condition="sunny"  label="Production" size="sm" />
<NetworkWeatherView condition="cloudy" label="Staging"    size="sm" />
<NetworkWeatherView condition="stormy" label="QA sandbox" size="sm" />`}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <NetworkWeatherView condition="sunny" label="Production" size="sm" />
          <NetworkWeatherView condition="cloudy" label="Staging" size="sm" />
          <NetworkWeatherView condition="stormy" label="QA sandbox" size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Live Auto-updating Condition"
        description="Edge case — condition cycles automatically, simulating a real-time health feed"
        code={`function Preview() {
  const [live, setLive] = useState<NetworkWeatherCondition>('sunny');
  useEffect(() => {
    const sequence = ['sunny', 'cloudy', 'stormy', 'cloudy'];
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % sequence.length; setLive(sequence[i]); }, 2200);
    return () => clearInterval(id);
  }, []);
  return <NetworkWeatherView condition={live} />;
}`}
      >
        <NetworkWeatherView condition={live} />
      </ExampleCard>
    </div>
  );
}
