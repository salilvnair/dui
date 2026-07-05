import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function FabViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Standard round FAB', color: 'var(--color-primary)' },
          { label: 'Extended FAB with label', color: 'var(--color-success)' },
          { label: 'Speed-dial mode with sub-actions', color: 'var(--color-info)' },
          { label: 'Fixed to a viewport corner', color: 'var(--color-warning)' },
          { label: 'Rotating icon on speed-dial toggle', color: '#a855f7' },
          { label: 'Staggered fan-out animation', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'icon', type: 'ReactNode', default: '<PlusIcon />', description: 'Main button icon.' },
          { name: 'label', type: 'string', description: 'Renders as an extended FAB with text beside the icon. Ignored in speed-dial mode.' },
          { name: 'onClick', type: '() => void', description: 'Click handler for standard/extended mode. Ignored when actions is provided (speed-dial mode toggles the menu instead).' },
          { name: 'actions', type: 'FabAction[]', description: 'When provided (non-empty), switches to speed-dial mode: clicking the main button fans out these sub-actions instead of firing onClick.' },
          { name: 'position', type: "'bottom-right' | 'bottom-left'", default: "'bottom-right'", description: 'Fixed viewport corner the FAB anchors to.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls button diameter and icon/label sizing.' },
          { name: 'color', type: 'string', description: 'Accent background color for the main button and speed-dial sub-action icons.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer positioned container.' },
        ]} />
      </DocSection>

      <DocSection title="FabAction shape">
        <PropTable props={[
          { name: 'icon', type: 'ReactNode', required: true, description: 'Icon shown in the sub-action bubble.' },
          { name: 'label', type: 'string', required: true, description: 'Text label shown beside the sub-action bubble.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Called when the sub-action is clicked; the speed-dial menu then auto-closes.' },
        ]} />
      </DocSection>

      <DocSection title="Position enum">
        <EnumTable name="position" values={[
          { value: 'bottom-right', description: 'Default, 24px from the bottom-right viewport corner.', color: 'var(--color-primary)' },
          { value: 'bottom-left', description: '24px from the bottom-left viewport corner.', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        FabView always renders with position: fixed relative to the viewport, not its DOM parent — mount it once near the app root rather than nesting it inside scrollable or relatively-positioned containers expecting normal document flow.
      </DocNote>

      <DocNote type="tip">
        Speed-dial mode is auto-detected purely from whether actions is a non-empty array — you don't set a separate "mode" prop. Passing both actions and onClick will use speed-dial behavior and ignore onClick.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FabView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on FabView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
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
