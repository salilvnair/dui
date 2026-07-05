import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function NavbarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Brand + link menu + right-side actions', color: 'var(--color-primary)' },
          { label: 'Per-link active state and click handler', color: 'var(--color-success)' },
          { label: 'Burger menu collapse on narrow widths', color: 'var(--color-info)' },
          { label: 'Custom accent color for active link', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Fixed 52px bar height with bottom border', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'brand', type: 'ReactNode', required: true, description: 'Brand/logo content shown on the left, rendered bold.' },
          { name: 'links', type: 'NavbarLink[]', default: '[]', description: 'Navigation links rendered in the center/main menu area, and mirrored in the collapsed burger menu on narrow widths.' },
          { name: 'right', type: 'ReactNode', description: 'Content rendered on the far right, before the burger toggle (e.g. auth actions, environment switcher).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size, gap between links, and horizontal padding. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', description: 'Accent color for the active link text. Falls back to var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="NavbarLink shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique link identifier, used as the React key.' },
          { name: 'label', type: 'string', required: true, description: 'Link display text.' },
          { name: 'active', type: 'boolean', description: 'Highlights the link with the accent color and bold weight when true.' },
          { name: 'onClick', type: '() => void', description: 'Click handler for the link.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The burger toggle and its collapsed menu are styled via the .dui_navbar__burger and .dui_navbar__links classes in NavbarView.css, which apply a media query to switch between inline links and a collapsed menu below a configured breakpoint.
      </DocNote>

      <DocNote type="tip">
        Pass a fragment to right for multiple controls (e.g. an environment chip group plus a sign-in button) — they render before the burger toggle and remain visible even when the link menu collapses.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="NavbarView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on NavbarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useLayoutBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'pad 32px' },
          { size: 'xs', height: '—', font: '9px', desc: 'pad 32px' },
          { size: 'sm', height: '—', font: '10px', desc: 'pad 12px' },
          { size: 'md', height: '—', font: '11px', desc: 'pad 16px' },
          { size: 'lg', height: '—', font: '12px', desc: 'pad 24px' },
          { size: 'xl', height: '—', font: '13px', desc: 'pad 32px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'pad 32px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'pad 32px' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
