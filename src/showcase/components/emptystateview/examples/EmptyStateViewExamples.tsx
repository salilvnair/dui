import { EmptyStateView, ButtonView } from '@/dui';
import { FolderIcon, SearchIcon, DocumentIcon, CollectionsFolderIcon, ClockIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function EmptyStateViewExamples() {
  return (
    <div>
      <ExampleCard
        title="No Collections Yet"
        description="FolderIcon + CTA button — encourages first action"
        code={`<EmptyStateView
  icon={<FolderIcon size={32} />}
  title="No collections yet"
  message="Create your first collection to group related API requests together."
  action={{ label: '+ New Collection', onClick: () => {} }}
/>`}
      >
        <EmptyStateView
          icon={<FolderIcon size={32} />}
          title="No collections yet"
          message="Create your first collection to group related API requests together."
          action={{ label: '+ New Collection', onClick: () => {} }}
        />
      </ExampleCard>

      <ExampleCard
        title="No Search Results"
        description="SearchIcon, no CTA — explains the empty state without offering action"
        code={`<EmptyStateView
  icon={<SearchIcon size={28} />}
  title='No results for "payment"'
  message="Try a different keyword or check your spelling."
/>`}
      >
        <EmptyStateView
          icon={<SearchIcon size={28} />}
          title='No results for "payment"'
          message="Try a different keyword or check your spelling."
        />
      </ExampleCard>

      <ExampleCard
        title="Empty Response Body"
        description="DocumentIcon — shown when the API returns an empty 204 body"
        code={`<EmptyStateView
  icon={<DocumentIcon size={28} />}
  title="Empty response body"
  message="The server returned a 204 No Content response."
  accentColor="var(--color-text-muted)"
/>`}
      >
        <EmptyStateView
          icon={<DocumentIcon size={28} />}
          title="Empty response body"
          message="The server returned a 204 No Content response."
          accentColor="var(--color-text-muted)"
        />
      </ExampleCard>

      <ExampleCard
        title="No Environment Variables"
        description="Custom accentColor matches the REST protocol color"
        code={`<EmptyStateView
  icon={<CollectionsFolderIcon size={28} />}
  title="No variables defined"
  message="Add key–value pairs to use {{variable}} placeholders in your requests."
  accentColor="var(--color-protocol-rest)"
  action={{ label: '+ Add Variable', onClick: () => {} }}
/>`}
      >
        <EmptyStateView
          icon={<CollectionsFolderIcon size={28} />}
          title="No variables defined"
          message="Add key–value pairs to use {{variable}} placeholders in your requests."
          accentColor="var(--color-protocol-rest)"
          action={{ label: '+ Add Variable', onClick: () => {} }}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty Request History"
        description="Minimal — no icon, compact mode, muted tone"
        code={`<EmptyStateView
  title="No history yet"
  message="Requests you send will appear here."
  compact
/>`}
      >
        <EmptyStateView
          title="No history yet"
          message="Requests you send will appear here."
          compact
        />
      </ExampleCard>

      <ExampleCard
        title="Empty History (ClockIcon variant)"
        description="With ClockIcon and accentColor to match GraphQL protocol"
        code={`<EmptyStateView
  icon={<ClockIcon size={28} />}
  title="No GraphQL history"
  message="Run a query to see your request history."
  accentColor="var(--color-protocol-graphql)"
  action={{ label: 'Open Explorer', onClick: () => {} }}
/>`}
      >
        <EmptyStateView
          icon={<ClockIcon size={28} />}
          title="No GraphQL history"
          message="Run a query to see your request history."
          accentColor="var(--color-protocol-graphql)"
          action={{ label: 'Open Explorer', onClick: () => {} }}
        />
      </ExampleCard>

      <ExampleCard
        title="External CTA via ButtonView"
        description="Wrap EmptyStateView + ButtonView when you need a styled DUI button instead of the built-in action"
        code={`<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
  <EmptyStateView icon={<FolderIcon size={28} />} title="No mock routes" />
  <ButtonView variant="primary" size="sm">+ Add Route</ButtonView>
</div>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <EmptyStateView icon={<FolderIcon size={28} />} title="No mock routes" compact />
          <ButtonView variant="primary" size="sm">+ Add Route</ButtonView>
        </div>
      </ExampleCard>
    </div>
  );
}
