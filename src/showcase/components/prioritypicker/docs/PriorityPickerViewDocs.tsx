import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function PriorityPickerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '4 priority levels', color: 'var(--color-primary)' },
          { label: 'Color-coded dot indicators', color: 'var(--color-success)' },
          { label: 'Pill-button priority selector', color: 'var(--color-info)' },
          { label: 'Single-select, controlled', color: 'var(--color-warning)' },
          { label: 'Disabled state', color: '#a855f7' },
          { label: 'DUI size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'PriorityLevel', required: true, description: 'Currently selected priority level.' },
          { name: 'onChange', type: '(value: PriorityLevel) => void', required: true, description: 'Called with the new level when a pill is clicked.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls label font size via useToggleBase.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all pills and dims the control.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer row container.' },
        ]} />
      </DocSection>

      <DocSection title="PriorityLevel enum">
        <EnumTable name="PriorityLevel" values={[
          { value: 'low', description: 'Lowest priority — info color.', color: 'var(--color-info)' },
          { value: 'medium', description: 'Default/normal priority — warning color.', color: 'var(--color-warning)' },
          { value: 'high', description: 'High priority — error color.', color: 'var(--color-error)' },
          { value: 'urgent', description: 'Highest priority — purple accent, distinct from high.', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The four levels and their colors are fixed internally and not configurable via props — pick PriorityPickerView when you want a consistent priority taxonomy across the app, or build a custom toggle group if you need different levels or colors.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PriorityPickerView reads its dimensions from the shared toggle category base hook (useToggleBase). Omitting size or color on PriorityPickerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every toggle-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useToggleBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '10px track', font: '8px', desc: '18x10px, thumb 8px' },
          { size: 'xs', height: '14px track', font: '9px', desc: '24x14px, thumb 10px' },
          { size: 'sm', height: '16px track', font: '10px', desc: '28x16px, thumb 12px' },
          { size: 'md', height: '20px track', font: '11px', desc: '36x20px, thumb 16px' },
          { size: 'lg', height: '24px track', font: '12px', desc: '44x24px, thumb 20px' },
          { size: 'xl', height: '28px track', font: '13px', desc: '52x28px, thumb 24px' },
          { size: 'xxl', height: '32px track', font: '14px', desc: '60x32px, thumb 28px' },
          { size: 'xxxl', height: '36px track', font: '16px', desc: '68x36px, thumb 32px' },
        ]} />
        <DocNote type="info">
          These values come from the Toggle category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every toggle-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
