import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ChecklistViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Todo-style checklist', color: 'var(--color-primary)' },
          { label: 'Strikethrough + fade on complete', color: 'var(--color-success)' },
          { label: 'Built on CheckboxView', color: 'var(--color-info)' },
          { label: 'Click label or checkbox to toggle', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DUI size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'ChecklistItem[]', required: true, description: 'Items to render: { id, label, checked }.' },
          { name: 'onToggle', type: '(id: string) => void', required: true, description: 'Called with an item\'s id when its checkbox or label is clicked.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls label font size via useToggleBase.' },
          { name: 'accentColor', type: 'string', default: 'var(--color-primary)', description: 'Color applied to the checkbox when checked.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer list container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer list container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Both the checkbox and the label text are clickable and call the same onToggle handler, so users get a large, forgiving hit target — no need to click precisely on the tiny checkbox square.
      </DocNote>

      <DocNote type="info">
        ChecklistView is presentation-only — it does not persist state. Pair it with a store or API call inside onToggle for things like onboarding progress or release checklists that need to survive a page reload.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ChecklistView reads its dimensions from the shared toggle category base hook (useToggleBase). Omitting size or color on ChecklistView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every toggle-category component at once."
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
