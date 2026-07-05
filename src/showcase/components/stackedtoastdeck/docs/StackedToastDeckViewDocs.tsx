import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StackedToastDeckViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Card-deck stacking instead of vertical toast list', color: 'var(--color-primary)' },
          { label: 'Click the deck to fan out / re-collapse', color: 'var(--color-success)' },
          { label: 'Older toasts shrink and recede behind newest', color: 'var(--color-info)' },
          { label: 'Per-toast color override', color: 'var(--color-warning)' },
          { label: 'Shows up to 5 most recent toasts', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'toasts', type: 'ToastDeckEntry[]', required: true, description: 'The toast queue, newest first. Only the first 5 entries are rendered.' },
          { name: 'onDismiss', type: '(id: string) => void', required: true, description: 'Called when a toast is dismissed — the top toast dismisses on a single click; when fanned out, any visible toast can be dismissed by clicking it.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls toast padding, border-radius, and font size via OverlayBase.' },
          { name: 'width', type: 'number', default: '280', description: 'Deck width in pixels.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer deck container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer deck container.' },
        ]} />
      </DocSection>

      <DocSection title="ToastDeckEntry shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier, passed back to onDismiss.' },
          { name: 'content', type: 'ReactNode', required: true, description: 'Toast body — any renderable content, not just a string.' },
          { name: 'color', type: 'string', description: 'Optional border accent color for this toast (e.g. severity coding).' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Clicking anywhere on the collapsed deck toggles fan-out; clicking a toast while fanned (or the single top toast while collapsed) dismisses it via `stopPropagation` so it doesn't also toggle the fan state. Deduplicate/dismiss stale toasts from your own `toasts` array on a timer if you want auto-expiring notifications — the component itself has no built-in timeout.
      </DocNote>

      <DocNote type="info">
        Only the 5 most recent toasts are ever rendered (`toasts.slice(0, 5)`); older entries are silently dropped from the visual stack even if still present in your state array, so trim your own array to avoid an ever-growing invisible backlog.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StackedToastDeckView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on StackedToastDeckView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
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
