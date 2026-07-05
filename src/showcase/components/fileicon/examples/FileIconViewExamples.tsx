import { FileIconView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FileIconViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Row"
        description="Icon + filename, no size shown"
        code={`<FileIconView name="report.pdf" />`}
      >
        <FileIconView name="report.pdf" />
      </ExampleCard>

      <ExampleCard
        title="With File Size"
        description="Pass bytes to append a formatted size (B / KB / MB) after the name"
        code={`<FileIconView name="report.pdf" bytes={204800} />`}
      >
        <FileIconView name="report.pdf" bytes={204800} />
      </ExampleCard>

      <ExampleCard
        title="Icon Color by Extension Group"
        description="Different file extensions resolve to different icon + color pairs automatically"
        code={`<FileIconView name="hero-banner.png" bytes={512000} />
<FileIconView name="demo-recording.mp4" bytes={10485760} />
<FileIconView name="soundtrack.mp3" bytes={3145728} />
<FileIconView name="release-build.zip" bytes={20971520} />
<FileIconView name="index.ts" bytes={2048} />
<FileIconView name="notes.txt" bytes={512} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <FileIconView name="hero-banner.png" bytes={512000} />
          <FileIconView name="demo-recording.mp4" bytes={10485760} />
          <FileIconView name="soundtrack.mp3" bytes={3145728} />
          <FileIconView name="release-build.zip" bytes={20971520} />
          <FileIconView name="index.ts" bytes={2048} />
          <FileIconView name="notes.txt" bytes={512} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Attachment List (API-testing use case)"
        description="Show attached files on a saved API request — collection exports, response bodies, cURL scripts"
        code={`<FileIconView name="users-collection.json" bytes={8400} size="sm" />
<FileIconView name="response-body.json" bytes={1200} size="sm" />
<FileIconView name="run-webhook.sh" bytes={640} size="sm" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <FileIconView name="users-collection.json" bytes={8400} size="sm" />
          <FileIconView name="response-body.json" bytes={1200} size="sm" />
          <FileIconView name="run-webhook.sh" bytes={640} size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Unknown Extension (fallback icon)"
        description="Files with no recognized extension fall back to a generic document icon"
        code={`<FileIconView name="deployment-manifest" bytes={4096} />
<FileIconView name="config.unknownext" bytes={1024} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <FileIconView name="deployment-manifest" bytes={4096} />
          <FileIconView name="config.unknownext" bytes={1024} />
        </div>
      </ExampleCard>
    </div>
  );
}
