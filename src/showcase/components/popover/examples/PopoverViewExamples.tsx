import { useState } from 'react';
import { PopoverView, ButtonView, IconButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { SettingsIcon } from '../../../../icons';

export function PopoverViewExamples() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const [envOpen, setEnvOpen] = useState(false);
  const [envAnchor, setEnvAnchor] = useState<HTMLElement | null>(null);
  const [env, setEnv] = useState('Production');

  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
  const [placeOpen, setPlaceOpen] = useState(false);
  const [placeAnchor, setPlaceAnchor] = useState<HTMLElement | null>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState<HTMLElement | null>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Popover"
        description="Generic anchored floating content — the positioning engine behind SelectInputView/InfoPopupView"
        code={`function Preview() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  return (
    <span ref={setAnchor}>
      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>
      <PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>
        Any content here
      </PopoverView>
    </span>
  );
}`}
      >
        <span ref={setAnchor}>
          <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>
          <PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>
            <div style={{ fontSize: 12, color: 'var(--color-text-primary)' }}>Any content here</div>
          </PopoverView>
        </span>
      </ExampleCard>

      <ExampleCard
        title="Environment Switcher (interactive)"
        description="A realistic use case — click to pick an environment, popover closes on selection"
        code={`const [open, setOpen] = useState(false);
const [env, setEnv] = useState('Production');
const environments = ['Production', 'Staging', 'Local'];

<span ref={setAnchor}>
  <ButtonView onClick={() => setOpen(true)}>{env}</ButtonView>
  <PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>
    {environments.map(e => (
      <button key={e} onClick={() => { setEnv(e); setOpen(false); }}>{e}</button>
    ))}
  </PopoverView>
</span>`}
      >
        <span ref={setEnvAnchor}>
          <ButtonView onClick={() => setEnvOpen(true)} variant="secondary">{env}</ButtonView>
          <PopoverView open={envOpen} anchorEl={envAnchor} onClose={() => setEnvOpen(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140 }}>
              {['Production', 'Staging', 'Local'].map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => { setEnv(e); setEnvOpen(false); }}
                  style={{
                    textAlign: 'left', padding: '6px 8px', fontSize: 12, border: 'none', borderRadius: 4,
                    background: e === env ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)' : 'transparent',
                    color: e === env ? 'var(--color-primary)' : 'var(--color-text-primary)', cursor: 'pointer',
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </PopoverView>
        </span>
      </ExampleCard>

      <ExampleCard
        title="Placement Options"
        description="top / bottom / left / right relative to the anchor"
        code={`<PopoverView open={open} anchorEl={anchor} placement="right" onClose={() => setOpen(false)}>
  Positioned to the right
</PopoverView>`}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {(['top', 'bottom', 'left', 'right'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPlacement(p)}
              style={{ fontSize: 11, padding: '4px 8px', borderRadius: 4, border: '1px solid var(--color-surface-border)', background: placement === p ? 'var(--color-primary)' : 'transparent', color: placement === p ? '#fff' : 'var(--color-text-primary)', cursor: 'pointer' }}
            >
              {p}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <span ref={setPlaceAnchor}>
            <ButtonView onClick={() => setPlaceOpen(true)}>Open ({placement})</ButtonView>
            <PopoverView open={placeOpen} anchorEl={placeAnchor} placement={placement} onClose={() => setPlaceOpen(false)}>
              <div style={{ fontSize: 12 }}>Positioned {placement}</div>
            </PopoverView>
          </span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Icon Button Trigger"
        description="Attach a popover to a compact icon button, e.g. a per-request settings menu"
        code={`<span ref={setAnchor}>
  <IconButtonView icon={<SettingsIcon />} onClick={() => setOpen(true)} />
  <PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>
    Request settings...
  </PopoverView>
</span>`}
      >
        <span ref={setSettingsAnchor}>
          <IconButtonView icon={<SettingsIcon />} onClick={() => setSettingsOpen(true)} />
          <PopoverView open={settingsOpen} anchorEl={settingsAnchor} onClose={() => setSettingsOpen(false)}>
            <div style={{ fontSize: 12, minWidth: 160 }}>Request settings…</div>
          </PopoverView>
        </span>
      </ExampleCard>

      <ExampleCard
        title="No Anchor (edge case)"
        description="When anchorEl is null, the popover stays positioned off-screen until an anchor is provided"
        code={`<PopoverView open={true} anchorEl={null} onClose={() => {}}>
  Never actually visible without an anchor
</PopoverView>`}
      >
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
          With anchorEl=null, the popover has no position to compute from and stays hidden off-screen — always pair PopoverView with a ref-captured anchor element.
        </div>
      </ExampleCard>
    </div>
  );
}
