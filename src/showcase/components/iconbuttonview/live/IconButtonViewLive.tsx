import { useState } from 'react';
import { IconButtonView } from '@/dui';
import {
  MoreHorizontalIcon, MoreVerticalIcon, PlusIcon, SparkleIcon, DownloadIcon, ExportIcon,
  InfoCircleIcon, RefreshIcon, TrashIcon, FilterIcon, CodeIcon, WandIcon, SettingsIcon,
  SearchIcon, SaveIcon, CopyIcon, CheckIcon,
} from '@/icons/daakia-icons';
import { Row } from '../../../shared/Row';

const PROTOCOLS = [
  { label: 'REST',      color: 'var(--color-protocol-rest)',      badge: 'REST' },
  { label: 'GraphQL',   color: 'var(--color-protocol-graphql)',   badge: 'GQL' },
  { label: 'WebSocket', color: 'var(--color-protocol-websocket)', badge: 'WS'  },
  { label: 'gRPC',      color: 'var(--color-protocol-grpc)',      badge: 'gRPC' },
  { label: 'SOAP',      color: 'var(--color-protocol-soap)',      badge: 'SOAP' },
  { label: 'MQTT',      color: 'var(--color-protocol-mqtt)',      badge: 'MQTT' },
  { label: 'SSE',       color: 'var(--color-protocol-sse)',       badge: 'SSE'  },
  { label: 'MCP',       color: 'var(--color-protocol-mcp)',       badge: 'MCP'  },
  { label: 'AI',        color: 'var(--color-protocol-ai)',        badge: 'AI'   },
];

export function IconButtonViewLive() {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);

  return (
    <div>
      <Row label="Common icon buttons (ghost, 26px default)" gap={4} code={`<IconButtonView icon={<MoreHorizontalIcon size={14} />} tooltip="More actions" />\n<IconButtonView icon={<PlusIcon size={14} />} tooltip="Add" />\n<IconButtonView icon={<SparkleIcon size={14} />} tooltip="AI Assist" accentColor="var(--color-protocol-ai)" />\n<IconButtonView icon={<TrashIcon size={14} />} tooltip="Delete" />`}>
        <IconButtonView icon={<MoreHorizontalIcon size={14} />} tooltip="More actions" />
        <IconButtonView icon={<MoreVerticalIcon size={14} />} tooltip="More actions (vertical)" />
        <IconButtonView icon={<PlusIcon size={14} />} tooltip="Add" />
        <IconButtonView icon={<SparkleIcon size={14} />} tooltip="AI Assist" accentColor="var(--color-protocol-ai)" />
        <IconButtonView icon={<DownloadIcon size={14} />} tooltip="Import" />
        <IconButtonView icon={<ExportIcon size={14} />} tooltip="Export" />
        <IconButtonView icon={<InfoCircleIcon size={14} />} tooltip="Help" />
        <IconButtonView icon={<RefreshIcon size={14} />} tooltip="Refresh" />
        <IconButtonView icon={<TrashIcon size={14} />} tooltip="Delete" />
        <IconButtonView icon={<FilterIcon size={14} />} tooltip="Filter" />
        <IconButtonView icon={<CodeIcon size={14} />} tooltip="Code view" />
        <IconButtonView icon={<WandIcon size={14} />} tooltip="Generate" />
        <IconButtonView icon={<SettingsIcon size={14} />} tooltip="Settings" />
        <IconButtonView icon={<SearchIcon size={14} />} tooltip="Search" />
        <IconButtonView icon={<SaveIcon size={14} />} tooltip="Save" />
        <IconButtonView icon={<CopyIcon size={14} />} tooltip="Copy" />
      </Row>
      <Row label="Sizes  sm(22px) · default(26px) · md(28px) · lg(32px) · xl(36px)" gap={8} code={`<IconButtonView icon={<PlusIcon size={10} />} size="sm"      tooltip="sm 22px" />\n<IconButtonView icon={<PlusIcon size={12} />} size="default" tooltip="default 26px" />\n<IconButtonView icon={<PlusIcon size={13} />} size="md"      tooltip="md 28px" />\n<IconButtonView icon={<PlusIcon size={14} />} size="lg"      tooltip="lg 32px" />\n<IconButtonView icon={<PlusIcon size={16} />} size="xl"      tooltip="xl 36px" />`}>
        <IconButtonView icon={<PlusIcon size={10} />} size="sm"      tooltip="sm 22px" />
        <IconButtonView icon={<PlusIcon size={12} />} size="default" tooltip="default 26px" />
        <IconButtonView icon={<PlusIcon size={13} />} size="md"      tooltip="md 28px" />
        <IconButtonView icon={<PlusIcon size={14} />} size="lg"      tooltip="lg 32px" />
        <IconButtonView icon={<PlusIcon size={16} />} size="xl"      tooltip="xl 36px" />
      </Row>
      <Row label="active toggle — click to toggle" gap={12} code={`<IconButtonView\n  icon={<FilterIcon size={13} />}\n  active={active}\n  accentColor="var(--color-protocol-rest)"\n  tooltip={active ? 'Filters ON' : 'Filters OFF'}\n  onClick={() => setActive(v => !v)}\n/>`}>
        <IconButtonView
          icon={<FilterIcon size={13} />}
          active={active}
          accentColor="var(--color-protocol-rest)"
          tooltip={active ? 'Filters ON' : 'Filters OFF'}
          onClick={() => setActive(v => !v)}
        />
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Filter: <strong style={{ color: active ? 'var(--color-protocol-rest)' : 'var(--color-text-primary)' }}>{active ? 'ON' : 'OFF'}</strong></span>

        <IconButtonView
          icon={<CheckIcon size={13} />}
          active={active2}
          accentColor="var(--color-success)"
          tooltip={active2 ? 'Verified' : 'Not verified'}
          onClick={() => setActive2(v => !v)}
        />
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Verified: <strong style={{ color: active2 ? 'var(--color-success)' : 'var(--color-text-primary)' }}>{active2 ? 'YES' : 'NO'}</strong></span>
      </Row>
      <Row label='variant="filled"' gap={8} code={`<IconButtonView icon={<SparkleIcon size={13} />} variant="filled" accentColor="var(--color-protocol-ai)" tooltip="AI Assist" />\n<IconButtonView icon={<PlayIcon size={13} />}    variant="filled" accentColor="var(--color-success)" tooltip="Run" />\n<IconButtonView icon={<SettingsIcon size={13} />} variant="filled" tooltip="Settings" />`}>
        <IconButtonView icon={<SparkleIcon size={13} />} variant="filled" accentColor="var(--color-protocol-ai)"        tooltip="AI Assist" />
        <IconButtonView icon={<FilterIcon size={13} />}  variant="filled" accentColor="var(--color-protocol-graphql)"   tooltip="GQL filter" />
        <IconButtonView icon={<SettingsIcon size={13} />} variant="filled"                                               tooltip="Settings" />
      </Row>
      <Row label="Protocol accents" gap={8} code={`{PROTOCOLS.map(p => (\n  <IconButtonView key={p.label} icon={<SparkleIcon size={13} />} accentColor={p.color} tooltip={p.label} />\n))}`}>
        {PROTOCOLS.map(p => (
          <IconButtonView key={p.label} icon={<SparkleIcon size={13} />} accentColor={p.color} tooltip={`${p.label} AI`} />
        ))}
      </Row>
    </div>
  );
}
