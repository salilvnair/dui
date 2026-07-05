import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function FormDataTableViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Text and file row types', color: 'var(--color-primary)' },
          { label: 'Per-row enable/disable toggle', color: 'var(--color-success)' },
          { label: 'Native file picker integration', color: 'var(--color-info)' },
          { label: 'Base64 file encoding (default)', color: 'var(--color-warning)' },
          { label: 'File download button', color: '#a855f7' },
          { label: 'Clear-all with confirm', color: '#ec4899' },
          { label: 'SelectInputView for type column', color: '#14b8a6' },
          { label: 'Configurable label and toolbar', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="FormDataRow">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique row identifier.' },
          { name: 'key', type: 'string', required: true, description: 'Form field name.' },
          { name: 'value', type: 'string', required: true, description: 'Text value (or comma-joined file names when type is file).' },
          { name: 'type', type: "'text' | 'file'", required: true, description: "Row type. 'file' shows a file picker instead of a text input." },
          { name: 'enabled', type: 'boolean', required: true, description: 'Whether this row is included in the request.' },
          { name: 'fileNames', type: 'string[]', description: 'Selected file names (populated after file pick).' },
          { name: 'fileData', type: 'string[]', description: 'Base64-encoded file contents.' },
          { name: 'fileMimeTypes', type: 'string[]', description: 'MIME types of selected files.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'rows', type: 'FormDataRow[]', required: true, description: 'Controlled array of form-data rows.' },
          { name: 'onChange', type: '(rows: FormDataRow[]) => void', required: true, description: 'Called with the updated rows array on any change.' },
          { name: 'onFileSelect', type: '(rowId: string, files: File[]) => void', description: 'Called when files are picked. When provided, skips the internal base64 read and lets the consumer handle file data.' },
          { name: 'accentColor', type: 'string', description: 'Accent color for add-row button and file picker button.' },
          { name: 'label', type: 'string', description: 'Toolbar label shown on the left (default hidden).' },
          { name: 'hideToolbar', type: 'boolean', default: 'false', description: 'Hides the entire toolbar row.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Row type behavior">
        <EnumTable name="FormDataRow.type" values={[
          { value: 'text', description: 'Renders a text input in the value column', color: 'var(--color-success)' },
          { value: 'file', description: 'Renders a Choose File button + file name display', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection title="File handling">
        <DocNote type="info">
          By default, FormDataTableView reads files to base64 internally using FileReader. The base64 data is stored in <code>row.fileData</code>. Provide <code>onFileSelect</code> to handle file reading yourself (e.g. via an embedded webview messaging bridge).
        </DocNote>
        <DocNote type="tip">
          The download button appears when <code>row.fileData</code> is populated. It reconstructs the file from base64 and triggers a browser download via a temporary object URL.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FormDataTableView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          FormDataTableView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
