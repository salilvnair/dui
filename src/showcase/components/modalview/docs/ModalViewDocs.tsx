import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, VariantRow } from '../../../shared/DocComponents';

export function ModalViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Portal to document.body (popout mode)', color: 'var(--color-primary)' },
          { label: 'Inline mode (bare card, no portal)', color: 'var(--color-success)' },
          { label: 'Auto-stacking z-index via module-level counter', color: 'var(--color-info)' },
          { label: 'Header: title + subtitle + icon + right slot', color: 'var(--color-warning)' },
          { label: 'Tinted header color with optional gradient', color: '#a855f7' },
          { label: 'Footer: footerLeft + footerRight slots', color: '#ec4899' },
          { label: '4 sizes (sm → xl)', color: '#14b8a6' },
          { label: 'Elevated card background variant', color: '#f97316' },
          { label: 'No-padding body mode (full-bleed editors)', color: 'var(--color-primary)' },
          { label: 'Escape key closes modal', color: 'var(--color-success)' },
          { label: 'Backdrop click intentionally NOT closing', color: 'var(--color-info)' },
          { label: 'Backdrop blur filter', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Modes">
        <VariantRow variants={[
          { label: 'popout', description: 'Default. Portalled to document.body with a blurred backdrop. Centered overlay.', color: 'var(--color-primary)' },
          { label: 'inline', description: 'Bare card with no backdrop and no portal. Parent controls positioning.', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. When false, the component returns null (nothing is rendered).' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called when Escape is pressed. Never called on backdrop click (by design).' },
          { name: 'title', type: 'string', description: 'Title text in the header bar.' },
          { name: 'subtitle', type: 'string', description: 'Secondary descriptive text shown below the title in the header.' },
          { name: 'headerIcon', type: 'ReactNode', description: 'Node rendered to the left of the title block — typically a colored icon circle.' },
          { name: 'children', type: 'ReactNode', description: 'Body content rendered inside the scrollable body area.' },
          { name: 'footerLeft', type: 'ReactNode', description: 'Content rendered in the left side of the footer bar.' },
          { name: 'footerRight', type: 'ReactNode', description: 'Content rendered in the right side of the footer bar.' },
          { name: 'size', type: 'ModalSize', default: "'md'", description: 'Maximum width of the modal card. See size reference below.' },
          { name: 'showCloseIcon', type: 'boolean', default: 'true', description: 'When true, renders an X close button in the header right area.' },
          { name: 'headerColor', type: 'string', description: 'Optional CSS color for a tinted header background (e.g. var(--color-protocol-rest)).' },
          { name: 'headerGradient', type: 'boolean', default: 'false', description: 'When true, renders the header as a left→right gradient (accent tint → surface) instead of a flat tint.' },
          { name: 'headerRight', type: 'ReactNode', description: 'Optional node rendered in the header right area, before the X button.' },
          { name: 'noPadding', type: 'boolean', default: 'false', description: 'Removes body padding for full-bleed editor modals.' },
          { name: 'elevated', type: 'boolean', default: 'false', description: 'Uses var(--color-elevated) instead of var(--color-surface) for the card background.' },
          { name: 'className', type: 'string', description: 'Additional class names (reserved for future use; currently not applied to any element).' },
          { name: 'mode', type: 'ModalMode', default: "'popout'", description: "popout = portal + backdrop + centered. inline = bare card, no portal, no backdrop." },
        ]} />
      </DocSection>

      <DocSection title="ModalSize enum">
        <EnumTable name="ModalSize" values={[
          { value: 'sm', description: 'max-width: 420px', color: 'var(--color-success)' },
          { value: 'md', description: 'max-width: 560px (default)', color: 'var(--color-primary)' },
          { value: 'lg', description: 'max-width: 720px', color: 'var(--color-info)' },
          { value: 'xl', description: 'max-width: 920px', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="ModalMode enum">
        <EnumTable name="ModalMode" values={[
          { value: 'popout', description: 'Portal + backdrop + centered overlay (default)', color: 'var(--color-primary)' },
          { value: 'inline', description: 'Bare card, no portal, no backdrop', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="danger">
        Backdrop click intentionally does NOT close the modal — by design. This prevents accidental dismissal of forms. The only way to close is via the X icon, Escape key, or a footer action button that calls onClose.
      </DocNote>

      <DocNote type="info">
        Each ModalView instance receives a unique, ever-growing z-index from the module-level _mountLayer counter (base 1000 + layer * 50). This guarantees later-opened modals always stack above earlier ones, regardless of DOM order. No manual z-index management needed.
      </DocNote>

      <DocNote type="tip">
        Use footerLeft for secondary actions (e.g. a Reset button) and footerRight for primary actions (e.g. Save, Generate). The footer is only rendered when at least one of footerLeft or footerRight is provided.
      </DocNote>
    </div>
  );
}
