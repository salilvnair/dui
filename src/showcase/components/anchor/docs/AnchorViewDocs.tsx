import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function AnchorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Scroll-spy — auto-highlights the visible section', color: 'var(--color-primary)' },
          { label: 'Click to smooth-scroll to a section', color: 'var(--color-success)' },
          { label: 'DuiProvider size context', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'Configurable scroll offset for fixed headers', color: '#a855f7' },
          { label: 'Left border indicator, no external nav library', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'links', type: 'AnchorLink[]', required: true, description: 'Ordered list of { id, label } targets. id must match a rendered element\'s DOM id (without the #).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls link font size. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the active link\'s text and left border.' },
          { name: 'offset', type: 'number', default: '0', description: 'Extra pixel offset applied both to scroll-spy detection and to the smooth-scroll landing position — use to compensate for a fixed header.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the nav element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the nav element.' },
        ]} />
      </DocSection>

      <DocSection title="AnchorLink shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Target section element id, without the leading #.' },
          { name: 'label', type: 'string', required: true, description: 'Text shown in the nav link.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Scroll-spy walks the links array top to bottom and marks a link active once its target's top edge crosses offset + 8px. Make sure the ids in links correspond to real elements rendered in the same scroll container (window or a scrollable ancestor).
      </DocNote>

      <DocNote type="tip">
        When your layout has a sticky app header, set offset to that header's height so both the highlight and the smooth-scroll destination land below it instead of underneath it.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AnchorView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on AnchorView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
