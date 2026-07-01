import { useState } from 'react';
import { YamlKeyChip } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function YamlKeyChipExamples() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  return (
    <div>
      <ExampleCard
        title="Brand Color Keys"
        description="Primary and secondary brand palette keys from the theme YAML"
        code={`<YamlKeyChip yamlKey="brand.primary"   color="var(--color-primary)" />
<YamlKeyChip yamlKey="brand.secondary" color="var(--color-info)" />
<YamlKeyChip yamlKey="brand.accent"    color="var(--color-warning)" />`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <YamlKeyChip yamlKey="brand.primary"   color="var(--color-primary)" />
          <YamlKeyChip yamlKey="brand.secondary" color="var(--color-info)" />
          <YamlKeyChip yamlKey="brand.accent"    color="var(--color-warning)" />
          <YamlKeyChip yamlKey="brand.bg"        color="var(--color-text-muted)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Semantic Keys"
        description="Success, error, warning, and info — semantic color tokens"
        code={`<YamlKeyChip yamlKey="semantic.success" color="var(--color-success)" />
<YamlKeyChip yamlKey="semantic.error"   color="var(--color-error)" />
<YamlKeyChip yamlKey="semantic.warning" color="var(--color-warning)" />
<YamlKeyChip yamlKey="semantic.info"    color="var(--color-info)" />`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <YamlKeyChip yamlKey="semantic.success" color="var(--color-success)" />
          <YamlKeyChip yamlKey="semantic.error"   color="var(--color-error)" />
          <YamlKeyChip yamlKey="semantic.warning" color="var(--color-warning)" />
          <YamlKeyChip yamlKey="semantic.info"    color="var(--color-info)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Component-Specific Keys"
        description="Scoped component keys like button and input color overrides"
        code={`<YamlKeyChip yamlKey="component_button.primary_bg"    color="var(--color-primary)" />
<YamlKeyChip yamlKey="component_button.primary_text"  color="var(--color-primary)" />
<YamlKeyChip yamlKey="component_input.border"         color="var(--color-info)" />
<YamlKeyChip yamlKey="component_input.focus_ring"     color="var(--color-info)" />`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <YamlKeyChip yamlKey="component_button.primary_bg"   color="var(--color-primary)" />
          <YamlKeyChip yamlKey="component_button.primary_text" color="var(--color-primary)" />
          <YamlKeyChip yamlKey="component_input.border"        color="var(--color-info)" />
          <YamlKeyChip yamlKey="component_input.focus_ring"    color="var(--color-info)" />
          <YamlKeyChip yamlKey="component_modal.backdrop"      color="var(--color-text-muted)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Row of Mixed Chips"
        description="A realistic live color customizer row — key chip + color swatch side by side"
        code={`{colorVars.map(({ key, color }) => (
  <div key={key} style={{ display:'flex', alignItems:'center', gap:6 }}>
    <div style={{ width:14, height:14, borderRadius:3, background:color }} />
    <YamlKeyChip yamlKey={key} color={color} />
  </div>
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { key: 'brand.primary',   color: 'var(--color-primary)' },
            { key: 'semantic.success', color: 'var(--color-success)' },
            { key: 'semantic.error',   color: 'var(--color-error)' },
            { key: 'semantic.warning', color: 'var(--color-warning)' },
            { key: 'brand.surface',    color: 'var(--color-surface)' },
          ].map(({ key, color }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: color, border: '1px solid var(--color-surface-border)', flexShrink: 0 }} />
              <YamlKeyChip yamlKey={key} color={color} />
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Clickable Chips — Click to Select"
        description="onClick makes the chip interactive — use to highlight which key is being edited"
        code={`const [active, setActive] = useState<string | null>(null);
<YamlKeyChip
  yamlKey="brand.primary"
  color="var(--color-primary)"
  onClick={() => setActive('brand.primary')}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { key: 'brand.primary',    color: 'var(--color-primary)' },
              { key: 'semantic.success', color: 'var(--color-success)' },
              { key: 'semantic.error',   color: 'var(--color-error)' },
              { key: 'semantic.warning', color: 'var(--color-warning)' },
            ].map(({ key, color }) => (
              <YamlKeyChip
                key={key}
                yamlKey={key}
                color={lastClicked === key ? color : 'var(--color-text-muted)'}
                onClick={() => setLastClicked(key)}
              />
            ))}
          </div>
          {lastClicked && (
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
              Selected: <span style={{ color: 'var(--color-text-primary)', fontFamily: 'monospace' }}>{lastClicked}</span>
            </div>
          )}
        </div>
      </ExampleCard>
    </div>
  );
}
