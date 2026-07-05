import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function EnvironmentBadgeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '3 preset environments with semantic colors', color: 'var(--color-primary)' },
          { label: 'Optional pulsing live indicator', color: 'var(--color-success)' },
          { label: 'Translucent tinted background', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'env', type: 'EnvironmentKind', required: true, description: 'Which environment preset to render — determines label text and color.' },
          { name: 'live', type: 'boolean', default: 'false', description: 'Show a pulsing "live" dot before the label. Typically used for the currently-active/prod environment.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls badge height and font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the badge.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the badge.' },
        ]} />
      </DocSection>

      <DocSection title="EnvironmentKind enum">
        <EnumTable name="EnvironmentKind" values={[
          { value: 'dev', description: 'Labeled "Development", colored var(--color-info).', color: 'var(--color-info)' },
          { value: 'staging', description: 'Labeled "Staging", colored var(--color-warning).', color: 'var(--color-warning)' },
          { value: 'prod', description: 'Labeled "Production", colored var(--color-error) to draw attention.', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        env is a closed 3-value union (dev/staging/prod) with fixed labels and colors — there is no way to add a custom environment name or override the color per instance. If you need arbitrary named environments, use ChipView directly instead.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="EnvironmentBadgeView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on EnvironmentBadgeView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useChipBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '10px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xs', height: '12px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'sm', height: '16px', font: '9px', desc: 'padX 5px, radius full' },
          { size: 'md', height: '20px', font: '10px', desc: 'padX 7px, radius full' },
          { size: 'lg', height: '24px', font: '11px', desc: 'padX 9px, radius full' },
          { size: 'xl', height: '28px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxl', height: '32px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxxl', height: '38px', font: '12px', desc: 'padX 11px, radius full' },
        ]} />
        <DocNote type="info">
          These values come from the Chip category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every chip-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
