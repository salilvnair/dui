import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function PdfViewerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Native browser PDF renderer', color: 'var(--color-primary)' },
          { label: 'Optional page navigation footer', color: 'var(--color-success)' },
          { label: 'Configurable iframe height', color: 'var(--color-info)' },
          { label: 'Zero extra runtime dependency', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'src', type: 'string', required: true, description: "URL to the PDF file, rendered via the browser's native PDF viewer inside an iframe." },
          { name: 'totalPages', type: 'number', description: 'When provided, shows a page-number footer with prev/next controls. The current page is appended to the src as a #page=N fragment.' },
          { name: 'height', type: 'number', default: '480', description: 'Height in pixels of the iframe.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        This wraps the browser's native PDF renderer via an iframe #page= fragment — it does not parse or paginate the PDF itself, so behavior depends on the user's browser PDF plugin. It requires a real, reachable PDF URL (CORS/embeddability permitting) to render anything in production.
      </DocNote>

      <DocNote type="tip">
        Omit totalPages entirely when the page count is unknown (e.g. a freshly uploaded file) — the pagination footer only renders when totalPages !== undefined.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PdfViewerView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          PdfViewerView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
