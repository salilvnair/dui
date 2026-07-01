import { useState } from 'react';
import { ButtonView } from '@/dui';
import { PlayIcon, SaveIcon, TrashIcon, RefreshIcon, CheckIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ButtonViewExamples() {
  const [loading, setLoading] = useState(false);
  const [deleteStep, setDeleteStep] = useState<'idle' | 'confirm'>('idle');

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleDelete = () => {
    if (deleteStep === 'idle') {
      setDeleteStep('confirm');
    } else {
      setDeleteStep('idle');
      alert('Deleted!');
    }
  };

  return (
    <div>
      <ExampleCard
        title="Variant Row"
        description="Four variants for every use case — primary, secondary, ghost, danger"
        code={`<ButtonView variant="primary">Send</ButtonView>
<ButtonView variant="secondary">Save</ButtonView>
<ButtonView variant="ghost">Cancel</ButtonView>
<ButtonView variant="danger">Delete</ButtonView>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ButtonView variant="primary">Send</ButtonView>
          <ButtonView variant="secondary">Save</ButtonView>
          <ButtonView variant="ghost">Cancel</ButtonView>
          <ButtonView variant="danger">Delete</ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Loading State"
        description="Spinner replaces content while request is in-flight — click to demo"
        code={`const [loading, setLoading] = useState(false);

const handleSend = () => {
  setLoading(true);
  // reset after response
};

<ButtonView
  variant="primary"
  accentColor="var(--color-protocol-rest)"
  loading={loading}
  onClick={handleSend}
  iconLeft={<PlayIcon size={11} />}
>
  Send
</ButtonView>`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ButtonView
            variant="primary"
            accentColor="var(--color-protocol-rest)"
            loading={loading}
            onClick={handleSend}
            iconLeft={<PlayIcon size={11} />}
          >
            {loading ? 'Sending…' : 'Send'}
          </ButtonView>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {loading ? 'Request in flight…' : 'Click to simulate'}
          </span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Icons"
        description="iconLeft and iconRight props — sized to match the button height"
        code={`<ButtonView variant="primary"   iconLeft={<PlayIcon size={11} />}>Send</ButtonView>
<ButtonView variant="secondary" iconLeft={<SaveIcon size={11} />}>Save</ButtonView>
<ButtonView variant="ghost"     iconLeft={<RefreshIcon size={11} />}>Refresh</ButtonView>
<ButtonView variant="danger"    iconLeft={<TrashIcon size={11} />}>Delete</ButtonView>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ButtonView variant="primary"   iconLeft={<PlayIcon size={11} />}>Send</ButtonView>
          <ButtonView variant="secondary" iconLeft={<SaveIcon size={11} />}>Save</ButtonView>
          <ButtonView variant="ghost"     iconLeft={<RefreshIcon size={11} />}>Refresh</ButtonView>
          <ButtonView variant="danger"    iconLeft={<TrashIcon size={11} />}>Delete</ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / default / md / lg / xl — choose the size that fits the toolbar row"
        code={`<ButtonView variant="primary" size="sm">SM</ButtonView>
<ButtonView variant="primary" size="default">Default</ButtonView>
<ButtonView variant="primary" size="md">MD</ButtonView>
<ButtonView variant="primary" size="lg">LG</ButtonView>
<ButtonView variant="primary" size="xl">XL</ButtonView>`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonView variant="primary" size="sm">SM 22px</ButtonView>
          <ButtonView variant="primary" size="default">Default 26px</ButtonView>
          <ButtonView variant="primary" size="md">MD 28px</ButtonView>
          <ButtonView variant="primary" size="lg">LG 32px</ButtonView>
          <ButtonView variant="primary" size="xl">XL 36px</ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Greyed out — non-interactive, no hover or click events"
        code={`<ButtonView variant="primary"   disabled>Send</ButtonView>
<ButtonView variant="secondary" disabled>Save</ButtonView>
<ButtonView variant="ghost"     disabled>Cancel</ButtonView>
<ButtonView variant="danger"    disabled>Delete</ButtonView>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ButtonView variant="primary"   disabled>Send</ButtonView>
          <ButtonView variant="secondary" disabled>Save</ButtonView>
          <ButtonView variant="ghost"     disabled>Cancel</ButtonView>
          <ButtonView variant="danger"    disabled>Delete</ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Delete Confirmation (Two-Step)"
        description="First click arms the button; second click confirms — prevents accidental deletes"
        code={`const [step, setStep] = useState<'idle' | 'confirm'>('idle');

<ButtonView
  variant={step === 'confirm' ? 'danger' : 'ghost'}
  iconLeft={step === 'confirm' ? <TrashIcon size={11} /> : undefined}
  onClick={() => {
    if (step === 'idle') setStep('confirm');
    else { doDelete(); setStep('idle'); }
  }}
>
  {step === 'confirm' ? 'Confirm Delete' : 'Delete'}
</ButtonView>`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ButtonView
            variant={deleteStep === 'confirm' ? 'danger' : 'ghost'}
            iconLeft={deleteStep === 'confirm' ? <TrashIcon size={11} /> : undefined}
            onClick={handleDelete}
          >
            {deleteStep === 'confirm' ? 'Confirm Delete' : 'Delete'}
          </ButtonView>
          {deleteStep === 'confirm' && (
            <ButtonView variant="ghost" onClick={() => setDeleteStep('idle')}>
              Cancel
            </ButtonView>
          )}
          {deleteStep === 'confirm' && (
            <span style={{ fontSize: 11, color: 'var(--color-error)' }}>Click again to confirm</span>
          )}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Submit / Cancel Pair"
        description="Standard modal footer layout — primary action on the right"
        code={`<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
  <ButtonView variant="ghost">Cancel</ButtonView>
  <ButtonView variant="primary" iconLeft={<CheckIcon size={11} />}>Save Changes</ButtonView>
</div>`}
      >
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <ButtonView variant="ghost">Cancel</ButtonView>
          <ButtonView variant="primary" iconLeft={<CheckIcon size={11} />}>Save Changes</ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Protocol Accent Colors"
        description="accentColor tints the primary button to match the active protocol"
        code={`<ButtonView variant="primary" accentColor="var(--color-protocol-rest)">Send REST</ButtonView>
<ButtonView variant="primary" accentColor="var(--color-protocol-graphql)">Run GQL</ButtonView>
<ButtonView variant="primary" accentColor="var(--color-protocol-websocket)">Connect WS</ButtonView>
<ButtonView variant="primary" accentColor="var(--color-protocol-grpc)">Invoke gRPC</ButtonView>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ButtonView variant="primary" accentColor="var(--color-protocol-rest)"      iconLeft={<PlayIcon size={11} />}>Send REST</ButtonView>
          <ButtonView variant="primary" accentColor="var(--color-protocol-graphql)"   iconLeft={<PlayIcon size={11} />}>Run GQL</ButtonView>
          <ButtonView variant="primary" accentColor="var(--color-protocol-websocket)" iconLeft={<PlayIcon size={11} />}>Connect WS</ButtonView>
          <ButtonView variant="primary" accentColor="var(--color-protocol-grpc)"      iconLeft={<PlayIcon size={11} />}>Invoke gRPC</ButtonView>
          <ButtonView variant="primary" accentColor="var(--color-protocol-soap)"      iconLeft={<PlayIcon size={11} />}>Call SOAP</ButtonView>
        </div>
      </ExampleCard>
    </div>
  );
}
