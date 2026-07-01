import { DropDownButtonView } from '@/dui';
import type { ContextMenuItem } from '@/dui';
import { Row } from '../../../shared/Row';

const DROPDOWN_ITEMS: ContextMenuItem[] = [
  { id: 'save-as',   label: 'Save as…',   onClick: () => alert('Save as') },
  { id: 'save-copy', label: 'Save a copy', onClick: () => alert('Save copy') },
  { id: 'sep', label: '', separator: true },
  { id: 'export',    label: 'Export…',    onClick: () => alert('Export') },
];

export function DropDownButtonViewLive() {
  return (
    <div>
      <Row label="Variants" code={`<DropDownButtonView label="Save" variant="secondary" items={items} onPrimaryClick={save} />\n<DropDownButtonView label="Save" variant="primary" items={items} accentColor="var(--color-protocol-rest)" />\n<DropDownButtonView label="Export" variant="ghost" items={items} />\n<DropDownButtonView label="Delete" variant="danger" items={items} />`}>
        <DropDownButtonView label="Save" variant="secondary" items={DROPDOWN_ITEMS} onPrimaryClick={() => alert('Save!')} />
        <DropDownButtonView label="Save" variant="primary"   items={DROPDOWN_ITEMS} onPrimaryClick={() => alert('Save!')} accentColor="var(--color-protocol-rest)" />
        <DropDownButtonView label="Export" variant="ghost"   items={DROPDOWN_ITEMS} />
        <DropDownButtonView label="Delete" variant="danger"  items={DROPDOWN_ITEMS} />
      </Row>
      <Row label="Sizes  sm · default · md · lg" code={`<DropDownButtonView label="Save" size="sm"      items={items} />\n<DropDownButtonView label="Save" size="default" items={items} />\n<DropDownButtonView label="Save" size="md"      items={items} />\n<DropDownButtonView label="Save" size="lg"      items={items} />`}>
        <DropDownButtonView label="Save" size="sm"      items={DROPDOWN_ITEMS} />
        <DropDownButtonView label="Save" size="default" items={DROPDOWN_ITEMS} />
        <DropDownButtonView label="Save" size="md"      items={DROPDOWN_ITEMS} />
        <DropDownButtonView label="Save" size="lg"      items={DROPDOWN_ITEMS} />
      </Row>
      <Row label="Protocol accent colors" code={`<DropDownButtonView label="Send"    variant="primary" items={items} accentColor="var(--color-protocol-rest)" />\n<DropDownButtonView label="Run"     variant="primary" items={items} accentColor="var(--color-protocol-graphql)" />\n<DropDownButtonView label="Connect" variant="primary" items={items} accentColor="var(--color-protocol-websocket)" />`}>
        <DropDownButtonView label="Send"    variant="primary" items={DROPDOWN_ITEMS} accentColor="var(--color-protocol-rest)"      onPrimaryClick={() => alert('Send REST')} />
        <DropDownButtonView label="Run"     variant="primary" items={DROPDOWN_ITEMS} accentColor="var(--color-protocol-graphql)"   onPrimaryClick={() => alert('Run GQL')} />
        <DropDownButtonView label="Connect" variant="primary" items={DROPDOWN_ITEMS} accentColor="var(--color-protocol-websocket)" onPrimaryClick={() => alert('Connect WS')} />
      </Row>
      <Row label="rounded=false" code={`<DropDownButtonView label="Save" rounded={false} items={items} />\n<DropDownButtonView label="Save" rounded={false} variant="primary" items={items} />`}>
        <DropDownButtonView label="Save" rounded={false} items={DROPDOWN_ITEMS} />
        <DropDownButtonView label="Save" rounded={false} variant="primary" items={DROPDOWN_ITEMS} />
      </Row>
    </div>
  );
}
