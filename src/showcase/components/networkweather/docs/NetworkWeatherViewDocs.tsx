import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function NetworkWeatherViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Literal weather metaphor for health status', color: 'var(--color-primary)' },
          { label: '3 conditions: sunny / cloudy / stormy', color: 'var(--color-success)' },
          { label: 'Animated rain drops and lightning bolt', color: 'var(--color-info)' },
          { label: 'Sensible default labels per condition', color: 'var(--color-warning)' },
          { label: 'Custom label override', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'condition', type: 'NetworkWeatherCondition', required: true, description: 'Which weather state to render.' },
          { name: 'label', type: 'string', description: 'Overrides the default status caption. Defaults to a canned message per condition (e.g. "All systems healthy").' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the caption font size via DisplayBase. The SVG illustration itself is a fixed 96x72.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="NetworkWeatherCondition enum">
        <EnumTable name="NetworkWeatherCondition" values={[
          { value: 'sunny', description: 'All systems healthy — sun with rays.', color: 'var(--color-warning)' },
          { value: 'cloudy', description: 'Elevated error rate — cloud with light drizzle.', color: 'var(--color-text-muted)' },
          { value: 'stormy', description: 'Service disruption — cloud, heavier rain, and a lightning bolt.', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Great as a compact status-page or environment-health widget: pair several instances at `size="sm"` in a row, one per environment or service, instead of a generic colored status dot — it reads at a glance without needing a legend.
      </DocNote>

      <DocNote type="info">
        The SVG canvas is a fixed 96x72 regardless of `size` — only the caption text scales. If you need a larger illustration, wrap the component and apply a CSS `transform: scale(...)` rather than relying on `size`.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="NetworkWeatherView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on NetworkWeatherView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
