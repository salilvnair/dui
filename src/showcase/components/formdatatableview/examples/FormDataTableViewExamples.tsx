import { useState } from 'react';
import { FormDataTableView } from '@/dui';
import type { FormDataRow } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function uid() { return Math.random().toString(36).slice(2); }

const FILE_UPLOAD_ROWS: FormDataRow[] = [
  { id: uid(), key: 'username', value: 'alice_nakamura', type: 'text', enabled: true },
  { id: uid(), key: 'avatar',   value: '',                type: 'file', enabled: true },
  { id: uid(), key: 'bio',      value: 'API enthusiast', type: 'text', enabled: true },
];

const PREPOPULATED_ROWS: FormDataRow[] = [
  { id: uid(), key: 'grant_type',    value: 'client_credentials', type: 'text', enabled: true },
  { id: uid(), key: 'client_id',     value: 'daakia_app_001',     type: 'text', enabled: true },
  { id: uid(), key: 'client_secret', value: '••••••••••••••••',   type: 'text', enabled: true },
  { id: uid(), key: 'scope',         value: 'read:users write:collections', type: 'text', enabled: true },
];

const DISABLED_ROWS: FormDataRow[] = [
  { id: uid(), key: 'active_field',   value: 'send me',   type: 'text', enabled: true },
  { id: uid(), key: 'disabled_field', value: 'skip me',   type: 'text', enabled: false },
  { id: uid(), key: 'another_active', value: 'send too',  type: 'text', enabled: true },
  { id: uid(), key: 'also_disabled',  value: 'also skip', type: 'text', enabled: false },
];

const MIXED_ROWS: FormDataRow[] = [
  { id: uid(), key: 'report_name', value: 'Q4 Analysis', type: 'text', enabled: true },
  { id: uid(), key: 'data_file',   value: '',             type: 'file', enabled: true },
  { id: uid(), key: 'notes',       value: 'Attach CSV',  type: 'text', enabled: true },
  { id: uid(), key: 'attachment',  value: '',             type: 'file', enabled: true },
];

export function FormDataTableViewExamples() {
  const [fileUploadRows,   setFileUploadRows]   = useState<FormDataRow[]>(FILE_UPLOAD_ROWS);
  const [prepopRows,       setPrepopRows]       = useState<FormDataRow[]>(PREPOPULATED_ROWS);
  const [interactiveRows,  setInteractiveRows]  = useState<FormDataRow[]>([
    { id: uid(), key: '', value: '', type: 'text', enabled: true },
  ]);
  const [mixedRows,        setMixedRows]        = useState<FormDataRow[]>(MIXED_ROWS);
  const [disabledRows,     setDisabledRows]     = useState<FormDataRow[]>(DISABLED_ROWS);

  return (
    <div>
      <ExampleCard
        title="File Upload Form"
        description="Username (text) + avatar (file picker) + bio (text) — typical profile upload"
        code={`const rows: FormDataRow[] = [
  { id: '1', key: 'username', value: 'alice',    type: 'text', enabled: true },
  { id: '2', key: 'avatar',   value: '',         type: 'file', enabled: true },
  { id: '3', key: 'bio',      value: 'API buff', type: 'text', enabled: true },
];
<FormDataTableView rows={rows} onChange={setRows} label="Profile Upload" />`}
      >
        <FormDataTableView
          rows={fileUploadRows}
          onChange={setFileUploadRows}
          label="Profile Upload"
          accentColor="var(--color-primary)"
        />
      </ExampleCard>

      <ExampleCard
        title="Pre-Populated Form Fields"
        description="OAuth token exchange — fields are filled in with real values from an environment"
        code={`<FormDataTableView
  rows={oauthRows}
  onChange={setOauthRows}
  label="OAuth Token Request"
/>`}
      >
        <FormDataTableView
          rows={prepopRows}
          onChange={setPrepopRows}
          label="OAuth Token Request"
          accentColor="var(--color-warning)"
        />
      </ExampleCard>

      <ExampleCard
        title="Adding a New Row Interactively"
        description="Start with one empty row — type a key/value to add more rows as needed"
        code={`const [rows, setRows] = useState([{ id: uuid(), key: '', value: '', type: 'text', enabled: true }]);
<FormDataTableView rows={rows} onChange={setRows} label="Custom Fields" />`}
      >
        <FormDataTableView
          rows={interactiveRows}
          onChange={setInteractiveRows}
          label="Custom Fields"
          accentColor="var(--color-protocol-graphql)"
        />
      </ExampleCard>

      <ExampleCard
        title="Mixed Text and File Rows"
        description="Report submission with metadata fields and file attachments interleaved"
        code={`<FormDataTableView
  rows={mixedRows}
  onChange={setMixedRows}
  label="Report Submission"
/>`}
      >
        <FormDataTableView
          rows={mixedRows}
          onChange={setMixedRows}
          label="Report Submission"
          accentColor="var(--color-info)"
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled Rows"
        description="Checked rows are included in the request; unchecked rows are skipped"
        code={`const rows = [
  { ...active_field,   enabled: true  },
  { ...disabled_field, enabled: false },
];
<FormDataTableView rows={rows} onChange={setRows} />`}
      >
        <FormDataTableView
          rows={disabledRows}
          onChange={setDisabledRows}
          label="Selective Fields"
          accentColor="var(--color-success)"
        />
      </ExampleCard>
    </div>
  );
}
