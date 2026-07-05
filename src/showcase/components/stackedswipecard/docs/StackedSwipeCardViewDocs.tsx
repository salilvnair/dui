import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StackedSwipeCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Drag-to-swipe gesture', color: 'var(--color-primary)' },
          { label: 'Generic <T> item type via renderItem', color: 'var(--color-success)' },
          { label: 'Left/right swipe direction reported', color: 'var(--color-info)' },
          { label: 'Depth-scaled card stack (up to 3 visible)', color: 'var(--color-warning)' },
          { label: 'Fade-out proportional to drag distance', color: '#a855f7' },
          { label: 'Configurable card dimensions', color: '#ec4899' },
          { label: 'DuiProvider size context (padding/radius)', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'T[]', required: true, description: 'The queue of items to review. Only the front item is draggable; up to 3 are rendered in the stack for depth.' },
          { name: 'renderItem', type: '(item: T) => ReactNode', required: true, description: 'Renders the content of each card.' },
          { name: 'onSwipe', type: '(item: T, direction: "left" | "right") => void', required: true, description: 'Fires when the top card is dragged past 30% of the card width. The component does not remove the item itself — the parent must update `items`.' },
          { name: 'width', type: 'number', default: '280', description: 'Card width in pixels. Also determines the swipe-commit threshold (30% of width).' },
          { name: 'height', type: 'number', default: '180', description: 'Card height in pixels.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls card padding and border-radius via the DUI card size scale.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer stack container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer stack container.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        `StackedSwipeCardView` is a generic component (parameterized over item type `T`) and does not mutate `items` internally — after `onSwipe` fires you're responsible for filtering the swiped item out of the array you pass back in yourself (typically by filtering out anything strictly equal to the swiped item). If you don't, the same top card keeps re-appearing.
      </DocNote>

      <DocNote type="tip">
        Only the top card (index 0) is draggable and registers `onMouseDown`; cards behind it are purely decorative depth layers. Passing an empty `items` array renders an empty container with no placeholder — pair it with your own empty-state message.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StackedSwipeCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on StackedSwipeCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
