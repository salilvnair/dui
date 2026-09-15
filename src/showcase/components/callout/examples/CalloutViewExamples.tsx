import { CalloutView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CalloutViewExamples() {
  return (
    <>
      <ExampleCard
        title="The four variants"
        description="A titled block that interrupts the prose — each variant tinted and iconed for what it is"
        code={'<CalloutView variant="warning" title="Rate limited">Back off and retry.</CalloutView>'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <CalloutView variant="info" title="Every colour is a variable">
            Override a --color-* property on :root, or on one container to theme a single panel.
          </CalloutView>
          <CalloutView variant="tip" title="Filter or search?">
            If typing narrows something on screen use FilterInputView; if it collects a term you act
            on, use SearchFieldView.
          </CalloutView>
          <CalloutView variant="warning" title="This endpoint is rate limited">
            Sixty requests a minute per token. Beyond that you will get a 429 with a Retry-After.
          </CalloutView>
          <CalloutView variant="danger" title="Deleting a collection cannot be undone">
            Its requests, history and environments go with it.
          </CalloutView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Inside a narrow column"
        description="It takes the width it is given — the title wraps, the icon stays put"
        code={'<div style={{ maxWidth: 320 }}><CalloutView … /></div>'}
      >
        <div style={{ maxWidth: 340 }}>
          <CalloutView variant="tip" title="Monaco is optional">
            EditorView renders a plain-text fallback until you import the monaco-setup subpath.
          </CalloutView>
        </div>
      </ExampleCard>
    </>
  );
}
