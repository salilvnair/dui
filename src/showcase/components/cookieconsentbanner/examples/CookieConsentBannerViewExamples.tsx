import { useState } from 'react';
import { CookieConsentBannerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CookieConsentBannerViewExamples() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Consent Banner"
        description="Default message with accept-only action"
        code={`function Preview() {
  const [open, setOpen] = useState(true);
  return <CookieConsentBannerView open={open} onAccept={() => setOpen(false)} />;
}`}
      >
        <div style={{ position: 'relative', height: 90, border: '1px dashed var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          {!open1 && (
            <button type="button" onClick={() => setOpen1(true)} style={{ margin: 12, fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Reset banner
            </button>
          )}
          <div style={{ position: 'absolute', inset: 0 }}>
            <CookieConsentBannerView open={open1} onAccept={() => setOpen1(false)} style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }} />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Accept + Customize Actions"
        description="Interactive banner with both accept and customize handlers wired up"
        code={`function Preview() {
  const [open, setOpen] = useState(true);
  return (
    <CookieConsentBannerView
      open={open}
      onAccept={() => setOpen(false)}
      onCustomize={() => alert('Open preferences modal')}
    />
  );
}`}
      >
        <div style={{ position: 'relative', height: 90, border: '1px dashed var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          {!open2 && (
            <button type="button" onClick={() => setOpen2(true)} style={{ margin: 12, fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Reset banner
            </button>
          )}
          <div style={{ position: 'absolute', inset: 0 }}>
            <CookieConsentBannerView
              open={open2}
              onAccept={() => setOpen2(false)}
              onCustomize={() => {}}
              style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}
            />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Message for a Docs Site"
        description="Override the message to reference a privacy policy link context"
        code={`<CookieConsentBannerView
  open
  message="This site uses cookies for analytics and to remember your API playground settings."
  onAccept={accept}
  onCustomize={customize}
/>`}
      >
        <div style={{ position: 'relative', height: 90, border: '1px dashed var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <CookieConsentBannerView
            open
            message="This site uses cookies for analytics and to remember your API playground settings."
            onAccept={() => {}}
            onCustomize={() => {}}
            style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Match the accept button to a brand color"
        code={`<CookieConsentBannerView open onAccept={accept} color="var(--color-protocol-graphql)" />`}
      >
        <div style={{ position: 'relative', height: 90, border: '1px dashed var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <CookieConsentBannerView open onAccept={() => {}} color="var(--color-protocol-graphql)" style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Closed State (No Render)"
        description="Edge case — open=false renders nothing at all, useful once consent has already been recorded"
        code={`const [choice, setChoice] = useState<string | null>(null);

<CookieConsentBannerView open={!choice} onAccept={() => setChoice('accepted')} onCustomize={() => setChoice('customized')} />
{choice && <div>Consent recorded: {choice}</div>}`}
      >
        <div style={{ position: 'relative', minHeight: 40 }}>
          <CookieConsentBannerView open={!choice} onAccept={() => setChoice('accepted')} onCustomize={() => setChoice('customized')} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          {choice && <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Consent recorded: {choice}</div>}
        </div>
      </ExampleCard>
    </div>
  );
}
