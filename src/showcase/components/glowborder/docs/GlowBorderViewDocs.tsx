import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function GlowBorderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated gradient glowing border', color: 'var(--color-primary)' },
          { label: 'Custom 2-color gradient', color: 'var(--color-success)' },
          { label: 'DuiProvider size context (padding/radius)', color: 'var(--color-info)' },
          { label: 'Arbitrary children', color: 'var(--color-warning)' },
          { label: 'CSS custom-property driven (no JS animation)', color: '#a855f7' },
          { label: 'Physics-based micro-interaction', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Card content wrapped by the glowing border.' },
          { name: 'colors', type: '[string, string]', default: "['var(--color-primary)', 'var(--color-success)']", description: 'Two-stop gradient colors for the animated border, exposed as CSS custom properties --dui-glow-c1 / --dui-glow-c2.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls internal padding and corner radius. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Reserve GlowBorderView for one or two attention-grabbing surfaces per screen (an AI suggestion, a recommended plan). Applying it broadly (e.g. to every card in a list) dilutes the "this is special" signal and adds visual noise.
      </DocNote>

      <DocNote type="info">
        The glow animation is driven purely by CSS custom properties and keyframes in GlowBorderView.css, not JavaScript — so it keeps animating smoothly even under heavy main-thread work elsewhere on the page.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="GlowBorderView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on GlowBorderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
