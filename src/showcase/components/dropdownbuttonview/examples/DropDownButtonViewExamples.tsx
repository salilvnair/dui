import { DropDownButtonView } from '@/dui';
import type { ContextMenuItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const SAVE_OPTIONS: ContextMenuItem[] = [
  { id: 'save-as',    label: 'Save as…',    onClick: () => alert('Save as') },
  { id: 'save-copy',  label: 'Save a copy', onClick: () => alert('Save copy') },
  { id: 'sep', label: '', separator: true },
  { id: 'export',     label: 'Export…',     onClick: () => alert('Export') },
];

const EXPORT_OPTIONS: ContextMenuItem[] = [
  { id: 'json',    label: 'Export as JSON',    onClick: () => alert('JSON') },
  { id: 'yaml',    label: 'Export as YAML',    onClick: () => alert('YAML') },
  { id: 'csv',     label: 'Export as CSV',     onClick: () => alert('CSV') },
  { id: 'sep', label: '', separator: true },
  { id: 'curl',    label: 'Copy as cURL',      onClick: () => alert('cURL') },
  { id: 'har',     label: 'Copy as HAR',       onClick: () => alert('HAR') },
];

const RUN_OPTIONS: ContextMenuItem[] = [
  { id: 'current', label: 'Current environment', onClick: () => alert('Current env') },
  { id: 'all',     label: 'All environments',     onClick: () => alert('All envs') },
  { id: 'dry-run', label: 'Dry run (no side effects)', onClick: () => alert('Dry run') },
];

const IMPORT_OPTIONS: ContextMenuItem[] = [
  { id: 'file',      label: 'Import from File',      onClick: () => alert('File') },
  { id: 'url',       label: 'Import from URL',        onClick: () => alert('URL') },
  { id: 'clipboard', label: 'Paste from Clipboard',   onClick: () => alert('Clipboard') },
  { id: 'sep', label: '', separator: true },
  { id: 'postman',   label: 'Import Postman v2.1',    onClick: () => alert('Postman') },
  { id: 'openapi',   label: 'Import OpenAPI 3.0',     onClick: () => alert('OpenAPI') },
];

export function DropDownButtonViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Save As"
        description="Primary Save action + dropdown for Save As / Export — common in request editors"
        code={`const SAVE_OPTIONS: ContextMenuItem[] = [
  { id: 'save-as',   label: 'Save as…',    onClick: handleSaveAs },
  { id: 'save-copy', label: 'Save a copy', onClick: handleSaveCopy },
  { id: 'sep', label: '', separator: true },
  { id: 'export',    label: 'Export…',     onClick: handleExport },
];

<DropDownButtonView
  label="Save"
  variant="secondary"
  items={SAVE_OPTIONS}
  onPrimaryClick={() => save()}
/>`}
      >
        <DropDownButtonView
          label="Save"
          variant="secondary"
          items={SAVE_OPTIONS}
          onPrimaryClick={() => alert('Save!')}
        />
      </ExampleCard>

      <ExampleCard
        title="Export Options"
        description="Dropdown-only button for exporting the response in multiple formats"
        code={`<DropDownButtonView
  label="Export"
  variant="ghost"
  items={EXPORT_OPTIONS}
/>`}
      >
        <DropDownButtonView
          label="Export"
          variant="ghost"
          items={EXPORT_OPTIONS}
        />
      </ExampleCard>

      <ExampleCard
        title="Run with Variants"
        description="Run button with environment options — current env is the default action"
        code={`<DropDownButtonView
  label="Run"
  variant="primary"
  accentColor="var(--color-protocol-rest)"
  items={RUN_OPTIONS}
  onPrimaryClick={() => runCurrentEnv()}
/>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <DropDownButtonView
            label="Run"
            variant="primary"
            accentColor="var(--color-protocol-rest)"
            items={RUN_OPTIONS}
            onPrimaryClick={() => alert('Run current env')}
          />
          <DropDownButtonView
            label="Run"
            variant="primary"
            accentColor="var(--color-protocol-graphql)"
            items={RUN_OPTIONS}
            onPrimaryClick={() => alert('Run GQL')}
          />
          <DropDownButtonView
            label="Run"
            variant="primary"
            accentColor="var(--color-protocol-grpc)"
            items={RUN_OPTIONS}
            onPrimaryClick={() => alert('Run gRPC')}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Import From"
        description="Import source picker — file, URL, clipboard, or collection format"
        code={`<DropDownButtonView
  label="Import"
  variant="secondary"
  items={IMPORT_OPTIONS}
/>`}
      >
        <DropDownButtonView
          label="Import"
          variant="secondary"
          items={IMPORT_OPTIONS}
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled Dropdown"
        description="Non-interactive state — used when no actions are available"
        code={`<DropDownButtonView label="Save" items={SAVE_OPTIONS} disabled />
<DropDownButtonView label="Export" variant="ghost" items={EXPORT_OPTIONS} disabled />`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <DropDownButtonView label="Save"   items={SAVE_OPTIONS}   disabled />
          <DropDownButtonView label="Export" variant="ghost" items={EXPORT_OPTIONS} disabled />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / default / md / lg — keep consistent with adjacent buttons in the toolbar"
        code={`<DropDownButtonView label="Save" size="sm"      items={SAVE_OPTIONS} />
<DropDownButtonView label="Save" size="default" items={SAVE_OPTIONS} />
<DropDownButtonView label="Save" size="md"      items={SAVE_OPTIONS} />
<DropDownButtonView label="Save" size="lg"      items={SAVE_OPTIONS} />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <DropDownButtonView label="Save" size="sm"      items={SAVE_OPTIONS} />
          <DropDownButtonView label="Save" size="default" items={SAVE_OPTIONS} />
          <DropDownButtonView label="Save" size="md"      items={SAVE_OPTIONS} />
          <DropDownButtonView label="Save" size="lg"      items={SAVE_OPTIONS} />
        </div>
      </ExampleCard>
    </div>
  );
}
