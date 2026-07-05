import { useState } from 'react';
import { TablePaginationView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TablePaginationViewExamples() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [requestPage, setRequestPage] = useState(1);
  const [requestRpp, setRequestRpp] = useState(25);

  const [smallPage, setSmallPage] = useState(1);

  const [customPage, setCustomPage] = useState(3);

  return (
    <div>
      <ExampleCard
        title="Default Pagination"
        description="Standard footer with rows-per-page selector and page range"
        code={`const [page, setPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(10);

<TablePaginationView
  page={page}
  totalRows={247}
  rowsPerPage={rowsPerPage}
  onPageChange={setPage}
  onRowsPerPageChange={setRowsPerPage}
/>`}
      >
        <TablePaginationView
          page={page}
          totalRows={247}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </ExampleCard>

      <ExampleCard
        title="Request Log Table Footer (interactive)"
        description="Paging through a large API request log — page and rowsPerPage both drive a real query in a full app"
        code={`const [page, setPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(25);

<TablePaginationView
  page={page}
  totalRows={3820}
  rowsPerPage={rowsPerPage}
  rowsPerPageOptions={[25, 50, 100]}
  onPageChange={setPage}
  onRowsPerPageChange={rpp => { setRowsPerPage(rpp); setPage(1); }}
/>`}
      >
        <TablePaginationView
          page={requestPage}
          totalRows={3820}
          rowsPerPage={requestRpp}
          rowsPerPageOptions={[25, 50, 100]}
          onPageChange={setRequestPage}
          onRowsPerPageChange={rpp => { setRequestRpp(rpp); setRequestPage(1); }}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Showing page {requestPage} at {requestRpp} rows/page of 3,820 total requests
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Rows-Per-Page Options"
        description="Override rowsPerPageOptions for a compact webhook delivery log"
        code={`<TablePaginationView
  page={page}
  totalRows={58}
  rowsPerPage={5}
  rowsPerPageOptions={[5, 10, 20]}
  onPageChange={setPage}
  onRowsPerPageChange={() => {}}
/>`}
      >
        <TablePaginationView
          page={customPage}
          totalRows={58}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={setCustomPage}
          onRowsPerPageChange={() => {}}
          color="var(--color-info)"
        />
      </ExampleCard>

      <ExampleCard
        title="Compact Size for Dense Panels"
        description="size='sm' reduces padding/font — good for a docked response inspector"
        code={`<TablePaginationView
  page={page}
  totalRows={94}
  rowsPerPage={10}
  size="sm"
  onPageChange={setPage}
  onRowsPerPageChange={() => {}}
/>`}
      >
        <TablePaginationView
          page={smallPage}
          totalRows={94}
          rowsPerPage={10}
          size="sm"
          onPageChange={setSmallPage}
          onRowsPerPageChange={() => {}}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty Result Set"
        description="totalRows=0 — the range collapses to 0–0 of 0 and paging is effectively disabled"
        code={`<TablePaginationView
  page={1}
  totalRows={0}
  rowsPerPage={10}
  onPageChange={() => {}}
  onRowsPerPageChange={() => {}}
/>`}
      >
        <TablePaginationView
          page={1}
          totalRows={0}
          rowsPerPage={10}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </ExampleCard>
    </div>
  );
}
