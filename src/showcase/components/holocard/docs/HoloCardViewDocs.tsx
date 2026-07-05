import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function HoloCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Mouse-position-reactive holographic sheen', color: 'var(--color-primary)' },
          { label: 'Subtle 3D tilt (perspective rotateX/rotateY)', color: 'var(--color-success)' },
          { label: 'color-dodge blend for iridescent look', color: 'var(--color-info)' },
          { label: 'Smooth reset transition on mouse leave', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context (padding/radius)', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Card content — rendered above the holo sheen layer (z-index 1).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls card padding and border-radius via the DUI card size scale.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The tilt and sheen only activate on `onMouseEnter`/`onMouseMove`/`onMouseLeave` — there's no touch equivalent, so on touch devices this renders as a static card with no holo effect. That's an acceptable degradation; don't rely on it as the sole visual cue for anything functionally important.
      </DocNote>

      <DocNote type="info">
        Purely decorative — it has no `onClick` prop. Wrap it in your own clickable container if the card needs to be interactive, or reach for a plain bordered card component when the holo effect isn't warranted (e.g. dense data lists).
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="HoloCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on HoloCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
