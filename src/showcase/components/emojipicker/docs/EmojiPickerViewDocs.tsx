import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function EmojiPickerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Categorized emoji grid (Smileys, Animals, Food…)', color: 'var(--color-primary)' },
          { label: 'Search filters by category name', color: 'var(--color-success)' },
          { label: 'Square trigger showing the selected emoji', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'Portal-rendered menu (escapes overflow)', color: '#a855f7' },
          { label: 'Click-outside to close', color: '#ec4899' },
          { label: 'Scrollable grouped list', color: '#14b8a6' },
          { label: 'Falls back to 🙂 placeholder when unset', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string | null', required: true, description: 'The currently selected emoji character (e.g. "🚀"), or null when nothing is selected.' },
          { name: 'onChange', type: '(emoji: string) => void', required: true, description: 'Called with the emoji character when the user clicks an entry in the grid.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button; the popover cannot be opened.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls trigger height/width, font size, and icon size. Falls back to DuiProvider context when omitted.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset — note the trigger is square (width = height) regardless, so this mainly affects layout allocation.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius of the trigger button — a DuiRadius token or a raw pixel number.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the trigger\'s focus/open border.' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="DuiSize enum">
        <EnumTable name="DuiSize" values={[
          { value: 'xxs', description: 'Smallest trigger size.', color: '#f97316' },
          { value: 'xs', description: 'Extra small.', color: '#ec4899' },
          { value: 'sm', description: 'Small — compact toolbars.', color: 'var(--color-success)' },
          { value: 'md', description: 'Default medium size.', color: 'var(--color-primary)' },
          { value: 'lg', description: 'Large.', color: 'var(--color-info)' },
          { value: 'xl', description: 'Extra large.', color: '#a855f7' },
          { value: 'xxl', description: 'Very large.', color: '#14b8a6' },
          { value: 'xxxl', description: 'Largest preset.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Unlike a typical emoji picker, the search field filters by category name (e.g. "food", "animals") rather than by individual emoji keyword — it's designed for quickly jumping to a themed section, not fuzzy emoji search.
      </DocNote>

      <DocNote type="tip">
        When value is null or doesn't match any entry, the trigger shows a neutral 🙂 placeholder so the control never renders empty.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="EmojiPickerView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on EmojiPickerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useSelectBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'item padY 2px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'item padY 3px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'item padY 4px' },
          { size: 'md', height: '28px', font: '11px', desc: 'item padY 5px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'item padY 7px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'item padY 9px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'item padY 11px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'item padY 14px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
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
          These values come from the Select category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every select-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
