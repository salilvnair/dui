import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function RevealOnScrollViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'IntersectionObserver-based scroll trigger', color: 'var(--color-primary)' },
          { label: '5 entrance directions', color: 'var(--color-success)' },
          { label: 'Configurable duration & delay', color: 'var(--color-info)' },
          { label: 'One-shot or repeating', color: 'var(--color-warning)' },
          { label: 'Stagger-friendly via per-item delay', color: '#a855f7' },
          { label: 'Scroll-triggered entrance animation', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Content to reveal.' },
          { name: 'direction', type: "'up' | 'down' | 'left' | 'right' | 'fade'", default: "'up'", description: 'Entrance direction. fade has no translation, only opacity.' },
          { name: 'duration', type: 'number', default: '500', description: 'Transition duration in milliseconds for both opacity and transform.' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay in milliseconds before the transition starts, once triggered. Use a per-index value to stagger a list.' },
          { name: 'repeat', type: 'boolean', default: 'false', description: 'When true, resets to hidden every time the element leaves the viewport and re-reveals on re-entry, instead of revealing only once.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="direction enum">
        <EnumTable name="direction" values={[
          { value: 'up', description: 'Slides up 24px while fading in.', color: 'var(--color-primary)' },
          { value: 'down', description: 'Slides down 24px while fading in.', color: 'var(--color-success)' },
          { value: 'left', description: 'Slides in from the right (translateX 24px) while fading in.', color: 'var(--color-info)' },
          { value: 'right', description: 'Slides in from the left (translateX -24px) while fading in.', color: 'var(--color-warning)' },
          { value: 'fade', description: 'Opacity only, no translation.', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Threshold is fixed at 0.15 (15% of the element visible triggers reveal) and is not currently configurable via props — wrap in a custom IntersectionObserver if you need a different trigger point.
      </DocNote>

      <DocNote type="tip">
        In the showcase preview pane content is often already in view on mount, so the reveal may appear to fire immediately — the effect is most visible in a real scrolling page layout. Use repeat during development to re-trigger it by scrolling the element in and out of view.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RevealOnScrollView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          RevealOnScrollView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
