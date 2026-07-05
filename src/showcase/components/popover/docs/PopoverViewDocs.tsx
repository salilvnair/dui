import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function PopoverViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Anchored to any DOM element', color: 'var(--color-primary)' },
          { label: '4 placements with auto viewport clamping', color: 'var(--color-success)' },
          { label: 'Portaled to document.body', color: 'var(--color-info)' },
          { label: 'Click-outside + Escape to close', color: 'var(--color-warning)' },
          { label: 'Repositions on scroll/resize', color: '#a855f7' },
          { label: 'Powers SelectInputView / InfoPopupView', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Renders null when false.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called on click-outside, Escape key, or whenever consumer logic should dismiss it.' },
          { name: 'anchorEl', type: 'HTMLElement | null', required: true, description: 'The DOM element the popover positions itself relative to. Capture with a ref callback, e.g. <span ref={setAnchor}>.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Popover body content.' },
          { name: 'placement', type: 'PopoverPlacement', default: "'bottom'", description: 'Preferred side relative to the anchor. Falls back to viewport-clamped coordinates if it would overflow.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls internal padding.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius preset or raw px value.' },
          { name: 'color', type: 'string', description: 'Reserved for theming via OverlayBase; not applied to a specific visual element directly.' },
          { name: 'className', type: 'string', description: 'Additional class names on the popover panel.' },
        ]} />
      </DocSection>

      <DocSection title="PopoverPlacement enum">
        <EnumTable name="PopoverPlacement" values={[
          { value: 'top', description: 'Above the anchor.', color: 'var(--color-primary)' },
          { value: 'bottom', description: 'Below the anchor (default).', color: 'var(--color-success)' },
          { value: 'left', description: 'To the left of the anchor.', color: 'var(--color-info)' },
          { value: 'right', description: 'To the right of the anchor.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        PopoverView is the raw positioning primitive shared conceptually with SelectInputView's dropdown and InfoPopupView. Reach for it directly whenever you need fully custom floating content (a menu, a mini-form, a color picker) rather than building your own portal + positioning logic.
      </DocNote>

      <DocNote type="warning">
        anchorEl must be captured via a ref callback (e.g. useState + {'ref={setAnchor}'}), not a useRef whose .current is read once — the popover's effect depends on anchorEl being a stable, re-render-triggering value.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PopoverView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on PopoverView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
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
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Overlay category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every overlay-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
