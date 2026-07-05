import { useState } from 'react';
import { FileListView, type FileListEntry } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FileListViewExamples() {
  const [uploads, setUploads] = useState<FileListEntry[]>([
    { id: '1', name: 'hero.png', bytes: 102400, progress: 100 },
  ]);

  const [inProgress, setInProgress] = useState<FileListEntry[]>([
    { id: 'a', name: 'load-test-results.csv', bytes: 2457600, progress: 62 },
    { id: 'b', name: 'openapi-export.yaml', bytes: 40960, progress: 100 },
  ]);

  const [withError, setWithError] = useState<FileListEntry[]>([
    { id: 'x', name: 'huge-payload.json', bytes: 52428800, error: 'File exceeds 20 MB limit' },
    { id: 'y', name: 'response.json', bytes: 8192, progress: 100 },
  ]);

  return (
    <div>
      <ExampleCard
        title="Completed Upload"
        description="A single fully-uploaded file — remove action wired to local state"
        code={`function Preview() {
  const [files, setFiles] = useState([{ id: '1', name: 'hero.png', bytes: 102400, progress: 100 }]);
  return <FileListView files={files} onRemove={id => setFiles(f => f.filter(x => x.id !== id))} />;
}`}
      >
        <FileListView files={uploads} onRemove={id => setUploads(f => f.filter(x => x.id !== id))} />
      </ExampleCard>

      <ExampleCard
        title="In-Progress Uploads"
        description="Rows below 100% progress render a slim progress bar under the filename"
        code={`<FileListView
  files={[
    { id: 'a', name: 'load-test-results.csv', bytes: 2457600, progress: 62 },
    { id: 'b', name: 'openapi-export.yaml', bytes: 40960, progress: 100 },
  ]}
  onRemove={handleRemove}
/>`}
      >
        <FileListView files={inProgress} onRemove={id => setInProgress(f => f.filter(x => x.id !== id))} />
      </ExampleCard>

      <ExampleCard
        title="Error State"
        description="Rows with an error message show it in place of the progress bar"
        code={`<FileListView
  files={[
    { id: 'x', name: 'huge-payload.json', bytes: 52428800, error: 'File exceeds 20 MB limit' },
    { id: 'y', name: 'response.json', bytes: 8192, progress: 100 },
  ]}
  onRemove={handleRemove}
/>`}
      >
        <FileListView files={withError} onRemove={id => setWithError(f => f.filter(x => x.id !== id))} />
      </ExampleCard>

      <ExampleCard
        title="Request Body Attachments (API-testing use case)"
        description="Files attached to a multipart/form-data request body, sized and themed to match the accent color"
        code={`<FileListView
  files={[
    { id: '1', name: 'avatar.jpg', bytes: 51200, progress: 100 },
    { id: '2', name: 'resume.pdf', bytes: 184320, progress: 100 },
  ]}
  onRemove={handleRemove}
  size="sm"
  color="var(--color-protocol-rest)"
/>`}
      >
        <FileListView
          files={[
            { id: '1', name: 'avatar.jpg', bytes: 51200, progress: 100 },
            { id: '2', name: 'resume.pdf', bytes: 184320, progress: 100 },
          ]}
          onRemove={() => {}}
          size="sm"
          color="var(--color-protocol-rest)"
        />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="No files attached yet — the list simply renders nothing; wrap it with your own empty-state message"
        code={`<FileListView files={[]} onRemove={handleRemove} />
{files.length === 0 && <p>No files attached yet.</p>}`}
      >
        <FileListView files={[]} onRemove={() => {}} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No files attached yet.</div>
      </ExampleCard>
    </div>
  );
}
