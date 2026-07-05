import { useState } from 'react';
import { AlertDialogView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AlertDialogViewExamples() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [envOpen, setEnvOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(p => [msg, ...p].slice(0, 3));

  return (
    <div>
      <ExampleCard
        title="Danger Confirm (Delete Collection)"
        description="The standard destructive-action confirm dialog with a warning icon"
        code={`const [open, setOpen] = useState(false);
<ButtonView variant="danger" onClick={() => setOpen(true)}>Delete</ButtonView>
<AlertDialogView
  open={open}
  title="Delete collection?"
  message="This can't be undone."
  danger
  onConfirm={() => setOpen(false)}
  onCancel={() => setOpen(false)}
/>`}
      >
        <ButtonView variant="danger" onClick={() => setDeleteOpen(true)}>Delete Collection</ButtonView>
        <AlertDialogView
          open={deleteOpen}
          title="Delete collection?"
          message="This will permanently remove 'Payments API' and all 24 requests inside it. This can't be undone."
          danger
          onConfirm={() => { addLog('Collection deleted'); setDeleteOpen(false); }}
          onCancel={() => setDeleteOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Neutral Confirm (Log Out)"
        description="Non-destructive confirmations omit the danger prop for a primary-colored confirm button"
        code={`<AlertDialogView
  open={open}
  title="Log out?"
  message="You'll need to sign back in to access your workspaces."
  onConfirm={() => setOpen(false)}
  onCancel={() => setOpen(false)}
/>`}
      >
        <ButtonView variant="secondary" onClick={() => setLogoutOpen(true)}>Log Out</ButtonView>
        <AlertDialogView
          open={logoutOpen}
          title="Log out?"
          message="You'll need to sign back in to access your workspaces."
          onConfirm={() => { addLog('Logged out'); setLogoutOpen(false); }}
          onCancel={() => setLogoutOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Confirm/Cancel Labels"
        description="Override the default 'Confirm' / 'Cancel' button text for context-specific phrasing"
        code={`<AlertDialogView
  open={open}
  title="Discard unsaved changes?"
  message="Your edits to this request will be lost."
  confirmLabel="Discard"
  cancelLabel="Keep editing"
  danger
  onConfirm={() => setOpen(false)}
  onCancel={() => setOpen(false)}
/>`}
      >
        <ButtonView variant="ghost" onClick={() => setDiscardOpen(true)}>Close Tab</ButtonView>
        <AlertDialogView
          open={discardOpen}
          title="Discard unsaved changes?"
          message="Your edits to this request will be lost."
          confirmLabel="Discard"
          cancelLabel="Keep editing"
          danger
          onConfirm={() => { addLog('Changes discarded'); setDiscardOpen(false); }}
          onCancel={() => setDiscardOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Environment Switch Confirmation"
        description="API-testing domain example: confirm before switching to a production environment"
        code={`<AlertDialogView
  open={open}
  title="Switch to Production?"
  message="Requests sent from this tab will hit live production endpoints."
  confirmLabel="Switch"
  danger
  onConfirm={() => setOpen(false)}
  onCancel={() => setOpen(false)}
/>`}
      >
        <ButtonView variant="secondary" onClick={() => setEnvOpen(true)}>Switch to Production</ButtonView>
        <AlertDialogView
          open={envOpen}
          title="Switch to Production?"
          message="Requests sent from this tab will hit live production endpoints."
          confirmLabel="Switch"
          danger
          onConfirm={() => { addLog('Switched to Production'); setEnvOpen(false); }}
          onCancel={() => setEnvOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Escape-to-Cancel"
        description="Pressing Escape while open calls onCancel — try opening this dialog and pressing Esc"
        code={`useEffect(() => {
  if (!open) return;
  const handler = (e) => { if (e.key === 'Escape') onCancel(); };
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [open, onCancel]);`}
      >
        <ButtonView variant="secondary" onClick={() => setCustomOpen(true)}>Open Dialog</ButtonView>
        <AlertDialogView
          open={customOpen}
          title="Regenerate API key?"
          message="Existing integrations using the old key will stop working immediately."
          danger
          onConfirm={() => { addLog('API key regenerated'); setCustomOpen(false); }}
          onCancel={() => { addLog('Cancelled (Esc or Cancel button)'); setCustomOpen(false); }}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Log: {log.length > 0 ? log.join(' | ') : 'no actions yet'}
        </div>
      </ExampleCard>
    </div>
  );
}
