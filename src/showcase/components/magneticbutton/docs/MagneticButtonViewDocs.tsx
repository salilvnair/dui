import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function MagneticButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Cursor-attraction hover effect', color: 'var(--color-primary)' },
          { label: 'Configurable pull strength', color: 'var(--color-success)' },
          { label: 'Snaps back on mouse leave', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Physics-based micro-interaction', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Button label / content.' },
          { name: 'onClick', type: '() => void', description: 'Click handler.' },
          { name: 'strength', type: 'number', default: '12', description: 'Maximum pull distance in pixels. The button translates up to roughly 2x this value toward the cursor as it approaches the edges.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls height, padding, and font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Background/accent color. Text is always white.' },
          { name: 'className', type: 'string', description: 'Additional class names on the button.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the button.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Because the magnetic pull tracks raw mouse position relative to the button's bounding box, this component works best as a standalone CTA with generous surrounding whitespace — cramming several magnetic buttons close together makes the pull feel erratic as the cursor crosses between them.
      </DocNote>

      <DocNote type="warning">
        This is a purely decorative interaction wrapper, not a full ButtonView replacement — it doesn't support variants, loading states, icons, or disabled styling. For standard app buttons, prefer ButtonView and reserve MagneticButtonView for marketing/landing surfaces.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MagneticButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on MagneticButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
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
