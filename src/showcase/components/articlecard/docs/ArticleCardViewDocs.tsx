import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function ArticleCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Optional 16:9 cover image', color: 'var(--color-primary)' },
          { label: 'Title + 2-line clamped excerpt + meta', color: 'var(--color-success)' },
          { label: 'Clickable card (renders as button)', color: 'var(--color-info)' },
          { label: 'Custom border radius', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'image', type: 'string', description: 'Optional cover image URL, rendered as a 16:9 background-cover banner.' },
          { name: 'title', type: 'string', required: true, description: 'Article headline.' },
          { name: 'excerpt', type: 'string', description: 'Optional summary text, clamped to 2 lines with an ellipsis overflow.' },
          { name: 'meta', type: 'ReactNode', description: 'Optional trailing meta line, e.g. author, date, or read time.' },
          { name: 'onClick', type: '() => void', description: 'When provided, the card renders as a <button> instead of a <div> and becomes clickable.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size. Falls back to DuiProvider context.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Override the card border radius.' },
          { name: 'color', type: 'string', description: 'Accent color, passed through to the underlying card sizing hook (not visually used for borders/background in the current styling).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        excerpt uses -webkit-line-clamp: 2 for a consistent card height across a grid — very short or very long excerpts both look intentional. meta accepts any ReactNode, so you can pass a small ChipView or icon row instead of plain text.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ArticleCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on ArticleCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
