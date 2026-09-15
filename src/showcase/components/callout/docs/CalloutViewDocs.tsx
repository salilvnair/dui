import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function CalloutViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'info · tip · warning · danger', color: 'var(--color-primary)' },
          { label: 'Tinted ground and a matching icon per variant', color: 'var(--color-success)' },
          { label: 'Title and body, not just a line of text', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The block that interrupts a page to say something the reader needs before they carry on. Distinct from BannerView, which sits at the top of a screen and is usually dismissible, and from ToastView, which arrives and leaves."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'The heading. A callout with no title is a paragraph with a border.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'The body.' },
          { name: 'variant', type: "'info' | 'warning' | 'tip' | 'danger'", default: "'info'", description: 'Tint and icon.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
