import { useState } from 'react';
import { FloatingLabelInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FloatingLabelInputViewExamples() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('https://api.daakia.io');
  const [password, setPassword] = useState('');

  return (
    <div>
      <ExampleCard
        title="Workspace Name (interactive)"
        description="Label floats above the field once focused or filled"
        code={`const [value, setValue] = useState('');

<FloatingLabelInputView label="Workspace name" value={value} onChange={setValue} />`}
      >
        <FloatingLabelInputView label="Workspace name" value={name} onChange={setName} />
      </ExampleCard>

      <ExampleCard
        title="Pre-filled Base URL"
        description="Value already present, so the label starts floated"
        code={`<FloatingLabelInputView label="Base URL" value="https://api.daakia.io" onChange={setUrl} />`}
      >
        <FloatingLabelInputView label="Base URL" value={url} onChange={setUrl} />
      </ExampleCard>

      <ExampleCard
        title="Password Field"
        description="type='password' masks input while still floating the label"
        code={`<FloatingLabelInputView label="Environment secret" type="password" value={password} onChange={setPassword} />`}
      >
        <FloatingLabelInputView label="Environment secret" type="password" value={password} onChange={setPassword} />
      </ExampleCard>

      <ExampleCard
        title="Size & Width Variants"
        description="sm / md / lg sizing with different width presets"
        code={`<FloatingLabelInputView label="Small" value="" onChange={() => {}} size="sm" width="sm" />
<FloatingLabelInputView label="Medium" value="" onChange={() => {}} size="md" width="md" />
<FloatingLabelInputView label="Full width" value="" onChange={() => {}} width="fullWidth" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FloatingLabelInputView label="Small" value="" onChange={() => {}} size="sm" width="sm" />
          <FloatingLabelInputView label="Medium" value="" onChange={() => {}} size="md" width="md" />
          <FloatingLabelInputView label="Full width" value="" onChange={() => {}} width="fullWidth" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled Field"
        description="Read-only environment variable that cannot be edited"
        code={`<FloatingLabelInputView label="Environment ID" value="env_prod_8841" onChange={() => {}} disabled />`}
      >
        <FloatingLabelInputView label="Environment ID" value="env_prod_8841" onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
