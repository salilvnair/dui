import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DrawerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Slide-in from any edge', color: 'var(--color-primary)' },
          { label: 'Backdrop with click-to-close', color: 'var(--color-success)' },
          { label: 'Escape key to close', color: 'var(--color-info)' },
          { label: 'Optional titled header', color: 'var(--color-warning)' },
          { label: 'Numeric or CSS-unit sizing', color: '#a855f7' },
          { label: 'Portaled to document.body', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Renders null when false.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on backdrop click or Escape key press.' },
          { name: 'edge', type: 'DrawerEdge', default: "'right'", description: 'Which viewport edge the panel slides in from.' },
          { name: 'title', type: 'string', description: 'Optional header text with a close button. Omit for a bare content panel.' },
          { name: 'children', type: 'ReactNode', description: 'Drawer body content, scrollable if it overflows.' },
          { name: 'size', type: 'number | string', default: '320', description: 'Width (left/right edges) or height (top/bottom edges). Numbers are treated as px; strings pass through as-is (e.g. "40vw").' },
          { name: 'duiSize', type: 'DuiSize', default: 'context', description: 'Controls header padding and font sizes (named duiSize to avoid clashing with the size prop above).' },
          { name: 'className', type: 'string', description: 'Additional class names on the sliding panel.' },
        ]} />
      </DocSection>

      <DocSection title="DrawerEdge enum">
        <EnumTable name="DrawerEdge" values={[
          { value: 'left', description: 'Slides in from the left — common for navigation/collections.', color: 'var(--color-primary)' },
          { value: 'right', description: 'Slides in from the right (default) — common for detail/settings panels.', color: 'var(--color-success)' },
          { value: 'top', description: 'Slides down from the top.', color: 'var(--color-info)' },
          { value: 'bottom', description: 'Slides up from the bottom — common for console/log panels.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Note the size prop controls physical dimensions (width or height depending on edge) while duiSize controls the DUI typography/spacing scale — they're intentionally separate props so you can have a compact-density drawer that's still visually wide, or vice versa.
      </DocNote>

      <DocNote type="info">
        For a persistent, resizable side panel that stays docked rather than overlaying content with a backdrop, use BottomPanelView or a custom ResizablePanelView layout instead — DrawerView is specifically for transient overlay panels.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DrawerView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on DrawerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
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
