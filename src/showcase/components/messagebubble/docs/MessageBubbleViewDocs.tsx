import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function MessageBubbleViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Sent (right, filled) / received (left, neutral)', color: 'var(--color-primary)' },
          { label: 'Optional avatar slot', color: 'var(--color-success)' },
          { label: 'Optional timestamp caption', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Asymmetric corner radius (chat-bubble tail)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'The message content rendered inside the bubble.' },
          { name: 'variant', type: "'sent' | 'received'", required: true, description: "'sent' right-aligns and fills the bubble with the accent color; 'received' left-aligns with a neutral surface background." },
          { name: 'timestamp', type: 'string', description: 'Small caption shown below the bubble (e.g. "10:02 AM").' },
          { name: 'avatar', type: 'ReactNode', description: 'Optional avatar rendered beside the bubble.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding, border-radius, and font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used to fill sent bubbles.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Wrap a list of MessageBubbleView instances in a scrollable flex column and reverse-order them for a typical chat feed. Pair with TypingIndicatorView at the bottom of the list while a reply is being composed.
      </DocNote>

      <DocNote type="info">
        MessageBubbleView uses useCardBase internally for padding/border-radius/font sizing, the same base hook used by other card-shaped components — so it stays visually consistent with ContactCardView and ArticleCardView at the same size.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MessageBubbleView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on MessageBubbleView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
