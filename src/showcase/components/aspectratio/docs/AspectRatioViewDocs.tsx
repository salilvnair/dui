import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function AspectRatioViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Fixed aspect-ratio box via CSS aspect-ratio', color: 'var(--color-primary)' },
          { label: 'Any ratio number (width / height)', color: 'var(--color-success)' },
          { label: 'DuiRadius token or raw px border radius', color: 'var(--color-info)' },
          { label: 'Content fills via absolute inset', color: 'var(--color-warning)' },
          { label: 'Overflow clipped for clean image/video crops', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Content to fill the box — typically an img, video, or iframe with width/height: 100%.' },
          { name: 'ratio', type: 'number', default: '16 / 9', description: 'width / height ratio, e.g. 1 for square, 4/3, 21/9.' },
          { name: 'borderRadius', type: 'DuiRadius | number', default: 'size-based token', description: 'A DuiRadius token (none/sm/md/lg/full) or a raw pixel number.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer box.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer box.' },
        ]} />
      </DocSection>

      <DocSection title="DuiRadius enum">
        <EnumTable name="DuiRadius" values={[
          { value: 'none', description: 'No rounding — 0px.', color: 'var(--color-text-muted)' },
          { value: 'sm', description: 'Small rounding.', color: 'var(--color-success)' },
          { value: 'md', description: 'Medium rounding (default token).', color: 'var(--color-primary)' },
          { value: 'lg', description: 'Large rounding.', color: 'var(--color-info)' },
          { value: 'full', description: 'Fully rounded — makes a square box circular.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The child is absolutely positioned with inset: 0, so give it width: 100%; height: 100% (and objectFit: 'cover' for images/video) to fill the box correctly.
      </DocNote>

      <DocNote type="tip">
        Use AspectRatioView as a loading-state placeholder too — render a skeleton or "No preview available" message as the child before the real media is ready, and the box will keep its layout stable, avoiding content jump.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AspectRatioView reads its dimensions from the shared media category base hook (useMediaBase). Omitting size, borderRadius, or color on AspectRatioView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every media-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useMediaBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'aspect ratio 16:9 default' },
          { size: 'xs', height: '—', font: '9px', desc: 'aspect ratio 16:9 default' },
          { size: 'sm', height: '—', font: '10px', desc: 'aspect ratio 16:9 default' },
          { size: 'md', height: '—', font: '11px', desc: 'aspect ratio 16:9 default' },
          { size: 'lg', height: '—', font: '12px', desc: 'aspect ratio 16:9 default' },
          { size: 'xl', height: '—', font: '13px', desc: 'aspect ratio 16:9 default' },
          { size: 'xxl', height: '—', font: '14px', desc: 'aspect ratio 16:9 default' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'aspect ratio 16:9 default' },
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
          These values come from the Media category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every media-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
