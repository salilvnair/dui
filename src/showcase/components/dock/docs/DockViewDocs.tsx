import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DockViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Cursor-proximity magnification', color: 'var(--color-primary)' },
          { label: 'Active item indicator dot', color: 'var(--color-success)' },
          { label: 'Hover title tooltips (native title attr)', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'DockItem[]', required: true, description: 'Icons to render in the dock.' },
          { name: 'onSelect', type: '(id: string) => void', required: true, description: 'Called with the clicked item\'s id.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Base icon size — the dock item diameter is derived as 2.2x this value.' },
          { name: 'color', type: 'string', description: 'Accent color for the active item icon and its indicator dot. Falls back to NavBase activeColor, then var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer dock container.' },
        ]} />
      </DocSection>

      <DocSection title="DockItem shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier passed to onSelect.' },
          { name: 'icon', type: 'ReactNode', required: true, description: 'Icon rendered in the dock slot.' },
          { name: 'label', type: 'string', required: true, description: 'Used as the native title attribute for a hover tooltip.' },
          { name: 'active', type: 'boolean', description: 'Tints the icon with the accent color and shows the active indicator dot below it.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Magnification is proximity-based, not per-item hover: items within 2 slots of the hovered icon also scale up proportionally (1.5x at distance 0, 1.22x at distance 1, 1.08x at distance 2), which is what produces the characteristic dock "ripple" effect.
      </DocNote>

      <DocNote type="info">
        DockView does not manage active state internally — pass active: true on exactly one item per your own selection state, as shown in the workspace-navigation example.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DockView reads its dimensions from the shared nav category base hook (useNavBase). Omitting size, borderRadius, or color on DockView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every nav-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useNavBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '20px', font: '8px', desc: 'padX 16px' },
          { size: 'xs', height: '24px', font: '9px', desc: 'padX 16px' },
          { size: 'sm', height: '28px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '32px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '44px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '52px', font: '14px', desc: 'padX 16px' },
          { size: 'xxxl', height: '60px', font: '16px', desc: 'padX 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Nav category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every nav-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
