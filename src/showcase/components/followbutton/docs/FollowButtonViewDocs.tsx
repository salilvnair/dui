import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function FollowButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Follow/Following state toggle', color: 'var(--color-primary)' },
          { label: 'Reveals "Unfollow" on hover', color: 'var(--color-success)' },
          { label: 'Filled vs outlined visual states', color: 'var(--color-info)' },
          { label: 'Fixed min-width to avoid layout shift', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Built on useButtonBase', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'following', type: 'boolean', required: true, description: 'Current following state.' },
          { name: 'onChange', type: '(following: boolean) => void', required: true, description: 'Called with the toggled state on click.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls button height, padding, and font size.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the filled "Follow" state (border + background).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer button element.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The label swaps through three states purely from hover + following: "Follow" (not following), "Following" (following, not hovered), "Unfollow" (following, hovered) — this is the standard GitHub/Twitter follow-button UX pattern.
      </DocNote>

      <DocNote type="info">
        A fixed minWidth of 92px is baked in so the button doesn't visibly resize as the label text changes length between "Follow", "Following", and "Unfollow".
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FollowButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on FollowButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
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
