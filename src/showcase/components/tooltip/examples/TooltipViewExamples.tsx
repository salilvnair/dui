import { useState } from 'react';
import { TooltipView, IconButtonView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { CopyIcon, SendIcon } from '../../../../icons';

export function TooltipViewExamples() {
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

  return (
    <div>
      <ExampleCard
        title="Basic Tooltip on Icon Button"
        description="Hover or focus reveals the tooltip after the delay"
        code={`<TooltipView content="Copy to clipboard" placement="top">
  <span><IconButtonView icon={<CopyIcon />} /></span>
</TooltipView>`}
      >
        <TooltipView content="Copy to clipboard" placement="top">
          <span><IconButtonView icon={<CopyIcon />} /></span>
        </TooltipView>
      </ExampleCard>

      <ExampleCard
        title="Send Button with Shortcut Hint (interactive)"
        description="A realistic API-client tooltip surfacing a keyboard shortcut"
        code={`<TooltipView content="Send request (⌘⏎)" placement="bottom">
  <span><ButtonView iconLeft={<SendIcon />}>Send</ButtonView></span>
</TooltipView>`}
      >
        <TooltipView content="Send request (Cmd+Enter)" placement="bottom">
          <span><ButtonView iconLeft={<SendIcon size={14} />}>Send</ButtonView></span>
        </TooltipView>
      </ExampleCard>

      <ExampleCard
        title="Placement Options"
        description="top / bottom / left / right around the trigger"
        code={`<TooltipView content="Positioned right" placement="right">
  <span><ButtonView variant="ghost">Hover me</ButtonView></span>
</TooltipView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
          <TooltipView content={`Positioned ${placement}`} placement={placement}>
            <span><ButtonView variant="ghost">Hover me</ButtonView></span>
          </TooltipView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Delay"
        description="delay controls the ms before showing on hover/focus — shorter for frequent-use controls"
        code={`<TooltipView content="Instant" delay={0}>
  <span><ButtonView variant="ghost">delay=0</ButtonView></span>
</TooltipView>
<TooltipView content="Slow to appear" delay={800}>
  <span><ButtonView variant="ghost">delay=800</ButtonView></span>
</TooltipView>`}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <TooltipView content="Instant" delay={0}>
            <span><ButtonView variant="ghost">delay=0</ButtonView></span>
          </TooltipView>
          <TooltipView content="Slow to appear" delay={800}>
            <span><ButtonView variant="ghost">delay=800</ButtonView></span>
          </TooltipView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled Tooltip"
        description="disabled suppresses the tooltip entirely, e.g. when the hint is redundant with a visible label"
        code={`<TooltipView content="This will never show" disabled>
  <span><ButtonView variant="ghost">Hover — nothing happens</ButtonView></span>
</TooltipView>`}
      >
        <TooltipView content="This will never show" disabled>
          <span><ButtonView variant="ghost">Hover — nothing happens</ButtonView></span>
        </TooltipView>
      </ExampleCard>
    </div>
  );
}
