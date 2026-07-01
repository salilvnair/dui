import { useState } from 'react';
import { IconButtonView } from '@/dui';
import {
  CopyIcon, SendIcon, TrashIcon, RefreshIcon, CodeIcon, PlusIcon, CheckIcon,
  PinIcon, FilterIcon, SparkleIcon, SettingsIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function IconButtonViewExamples() {
  const [copied, setCopied]     = useState(false);
  const [pinned, setPinned]     = useState(false);
  const [filterOn, setFilterOn] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <ExampleCard
        title="Copy to Clipboard"
        description="CopyIcon swaps to CheckIcon for 1.5 s to confirm the action"
        code={`const [copied, setCopied] = useState(false);

const handleCopy = () => {
  setCopied(true);
  navigator.clipboard.writeText(value);
  setTimeout(() => setCopied(false), 1500);
};

<IconButtonView
  icon={copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
  tooltip={copied ? 'Copied!' : 'Copy'}
  accentColor={copied ? 'var(--color-success)' : undefined}
  active={copied}
  onClick={handleCopy}
/>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconButtonView
            icon={copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
            tooltip={copied ? 'Copied!' : 'Copy response'}
            accentColor={copied ? 'var(--color-success)' : undefined}
            active={copied}
            onClick={handleCopy}
          />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {copied ? 'Copied to clipboard!' : 'Click to copy'}
          </span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Send Request Button"
        description="Icon-only send button — used when space is tight next to the URL bar"
        code={`<IconButtonView
  icon={<SendIcon size={14} />}
  tooltip="Send request"
  variant="filled"
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <IconButtonView
          icon={<SendIcon size={14} />}
          tooltip="Send request"
          variant="filled"
          accentColor="var(--color-protocol-rest)"
        />
      </ExampleCard>

      <ExampleCard
        title="Toolbar Row"
        description="Response panel toolbar — Copy, Refresh, and Delete in a row"
        code={`<IconButtonView icon={<CopyIcon size={13} />}    tooltip="Copy response" />
<IconButtonView icon={<RefreshIcon size={13} />} tooltip="Re-send request" />
<IconButtonView icon={<CodeIcon size={13} />}    tooltip="View raw" />
<IconButtonView icon={<TrashIcon size={13} />}   tooltip="Clear response" />`}
      >
        <div style={{ display: 'flex', gap: 4 }}>
          <IconButtonView icon={<CopyIcon size={13} />}    tooltip="Copy response" onClick={handleCopy} />
          <IconButtonView icon={<RefreshIcon size={13} />} tooltip="Re-send request" />
          <IconButtonView icon={<CodeIcon size={13} />}    tooltip="View raw" />
          <IconButtonView icon={<TrashIcon size={13} />}   tooltip="Clear response" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Toggle Active State — Pin"
        description="Stateful toggle — accentColor lights up when active"
        code={`const [pinned, setPinned] = useState(false);

<IconButtonView
  icon={<PinIcon size={13} />}
  tooltip={pinned ? 'Unpin tab' : 'Pin tab'}
  active={pinned}
  accentColor="var(--color-protocol-rest)"
  onClick={() => setPinned(v => !v)}
/>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconButtonView
            icon={<PinIcon size={13} />}
            tooltip={pinned ? 'Unpin tab' : 'Pin tab'}
            active={pinned}
            accentColor="var(--color-protocol-rest)"
            onClick={() => setPinned(v => !v)}
          />
          <IconButtonView
            icon={<FilterIcon size={13} />}
            tooltip={filterOn ? 'Filters ON' : 'Toggle filters'}
            active={filterOn}
            accentColor="var(--color-warning)"
            onClick={() => setFilterOn(v => !v)}
          />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            Pin: {pinned ? 'ON' : 'OFF'} · Filter: {filterOn ? 'ON' : 'OFF'}
          </span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / default / md / lg / xl — all stay square, icon scales with button"
        code={`<IconButtonView icon={<PlusIcon size={10} />} size="sm"      tooltip="sm 22px" />
<IconButtonView icon={<PlusIcon size={12} />} size="default" tooltip="default 26px" />
<IconButtonView icon={<PlusIcon size={13} />} size="md"      tooltip="md 28px" />
<IconButtonView icon={<PlusIcon size={14} />} size="lg"      tooltip="lg 32px" />
<IconButtonView icon={<PlusIcon size={16} />} size="xl"      tooltip="xl 36px" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <IconButtonView icon={<PlusIcon size={10} />} size="sm"      tooltip="sm 22px" />
          <IconButtonView icon={<PlusIcon size={12} />} size="default" tooltip="default 26px" />
          <IconButtonView icon={<PlusIcon size={13} />} size="md"      tooltip="md 28px" />
          <IconButtonView icon={<PlusIcon size={14} />} size="lg"      tooltip="lg 32px" />
          <IconButtonView icon={<PlusIcon size={16} />} size="xl"      tooltip="xl 36px" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Non-interactive icons — greyed out with no hover or click"
        code={`<IconButtonView icon={<CopyIcon size={13} />}    disabled tooltip="Copy" />
<IconButtonView icon={<RefreshIcon size={13} />} disabled tooltip="Refresh" />
<IconButtonView icon={<TrashIcon size={13} />}   disabled tooltip="Delete" />`}
      >
        <div style={{ display: 'flex', gap: 4 }}>
          <IconButtonView icon={<CopyIcon size={13} />}      disabled tooltip="Copy" />
          <IconButtonView icon={<RefreshIcon size={13} />}   disabled tooltip="Refresh" />
          <IconButtonView icon={<TrashIcon size={13} />}     disabled tooltip="Delete" />
          <IconButtonView icon={<SettingsIcon size={13} />}  disabled tooltip="Settings" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Filled Variant — AI Assist"
        description="variant='filled' draws a filled background — use for prominent icon actions"
        code={`<IconButtonView
  icon={<SparkleIcon size={13} />}
  variant="filled"
  accentColor="var(--color-protocol-ai)"
  tooltip="AI Assist"
/>`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <IconButtonView
            icon={<SparkleIcon size={13} />}
            variant="filled"
            accentColor="var(--color-protocol-ai)"
            tooltip="AI Assist"
          />
          <IconButtonView
            icon={<CodeIcon size={13} />}
            variant="filled"
            accentColor="var(--color-protocol-graphql)"
            tooltip="Schema explorer"
          />
          <IconButtonView
            icon={<FilterIcon size={13} />}
            variant="filled"
            accentColor="var(--color-protocol-rest)"
            tooltip="Filter"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
