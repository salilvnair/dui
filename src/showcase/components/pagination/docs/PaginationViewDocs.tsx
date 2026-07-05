import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function PaginationViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Ellipsis collapse for long ranges', color: 'var(--color-primary)' },
          { label: 'Configurable sibling count', color: 'var(--color-success)' },
          { label: 'Prev / Next with disabled edge states', color: 'var(--color-info)' },
          { label: 'DuiSize-driven density', color: 'var(--color-warning)' },
          { label: 'Custom accent color for active page', color: '#a855f7' },
          { label: 'Controlled — page state owned by parent', color: '#ec4899' },
          { label: 'DuiProvider context fallback', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'page', type: 'number', required: true, description: 'Current active page (1-indexed). Fully controlled — the component never mutates it internally.' },
          { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages in the range.' },
          { name: 'onChange', type: '(page: number) => void', required: true, description: 'Called with the newly selected page number when a page button, or prev/next, is clicked.' },
          { name: 'siblingCount', type: 'number', default: '1', description: 'Number of sibling pages shown on each side of the current page before collapsing into an ellipsis.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls button size, font size, and icon size. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', description: 'Accent color (CSS variable or raw value) used for the active page button background. Falls back to var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer <nav> element.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The range algorithm always keeps the first and last page visible, plus siblingCount pages around the current page, collapsing everything else into a single "…" — so the control stays a fixed width even across hundreds of pages.
      </DocNote>

      <DocNote type="tip">
        Use a small siblingCount (0-1) in dense toolbars like a request history panel, and increase it to 2 when the pagination row has room to breathe, such as a full-width results table in a collection runner.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PaginationView reads its dimensions from the shared nav category base hook (useNavBase). Omitting size, borderRadius, or color on PaginationView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every nav-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useNavBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '20px', font: '8px', desc: 'padX 16px' },
          { size: 'xs', height: '24px', font: '9px', desc: 'padX 16px' },
          { size: 'sm', height: '28px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '32px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '44px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '52px', font: '14px', desc: 'padX 16px' },
          { size: 'xxxl', height: '60px', font: '16px', desc: 'padX 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Nav category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every nav-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
