import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function InfoPopupViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Portal-rendered at document.body', color: 'var(--color-primary)' },
          { label: 'Viewport-safe auto-positioning with anchor element', color: 'var(--color-success)' },
          { label: 'Render-then-measure placement (no layout shift)', color: 'var(--color-info)' },
          { label: 'Scroll + resize position tracking', color: 'var(--color-warning)' },
          { label: 'Title section', color: '#a855f7' },
          { label: 'Description text', color: '#ec4899' },
          { label: 'Blue-badge code items with descriptions', color: '#14b8a6' },
          { label: 'Footer italics note', color: '#f97316' },
          { label: 'Optional wiki link with external icon', color: 'var(--color-primary)' },
          { label: 'Outside-click + Escape to close', color: 'var(--color-success)' },
          { label: 'Configurable width', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="InfoPopupView is the standard way to attach help/info content to ? icons in DUI. It opens as a non-modal popup anchored to an element, auto-positions to stay within the viewport, and tracks the anchor on scroll and resize. It is NOT a toast and does NOT open a URL directly — all help content lives in the popup itself."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. When false, the component returns null.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on outside click or Escape key press.' },
          { name: 'title', type: 'string', required: true, description: 'Bold heading shown at the top of the popup.' },
          { name: 'anchorEl', type: 'HTMLElement | null', description: 'The element to anchor the popup to (typically the ? icon button). When not provided, the popup is centered in the viewport.' },
          { name: 'description', type: 'string', description: 'Paragraph text shown in the body below the title.' },
          { name: 'items', type: 'InfoPopupItem[]', description: 'Array of code + description pairs. Each item renders a blue badge chip for the code string and secondary text for the description.' },
          { name: 'footer', type: 'string', description: 'Italicized footer note shown at the bottom of the body section.' },
          { name: 'wikiLabel', type: 'string', default: "'Open Wiki →'", description: 'Label for the wiki link shown at the bottom of the popup.' },
          { name: 'wikiHref', type: 'string', description: 'URL for the wiki link. When not provided, the wiki link section is not rendered.' },
          { name: 'width', type: 'number', default: '320', description: 'Width of the popup in pixels.' },
        ]} />
      </DocSection>

      <DocSection title="InfoPopupItem shape">
        <PropTable props={[
          { name: 'code', type: 'string', required: true, description: 'Short code label rendered as a blue monospace badge chip.' },
          { name: 'description', type: 'string', required: true, description: 'Descriptive text shown beside the badge.' },
        ]} />
      </DocSection>

      <DocNote type="danger">
        Help (?) icons MUST always use InfoPopupView. NEVER trigger a toast or open a URL directly from a ? icon. This is an absolute DUI rule.
      </DocNote>

      <DocNote type="info">
        The popup starts invisible and only becomes visible after the first requestAnimationFrame measures its actual rendered size. This avoids a flash of incorrectly positioned content and ensures viewport-clamped positioning is based on real dimensions.
      </DocNote>

      <DocNote type="tip">
        The popup is z-index 1100, above ModalView instances. Pass the ref of the ? icon button as anchorEl so the popup appears directly below the icon, flipping to above when there is insufficient space below.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="InfoPopupView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          InfoPopupView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
