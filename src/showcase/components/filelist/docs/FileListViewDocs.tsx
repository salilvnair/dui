import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function FileListViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Per-row upload progress bar', color: 'var(--color-primary)' },
          { label: 'Per-row error message', color: 'var(--color-error)' },
          { label: 'Remove action per row', color: 'var(--color-success)' },
          { label: 'Composes FileIconView per row', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
          { label: 'Custom accent color for progress fill', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'files', type: 'FileListEntry[]', required: true, description: 'Array of file entries to render as rows.' },
          { name: 'onRemove', type: '(id: string) => void', required: true, description: 'Called with the entry id when the row\'s remove button is clicked. The consumer owns removing the item from `files`.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Row size, forwarded to each FileIconView. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the in-progress fill bar.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer list container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer list container.' },
        ]} />
      </DocSection>

      <DocSection title="FileListEntry shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier, passed back to onRemove.' },
          { name: 'name', type: 'string', required: true, description: 'File name including extension.' },
          { name: 'bytes', type: 'number', required: true, description: 'File size in bytes, formatted by the underlying FileIconView.' },
          { name: 'progress', type: 'number', description: '0-100. Omit or set to 100 for a "done" row with no progress bar shown.' },
          { name: 'error', type: 'string', description: 'When set, replaces the progress bar with this error message in var(--color-error).' },
        ]} />
      </DocSection>

      <DocNote type="info">
        FileListView is a controlled, presentation-only list — it does not perform uploads itself. Drive `progress` from your own upload handler (e.g. XHR/fetch progress events) and update the `files` array as chunks complete.
      </DocNote>

      <DocNote type="tip">
        When a row has both an error and a progress value below 100, the error message takes precedence and the progress bar is suppressed.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FileListView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on FileListView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
