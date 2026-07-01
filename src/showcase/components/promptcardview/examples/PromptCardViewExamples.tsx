import { useState } from 'react';
import { PromptCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const REST_PROMPT = {
  id: 'rest-agent',
  title: 'REST API Agent',
  description: 'Generate REST requests from a plain-English description',
  content: 'You are a REST API expert. Given a description, produce a ready-to-send HTTP request…',
  protocol: 'REST',
  protocolColor: 'var(--color-protocol-rest)',
};

const GQL_PROMPT = {
  id: 'gql-builder',
  title: 'GraphQL Query Builder',
  description: 'Translate natural language into valid GraphQL queries',
  content: 'Given a description of data you need, write a GraphQL query…',
  protocol: 'GraphQL',
  protocolColor: 'var(--color-protocol-gql)',
};

const SOAP_PROMPT = {
  id: 'soap-explorer',
  title: 'SOAP WSDL Explorer',
  description: 'Parse a WSDL and explain available operations',
  content: 'You are a SOAP expert. Parse the provided WSDL and list all operations…',
  protocol: 'SOAP',
  protocolColor: 'var(--color-protocol-soap)',
};

const CUSTOM_PROMPT = {
  id: 'custom-auth',
  title: 'Auth Header Generator',
  description: 'Generate Bearer tokens and HMAC signatures',
  content: 'Generate the correct Authorization header given a scheme, key, and secret…',
  protocol: 'REST',
  protocolColor: 'var(--color-protocol-rest)',
  isCustom: true,
};

export function PromptCardViewExamples() {
  const [selected, setSelected] = useState<string | null>('rest-agent');

  const handleUse = (id: string) => alert(`Using prompt: ${id}`);
  const handleEdit = (id: string) => alert(`Editing prompt: ${id}`);
  const handleDelete = (id: string) => alert(`Deleting prompt: ${id}`);
  const handleCopy = (_id: string) => {};

  return (
    <div>
      <ExampleCard
        title="REST API Agent Card"
        description="Standard prompt card — hover to reveal Use / Copy / Edit / Delete actions"
        code={`<PromptCardView id="rest-agent" title="REST API Agent" protocol="REST" protocolColor="var(--color-protocol-rest)" onUse={handleUse} />`}
      >
        <PromptCardView
          {...REST_PROMPT}
          selected={selected === REST_PROMPT.id}
          onClick={setSelected}
          onUse={handleUse}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      </ExampleCard>

      <ExampleCard
        title="GraphQL Query Builder Card"
        description="Protocol chip auto-colors from protocolColor"
        code={`<PromptCardView {...GQL_PROMPT} onUse={handleUse} onEdit={handleEdit} />`}
      >
        <PromptCardView
          {...GQL_PROMPT}
          selected={selected === GQL_PROMPT.id}
          onClick={setSelected}
          onUse={handleUse}
          onEdit={handleEdit}
          onCopy={handleCopy}
        />
      </ExampleCard>

      <ExampleCard
        title="SOAP WSDL Explorer Card"
        description="SOAP protocol with distinct color chip"
        code={`<PromptCardView {...SOAP_PROMPT} onUse={handleUse} />`}
      >
        <PromptCardView
          {...SOAP_PROMPT}
          selected={selected === SOAP_PROMPT.id}
          onClick={setSelected}
          onUse={handleUse}
          onCopy={handleCopy}
        />
      </ExampleCard>

      <ExampleCard
        title="CUSTOM Badge Variant"
        description="User-created prompts show a CUSTOM badge alongside the protocol chip"
        code={`<PromptCardView {...prompt} isCustom onEdit={handleEdit} onDelete={handleDelete} />`}
      >
        <PromptCardView
          {...CUSTOM_PROMPT}
          selected={selected === CUSTOM_PROMPT.id}
          onClick={setSelected}
          onUse={handleUse}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      </ExampleCard>

      <ExampleCard
        title="Protocol-Colored Avatar"
        description="Avatar initials inherit accent from protocolColor — AI prompt example"
        code={`<PromptCardView id="ai" title="AI Copilot" accentColor="var(--color-protocol-ai)" protocol="AI" />`}
      >
        <PromptCardView
          id="ai-copilot"
          title="AI Copilot Assistant"
          description="General-purpose AI assistant for API development"
          content=""
          protocol="AI"
          protocolColor="var(--color-protocol-ai)"
          accentColor="var(--color-protocol-ai)"
          selected={selected === 'ai-copilot'}
          onClick={setSelected}
          onUse={handleUse}
          onCopy={handleCopy}
        />
      </ExampleCard>
    </div>
  );
}
