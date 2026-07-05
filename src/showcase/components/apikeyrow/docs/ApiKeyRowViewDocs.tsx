import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ApiKeyRowViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Masked key display', color: 'var(--color-primary)' },
          { label: 'Reveal / hide toggle', color: 'var(--color-info)' },
          { label: 'Copy to clipboard with confirmation', color: 'var(--color-success)' },
          { label: 'Optional revoke action', color: 'var(--color-error)' },
          { label: 'Monospace key rendering', color: 'var(--color-warning)' },
          { label: 'DuiSize table density', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Name of the key, e.g. "Production", shown before the masked value.' },
          { name: 'apiKey', type: 'string', required: true, description: 'The raw key value. Displayed masked by default; toggled via the eye icon. Keys of 8 chars or fewer are fully masked.' },
          { name: 'onRevoke', type: '() => void', description: 'When provided, shows a revoke (trash) icon button. Omit for read-only rows.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls row padding and font size via the DUI table base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        The copy action uses navigator.clipboard.writeText and silently no-ops if the clipboard API is unavailable (e.g. insecure contexts) — it does not surface an error state, only the success checkmark on a successful copy.
      </DocNote>

      <DocNote type="tip">
        Reveal state and copied state are local to each row instance, so rendering a list of ApiKeyRowView components keeps each key's visibility independent — no shared state management needed.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ApiKeyRowView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on ApiKeyRowView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTableBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '18px', font: '8px', desc: 'header 10px' },
          { size: 'xs', height: '22px', font: '9px', desc: 'header 10px' },
          { size: 'sm', height: '26px', font: '10px', desc: 'header 9px' },
          { size: 'md', height: '30px', font: '11px', desc: 'header 9px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'header 10px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'header 10px' },
          { size: 'xxl', height: '46px', font: '14px', desc: 'header 10px' },
          { size: 'xxxl', height: '54px', font: '16px', desc: 'header 10px' },
        ]} />
        <DocNote type="info">
          These values come from the Table category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every table-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
