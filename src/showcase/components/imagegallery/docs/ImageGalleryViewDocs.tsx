import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ImageGalleryViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Responsive grid layout', color: 'var(--color-primary)' },
          { label: 'Click-to-open lightbox', color: 'var(--color-info)' },
          { label: 'Prev/next keyboard + button navigation', color: 'var(--color-success)' },
          { label: 'Escape to close', color: 'var(--color-warning)' },
          { label: 'Portal-rendered overlay', color: '#a855f7' },
          { label: 'DuiSize-driven thumbnail radius', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'images', type: 'GalleryImage[]', required: true, description: 'List of { src, alt? } entries rendered as square thumbnails.' },
          { name: 'columns', type: 'number', default: '3', description: 'Number of grid columns for the thumbnail layout.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls thumbnail border radius via the DUI media base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer grid.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer grid.' },
        ]} />
      </DocSection>

      <DocSection title="GalleryImage shape">
        <PropTable props={[
          { name: 'src', type: 'string', required: true, description: 'Image URL.' },
          { name: 'alt', type: 'string', description: 'Alt text, also used as the thumbnail button aria-label when provided.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Keyboard navigation (Escape, ArrowLeft, ArrowRight) is wired globally while the lightbox is open — no need to focus the gallery first. It automatically detaches the listener on close.
      </DocNote>

      <DocNote type="info">
        Prev/next controls only render when images.length is greater than 1, so a single-image gallery degrades gracefully to a simple click-to-zoom viewer.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ImageGalleryView reads its dimensions from the shared media category base hook (useMediaBase). Omitting size, borderRadius, or color on ImageGalleryView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every media-category component at once."
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
