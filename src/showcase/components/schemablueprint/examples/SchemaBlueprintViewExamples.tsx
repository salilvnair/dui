import { SchemaBlueprintView, type SchemaBlueprintNode } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const USER_ORG_NODES: SchemaBlueprintNode[] = [
  { id: 'user', title: 'User', fields: [{ name: 'id', type: 'string' }, { name: 'orgId', type: 'ref' }, { name: 'email', type: 'string' }], connectsTo: ['org'] },
  { id: 'org', title: 'Organization', fields: [{ name: 'id', type: 'string' }, { name: 'name', type: 'string' }] },
];

const ORDER_NODES: SchemaBlueprintNode[] = [
  { id: 'order', title: 'Order', fields: [{ name: 'id', type: 'string' }, { name: 'customerId', type: 'ref' }, { name: 'items', type: 'array' }, { name: 'total', type: 'number' }], connectsTo: ['customer', 'lineitem'] },
  { id: 'customer', title: 'Customer', fields: [{ name: 'id', type: 'string' }, { name: 'name', type: 'string' }] },
  { id: 'lineitem', title: 'LineItem', fields: [{ name: 'sku', type: 'string' }, { name: 'qty', type: 'number' }] },
];

export function SchemaBlueprintViewExamples() {
  return (
    <div>
      <ExampleCard
        title="User ↔ Organization Schema"
        description="A minimal two-node OpenAPI schema with a foreign-key connector"
        code={`<SchemaBlueprintView nodes={[
  { id: 'user', title: 'User', fields: [{ name: 'id', type: 'string' }, { name: 'orgId', type: 'ref' }], connectsTo: ['org'] },
  { id: 'org', title: 'Organization', fields: [{ name: 'id', type: 'string' }] },
]} />`}
      >
        <SchemaBlueprintView nodes={USER_ORG_NODES} width={480} height={220} />
      </ExampleCard>

      <ExampleCard
        title="Order → Customer/LineItem Fan-out"
        description="One node connecting to two others — typical e-commerce API schema"
        code={`<SchemaBlueprintView
  nodes={[
    { id: 'order', title: 'Order', fields: [...], connectsTo: ['customer', 'lineitem'] },
    { id: 'customer', title: 'Customer', fields: [...] },
    { id: 'lineitem', title: 'LineItem', fields: [...] },
  ]}
  width={560}
  height={280}
/>`}
      >
        <SchemaBlueprintView nodes={ORDER_NODES} width={560} height={280} />
      </ExampleCard>

      <ExampleCard
        title="Single Node, No Connectors"
        description="Edge case — one isolated schema with no relations"
        code={`<SchemaBlueprintView nodes={[{ id: 'ping', title: 'PingResponse', fields: [{ name: 'ok', type: 'boolean' }] }]} width={220} height={120} />`}
      >
        <SchemaBlueprintView nodes={[{ id: 'ping', title: 'PingResponse', fields: [{ name: 'ok', type: 'boolean' }] }]} width={220} height={120} />
      </ExampleCard>

      <ExampleCard
        title="Wide Schema (many fields)"
        description="A node with many fields grows taller — layout adjusts automatically"
        code={`<SchemaBlueprintView
  nodes={[{
    id: 'product', title: 'Product',
    fields: [
      { name: 'id', type: 'string' }, { name: 'sku', type: 'string' },
      { name: 'name', type: 'string' }, { name: 'price', type: 'number' },
      { name: 'currency', type: 'string' }, { name: 'inStock', type: 'boolean' },
      { name: 'categoryId', type: 'ref' },
    ],
  }]}
  width={260}
  height={220}
/>`}
      >
        <SchemaBlueprintView
          nodes={[{
            id: 'product', title: 'Product',
            fields: [
              { name: 'id', type: 'string' }, { name: 'sku', type: 'string' },
              { name: 'name', type: 'string' }, { name: 'price', type: 'number' },
              { name: 'currency', type: 'string' }, { name: 'inStock', type: 'boolean' },
              { name: 'categoryId', type: 'ref' },
            ],
          }]}
          width={260}
          height={220}
        />
      </ExampleCard>

      <ExampleCard
        title="Small Preview Size"
        description="Compact width/height for embedding inside a request/response side panel"
        code={`<SchemaBlueprintView nodes={userOrgNodes} width={320} height={160} size="sm" />`}
      >
        <SchemaBlueprintView nodes={USER_ORG_NODES} width={320} height={160} size="sm" />
      </ExampleCard>
    </div>
  );
}
