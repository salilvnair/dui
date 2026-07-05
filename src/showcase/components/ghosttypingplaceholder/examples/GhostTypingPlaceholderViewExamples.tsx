import { useState } from 'react';
import { GhostTypingPlaceholderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function GhostTypingPlaceholderViewExamples() {
  const [search, setSearch] = useState('');
  const [command, setCommand] = useState('');
  const [envVar, setEnvVar] = useState('');
  const [jql, setJql] = useState('');

  return (
    <div>
      <ExampleCard
        title="Global Search Box"
        description="Common default use — rotating example queries hint at what can be searched"
        code={`const [value, setValue] = useState('');

<GhostTypingPlaceholderView
  value={value}
  onChange={setValue}
  examples={['search users by email…', 'filter by status: active…', 'jump to request #4521…']}
/>`}
      >
        <GhostTypingPlaceholderView
          value={search}
          onChange={setSearch}
          examples={['search users by email…', 'filter by status: active…', 'jump to request #4521…']}
        />
      </ExampleCard>

      <ExampleCard
        title="Interactive: Typed Value Stops the Ghost Text"
        description="Once the user types a real value, the ghost animation pauses — shown live below"
        code={`const [value, setValue] = useState('');

<GhostTypingPlaceholderView
  value={value}
  onChange={setValue}
  examples={['npm run build', 'git commit -m "fix"', 'curl -X POST /api/deploy']}
/>
<div>Typed: {value || '(empty — ghost text animating)'}</div>`}
      >
        <GhostTypingPlaceholderView
          value={command}
          onChange={setCommand}
          examples={['npm run build', 'git commit -m "fix"', 'curl -X POST /api/deploy']}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Typed: {command || '(empty — ghost text animating)'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Faster Typing Speed and Custom Width"
        description="Tune the animation speed/pause and constrain the input width"
        code={`<GhostTypingPlaceholderView
  value=""
  onChange={() => {}}
  examples={['GET', 'POST', 'PUT']}
  speed={20}
  pause={600}
  width="sm"
/>`}
      >
        <GhostTypingPlaceholderView
          value=""
          onChange={() => {}}
          examples={['GET', 'POST', 'PUT']}
          speed={20}
          pause={600}
          width="sm"
        />
      </ExampleCard>

      <ExampleCard
        title="Environment Variable Name Input"
        description="API-testing domain use case — nudges users toward common env-var naming conventions"
        code={`const [name, setName] = useState('');

<GhostTypingPlaceholderView
  value={name}
  onChange={setName}
  examples={['BASE_URL', 'API_KEY', 'AUTH_TOKEN', 'TENANT_ID']}
  color="var(--color-info)"
/>`}
      >
        <GhostTypingPlaceholderView
          value={envVar}
          onChange={setEnvVar}
          examples={['BASE_URL', 'API_KEY', 'AUTH_TOKEN', 'TENANT_ID']}
          color="var(--color-info)"
        />
      </ExampleCard>

      <ExampleCard
        title="Edge Case: Single Example, No Rotation"
        description="With only one example the ghost text still types/pauses/backspaces in a loop rather than rotating"
        code={`<GhostTypingPlaceholderView
  value={jql}
  onChange={setJql}
  examples={['status = "Open" AND assignee = currentUser()']}
  borderRadius={12}
/>`}
      >
        <GhostTypingPlaceholderView
          value={jql}
          onChange={setJql}
          examples={['status = "Open" AND assignee = currentUser()']}
          borderRadius={12}
        />
      </ExampleCard>
    </div>
  );
}
