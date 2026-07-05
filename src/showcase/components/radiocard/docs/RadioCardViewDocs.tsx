import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function RadioCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Card-style single-select radio group', color: 'var(--color-primary)' },
          { label: 'Optional leading icon per option', color: 'var(--color-success)' },
          { label: 'Optional description text per option', color: 'var(--color-info)' },
          { label: 'Configurable grid columns', color: 'var(--color-warning)' },
          { label: 'Per-option disabled state', color: '#a855f7' },
          { label: 'Custom accent color', color: '#ec4899' },
          { label: 'DuiSize + DuiRadius token support', color: '#14b8a6' },
          { label: 'Selected check indicator', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'RadioCardOption[]', required: true, description: 'Array of selectable cards: { value, label, description?, icon?, disabled? }.' },
          { name: 'value', type: 'string', required: true, description: 'The currently selected option value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the newly selected option value when a card is clicked.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding, gap, and font size via the shared card sizing base. Falls back to DuiProvider context.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius for each card — a DuiRadius token or an explicit pixel number.' },
          { name: 'accentColor', type: 'string', default: "base.color ?? 'var(--color-primary)'", description: 'Color used for the selected border, tinted background, label text, and check icon.' },
          { name: 'columns', type: 'number', default: '1', description: 'Number of columns in the CSS grid. Default 1 renders a single stacked column of rows.' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer grid container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer grid container.' },
        ]} />
      </DocSection>

      <DocSection title="RadioCardOption shape">
        <EnumTable name="RadioCardOption" values={[
          { value: 'value', description: 'Unique string identifying this option (required).', color: 'var(--color-primary)' },
          { value: 'label', description: 'Bold title text for the card (required).', color: 'var(--color-success)' },
          { value: 'description', description: 'Optional muted helper text under the label.', color: 'var(--color-info)' },
          { value: 'icon', description: 'Optional ReactNode rendered before the text block.', color: '#a855f7' },
          { value: 'disabled', description: 'When true, the card is dimmed and unclickable.', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        RadioCardView is a controlled component — value and onChange are both required. There is no internal selection state, so the parent must update value in the onChange handler.
      </DocNote>

      <DocNote type="tip">
        Use columns to build a plan-picker or auth-method grid (e.g. columns={'{3}'}). For long lists with descriptions, keep columns at 1 so text has room to wrap.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RadioCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on RadioCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
