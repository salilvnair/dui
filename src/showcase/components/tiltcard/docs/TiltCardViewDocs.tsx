import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TiltCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '3D perspective tilt on hover', color: 'var(--color-primary)' },
          { label: 'Configurable max tilt angle', color: 'var(--color-success)' },
          { label: 'Snaps back flat on mouse leave', color: 'var(--color-info)' },
          { label: 'DuiProvider size context (padding/radius)', color: 'var(--color-warning)' },
          { label: 'Arbitrary children', color: '#a855f7' },
          { label: 'Physics-based micro-interaction', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Card content.' },
          { name: 'maxTilt', type: 'number', default: '10', description: 'Maximum tilt angle in degrees. The card rotates up to roughly 2x this value based on cursor position within its bounds.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls internal padding and border-radius. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the card.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        transform-style: preserve-3d is set on the card, so nested children with their own 3D transforms (e.g. layered badges) will inherit real depth. For flat content this has no visible effect beyond the tilt itself.
      </DocNote>

      <DocNote type="info">
        Unlike GlowBorderView, TiltCardView has no built-in border or background glow — it composes cleanly with your own surface styling (background, border) via style or className, making it a good wrapper around existing card-like content rather than a full themed card component.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TiltCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on TiltCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
