import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function BreathingLoaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Ultra-minimal single-circle loader', color: 'var(--color-primary)' },
          { label: 'Slow scale/fade "breathing" rhythm', color: 'var(--color-success)' },
          { label: 'Calmer alternative to a spinner', color: 'var(--color-info)' },
          { label: 'Optional caption label', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DuiProvider size context (diameter via AvatarBase)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', description: 'Optional caption rendered next to the circle.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the circle diameter and label font size via AvatarBase. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Fill color of the breathing circle.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Reach for this instead of a spinner when the wait is expected to be short and non-blocking (e.g. background sync, autosave, waiting on a webhook) — the slow, low-energy animation signals "quietly working" rather than "urgent, please wait," which better matches those contexts. For hard blocking operations with unknown duration, a more active loader may communicate progress better.
      </DocNote>

      <DocNote type="info">
        Sizing is driven by `useAvatarBase`, the same hook `AvatarView` uses — this keeps the loader's diameter visually consistent if you're using it as a placeholder in an avatar slot while user data loads.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BreathingLoaderView reads its dimensions from the shared avatar category base hook (useAvatarBase). Omitting size or color on BreathingLoaderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every avatar-category component at once."
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
