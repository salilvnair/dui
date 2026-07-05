import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function FileIconViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Extension-based icon resolution', color: 'var(--color-primary)' },
          { label: 'Grouped color coding (image/video/audio/archive/code/doc)', color: 'var(--color-success)' },
          { label: 'Optional formatted byte size', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
          { label: 'Text truncation with ellipsis', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'name', type: 'string', required: true, description: 'File name including extension, e.g. "report.pdf". The extension drives icon and color selection.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Row size (font size). Falls back to DuiProvider context when omitted.' },
          { name: 'bytes', type: 'number', description: 'File size in bytes. When provided, renders a formatted size (B, KB, or MB) after the name.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Extensions are grouped into six buckets — images, video, audio, archives, code, and documents — each with its own icon and accent color. Unrecognized extensions fall back to a generic document icon in var(--color-text-muted).
      </DocNote>

      <DocNote type="tip">
        For an uploaded-files list with progress bars and a remove action, use FileListView instead — it composes FileIconView per row.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FileIconView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on FileIconView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
