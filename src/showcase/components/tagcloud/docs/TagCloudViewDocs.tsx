import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TagCloudViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Weighted font-size scaling', color: 'var(--color-primary)' },
          { label: 'Opacity scales with weight too', color: 'var(--color-success)' },
          { label: 'Optional per-tag click handler', color: 'var(--color-info)' },
          { label: 'Renders <button> when clickable, <span> otherwise', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Built on useChipBase for base font size', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tags', type: 'TagCloudEntry[]', required: true, description: 'Tags to render: { label, weight, onClick? }. weight is relative — only the ratio to the max weight in the array matters.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Sets the base (minimum) font size that all tags scale up from.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Text color applied to every tag.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer flex container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer flex container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Weight is relative, not absolute — a tags array of [{'{'}weight: 4{'}'}, {'{'}weight: 2{'}'}] renders identically to [{'{'}weight: 400{'}'}, {'{'}weight: 200{'}'}]. Only the ratio between the largest and smallest weight in the current array matters.
      </DocNote>

      <DocNote type="info">
        Tags without an onClick render as plain, non-interactive spans; tags with onClick render as real button elements, so keyboard focus and click semantics come for free without any extra prop.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TagCloudView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on TagCloudView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useChipBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '10px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xs', height: '12px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'sm', height: '16px', font: '9px', desc: 'padX 5px, radius full' },
          { size: 'md', height: '20px', font: '10px', desc: 'padX 7px, radius full' },
          { size: 'lg', height: '24px', font: '11px', desc: 'padX 9px, radius full' },
          { size: 'xl', height: '28px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxl', height: '32px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxxl', height: '38px', font: '12px', desc: 'padX 11px, radius full' },
        ]} />
        <DocNote type="info">
          These values come from the Chip category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every chip-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
