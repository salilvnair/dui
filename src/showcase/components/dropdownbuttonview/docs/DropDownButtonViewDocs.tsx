import { DocSection, PropTable, FeatureGrid, DocNote, EnumTable, SizeReference } from '../../../shared/DocComponents';

export function DropDownButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Split button: primary action + dropdown chevron', color: 'var(--color-primary)' },
          { label: '4 variants (primary, secondary, ghost, danger)', color: 'var(--color-success)' },
          { label: 'Optional left icon', color: 'var(--color-info)' },
          { label: 'ContextMenuView-backed dropdown', color: 'var(--color-warning)' },
          { label: 'Dropdown alignment (auto, left, right)', color: '#a855f7' },
          { label: 'Rounded or square corners', color: '#ec4899' },
          { label: 'DUI token-based sizing', color: '#14b8a6' },
          { label: 'Disabled state', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="DropDownButtonView renders a split-button pattern: a clickable label section on the left and a chevron toggle on the right. The left side fires onPrimaryClick. The right side opens a ContextMenuView dropdown with the provided items. A vertical divider separates the two sections."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Text shown in the primary (left) button section.' },
          { name: 'items', type: 'ContextMenuItem[]', required: true, description: 'Menu items for the dropdown. Passed directly to ContextMenuView.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered to the left of the label in the primary section.' },
          { name: 'variant', type: 'ButtonVariant', default: "'secondary'", description: 'Visual variant. primary = accent filled. secondary = surface + border. ghost = transparent. danger = red filled.' },
          { name: 'size', type: 'ButtonSize', default: "'default'", description: "Falls back to DuiProvider context size. 'default' resolves to the context default." },
          { name: 'rounded', type: 'boolean', default: 'true', description: 'true = token border-radius on the outer wrapper and dropdown. false = 0px square.' },
          { name: 'accentColor', type: 'string', description: 'Override the accent color for the primary variant background.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both the primary button and the chevron. Reduces opacity to 50%.' },
          { name: 'onPrimaryClick', type: '() => void', description: 'Called when the user clicks the label/icon section (not the chevron).' },
          { name: 'align', type: "'auto' | 'left' | 'right'", default: "'auto'", description: "Dropdown alignment relative to the button. 'right' keeps the menu right-edge aligned with the button (opens leftward)." },
          { name: 'className', type: 'string', description: 'Additional class names for the outer wrapper div.' },
        ]} />
      </DocSection>

      <DocSection title="ButtonVariant enum">
        <EnumTable name="ButtonVariant" values={[
          { value: 'primary', description: 'Filled accent background', color: 'var(--color-primary)' },
          { value: 'secondary', description: 'Surface + border (default)', color: 'var(--color-info)' },
          { value: 'ghost', description: 'No background', color: 'var(--color-text-muted)' },
          { value: 'danger', description: 'Red filled', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The dropdown uses ContextMenuView internally with matchAnchorWidth=false and width="md" by default. For full control over menu items (icons, shortcuts, danger styling, submenus), use the ContextMenuItem shape documented in ContextMenuViewDocs.
      </DocNote>

      <DocNote type="tip">
        The divider between label and chevron automatically adapts its color to match the variant: white at 25% opacity for primary/danger, and var(--color-surface-border) for secondary/ghost.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DropDownButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on DropDownButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
        ]} />
        <DocNote type="info">
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
