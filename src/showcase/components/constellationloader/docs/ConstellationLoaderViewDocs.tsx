import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ConstellationLoaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Node-link constellation visual', color: 'var(--color-primary)' },
          { label: 'Deterministic seeded point layout', color: 'var(--color-success)' },
          { label: 'Auto-connects nearby points with faint edges', color: 'var(--color-info)' },
          { label: 'Configurable star count', color: 'var(--color-warning)' },
          { label: 'Custom color and canvas size', color: '#a855f7' },
          { label: 'Twinkling dot animation', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'count', type: 'number', default: '7', description: 'Number of stars (points) rendered. Higher counts produce a denser web of connecting lines.' },
          { name: 'size', type: 'DuiSize', description: 'Passed through to DisplayBase for context/color resolution; does not affect the SVG canvas dimensions directly.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Color used for both the stars and the connecting edge lines (edges rendered at 35% opacity).' },
          { name: 'width', type: 'number', default: '100', description: 'SVG canvas width in pixels.' },
          { name: 'height', type: 'number', default: '60', description: 'SVG canvas height in pixels.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the SVG element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the SVG element.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Point positions are generated from a seeded pseudo-random function keyed off `count`, `width`, and `height` — the same props always produce the same layout, so the loader won't visually "jump" between re-renders as long as those props stay stable.
      </DocNote>

      <DocNote type="info">
        Edges are only drawn between points closer than 45% of `max(width, height)`. If your points look sparse or disconnected, increase `count` or shrink the canvas rather than trying to tune the connection distance — it isn't exposed as a prop.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ConstellationLoaderView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on ConstellationLoaderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
