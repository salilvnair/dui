import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TestimonialCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Quote + author + role layout', color: 'var(--color-primary)' },
          { label: 'Custom or fallback avatar', color: 'var(--color-success)' },
          { label: 'DUI card size context', color: 'var(--color-info)' },
          { label: 'No truncation — wraps naturally', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'quote', type: 'string', required: true, description: 'Testimonial text, auto-wrapped in curly quote marks.' },
          { name: 'author', type: 'string', required: true, description: "Attribution name, rendered bold below the quote." },
          { name: 'role', type: 'string', description: "Author's role/title/company, shown under the name. Omit to show only the name." },
          { name: 'avatar', type: 'ReactNode', description: 'Custom avatar node. Falls back to a plain gray placeholder circle when omitted.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Card padding and font size. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        TestimonialCardView does not constrain its own width or clamp quote length — set a max-width on a wrapping container (as shown in the examples) to keep line length readable, especially for longer quotes.
      </DocNote>

      <DocNote type="tip">
        For a numeric rating alongside or instead of a quote (e.g. an App Store-style review), pair this with RatingBreakdownView rather than embedding stars manually.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TestimonialCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on TestimonialCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
