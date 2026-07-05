import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function CascaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Multi-level nested options', color: 'var(--color-primary)' },
          { label: 'Portal-rendered flyout menu', color: 'var(--color-success)' },
          { label: 'Column-per-depth layout', color: 'var(--color-info)' },
          { label: 'Click-outside to close', color: 'var(--color-warning)' },
          { label: 'Auto viewport-aware positioning', color: '#a855f7' },
          { label: 'Custom width / radius / color', color: '#ec4899' },
          { label: 'Disabled state', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'CascaderOption[]', required: true, description: 'Root-level list of options; each option may have nested children to form deeper levels.' },
          { name: 'value', type: 'string[]', required: true, description: 'Selected path of option values from root to leaf, e.g. [\'us\', \'ca\'].' },
          { name: 'onChange', type: '(value: string[]) => void', required: true, description: 'Called with the new full path once a leaf option (one with no children) is selected.' },
          { name: 'placeholder', type: 'string', default: "'Select…'", description: 'Text shown in the trigger when no value is selected.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button and dims it.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls trigger height, font size, padding. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Trigger width token (sm / md / default / lg / fullWidth / maxContent / fw / mx).' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius token or explicit pixel value for the trigger.' },
          { name: 'color', type: 'string', description: 'Accent color for the focused border and active item highlight in the menu. Defaults to var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer inline-block wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="CascaderOption shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique value for this node, used to build the value path.' },
          { name: 'label', type: 'string', required: true, description: 'Display text for this node.' },
          { name: 'children', type: 'CascaderOption[]', description: 'Nested options. Omit (or leave empty) to mark this node as a selectable leaf.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Selection only completes — calling onChange — when the user picks an option with no children. Picking an intermediate node with children just reveals the next column without closing the menu.
      </DocNote>

      <DocNote type="tip">
        The menu is rendered via a React portal to document.body and repositions on open, so it is safe to use CascaderView inside scrollable panels, modals, or tables without clipping.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CascaderView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on CascaderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
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
