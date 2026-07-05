import { useState } from 'react';
import { DiffMorphView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function DiffMorphViewExamples() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
  const [schemaText, setSchemaText] = useState('{ "id": "string", "name": "string", "role": "admin" }');
  const [endpointText, setEndpointText] = useState('GET /api/v1/users?limit=10');

  return (
    <div>
      <ExampleCard
        title="Basic Edit Reflow (interactive)"
        description="Click Edit to change the text — unchanged words FLIP into position, changed words fade/strike"
        code={`const [text, setText] = useState('The quick brown fox jumps over the lazy dog');

<DiffMorphView text={text} />
<ButtonView onClick={() => setText('The quick red fox leaps over the sleepy dog')}>Edit</ButtonView>`}
      >
        <DiffMorphView text={text} />
        <ButtonView size="sm" style={{ marginTop: 8 }} onClick={() => setText(t => t.includes('red') ? 'The quick brown fox jumps over the lazy dog' : 'The quick red fox leaps over the sleepy dog')}>
          Edit
        </ButtonView>
      </ExampleCard>

      <ExampleCard
        title="Schema Field Rename"
        description="Realistic API-testing use case — visualize a schema edit between request builder saves"
        code={`const [schema, setSchema] = useState('{ "id": "string", "name": "string", "role": "admin" }');

<DiffMorphView text={schema} />
<ButtonView onClick={() => setSchema('{ "id": "string", "fullName": "string", "role": "member" }')}>
  Apply schema change
</ButtonView>`}
      >
        <DiffMorphView text={schemaText} />
        <ButtonView size="sm" style={{ marginTop: 8 }} onClick={() => setSchemaText(t => t.includes('fullName') ? '{ "id": "string", "name": "string", "role": "admin" }' : '{ "id": "string", "fullName": "string", "role": "member" }')}>
          Apply schema change
        </ButtonView>
      </ExampleCard>

      <ExampleCard
        title="Endpoint URL Edit"
        description="Small, single-token diff — good for showing precise word-level detection"
        code={`<DiffMorphView text="GET /api/v1/users?limit=10" />`}
      >
        <DiffMorphView text={endpointText} />
        <ButtonView size="sm" style={{ marginTop: 8 }} onClick={() => setEndpointText(t => t.includes('limit=10') ? 'GET /api/v2/users?limit=50' : 'GET /api/v1/users?limit=10')}>
          Change version + limit
        </ButtonView>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg font sizes for different display contexts"
        code={`<DiffMorphView text="Small diff text" size="sm" />
<DiffMorphView text="Medium diff text" size="md" />
<DiffMorphView text="Large diff text" size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <DiffMorphView text="Small diff text" size="sm" />
          <DiffMorphView text="Medium diff text" size="md" />
          <DiffMorphView text="Large diff text" size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty String (edge case)"
        description="No tokens to diff — renders an empty container without error"
        code={`<DiffMorphView text="" />`}
      >
        <div style={{ minHeight: 20, border: '1px dashed var(--color-surface-border)', borderRadius: 6, padding: 4 }}>
          <DiffMorphView text="" />
        </div>
      </ExampleCard>
    </div>
  );
}
