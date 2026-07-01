import {
  RestApiIcon,
  GraphQLIcon,
  WebSocketIcon,
  GrpcIcon,
  SoapIcon,
  PlayIcon,
  CopyIcon,
  TrashIcon,
  RefreshIcon,
  PlusIcon,
  CheckIcon,
  WarningTriangleIcon,
  CloseCircleIcon,
  InfoCircleIcon,
  SparkleIcon,
  WandIcon,
  AgentIcon,
  CopilotIcon,
  SearchIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

interface IconRowProps {
  icons: Array<{ name: string; node: React.ReactNode }>;
  size?: number;
}

function IconRow({ icons, size = 16 }: IconRowProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      {icons.map(({ name, node }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            minWidth: 48,
          }}
        >
          <span style={{ color: 'var(--color-text-secondary)' }}>{node}</span>
          <span style={{ fontSize: 9, color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.2 }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function IconsGalleryExamples() {
  return (
    <div>
      <ExampleCard
        title="Protocol Icons"
        description="REST / GraphQL / WebSocket / gRPC / SOAP"
        code={`import { RestApiIcon, GraphQLIcon, WebSocketIcon, GrpcIcon, SoapIcon } from '@/icons/daakia-icons';`}
      >
        <IconRow
          icons={[
            { name: 'RestApiIcon', node: <RestApiIcon size={16} style={{ color: 'var(--color-protocol-rest)' }} /> },
            { name: 'GraphQLIcon', node: <GraphQLIcon size={16} style={{ color: 'var(--color-protocol-gql)' }} /> },
            { name: 'WebSocketIcon', node: <WebSocketIcon size={16} style={{ color: 'var(--color-protocol-ws)' }} /> },
            { name: 'GrpcIcon', node: <GrpcIcon size={16} style={{ color: 'var(--color-protocol-grpc)' }} /> },
            { name: 'SoapIcon', node: <SoapIcon size={16} style={{ color: 'var(--color-protocol-soap)' }} /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Action Icons"
        description="Send / Copy / Delete / Refresh / Add"
        code={`import { PlayIcon, CopyIcon, TrashIcon, RefreshIcon, PlusIcon } from '@/icons/daakia-icons';`}
      >
        <IconRow
          icons={[
            { name: 'PlayIcon', node: <PlayIcon size={16} /> },
            { name: 'CopyIcon', node: <CopyIcon size={16} /> },
            { name: 'TrashIcon', node: <TrashIcon size={16} /> },
            { name: 'RefreshIcon', node: <RefreshIcon size={16} /> },
            { name: 'PlusIcon', node: <PlusIcon size={16} /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Status Icons"
        description="Check / Warning / Error / Info"
        code={`import { CheckIcon, WarningTriangleIcon, CloseCircleIcon, InfoCircleIcon } from '@/icons/daakia-icons';`}
      >
        <IconRow
          icons={[
            { name: 'CheckIcon', node: <CheckIcon size={16} style={{ color: 'var(--color-success)' }} /> },
            { name: 'WarningTriangleIcon', node: <WarningTriangleIcon size={16} style={{ color: 'var(--color-warning)' }} /> },
            { name: 'CloseCircleIcon', node: <CloseCircleIcon size={16} style={{ color: 'var(--color-error)' }} /> },
            { name: 'InfoCircleIcon', node: <InfoCircleIcon size={16} style={{ color: 'var(--color-primary)' }} /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="AI Icons"
        description="Sparkle / Wand / Agent / Copilot"
        code={`import { SparkleIcon, WandIcon, AgentIcon, CopilotIcon } from '@/icons/daakia-icons';`}
      >
        <IconRow
          icons={[
            { name: 'SparkleIcon', node: <SparkleIcon size={16} style={{ color: 'var(--color-protocol-ai)' }} /> },
            { name: 'WandIcon', node: <WandIcon size={16} style={{ color: 'var(--color-protocol-ai)' }} /> },
            { name: 'AgentIcon', node: <AgentIcon size={16} style={{ color: 'var(--color-protocol-ai)' }} /> },
            { name: 'CopilotIcon', node: <CopilotIcon size={16} style={{ color: 'var(--color-protocol-ai)' }} /> },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants — SearchIcon"
        description="12 / 14 / 16 / 20 px sizes of the same icon"
        code={`<SearchIcon size={12} />\n<SearchIcon size={14} />\n<SearchIcon size={16} />\n<SearchIcon size={20} />`}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {([12, 14, 16, 20] as const).map(sz => (
            <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SearchIcon size={sz} style={{ color: 'var(--color-text-secondary)' }} />
              <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>{sz}px</span>
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
