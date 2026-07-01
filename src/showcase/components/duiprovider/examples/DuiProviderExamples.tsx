import { DuiProvider, ButtonView, TextInputView, SelectInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const METHOD_OPTIONS = [
  { value: 'GET',    label: 'GET' },
  { value: 'POST',   label: 'POST' },
  { value: 'PUT',    label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

function SampleForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SelectInputView
        options={METHOD_OPTIONS}
        value="GET"
        onChange={() => {}}
        placeholder="Method"
      />
      <TextInputView
        value=""
        onChange={() => {}}
        placeholder="https://api.example.com/users"
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <ButtonView variant="primary">Send</ButtonView>
        <ButtonView variant="ghost">Clear</ButtonView>
      </div>
    </div>
  );
}

export function DuiProviderExamples() {
  return (
    <div>
      <ExampleCard
        title="Size sm — Compact Form"
        description="All inputs and buttons shrink to sm height (24px)"
        code={`<DuiProvider size="sm">
  <SelectInputView options={METHOD_OPTIONS} value="GET" onChange={() => {}} />
  <TextInputView value="" onChange={() => {}} placeholder="URL" />
  <ButtonView variant="primary">Send</ButtonView>
</DuiProvider>`}
      >
        <DuiProvider size="sm">
          <SampleForm />
        </DuiProvider>
      </ExampleCard>

      <ExampleCard
        title="Size md — Default"
        description="System default size (28px). No DuiProvider needed — shown explicitly for comparison."
        code={`<DuiProvider size="md">
  <SelectInputView options={METHOD_OPTIONS} value="GET" onChange={() => {}} />
  <TextInputView value="" onChange={() => {}} placeholder="URL" />
  <ButtonView variant="primary">Send</ButtonView>
</DuiProvider>`}
      >
        <DuiProvider size="md">
          <SampleForm />
        </DuiProvider>
      </ExampleCard>

      <ExampleCard
        title="Size lg — Large Form"
        description="Inputs and buttons grow to lg height (36px) — better for accessibility or onboarding screens"
        code={`<DuiProvider size="lg">
  <SelectInputView options={METHOD_OPTIONS} value="GET" onChange={() => {}} />
  <TextInputView value="" onChange={() => {}} placeholder="URL" />
  <ButtonView variant="primary">Send</ButtonView>
</DuiProvider>`}
      >
        <DuiProvider size="lg">
          <SampleForm />
        </DuiProvider>
      </ExampleCard>

      <ExampleCard
        title="Nested DuiProviders — Outer lg, Inner sm"
        description="The inner provider overrides only its subtree. The outer label row stays lg."
        code={`<DuiProvider size="lg">
  <TextInputView value="" onChange={() => {}} placeholder="Outer lg input" />
  <DuiProvider size="sm">
    <TextInputView value="" onChange={() => {}} placeholder="Inner sm input" />
    <ButtonView variant="ghost">Inner sm button</ButtonView>
  </DuiProvider>
  <ButtonView variant="primary">Outer lg button</ButtonView>
</DuiProvider>`}
      >
        <DuiProvider size="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TextInputView value="" onChange={() => {}} placeholder="Outer lg input" />
            <DuiProvider size="sm">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '8px 10px', borderRadius: 6, border: '1px dashed var(--color-surface-border)' }}>
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Inner sm provider</span>
                <TextInputView value="" onChange={() => {}} placeholder="Inner sm input" />
                <ButtonView variant="ghost">Inner sm button</ButtonView>
              </div>
            </DuiProvider>
            <ButtonView variant="primary">Outer lg button</ButtonView>
          </div>
        </DuiProvider>
      </ExampleCard>

      <ExampleCard
        title="Side-by-Side Size Comparison"
        description="xs / sm / md / lg sizes rendered in one view"
        code={`['xs','sm','md','lg'].map(size => (
  <DuiProvider key={size} size={size}>
    <ButtonView variant="primary">{size}</ButtonView>
  </DuiProvider>
))`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
            <DuiProvider key={size} size={size}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{size}</span>
                <ButtonView variant="primary">Send</ButtonView>
              </div>
            </DuiProvider>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="DuiProvider with Custom Active Color"
        description="Propagates a brand accent color down to all interactive DUI components"
        code={`<DuiProvider size="sm" activeColor="var(--color-protocol-graphql)">
  <ButtonView variant="primary">Query</ButtonView>
  <TextInputView value="" onChange={() => {}} placeholder="Query endpoint" />
</DuiProvider>`}
      >
        <DuiProvider size="sm" activeColor="var(--color-protocol-graphql)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TextInputView value="" onChange={() => {}} placeholder="GraphQL endpoint" />
            <div style={{ display: 'flex', gap: 8 }}>
              <ButtonView variant="primary">Query</ButtonView>
              <ButtonView variant="ghost">Introspect</ButtonView>
            </div>
          </div>
        </DuiProvider>
      </ExampleCard>
    </div>
  );
}
