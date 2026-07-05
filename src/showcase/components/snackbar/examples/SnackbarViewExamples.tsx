import { useState } from 'react';
import { SnackbarView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SnackbarViewExamples() {
  const [basicOpen, setBasicOpen] = useState(true);
  const [savedOpen, setSavedOpen] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [sentOpen, setSentOpen] = useState(true);
  const [persistOpen, setPersistOpen] = useState(true);
  const [errorOpen, setErrorOpen] = useState(true);

  return (
    <div>
      <ExampleCard
        title="Default Snackbar"
        description="Single-line bottom bar with an action, auto-dismisses after 4s"
        code={`const [open, setOpen] = useState(true);

<SnackbarView
  open={open}
  message="Environment saved"
  actionLabel="Undo"
  onAction={() => {}}
  onClose={() => setOpen(false)}
/>`}
      >
        <div style={{ position: 'relative', minHeight: 60 }}>
          <ButtonView onClick={() => setBasicOpen(true)} disabled={basicOpen}>Show Snackbar</ButtonView>
          {basicOpen && (
            <div style={{ marginTop: 12 }}>
              <SnackbarView
                open={basicOpen}
                message="Environment saved"
                actionLabel="Undo"
                onAction={() => {}}
                onClose={() => setBasicOpen(false)}
              />
            </div>
          )}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Save Confirmation (interactive)"
        description="Trigger a snackbar from a save action, with an Undo handler that records what happened"
        code={`const [open, setOpen] = useState(false);
const [last, setLast] = useState('');

<ButtonView onClick={() => setOpen(true)}>Save Environment</ButtonView>
{open && (
  <SnackbarView
    open={open}
    message="Environment 'Production' saved"
    actionLabel="Undo"
    onAction={() => setLast('Undo clicked')}
    onClose={() => setOpen(false)}
  />
)}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ButtonView onClick={() => setSavedOpen(true)}>Save Environment</ButtonView>
          {savedOpen && (
            <SnackbarView
              open={savedOpen}
              message="Environment 'Production' saved"
              actionLabel="Undo"
              onAction={() => setLastAction('Undo clicked')}
              onClose={() => setSavedOpen(false)}
            />
          )}
          {lastAction && <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{lastAction}</span>}
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Action Button"
        description="Plain informational message, no action label — still auto-dismisses"
        code={`<SnackbarView open={true} message="Request sent to 3 environments" onClose={() => {}} />`}
      >
        <SnackbarView open={sentOpen} message="Request sent to 3 environments" onClose={() => setSentOpen(false)} />
      </ExampleCard>

      <ExampleCard
        title="Persistent (no auto-dismiss)"
        description="Set duration={0} to disable the auto-dismiss timer entirely — useful for messages requiring explicit acknowledgement"
        code={`<SnackbarView
  open={true}
  message="Collection export failed — check disk permissions"
  duration={0}
  color="var(--color-error)"
  onClose={() => {}}
/>`}
      >
        <SnackbarView
          open={persistOpen}
          message="Collection export failed — check disk permissions"
          duration={0}
          color="var(--color-error)"
          onClose={() => setPersistOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Width and Color (error variant)"
        description="width + color props for a wider, semantically-colored bar"
        code={`<SnackbarView
  open={true}
  message="Webhook delivery failed after 3 attempts"
  actionLabel="Retry"
  onAction={() => {}}
  color="var(--color-error)"
  width="lg"
  onClose={() => {}}
/>`}
      >
        <SnackbarView
          open={errorOpen}
          message="Webhook delivery failed after 3 attempts"
          actionLabel="Retry"
          onAction={() => {}}
          color="var(--color-error)"
          width="lg"
          onClose={() => setErrorOpen(false)}
        />
      </ExampleCard>
    </div>
  );
}
