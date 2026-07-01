import { useState } from 'react';
import { HudView } from '@/dui';
import {
  PlayIcon, StopSquareIcon, StepOverIcon, StepIntoIcon, StepOutIcon,
  RefreshIcon, CloseIcon, DbgContinueIcon, DbgStepOverIcon, DbgStepIntoIcon,
  DbgStepOutIcon, DbgStopIcon, DbgRestartIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function HudViewExamples() {
  const [paused, setPaused] = useState(true);
  const [running, setRunning] = useState(false);
  const [retried, setRetried] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Debug Toolbar"
        description="Continue / Step Over / Step Into / Step Out / Stop — like VS Code's floating debug bar"
        code={`<HudView
  contained
  items={[
    { id: 'continue',  icon: <DbgContinueIcon size={13} />, title: 'Continue (F5)',   onClick: () => {} },
    { id: 'stepover',  icon: <DbgStepOverIcon size={13} />, title: 'Step Over (F10)', onClick: () => {} },
    { id: 'stepinto',  icon: <DbgStepIntoIcon size={13} />, title: 'Step Into (F11)', onClick: () => {}, separator: true },
    { id: 'stepout',   icon: <DbgStepOutIcon  size={13} />, title: 'Step Out (⇧F11)', onClick: () => {} },
    { id: 'stop',      icon: <DbgStopIcon     size={13} />, title: 'Stop',            onClick: () => {} },
  ]}
  status="Paused at breakpoint"
/>`}
      >
        <div style={{ position: 'relative', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HudView
            contained
            items={[
              { id: 'continue', icon: <DbgContinueIcon size={13} />, title: 'Continue (F5)',   onClick: () => setPaused(false) },
              { id: 'stepover', icon: <DbgStepOverIcon size={13} />, title: 'Step Over (F10)', onClick: () => {} },
              { id: 'stepinto', icon: <DbgStepIntoIcon size={13} />, title: 'Step Into (F11)', onClick: () => {}, separator: true },
              { id: 'stepout',  icon: <DbgStepOutIcon  size={13} />, title: 'Step Out (⇧F11)', onClick: () => {} },
              { id: 'restart',  icon: <DbgRestartIcon  size={13} />, title: 'Restart',          onClick: () => {} },
              { id: 'stop',     icon: <DbgStopIcon     size={13} />, title: 'Stop',             onClick: () => {} },
            ]}
            status={paused ? 'Paused at line 42' : 'Running…'}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Runner HUD"
        description="Send / Cancel / Retry for an HTTP request runner — status reflects current state"
        code={`<HudView
  contained
  accentColor="var(--color-method-post)"
  items={[
    { id: 'send',   icon: <PlayIcon     size={13} />, title: 'Send Request', onClick: handleSend },
    { id: 'cancel', icon: <CloseIcon    size={13} />, title: 'Cancel',       onClick: handleCancel, separator: true },
    { id: 'retry',  icon: <RefreshIcon  size={13} />, title: 'Retry',        onClick: handleRetry },
  ]}
  status={running ? 'Sending…' : 'Ready'}
/>`}
      >
        <div style={{ position: 'relative', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HudView
            contained
            accentColor="var(--color-method-post)"
            items={[
              { id: 'send',   icon: <PlayIcon    size={13} />, title: 'Send Request', onClick: () => { setRunning(true); setRetried(false); setTimeout(() => setRunning(false), 1500); } },
              { id: 'cancel', icon: <CloseIcon   size={13} />, title: 'Cancel',       onClick: () => setRunning(false), separator: true },
              { id: 'retry',  icon: <RefreshIcon size={13} />, title: 'Retry',        onClick: () => { setRetried(true); setRunning(true); setTimeout(() => setRunning(false), 1500); } },
            ]}
            status={running ? (retried ? 'Retrying…' : 'Sending…') : 'Ready'}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Status: Paused at line 42"
        description="HUD with a paused status message and disabled continue button"
        code={`<HudView
  contained
  status="Paused at line 42"
  items={[
    { id: 'continue', icon: <DbgContinueIcon size={13} />, title: 'Continue', disabled: false },
    { id: 'stop',     icon: <DbgStopIcon     size={13} />, title: 'Stop',     onClick: () => {} },
  ]}
/>`}
      >
        <div style={{ position: 'relative', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HudView
            contained
            items={[
              { id: 'continue', icon: <DbgContinueIcon size={13} />, title: 'Continue' },
              { id: 'stepover', icon: <DbgStepOverIcon size={13} />, title: 'Step Over' },
              { id: 'stop',     icon: <DbgStopIcon     size={13} />, title: 'Stop', separator: true },
            ]}
            status="Paused at line 42"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Minimal HUD — 2 buttons"
        description="Just Play and Stop — smallest useful HUD configuration"
        code={`<HudView
  contained
  items={[
    { id: 'play', icon: <PlayIcon      size={13} />, title: 'Run',  onClick: () => {} },
    { id: 'stop', icon: <StopSquareIcon size={13} />, title: 'Stop', onClick: () => {} },
  ]}
/>`}
      >
        <div style={{ position: 'relative', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HudView
            contained
            items={[
              { id: 'play', icon: <PlayIcon       size={13} />, title: 'Run',  onClick: () => {} },
              { id: 'stop', icon: <StopSquareIcon size={13} />, title: 'Stop', onClick: () => {} },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color — gRPC purple"
        description="accentColor overrides the HUD icon tint and active states"
        code={`<HudView
  contained
  accentColor="var(--color-protocol-grpc)"
  items={[
    { id: 'run',    icon: <PlayIcon      size={13} />, title: 'Send Unary',    onClick: () => {} },
    { id: 'stream', icon: <StepOverIcon  size={13} />, title: 'Start Stream',  onClick: () => {}, separator: true },
    { id: 'stop',   icon: <StopSquareIcon size={13} />, title: 'Stop',         onClick: () => {} },
  ]}
  status="gRPC ready"
/>`}
      >
        <div style={{ position: 'relative', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HudView
            contained
            accentColor="var(--color-protocol-grpc)"
            items={[
              { id: 'run',    icon: <PlayIcon       size={13} />, title: 'Send Unary',   onClick: () => {} },
              { id: 'stream', icon: <StepOverIcon   size={13} />, title: 'Start Stream', onClick: () => {}, separator: true },
              { id: 'cancel', icon: <CloseIcon      size={13} />, title: 'Cancel',       onClick: () => {} },
              { id: 'stop',   icon: <StopSquareIcon size={13} />, title: 'Stop',         onClick: () => {} },
            ]}
            status="gRPC ready"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
