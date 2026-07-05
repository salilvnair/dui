import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function IntegrationCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Logo + name + description layout', color: 'var(--color-primary)' },
          { label: 'Connect / disconnect toggle button', color: 'var(--color-success)' },
          { label: 'Custom accent color', color: 'var(--color-info)' },
          { label: 'Fully controlled connected state', color: 'var(--color-warning)' },
          { label: 'DuiSize card density', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'logo', type: 'ReactNode', required: true, description: 'Icon or image element rendered inside a rounded square badge.' },
          { name: 'name', type: 'string', required: true, description: 'Integration name, e.g. "Team Chat" or "Version Control".' },
          { name: 'description', type: 'string', description: 'Optional one-line description shown under the name.' },
          { name: 'connected', type: 'boolean', required: true, description: 'Whether the integration is currently connected. Drives the button label and style.' },
          { name: 'onConnect', type: '() => void', required: true, description: 'Called when the Connect button is clicked (shown when connected is false).' },
          { name: 'onDisconnect', type: '() => void', required: true, description: 'Called when the Disconnect button is clicked (shown when connected is true).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls card padding, gap, and font size via the DUI card base.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the Connect button background and border.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Both onConnect and onDisconnect are required, even though only one is used per render — this keeps the component fully controlled with no internal state, so a marketplace grid can flip connected without remounting the card.
      </DocNote>

      <DocNote type="info">
        logo accepts any ReactNode, not just an icon component — an <code>{'<img />'}</code> tag or a colored initials badge works equally well inside the 36x36 logo slot.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="IntegrationCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on IntegrationCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
