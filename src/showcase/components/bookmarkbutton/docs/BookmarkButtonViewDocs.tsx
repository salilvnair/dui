import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function BookmarkButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated bookmark/save toggle', color: 'var(--color-primary)' },
          { label: 'Pop animation on save', color: 'var(--color-success)' },
          { label: 'Filled vs outline states', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'aria-pressed + aria-label', color: '#a855f7' },
          { label: 'Icon-only, no count variant', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'saved', type: 'boolean', required: true, description: 'Current bookmarked/saved state.' },
          { name: 'onChange', type: '(saved: boolean) => void', required: true, description: 'Called with the new saved state on click.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls bookmark icon size.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color applied to the icon when saved.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer button element.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Unlike LikeButtonView, BookmarkButtonView has no count prop — it is purely a binary saved/unsaved toggle, appropriate for "save this request" or "favorite this collection" actions rather than social engagement counts.
      </DocNote>

      <DocNote type="info">
        aria-label automatically switches between "Add bookmark" and "Remove bookmark" based on the saved prop, so screen reader users get an accurate action description without any extra configuration.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BookmarkButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on BookmarkButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
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
