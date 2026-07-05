import { useState } from 'react';
import { FileDropzoneView, type FileDropzoneEntry } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FileDropzoneViewExamples() {
  const [basicFiles, setBasicFiles] = useState<FileDropzoneEntry[]>([]);
  const [attachments, setAttachments] = useState<FileDropzoneEntry[]>([
    { file: new File(['{}'], 'response-schema.json', { type: 'application/json' }), progress: 100 },
  ]);
  const [bodyFiles, setBodyFiles] = useState<FileDropzoneEntry[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<FileDropzoneEntry[]>([
    { file: new File([new ArrayBuffer(2_400_000)], 'load-test-results.har'), progress: 42 },
    { file: new File([new ArrayBuffer(180_000)], 'trace.zip'), progress: 78 },
  ]);
  const errorFiles: FileDropzoneEntry[] = [
    { file: new File([new ArrayBuffer(52_000_000)], 'huge-fixture.csv'), error: 'File exceeds 25 MB limit' },
    { file: new File(['x'], 'malformed.exe'), error: 'File type not allowed' },
  ];

  return (
    <div>
      <ExampleCard
        title="Default Dropzone"
        description="Basic click-or-drag file upload with a running file list"
        code={`const [files, setFiles] = useState<FileDropzoneEntry[]>([]);

<FileDropzoneView
  files={files}
  onFilesAdded={fs => setFiles(prev => [...prev, ...fs.map(file => ({ file, progress: 100 }))])}
  onRemove={i => setFiles(prev => prev.filter((_, idx) => idx !== i))}
/>`}
      >
        <div style={{ width: 380 }}>
          <FileDropzoneView
            files={basicFiles}
            onFilesAdded={fs => setBasicFiles(prev => [...prev, ...fs.map(file => ({ file, progress: 100 }))])}
            onRemove={i => setBasicFiles(prev => prev.filter((_, idx) => idx !== i))}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive: Request Attachments"
        description="Attach files to a request body (form-data), with an existing schema file already in the list"
        code={`const [attachments, setAttachments] = useState<FileDropzoneEntry[]>([
  { file: schemaFile, progress: 100 },
]);

<FileDropzoneView
  files={attachments}
  onFilesAdded={fs => setAttachments(prev => [...prev, ...fs.map(file => ({ file, progress: 100 }))])}
  onRemove={i => setAttachments(prev => prev.filter((_, idx) => idx !== i))}
  multiple
/>`}
      >
        <div style={{ width: 380 }}>
          <FileDropzoneView
            files={attachments}
            onFilesAdded={fs => setAttachments(prev => [...prev, ...fs.map(file => ({ file, progress: 100 }))])}
            onRemove={i => setAttachments(prev => prev.filter((_, idx) => idx !== i))}
            multiple
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size & Accent Color Variants"
        description="sm / md / lg sizes with a custom accent color for progress bars and icons"
        code={`<FileDropzoneView files={files} onFilesAdded={add} onRemove={remove} size="sm" color="var(--color-info)" />
<FileDropzoneView files={files} onFilesAdded={add} onRemove={remove} size="md" color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ width: 260 }}>
            <FileDropzoneView files={[]} onFilesAdded={() => {}} onRemove={() => {}} size="sm" color="var(--color-info)" />
          </div>
          <div style={{ width: 260 }}>
            <FileDropzoneView files={[]} onFilesAdded={() => {}} onRemove={() => {}} size="md" color="var(--color-success)" />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Body: Binary File Upload"
        description="Body tab set to 'binary' — restrict accepted types and disallow multiple files, mimicking a single request payload upload"
        code={`const [bodyFiles, setBodyFiles] = useState<FileDropzoneEntry[]>([]);

<FileDropzoneView
  files={bodyFiles}
  onFilesAdded={fs => setBodyFiles(fs.map(file => ({ file, progress: 100 })))}
  onRemove={() => setBodyFiles([])}
  accept="application/json,.xml,.csv"
  multiple={false}
/>`}
      >
        <div style={{ width: 380 }}>
          <FileDropzoneView
            files={bodyFiles}
            onFilesAdded={fs => setBodyFiles(fs.map(file => ({ file, progress: 100 })))}
            onRemove={() => setBodyFiles([])}
            accept="application/json,.xml,.csv"
            multiple={false}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Upload Progress & Errors"
        description="In-flight uploads with progress bars alongside rejected files showing validation errors"
        code={`<FileDropzoneView
  files={[
    { file: harFile, progress: 42 },
    { file: traceFile, progress: 78 },
    { file: hugeFile, error: 'File exceeds 25 MB limit' },
    { file: exeFile, error: 'File type not allowed' },
  ]}
  onFilesAdded={addFiles}
  onRemove={removeFile}
/>`}
      >
        <div style={{ width: 380 }}>
          <FileDropzoneView
            files={[...uploadingFiles, ...errorFiles]}
            onFilesAdded={fs => setUploadingFiles(prev => [...prev, ...fs.map(file => ({ file, progress: 0 }))])}
            onRemove={i => setUploadingFiles(prev => prev.filter((_, idx) => idx !== i))}
          />
        </div>
      </ExampleCard>
    </div>
  );
}
