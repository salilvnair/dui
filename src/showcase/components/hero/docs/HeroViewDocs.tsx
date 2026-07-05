import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function HeroViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Size-driven min-height (8 presets)', color: 'var(--color-primary)' },
          { label: 'Gradient / solid color background', color: 'var(--color-success)' },
          { label: 'Image URL auto-detection', color: 'var(--color-info)' },
          { label: 'Centered title / subtitle / actions layout', color: 'var(--color-warning)' },
          { label: 'Auto white text on image/gradient backgrounds', color: '#a855f7' },
          { label: 'Custom border radius', color: '#ec4899' },
          { label: 'DuiProvider size & color context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'ReactNode', required: true, description: 'Main headline, rendered large and bold.' },
          { name: 'subtitle', type: 'ReactNode', description: 'Supporting copy under the title, capped at 480px width and slightly reduced opacity.' },
          { name: 'actions', type: 'ReactNode', description: 'CTA buttons or other controls rendered below the subtitle.' },
          { name: 'background', type: 'string', description: 'CSS gradient/color string, or an image URL (auto-detected when it starts with "http" or "/") rendered as center/cover.' },
          { name: 'size', type: 'DuiSize', default: '\'md\'', description: 'Drives min-height (80px at xxs up to 520px at xxxl) and scales font size / padding / gap.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Named radius preset or raw pixel value for the outer container corners.' },
          { name: 'color', type: 'string', description: 'Text color override. When background is set and color is omitted, text defaults to white for contrast.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        When no background is set, HeroView falls back to var(--color-surface) with theme-aware text color — safe to drop into any panel without extra styling.
      </DocNote>

      <DocNote type="tip">
        Use small sizes (xxs/xs/sm) for inline empty-state or notification banners inside a workspace, and larger sizes (lg/xl/xxl) for full landing or onboarding sections.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="HeroView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on HeroView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useLayoutBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'pad 32px' },
          { size: 'xs', height: '—', font: '9px', desc: 'pad 32px' },
          { size: 'sm', height: '—', font: '10px', desc: 'pad 12px' },
          { size: 'md', height: '—', font: '11px', desc: 'pad 16px' },
          { size: 'lg', height: '—', font: '12px', desc: 'pad 24px' },
          { size: 'xl', height: '—', font: '13px', desc: 'pad 32px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'pad 32px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'pad 32px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
