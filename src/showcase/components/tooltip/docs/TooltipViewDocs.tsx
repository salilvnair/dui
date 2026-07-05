import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TooltipViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Hover + focus/blur triggers', color: 'var(--color-primary)' },
          { label: '4 placements, auto viewport clamping', color: 'var(--color-success)' },
          { label: 'Configurable show delay', color: 'var(--color-info)' },
          { label: 'Portaled to document.body', color: 'var(--color-warning)' },
          { label: 'Disableable', color: '#a855f7' },
          { label: 'Preserves the child\'s own event handlers', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'content', type: 'ReactNode', required: true, description: 'Tooltip body content. Tooltip does not render at all if content is falsy.' },
          { name: 'children', type: 'ReactElement', required: true, description: 'Trigger element — must forward its ref to a real DOM node. Native elements work directly; wrap non-forwarding DUI components in a <span>.' },
          { name: 'placement', type: 'TooltipPlacement', default: "'top'", description: 'Preferred side relative to the trigger, viewport-clamped if it would overflow.' },
          { name: 'delay', type: 'number', default: '300', description: 'Milliseconds of hover/focus before the tooltip appears.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls tooltip font size.' },
          { name: 'color', type: 'string', description: 'Reserved for theming via OverlayBase.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Suppresses the tooltip entirely — hover/focus handlers still attach but never open it.' },
        ]} />
      </DocSection>

      <DocSection title="TooltipPlacement enum">
        <EnumTable name="TooltipPlacement" values={[
          { value: 'top', description: 'Above the trigger (default).', color: 'var(--color-primary)' },
          { value: 'bottom', description: 'Below the trigger.', color: 'var(--color-success)' },
          { value: 'left', description: 'To the left of the trigger.', color: 'var(--color-info)' },
          { value: 'right', description: 'To the right of the trigger.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        children must be a single ReactElement that forwards its ref to a DOM node — DUI components that don't forward refs (most button/input wrappers) need to be wrapped in a plain &lt;span&gt; as the direct child, e.g. {'<TooltipView content="..."><span><ButtonView>Save</ButtonView></span></TooltipView>'}.
      </DocNote>

      <DocNote type="tip">
        For click-triggered floating content (menus, forms, pickers) rather than hover hints, use PopoverView instead — TooltipView is purpose-built for short, non-interactive hover/focus text.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TooltipView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on TooltipView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
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
