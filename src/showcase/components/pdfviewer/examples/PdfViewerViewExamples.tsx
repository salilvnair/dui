import { useState } from 'react';
import { PdfViewerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PdfViewerViewExamples() {
  const [activeDoc, setActiveDoc] = useState('spec');

  const docs = [
    { id: 'spec', label: 'OpenAPI Spec.pdf', src: 'https://example.com/openapi-spec.pdf', pages: 12 },
    { id: 'report', label: 'Load Test Report.pdf', src: 'https://example.com/load-test-report.pdf', pages: 4 },
  ];

  return (
    <div>
      <ExampleCard
        title="Default Viewer"
        description="Renders a PDF inline via the browser's native iframe renderer"
        code={`<PdfViewerView src="https://example.com/document.pdf" />`}
      >
        <PdfViewerView src="https://example.com/document.pdf" height={320} />
      </ExampleCard>

      <ExampleCard
        title="With Page Navigation"
        description="Pass totalPages to enable prev/next controls that jump the iframe to a page anchor"
        code={`<PdfViewerView src="https://example.com/document.pdf" totalPages={5} height={480} />`}
      >
        <PdfViewerView src="https://example.com/document.pdf" totalPages={5} height={320} />
      </ExampleCard>

      <ExampleCard
        title="Custom Height for Compact Preview"
        description="Shrink the iframe height to fit a sidebar or modal preview panel"
        code={`<PdfViewerView src="https://example.com/document.pdf" totalPages={3} height={220} />`}
      >
        <PdfViewerView src="https://example.com/document.pdf" totalPages={3} height={220} />
      </ExampleCard>

      <ExampleCard
        title="API Documentation Attachment Switcher (domain use case)"
        description="Switch between multiple response attachments in an API-testing tool, e.g. exported spec or generated report"
        code={`const docs = [
  { id: 'spec', label: 'OpenAPI Spec.pdf', src: '...', pages: 12 },
  { id: 'report', label: 'Load Test Report.pdf', src: '...', pages: 4 },
];
const [activeDoc, setActiveDoc] = useState('spec');
const doc = docs.find(d => d.id === activeDoc)!;

<PdfViewerView src={doc.src} totalPages={doc.pages} height={360} />`}
      >
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {docs.map(d => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDoc(d.id)}
              style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
                border: '1px solid var(--color-surface-border)',
                background: activeDoc === d.id ? 'var(--color-primary)' : 'transparent',
                color: activeDoc === d.id ? '#fff' : 'var(--color-text-secondary)',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
        <PdfViewerView
          src={docs.find(d => d.id === activeDoc)!.src}
          totalPages={docs.find(d => d.id === activeDoc)!.pages}
          height={300}
        />
      </ExampleCard>

      <ExampleCard
        title="Without Page Count (unknown length)"
        description="Omit totalPages when the page count isn't known ahead of time — the pagination footer is hidden entirely"
        code={`<PdfViewerView src="https://example.com/untitled-upload.pdf" height={260} />`}
      >
        <PdfViewerView src="https://example.com/untitled-upload.pdf" height={260} />
      </ExampleCard>
    </div>
  );
}
