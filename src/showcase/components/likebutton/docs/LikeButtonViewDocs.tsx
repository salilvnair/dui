import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function LikeButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated heart toggle', color: 'var(--color-primary)' },
          { label: 'Pop animation on like', color: 'var(--color-success)' },
          { label: 'Optional visible count', color: 'var(--color-info)' },
          { label: 'Filled vs outline heart states', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'aria-pressed for accessibility', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'liked', type: 'boolean', required: true, description: 'Current liked state.' },
          { name: 'onChange', type: '(liked: boolean) => void', required: true, description: 'Called with the new liked state on click.' },
          { name: 'count', type: 'number', description: 'When provided, renders a count next to the heart icon. Omit for an icon-only button.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls heart icon size and count font size.' },
          { name: 'color', type: 'string', default: 'var(--color-error)', description: 'Accent color applied to the heart when liked.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer button element.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        LikeButtonView does not manage the count for you — like VoteWidgetView, count is a prop you update yourself in onChange. Increment/decrement it alongside the liked boolean to keep them in sync.
      </DocNote>

      <DocNote type="info">
        The pop animation is self-contained (a CSS class toggled internally with a timeout) and only fires when transitioning from unliked to liked, matching the familiar "like burst" feel from social apps.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="LikeButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on LikeButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
        ]} />
        <DocNote type="info">
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
