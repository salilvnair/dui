import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function FileDropzoneViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Click-to-browse or drag-and-drop', color: 'var(--color-primary)' },
          { label: 'Multi-file list with size formatting', color: 'var(--color-success)' },
          { label: 'Per-file upload progress bars', color: 'var(--color-info)' },
          { label: 'Per-file error messages', color: 'var(--color-warning)' },
          { label: 'Accept filter (MIME/extension)', color: '#a855f7' },
          { label: 'Single or multiple file mode', color: '#ec4899' },
          { label: 'Custom accent color', color: '#14b8a6' },
          { label: 'Disabled state', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'files', type: 'FileDropzoneEntry[]', required: true, description: 'Controlled list of files currently attached. Each entry wraps a File plus optional progress/error state.' },
          { name: 'onFilesAdded', type: '(files: File[]) => void', required: true, description: 'Called with the raw File[] chosen via click-to-browse or drag-and-drop. The consumer decides how to merge them into files.' },
          { name: 'onRemove', type: '(index: number) => void', required: true, description: 'Called with the index of the entry to remove when its trash icon is clicked.' },
          { name: 'accept', type: 'string', description: 'Native file input "accept" filter (MIME types and/or extensions, comma-separated). Also shown as helper text under the drop area when set.' },
          { name: 'multiple', type: 'boolean', default: 'true', description: 'Whether multiple files can be selected/dropped at once.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the drop area (dimmed, non-interactive).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size and spacing throughout the dropzone and file rows.' },
          { name: 'width', type: 'DuiWidth', description: 'Applied as the outer wrapper\'s width.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius of the drop area and file rows.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the drag-over border, upload icon, and progress bar fill.' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="FileDropzoneEntry shape">
        <PropTable props={[
          { name: 'file', type: 'File', required: true, description: 'The native File object.' },
          { name: 'progress', type: 'number', description: '0-100. Omit or set to 100 to show the file as fully uploaded (no progress bar rendered).' },
          { name: 'error', type: 'string', description: 'When set, the row shows this message in place of the file size, styled as an error, and no progress bar is shown.' },
        ]} />
      </DocSection>

      <DocSection title="DuiSize enum">
        <EnumTable name="DuiSize" values={[
          { value: 'xxs', description: 'Smallest.', color: '#f97316' },
          { value: 'xs', description: 'Extra small.', color: '#ec4899' },
          { value: 'sm', description: 'Small — compact panels.', color: 'var(--color-success)' },
          { value: 'md', description: 'Default medium size.', color: 'var(--color-primary)' },
          { value: 'lg', description: 'Large.', color: 'var(--color-info)' },
          { value: 'xl', description: 'Extra large.', color: '#a855f7' },
          { value: 'xxl', description: 'Very large.', color: '#14b8a6' },
          { value: 'xxxl', description: 'Largest preset.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        FileDropzoneView is fully controlled — it never mutates files itself. onFilesAdded only reports newly picked/dropped File objects; merging them into the entries array (and clearing the native input) is the consumer's responsibility, as shown in the examples.
      </DocNote>

      <DocNote type="warning">
        Validation (file size limits, accepted types, virus scanning, etc.) is not built in. Reject invalid files by never adding them to files, or add them with an error string set so the UI surfaces the reason inline.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FileDropzoneView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on FileDropzoneView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
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
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
