import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function VideoPlayerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Custom play/pause control', color: 'var(--color-primary)' },
          { label: 'Seek bar with elapsed/duration labels', color: 'var(--color-info)' },
          { label: 'Mute toggle', color: 'var(--color-success)' },
          { label: 'Poster image support', color: 'var(--color-warning)' },
          { label: 'Fixed 16:9 aspect ratio', color: '#a855f7' },
          { label: 'Custom accent color via CSS variable', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'src', type: 'string', required: true, description: 'Video source URL, passed directly to the underlying <video> element.' },
          { name: 'poster', type: 'string', description: 'Poster image URL shown before playback starts.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the seek bar fill, applied via a CSS custom property.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer player container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer player container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The player always renders at a 16:9 aspect ratio derived from container width — wrap it in a width-constrained div (as in the narrow-container example) rather than setting a fixed height directly.
      </DocNote>

      <DocNote type="info">
        Clicking anywhere on the video body toggles play/pause in addition to the dedicated button, matching familiar native video-player ergonomics.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="VideoPlayerView reads its dimensions from the shared media category base hook (useMediaBase). Omitting size, borderRadius, or color on VideoPlayerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every media-category component at once."
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
        <DocNote type="info">
          These values come from the Media category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every media-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
