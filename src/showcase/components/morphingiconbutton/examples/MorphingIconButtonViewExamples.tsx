import { useState } from 'react';
import { MorphingIconButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MorphingIconButtonViewExamples() {
  const [playing, setPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(true);

  return (
    <div>
      <ExampleCard
        title="Mock Response Playback"
        description="Common default use — play/pause toggle for replaying a recorded WebSocket/SSE session"
        code={`const [playing, setPlaying] = useState(false);

<MorphingIconButtonView
  preset="play-pause"
  active={playing}
  onClick={() => setPlaying(p => !p)}
/>`}
      >
        <MorphingIconButtonView preset="play-pause" active={playing} onClick={() => setPlaying(p => !p)} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          State: <strong style={{ color: 'var(--color-text-primary)' }}>{playing ? 'playing' : 'paused'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive Sidebar Menu Toggle"
        description="Stateful example — menu icon morphs into a close (X) icon when the panel opens"
        code={`const [open, setOpen] = useState(false);

<MorphingIconButtonView
  preset="menu-close"
  active={open}
  onClick={() => setOpen(o => !o)}
/>`}
      >
        <MorphingIconButtonView preset="menu-close" active={menuOpen} onClick={() => setMenuOpen(o => !o)} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Sidebar: <strong style={{ color: 'var(--color-text-primary)' }}>{menuOpen ? 'open' : 'closed'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Theme Toggle (sun/moon)"
        description="All three presets side by side, with color overrides"
        code={`<MorphingIconButtonView preset="play-pause" active={false} onClick={() => {}} color="var(--color-success)" />
<MorphingIconButtonView preset="menu-close" active={true}  onClick={() => {}} color="var(--color-info)" />
<MorphingIconButtonView preset="sun-moon"   active={dark}  onClick={() => setDark(d => !d)} color="var(--color-warning)" />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <MorphingIconButtonView preset="play-pause" active={false} onClick={() => {}} color="var(--color-success)" />
          <MorphingIconButtonView preset="menu-close" active={true} onClick={() => {}} color="var(--color-info)" />
          <MorphingIconButtonView preset="sun-moon" active={dark} onClick={() => setDark(d => !d)} color="var(--color-warning)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Panel Collapse Control"
        description="API-testing domain use case — collapse the request-body editor to give the response panel more room"
        code={`const [collapsed, setCollapsed] = useState(true);

<MorphingIconButtonView
  preset="menu-close"
  active={collapsed}
  onClick={() => setCollapsed(c => !c)}
  size="sm"
/>`}
      >
        <MorphingIconButtonView preset="menu-close" active={colorMenuOpen} onClick={() => setColorMenuOpen(c => !c)} size="sm" />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Request body panel: <strong style={{ color: 'var(--color-text-primary)' }}>{colorMenuOpen ? 'collapsed' : 'expanded'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Edge case — button footprint (and inner icon) scales across all DUI sizes"
        code={`<MorphingIconButtonView preset="sun-moon" active={false} onClick={() => {}} size="xs" />
<MorphingIconButtonView preset="sun-moon" active={false} onClick={() => {}} size="md" />
<MorphingIconButtonView preset="sun-moon" active={false} onClick={() => {}} size="xl" />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <MorphingIconButtonView preset="sun-moon" active={false} onClick={() => {}} size="xs" />
          <MorphingIconButtonView preset="sun-moon" active={false} onClick={() => {}} size="md" />
          <MorphingIconButtonView preset="sun-moon" active={false} onClick={() => {}} size="xl" />
        </div>
      </ExampleCard>
    </div>
  );
}
