import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function AlertDialogViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Pre-built confirm/cancel pattern', color: 'var(--color-primary)' },
          { label: 'Danger styling with warning icon', color: 'var(--color-error)' },
          { label: 'Escape key cancels', color: 'var(--color-info)' },
          { label: 'Backdrop click cancels', color: 'var(--color-warning)' },
          { label: 'Custom confirm/cancel labels', color: '#a855f7' },
          { label: 'Portal-rendered above app content', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls dialog visibility. Renders null when false.' },
          { name: 'title', type: 'string', required: true, description: 'Dialog heading.' },
          { name: 'message', type: 'string', required: true, description: 'Body text explaining the consequence of the action.' },
          { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Text on the confirm button.' },
          { name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Text on the cancel button.' },
          { name: 'danger', type: 'boolean', default: 'false', description: 'When true, shows a warning icon and colors the confirm button with var(--color-error) instead of var(--color-primary).' },
          { name: 'onConfirm', type: '() => void', required: true, description: 'Called when the confirm button is clicked.' },
          { name: 'onCancel', type: '() => void', required: true, description: 'Called when the cancel button, backdrop, or Escape key is used to dismiss.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font sizes. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the dialog card.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Use danger for irreversible or destructive actions (delete, discard, revoke) and leave it false for neutral confirmations (log out, switch environment) so the confirm button stays the primary accent color instead of red.
      </DocNote>

      <DocNote type="warning">
        AlertDialogView always renders via a portal to document.body when open, and does not manage its own open state — the parent must set open to false inside both onConfirm and onCancel, otherwise the dialog will stay open after confirming.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AlertDialogView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on AlertDialogView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
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
