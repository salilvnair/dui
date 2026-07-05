import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function BottomSheetViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Drag handle to dismiss', color: 'var(--color-primary)' },
          { label: 'Fling/flick threshold dismissal', color: 'var(--color-success)' },
          { label: 'Backdrop click to close', color: 'var(--color-info)' },
          { label: 'Configurable height ratio', color: 'var(--color-warning)' },
          { label: 'Optional titled header', color: '#a855f7' },
          { label: 'Portaled to document.body', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Renders null when false.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on backdrop click or after a drag-dismiss gesture completes.' },
          { name: 'title', type: 'string', description: 'Optional header text shown below the drag handle.' },
          { name: 'children', type: 'ReactNode', description: 'Sheet body content, scrollable if it overflows.' },
          { name: 'heightRatio', type: 'number', default: '0.6', description: 'Sheet height as a fraction of viewport height, e.g. 0.5 for half-screen, 0.85 for near-fullscreen.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls header padding and font size.' },
          { name: 'className', type: 'string', description: 'Additional class names on the sheet panel.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The drag handle uses pointer events with a 30% sheet-height threshold — drag past 30% of the sheet's own height (not the viewport) and release to dismiss; otherwise it springs back to fully open.
      </DocNote>

      <DocNote type="warning">
        This is distinct from BottomPanelView: BottomSheetView is a transient, backdrop-modal overlay meant for mobile-style pickers/forms, while BottomPanelView is a persistent, resizable docked panel (like a devtools console) that coexists with the rest of the UI rather than covering it.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BottomSheetView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on BottomSheetView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
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
