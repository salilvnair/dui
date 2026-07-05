import { useState } from 'react';
import { ColorPickerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ColorPickerViewExamples() {
  const [brandColor, setBrandColor] = useState('#6366F1');
  const [tagColor, setTagColor] = useState('#22C55E');
  const [envColor, setEnvColor] = useState('#F97316');
  const [disabledColor] = useState('#64748B');

  return (
    <div>
      <ExampleCard
        title="Default Swatch Grid"
        description="Basic color picker with the built-in 18-color swatch palette"
        code={`const [color, setColor] = useState('#6366F1');

<ColorPickerView value={color} onChange={setColor} />`}
      >
        <ColorPickerView value={brandColor} onChange={setBrandColor} />
      </ExampleCard>

      <ExampleCard
        title="Interactive: Live Preview"
        description="Selected color drives a preview swatch and hex readout elsewhere on the page"
        code={`const [color, setColor] = useState('#22C55E');

<ColorPickerView value={color} onChange={setColor} />
<div style={{ background: color }}>{color}</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ColorPickerView value={tagColor} onChange={setTagColor} />
          <div
            style={{
              width: 120, height: 32, borderRadius: 6,
              background: tagColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, color: '#fff', fontFamily: 'monospace',
            }}
          >
            {tagColor}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg trigger sizes for different UI densities"
        code={`<ColorPickerView value={color} onChange={setColor} size="xs" />
<ColorPickerView value={color} onChange={setColor} size="sm" />
<ColorPickerView value={color} onChange={setColor} size="md" />
<ColorPickerView value={color} onChange={setColor} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <ColorPickerView value={brandColor} onChange={setBrandColor} size="xs" />
          <ColorPickerView value={brandColor} onChange={setBrandColor} size="sm" />
          <ColorPickerView value={brandColor} onChange={setBrandColor} size="md" />
          <ColorPickerView value={brandColor} onChange={setBrandColor} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Badge Color"
        description="Pick the accent color used for an environment badge (e.g. Production, Staging) in an API client's environment switcher"
        code={`const [envColor, setEnvColor] = useState('#F97316');

<ColorPickerView value={envColor} onChange={setEnvColor} width="sm" />
<span style={{ color: envColor }}>Staging</span>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ColorPickerView value={envColor} onChange={setEnvColor} width="sm" />
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
              background: `color-mix(in srgb, ${envColor} 15%, transparent)`,
              color: envColor, border: `1px solid color-mix(in srgb, ${envColor} 35%, transparent)`,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: envColor }} />
            Staging
          </span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked color assignment, e.g. a system-managed collection color that can't be edited"
        code={`<ColorPickerView value="#64748B" onChange={() => {}} disabled />`}
      >
        <ColorPickerView value={disabledColor} onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
