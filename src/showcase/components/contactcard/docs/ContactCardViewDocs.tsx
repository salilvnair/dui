import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function ContactCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Avatar + name + role layout', color: 'var(--color-primary)' },
          { label: 'Auto-generated tinted avatar placeholder', color: 'var(--color-success)' },
          { label: 'Row of clickable contact-icon actions', color: 'var(--color-info)' },
          { label: 'Custom border radius', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'name', type: 'string', required: true, description: 'Contact name, shown as the primary bold heading.' },
          { name: 'role', type: 'string', description: 'Optional secondary line, e.g. job title.' },
          { name: 'avatar', type: 'ReactNode', description: 'Optional avatar node. Falls back to a plain tinted circle derived from the accent color.' },
          { name: 'contacts', type: '{ icon: ReactNode; label: string; onClick?: () => void }[]', default: '[]', description: 'Row of circular icon buttons below the name/role, e.g. email, profile link, message.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size. Falls back to DuiProvider context.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Override the card border radius.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the default avatar placeholder tint.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        contacts entries don't require an onClick — omit it for a purely informational icon (e.g. a verified badge) and the button renders with a default cursor instead of pointer.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ContactCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on ContactCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
