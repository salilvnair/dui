import { LiveColorCustomizer } from '@/dui';
import type { LiveColorVar } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const BRAND_VARS: LiveColorVar[] = [
  { cssVar: '--color-primary', yamlKey: 'brand.primary', label: 'Primary' },
];

const SEMANTIC_VARS: LiveColorVar[] = [
  { cssVar: '--color-success', yamlKey: 'semantic.success', label: 'Success' },
  { cssVar: '--color-error',   yamlKey: 'semantic.error',   label: 'Error' },
  { cssVar: '--color-warning', yamlKey: 'semantic.warning', label: 'Warning' },
  { cssVar: '--color-info',    yamlKey: 'semantic.info',    label: 'Info' },
];

const FULL_PALETTE: LiveColorVar[] = [
  { cssVar: '--color-primary',            yamlKey: 'brand.primary',               label: 'Primary' },
  { cssVar: '--color-success',            yamlKey: 'semantic.success',             label: 'Success' },
  { cssVar: '--color-error',              yamlKey: 'semantic.error',               label: 'Error' },
  { cssVar: '--color-warning',            yamlKey: 'semantic.warning',             label: 'Warning' },
  { cssVar: '--color-info',               yamlKey: 'semantic.info',                label: 'Info' },
  { cssVar: '--color-protocol-rest',      yamlKey: 'protocol.rest',                label: 'REST' },
  { cssVar: '--color-protocol-graphql',   yamlKey: 'protocol.graphql',             label: 'GraphQL' },
  { cssVar: '--color-protocol-websocket', yamlKey: 'protocol.websocket',           label: 'WebSocket' },
];

export function LiveColorCustomizerExamples() {
  return (
    <div>
      <ExampleCard
        title="Single Color Variable Editor"
        description="Edit a single CSS variable — brand.primary — with a color picker and YAML key label"
        code={`<LiveColorCustomizer
  vars={[{ cssVar: '--color-primary', yamlKey: 'brand.primary', label: 'Primary' }]}
  title="Brand Color"
  forceOpen
/>`}
      >
        <LiveColorCustomizer
          vars={BRAND_VARS}
          title="Brand Color"
          forceOpen
        />
      </ExampleCard>

      <ExampleCard
        title="Semantic Color Group"
        description="Edit all four semantic colors (success/error/warning/info) in one panel"
        code={`<LiveColorCustomizer
  vars={[
    { cssVar: '--color-success', yamlKey: 'semantic.success', label: 'Success' },
    { cssVar: '--color-error',   yamlKey: 'semantic.error',   label: 'Error' },
    { cssVar: '--color-warning', yamlKey: 'semantic.warning', label: 'Warning' },
    { cssVar: '--color-info',    yamlKey: 'semantic.info',    label: 'Info' },
  ]}
  title="Semantic Colors"
  forceOpen
/>`}
      >
        <LiveColorCustomizer
          vars={SEMANTIC_VARS}
          title="Semantic Colors"
          forceOpen
        />
      </ExampleCard>

      <ExampleCard
        title="Full Palette — Brand + Semantic + Protocol"
        description="All major color groups in one customizer — changes apply live to the page"
        code={`<LiveColorCustomizer
  vars={fullPalette}
  title="Full Color Palette"
  forceOpen
/>`}
      >
        <LiveColorCustomizer
          vars={FULL_PALETTE}
          title="Full Color Palette"
          forceOpen
        />
      </ExampleCard>

      <ExampleCard
        title="Scoped to a Container (onVarChange)"
        description="Changes are scoped via onVarChange — does NOT modify the global document root"
        code={`<LiveColorCustomizer
  vars={brandVars}
  title="Preview Scoped Colors"
  forceOpen
  onVarChange={(cssVar, value) => {
    if (value) containerRef.current?.style.setProperty(cssVar, value);
    else        containerRef.current?.style.removeProperty(cssVar);
  }}
/>`}
      >
        <div>
          <div style={{ marginBottom: 8, padding: '8px 10px', borderRadius: 6, border: '1px dashed var(--color-surface-border)', fontSize: 11, color: 'var(--color-text-muted)' }}>
            Changes via <code style={{ fontFamily: 'monospace' }}>onVarChange</code> are applied to a scoped container, not the global <code style={{ fontFamily: 'monospace' }}>document.documentElement</code>.
          </div>
          <LiveColorCustomizer
            vars={BRAND_VARS}
            title="Preview Scoped Colors"
            forceOpen
            onVarChange={() => {
              // scoped — intentionally no-op in showcase
            }}
          />
        </div>
      </ExampleCard>
    </div>
  );
}
