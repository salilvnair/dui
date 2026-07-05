import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DurationInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Value always in milliseconds', color: 'var(--color-primary)' },
          { label: 'Unit selector (ms/s/m/hr)', color: 'var(--color-success)' },
          { label: 'Auto-detects best unit on mount', color: 'var(--color-info)' },
          { label: 'Popup unit picker', color: 'var(--color-warning)' },
          { label: 'Click-outside to close popup', color: '#a855f7' },
          { label: 'DUI size token sizing', color: '#ec4899' },
          { label: 'Configurable width', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', required: true, description: 'Current value in milliseconds.' },
          { name: 'onChange', type: '(ms: number) => void', required: true, description: 'Called with the new value in milliseconds whenever the number or unit changes.' },
          { name: 'placeholder', type: 'string', default: "'0'", description: 'Placeholder shown when value is 0.' },
          { name: 'accentColor', type: 'string', description: 'Accent color override (currently unused internally — reserved for future use).' },
          { name: 'size', type: 'DuiSize', description: 'Size token controlling input height and font size. Falls back to DuiProvider.' },
          { name: 'width', type: 'number', default: '110', description: 'Width of the number input in px.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root container.' },
        ]} />
      </DocSection>

      <DocSection title="Unit options">
        <EnumTable name="DurationUnit" values={[
          { value: 'ms', description: 'Milliseconds — multiplier ×1', color: 'var(--color-warning)' },
          { value: 's', description: 'Seconds — multiplier ×1000', color: 'var(--color-success)' },
          { value: 'm', description: 'Minutes — multiplier ×60000', color: 'var(--color-info)' },
          { value: 'hr', description: 'Hours — multiplier ×3600000', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocSection title="Auto-detection on mount">
        <DocNote type="info">
          When the component mounts, it picks the most readable unit for the initial value: hours if evenly divisible by 3,600,000; minutes if by 60,000; seconds if by 1,000; otherwise milliseconds. This avoids showing "60000 ms" when "60 s" is clearer.
        </DocNote>
        <DocNote type="warning">
          The internal unit state is not derived from the value on every render — only on mount. If you need to reset the unit externally, unmount and remount the component.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DurationInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on DurationInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useInputBase', color: 'var(--color-primary)' },
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
          These values come from the Input category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every input-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
