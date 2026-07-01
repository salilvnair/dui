import { JsonTreeView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const USER_RESPONSE = {
  userId: 1,
  name: 'Alice Nakamura',
  email: 'alice@example.com',
  active: true,
  createdAt: '2024-01-15T09:30:00Z',
  address: {
    street: '123 Maple Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    geo: { lat: 37.7749, lng: -122.4194 },
  },
  roles: ['admin', 'editor'],
  preferences: {
    theme: 'dark',
    notifications: { email: true, sms: false, push: true },
  },
};

const REQUEST_LIST = [
  { id: 'req_001', method: 'GET',  url: '/api/users',      status: 200, durationMs: 43 },
  { id: 'req_002', method: 'POST', url: '/api/users',      status: 201, durationMs: 128 },
  { id: 'req_003', method: 'PUT',  url: '/api/users/42',   status: 200, durationMs: 67 },
  { id: 'req_004', method: 'DELETE', url: '/api/users/99', status: 404, durationMs: 12 },
];

const FLAT_CONFIG = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  debug: false,
  apiVersion: 'v2',
  rateLimit: 100,
};

const MIXED_TYPES = {
  stringVal: 'hello world',
  numberVal: 42,
  floatVal: 3.14159,
  boolTrue: true,
  boolFalse: false,
  nullVal: null,
  emptyArray: [],
  emptyObject: {},
  nestedArray: [1, 'two', null, { three: 3 }],
  nestedObject: { a: 1, b: [2, 3] },
};

export function JsonTreeViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Deeply Nested API Response"
        description="User object with nested address, geo, and notification preferences — defaultExpandDepth=2"
        code={`<JsonTreeView data={userResponse} name="response" defaultExpandDepth={2} />`}
      >
        <JsonTreeView data={USER_RESPONSE} name="response" defaultExpandDepth={2} />
      </ExampleCard>

      <ExampleCard
        title="Array of Objects — Request History"
        description="List of recent API requests — each item is an object with method, URL, status"
        code={`<JsonTreeView data={requestList} name="requests" defaultExpandDepth={1} />`}
      >
        <JsonTreeView data={REQUEST_LIST} name="requests" defaultExpandDepth={1} />
      </ExampleCard>

      <ExampleCard
        title="Flat Config Object — All Primitives"
        description="Simple key-value config with no nesting — collapser not needed but still renders cleanly"
        code={`<JsonTreeView data={flatConfig} name="config" defaultExpandDepth={99} />`}
      >
        <JsonTreeView data={FLAT_CONFIG} name="config" defaultExpandDepth={99} />
      </ExampleCard>

      <ExampleCard
        title="All Collapsed — defaultExpandDepth=0"
        description="Nothing expands automatically — user manually opens each node"
        code={`<JsonTreeView data={userResponse} name="response" defaultExpandDepth={0} />`}
      >
        <JsonTreeView data={USER_RESPONSE} name="response" defaultExpandDepth={0} />
      </ExampleCard>

      <ExampleCard
        title="All Expanded — defaultExpandDepth=99"
        description="Every node is open on mount — ideal for small response previews"
        code={`<JsonTreeView data={flatConfig} name="config" defaultExpandDepth={99} />`}
      >
        <JsonTreeView data={FLAT_CONFIG} name="config" defaultExpandDepth={99} />
      </ExampleCard>

      <ExampleCard
        title="Mixed Types — null, boolean, number, string, array, object"
        description="Exercises all value type renderers in a single tree"
        code={`<JsonTreeView data={mixedTypes} name="mixed" defaultExpandDepth={2} />`}
      >
        <JsonTreeView data={MIXED_TYPES} name="mixed" defaultExpandDepth={2} />
      </ExampleCard>
    </div>
  );
}
