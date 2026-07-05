import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ActionSheetViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Bottom sheet action list', color: 'var(--color-primary)' },
          { label: 'Destructive (danger) item styling', color: 'var(--color-success)' },
          { label: 'Optional per-item icon', color: 'var(--color-info)' },
          { label: 'Per-item disabled state', color: 'var(--color-warning)' },
          { label: 'Optional title header', color: '#a855f7' },
          { label: 'Separate cancel row, custom label', color: '#ec4899' },
          { label: 'Auto-closes after any item click', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Renders null when false.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on backdrop click, cancel click, or automatically after any item is clicked.' },
          { name: 'items', type: 'ActionSheetItem[]', required: true, description: 'The list of actions to render.' },
          { name: 'title', type: 'string', description: 'Optional header label above the action group.' },
          { name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Text for the separate cancel row at the bottom.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size.' },
          { name: 'className', type: 'string', description: 'Additional class names on the sheet panel.' },
        ]} />
      </DocSection>

      <DocSection title="ActionSheetItem shape">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Action text.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Called when clicked; the sheet then auto-closes via onClose.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional leading icon.' },
          { name: 'danger', type: 'boolean', description: 'Styles the label in var(--color-error) for destructive actions like Delete.' },
          { name: 'disabled', type: 'boolean', description: 'Disables the row, blocking clicks.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Every item click automatically triggers onClose after firing onClick — you don't need to call setOpen(false) yourself inside each handler.
      </DocNote>

      <DocNote type="info">
        For a non-modal, always-anchored menu (e.g. a small dropdown attached to a button rather than a full-width bottom sheet), consider DropDownButtonView or PopoverView instead — ActionSheetView is specifically the mobile-pattern, viewport-wide variant.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ActionSheetView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on ActionSheetView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useOverlayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '15px', desc: 'padX 24px, radius 4px' },
          { size: 'xs', height: '—', font: '15px', desc: 'padX 24px, radius 5px' },
          { size: 'sm', height: '—', font: '12px', desc: 'padX 12px, radius 6px' },
          { size: 'md', height: '—', font: '13px', desc: 'padX 16px, radius 8px' },
          { size: 'lg', height: '—', font: '14px', desc: 'padX 20px, radius 10px' },
          { size: 'xl', height: '—', font: '15px', desc: 'padX 24px, radius 12px' },
          { size: 'xxl', height: '—', font: '15px', desc: 'padX 24px, radius 14px' },
          { size: 'xxxl', height: '—', font: '15px', desc: 'padX 24px, radius 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Overlay category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every overlay-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
