import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function RichTextToolbarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Bold / Italic / Underline / Link / List / Code', color: 'var(--color-primary)' },
          { label: 'Controlled multi-select active state', color: 'var(--color-success)' },
          { label: 'DuiProvider size context', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'Compact icon-only buttons', color: '#a855f7' },
          { label: 'Tooltip title per action', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'active', type: 'RichTextAction[]', default: '[]', description: 'The set of currently-active (highlighted) formatting actions. Fully controlled — the component does not track its own state.' },
          { name: 'onAction', type: '(action: RichTextAction) => void', required: true, description: 'Called with the action id whenever a toolbar button is clicked. Toggling active state is the caller’s responsibility.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Toolbar button sizing. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color applied to active buttons’ background tint and icon/text color.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="RichTextAction enum">
        <EnumTable name="RichTextAction" values={[
          { value: 'bold', description: 'Bold formatting toggle.', color: 'var(--color-primary)' },
          { value: 'italic', description: 'Italic formatting toggle.', color: 'var(--color-success)' },
          { value: 'underline', description: 'Underline formatting toggle.', color: 'var(--color-info)' },
          { value: 'link', description: 'Insert/toggle a hyperlink.', color: 'var(--color-warning)' },
          { value: 'list', description: 'Toggle a bullet/numbered list.', color: '#a855f7' },
          { value: 'code', description: 'Toggle inline code formatting.', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocNote type="info">
        This is a stateless toolbar primitive — it renders buttons and reports clicks via onAction, but does not apply formatting to any text itself. Pair it with your own rich-text editor state (or with MentionInputView / a contentEditable region) and drive the active array from that editor’s current selection formatting.
      </DocNote>

      <DocNote type="tip">
        Sizing and color both fall back to DuiProvider context, so a single ancestor size/color override will keep this toolbar visually consistent with surrounding form controls without per-instance props.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RichTextToolbarView reads its dimensions from the shared tab category base hook (useTabBase). Omitting size, width, borderRadius, or color on RichTextToolbarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every tab-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTabBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 18px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 18px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 10px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 12px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 14px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 18px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 18px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 18px' },
        ]} />
        <DocNote type="info">
          These values come from the Tab category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every tab-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
