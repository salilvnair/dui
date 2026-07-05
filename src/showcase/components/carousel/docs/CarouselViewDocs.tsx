import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function CarouselViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Pointer-based swipe/drag navigation', color: 'var(--color-primary)' },
          { label: 'Dot indicators', color: 'var(--color-success)' },
          { label: 'Autoplay with hover-to-pause', color: 'var(--color-info)' },
          { label: 'Configurable autoplay interval', color: 'var(--color-warning)' },
          { label: 'Custom accent color for active dot', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'slides', type: 'ReactNode[]', required: true, description: 'Slide content, one node per slide.' },
          { name: 'autoplay', type: 'boolean', default: 'false', description: 'Automatically advance to the next slide on a timer. Ignored when there is only one slide.' },
          { name: 'autoplayInterval', type: 'number', default: '3500', description: 'Milliseconds between automatic slide advances when autoplay is true.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Fill color of the active dot indicator.' },
          { name: 'height', type: 'number', default: '220', description: 'Height in pixels of the slide track.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Autoplay automatically pauses while the pointer is hovering the carousel and resumes on mouse leave — no extra wiring needed. It's also skipped entirely when slides.length is 1 or fewer.
      </DocNote>

      <DocNote type="tip">
        Swipe threshold is a fixed 50px pointer delta — smaller drags snap back to the current slide. Each slide fills the full track width (100%), so give slide content its own internal padding rather than relying on carousel-level spacing.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CarouselView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          CarouselView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
