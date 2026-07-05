import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function PulseDotViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Continuous pulsing ring animation', color: 'var(--color-primary)' },
          { label: 'Solid center dot', color: 'var(--color-success)' },
          { label: 'DuiProvider size context (dot diameter)', color: 'var(--color-info)' },
          { label: 'Custom color', color: 'var(--color-warning)' },
          { label: 'Absolutely-positionable badge use', color: '#a855f7' },
          { label: 'Complements StatusIndicatorView', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the dot diameter, derived from useAvatarBase. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-error)', description: 'Color of both the pulsing ring and the solid center dot.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Defaults to var(--color-error), making it a "something needs attention" indicator out of the box (e.g. unread notifications, failing checks). Override color to var(--color-success) for a positive "live/active" signal instead.
      </DocNote>

      <DocNote type="tip">
        For a dot that also needs to communicate discrete states (online/away/offline) rather than just draw attention, use StatusIndicatorView instead — PulseDotView is purely an attention-grabbing animation primitive with a single color, not a state enum.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PulseDotView reads its dimensions from the shared avatar category base hook (useAvatarBase). Omitting size or color on PulseDotView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every avatar-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useAvatarBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'dot 6px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'dot 7px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'dot 8px' },
          { size: 'md', height: '32px', font: '11px', desc: 'dot 10px' },
          { size: 'lg', height: '40px', font: '12px', desc: 'dot 12px' },
          { size: 'xl', height: '48px', font: '13px', desc: 'dot 14px' },
          { size: 'xxl', height: '56px', font: '14px', desc: 'dot 16px' },
          { size: 'xxxl', height: '72px', font: '16px', desc: 'dot 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Avatar category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every avatar-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
