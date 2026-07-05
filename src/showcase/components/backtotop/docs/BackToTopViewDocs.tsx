import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function BackToTopViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Fixed floating scroll-to-top button', color: 'var(--color-primary)' },
          { label: 'Appears/hides based on scroll threshold', color: 'var(--color-success)' },
          { label: 'Smooth-scroll to top on click', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Renders null (no DOM) when below threshold', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'threshold', type: 'number', default: '240', description: 'Scroll distance (px) from the top of the window before the button fades in.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls button diameter (button height token x1.15) and icon size. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', description: 'Background accent color. Falls back to the DuiProvider default button color, then var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the button.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        threshold is measured against window.scrollY, not a local container's scrollTop. If your scrollable content lives inside a nested container rather than the window, BackToTopView will not detect its scroll position.
      </DocNote>

      <DocNote type="info">
        The button unmounts entirely (returns null) rather than being hidden with CSS when below the threshold — so it never intercepts clicks or shows up in the accessibility tree until it's actually visible.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BackToTopView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on BackToTopView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
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
