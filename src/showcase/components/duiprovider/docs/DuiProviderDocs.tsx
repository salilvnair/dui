import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DuiProviderDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Overview">
        <DocNote type="info">
          DuiProvider is a React context wrapper that sets global defaults for all DUI components in its subtree. Every DUI component reads from this context when no explicit prop is passed — making it easy to enforce consistent sizing across an entire panel or page.
        </DocNote>
      </DocSection>

      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Global size propagation', color: 'var(--color-primary)' },
          { label: 'Border radius preset or raw px', color: 'var(--color-success)' },
          { label: 'Active color for nav + toggle states', color: 'var(--color-info)' },
          { label: 'Text color override', color: 'var(--color-warning)' },
          { label: 'Width preset', color: '#a855f7' },
          { label: 'Font style (normal/italic)', color: '#ec4899' },
          { label: 'useDui() hook for component access', color: '#14b8a6' },
          { label: 'useDuiStyle() convenience hook', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="DuiProvider Props">
        <PropTable props={[
          { name: 'size', type: 'DuiSize', default: "'md'", description: 'Default size inherited by all DUI components when no local size prop is passed.' },
          { name: 'width', type: 'DuiWidth', description: "Default width preset. Components that support width read this as their default." },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border-radius preset or raw px number. Overrides the size-derived default.' },
          { name: 'color', type: 'string', description: 'Text color override (CSS var or value, e.g. var(--color-text-primary)).' },
          { name: 'defaultColor', type: 'string', description: 'Primary/accent color for interactive highlights (buttons, selections).' },
          { name: 'activeColor', type: 'string', description: 'Color for active/selected states (tabs, nav items, toggles).' },
          { name: 'fontStyle', type: 'DuiFontStyle', description: "Font style applied to all text within the DUI subtree ('normal' | 'italic')." },
          { name: 'children', type: 'ReactNode', required: true, description: 'The subtree that inherits these defaults.' },
        ]} />
      </DocSection>

      <DocSection title="DuiSize values">
        <SizeReference sizes={[
          { size: 'xxs', height: '18px', font: '10px', desc: 'Micro' },
          { size: 'xs', height: '22px', font: '11px', desc: 'Compact' },
          { size: 'sm', height: '26px', font: '11px', desc: 'Small' },
          { size: 'md', height: '30px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '34px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '38px', font: '14px', desc: 'XL' },
          { size: 'xxl', height: '44px', font: '15px', desc: 'Double XL' },
          { size: 'xxxl', height: '52px', font: '16px', desc: 'Triple XL' },
        ]} />
      </DocSection>

      <DocSection title="DuiRadius presets">
        <EnumTable name="DuiRadius" values={[
          { value: 'none', description: '0px — no rounding', color: 'var(--color-text-muted)' },
          { value: 'sm', description: '4px — subtle', color: 'var(--color-success)' },
          { value: 'md', description: '6px — default', color: 'var(--color-primary)' },
          { value: 'lg', description: '10px — rounded', color: 'var(--color-info)' },
          { value: 'full', description: '9999px — pill shape', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="DuiWidth presets">
        <EnumTable name="DuiWidth" values={[
          { value: 'sm', description: '160px', color: 'var(--color-primary)' },
          { value: 'md', description: '240px', color: 'var(--color-success)' },
          { value: 'default', description: '320px', color: 'var(--color-info)' },
          { value: 'lg', description: '400px', color: 'var(--color-warning)' },
          { value: 'fullWidth', description: '100%', color: '#a855f7' },
          { value: 'maxContent', description: 'max-content', color: '#ec4899' },
          { value: 'fw', description: '100% (alias)', color: '#14b8a6' },
          { value: 'mx', description: 'max-content (alias)', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Hooks">
        <PropTable props={[
          { name: 'useDui()', type: 'DuiConfig', description: 'Returns the current DUI context object. Components call this and fall back to context values when no explicit prop is passed.' },
          { name: 'useDuiStyle(sizeFallback)', type: '{ borderRadius, width, color, defaultColor, activeColor, fontStyle }', description: 'Convenience hook that resolves borderRadius and width to CSS strings plus extracts color/style values from context.' },
          { name: 'resolveBorderRadius(override, sizeFallback)', type: 'string', description: 'Resolves a DuiRadius preset or raw number to a CSS string.' },
          { name: 'resolveWidth(width)', type: 'string', description: "Resolves a DuiWidth preset to a CSS string. Falls back to 'auto'." },
        ]} />
      </DocSection>

      <DocSection title="Usage pattern">
        <DocNote type="tip">
          Wrap a settings panel with <code>{'<DuiProvider size="sm">'}</code> to make every input, button, and nav item within it compact — without passing <code>size="sm"</code> to each component individually.
        </DocNote>
      </DocSection>
    </div>
  );
}
