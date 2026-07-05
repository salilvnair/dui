import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ShareSheetViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Copy-link field with clipboard write', color: 'var(--color-primary)' },
          { label: 'Optional row of share targets', color: 'var(--color-success)' },
          { label: 'Copy confirmation icon swap', color: 'var(--color-info)' },
          { label: 'onCopy callback for analytics', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'url', type: 'string', required: true, description: 'The URL displayed (truncated) in the copy field and written to the clipboard.' },
          { name: 'targets', type: 'ShareTarget[]', default: '[]', description: 'Optional row of share destinations rendered above the copy field. Omit or pass [] to show only the copy-link row.' },
          { name: 'onCopy', type: '() => void', description: 'Called after a successful clipboard write (in addition to the built-in 1.5s checkmark confirmation).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font sizes. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for target icon circles and the copy button.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper (default width is fixed at 300px).' },
        ]} />
      </DocSection>

      <DocSection title="ShareTarget shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique key for the target.' },
          { name: 'label', type: 'string', required: true, description: 'Text shown under the icon circle.' },
          { name: 'icon', type: 'ReactNode', required: true, description: 'Icon rendered inside the circular button.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Called when the target is clicked.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        Copying uses navigator.clipboard.writeText, which silently fails (caught and ignored) in insecure contexts or browsers without Clipboard API support — the checkmark confirmation still shows even if the write failed, so pair onCopy with your own toast if you need guaranteed feedback.
      </DocNote>

      <DocNote type="tip">
        The outer container has a fixed width of 300px by default (overridable via style) — designed to sit inside a popover or dropdown menu rather than span a full page width.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ShareSheetView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on ShareSheetView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
