import { useState } from 'react';
import { PaginationView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PaginationViewExamples() {
  const [page, setPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(12);
  const [wide, setWide] = useState(3);
  const [logsPage, setLogsPage] = useState(1);

  return (
    <div>
      <ExampleCard
        title="Default Pagination"
        description="Basic page control over a collection of API requests"
        code={`const [page, setPage] = useState(1);
<PaginationView page={page} totalPages={12} onChange={setPage} />`}
      >
        <PaginationView page={page} totalPages={12} onChange={setPage} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Page {page} of 12
        </div>
      </ExampleCard>

      <ExampleCard
        title="Long Range with Ellipsis Collapse"
        description="Request history log with 40 pages — collapses to keep the control compact"
        code={`const [page, setPage] = useState(12);
<PaginationView page={page} totalPages={40} onChange={setPage} siblingCount={1} />`}
      >
        <PaginationView page={historyPage} totalPages={40} onChange={setHistoryPage} siblingCount={1} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Page {historyPage} of 40 — jump around to see ellipsis reflow
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes & Accent Colors"
        description="Size-driven density and color-driven active page accent"
        code={`<PaginationView page={2} totalPages={8} onChange={() => {}} size="xs" color="var(--color-method-get)" />
<PaginationView page={2} totalPages={8} onChange={() => {}} size="md" color="var(--color-primary)" />
<PaginationView page={2} totalPages={8} onChange={() => {}} size="lg" color="var(--color-protocol-graphql)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PaginationView page={2} totalPages={8} onChange={() => {}} size="xs" color="var(--color-method-get)" />
          <PaginationView page={2} totalPages={8} onChange={() => {}} size="md" color="var(--color-primary)" />
          <PaginationView page={2} totalPages={8} onChange={() => {}} size="lg" color="var(--color-protocol-graphql)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Wide Sibling Range"
        description="siblingCount=2 shows more neighboring pages around the current one — useful for a collection runner results table"
        code={`const [page, setPage] = useState(3);
<PaginationView page={page} totalPages={25} onChange={setPage} siblingCount={2} color="var(--color-warning)" />`}
      >
        <PaginationView page={wide} totalPages={25} onChange={setWide} siblingCount={2} color="var(--color-warning)" />
      </ExampleCard>

      <ExampleCard
        title="Single Page (edge case)"
        description="When totalPages is 1, prev/next stay disabled and no range renders beyond the single page"
        code={`<PaginationView page={1} totalPages={1} onChange={() => {}} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PaginationView page={1} totalPages={1} onChange={() => {}} />
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 6 }}>
              Empty logs response (totalPages resolved to 1 after filtering)
            </div>
            <PaginationView page={logsPage} totalPages={1} onChange={setLogsPage} color="var(--color-error)" />
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
