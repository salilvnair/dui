import { DocSection, PropTable, FeatureGrid, SizeReference, DocNote } from '../../../shared/DocComponents';

export function SearchInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Left prefix slot (icon / node)', color: 'var(--color-primary)' },
          { label: 'Right suffix slot (clear button / count)', color: 'var(--color-success)' },
          { label: 'DUI size token alignment', color: 'var(--color-info)' },
          { label: 'Raw height override', color: 'var(--color-warning)' },
          { label: 'Theme border + background variables', color: '#a855f7' },
          { label: 'Passes through HTMLInput attributes', color: '#ec4899' },
          { label: 'DuiProvider size fallback', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Controlled input value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when the user types in the input.' },
          { name: 'prefix', type: 'ReactNode', description: 'Node rendered left inside the bar. Typically a SearchIcon.' },
          { name: 'suffix', type: 'ReactNode', description: 'Node rendered right inside the bar. Typically a clear button or item count.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text for the input.' },
          { name: 'size', type: 'DuiSize', description: 'Size token controlling height and font size. Falls back to DuiProvider.' },
          { name: 'height', type: 'number', description: 'Raw height override in px. Prefer size for token-aligned sizing.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the root container.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root container.' },
          { name: '...rest', type: 'InputHTMLAttributes', description: 'All other HTML input attributes (autoFocus, onKeyDown, etc.) passed through to the input element.' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xxs', height: '18px', font: '10px', desc: 'Micro' },
          { size: 'xs', height: '22px', font: '11px', desc: 'Compact' },
          { size: 'sm', height: '26px', font: '11px', desc: 'Small' },
          { size: 'md', height: '30px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '34px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '38px', font: '14px', desc: 'Extra large' },
        ]} />
      </DocSection>

      <DocSection title="Notes">
        <DocNote type="tip">
          SearchInputView is a thin wrapper — it does not manage its own filter logic. Pair it with <code>filterItems()</code> from SideNavView or your own filter function.
        </DocNote>
        <DocNote type="info">
          {`The container uses flex: 1 by default, so it stretches to fill available width in a flex parent. Override with style={{ flex: 'none', width: 200 }} to pin a fixed width.`}
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SearchInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on SearchInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
