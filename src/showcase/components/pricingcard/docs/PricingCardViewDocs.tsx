import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function PricingCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '"Popular" ribbon', color: 'var(--color-primary)' },
          { label: 'Feature checklist with check icons', color: 'var(--color-success)' },
          { label: 'Custom actions slot', color: 'var(--color-info)' },
          { label: 'Accent color theming', color: 'var(--color-warning)' },
          { label: 'DUI card size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'planName', type: 'string', required: true, description: 'Plan title, shown uppercase above the price.' },
          { name: 'price', type: 'string', required: true, description: 'Price string, rendered large — accepts any format including "$29" or "Custom".' },
          { name: 'period', type: 'string', default: "'/mo'", description: 'Billing period suffix shown next to the price, e.g. "/mo". Pass an empty string to hide it.' },
          { name: 'features', type: 'string[]', required: true, description: 'List of feature strings, each rendered with a check icon.' },
          { name: 'popular', type: 'boolean', default: 'false', description: 'When true, shows a "Popular" ribbon and highlights the border/background with the accent color.' },
          { name: 'actions', type: 'ReactNode', description: 'Optional content (typically a CTA button) rendered below the feature list.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Card padding and font size. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the check icons, popular border, ribbon, and tinted background.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        PricingCardView does not constrain its own width — wrap it in a container with a fixed or max width (as shown in the examples) when laying out a multi-tier comparison row.
      </DocNote>

      <DocNote type="tip">
        Set popular on at most one card in a comparison row; the ribbon and highlighted border are designed to draw attention to a single recommended tier.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PricingCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on PricingCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
