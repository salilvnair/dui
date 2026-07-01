import { useState } from 'react';
import { FeatureCategoryView } from '@/dui';
import type { FeatureItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function useFeatures(initial: Array<Omit<FeatureItem, 'onToggle'>>) {
  const [items, setItems] = useState(initial);
  const features: FeatureItem[] = items.map(item => ({
    ...item,
    onToggle: (enabled: boolean) =>
      setItems(prev => prev.map(f => (f.id === item.id ? { ...f, enabled } : f))),
  }));
  return features;
}

export function FeatureCategoryViewExamples() {
  const aiFeatures = useFeatures([
    { id: 'autocomplete', label: 'AI Autocomplete', description: 'Complete URLs and headers with AI', enabled: true },
    { id: 'explain', label: 'Explain Response', description: 'Inline explanation of API responses', enabled: true },
    { id: 'schema', label: 'Schema Explorer', description: 'Auto-generate schema from response', enabled: false },
    { id: 'gql-builder', label: 'GQL Query Builder', description: 'Natural language to GraphQL', enabled: false },
  ]);

  const interceptorFeatures = useFeatures([
    { id: 'req-log', label: 'Request Logger', description: 'Log all outgoing requests', enabled: true },
    { id: 'delay', label: 'Request Delay', description: 'Simulate network latency', enabled: false },
    { id: 'transform', label: 'Body Transform', description: 'Modify request body before send', enabled: false },
  ]);

  const responseFeatures = useFeatures([
    { id: 'pretty', label: 'Auto Prettify', description: 'Format JSON/XML automatically', enabled: true },
    { id: 'schema-validate', label: 'Schema Validation', description: 'Validate against OpenAPI schema', enabled: false },
    { id: 'diff', label: 'Response Diff', description: 'Diff against previous response', enabled: false },
    { id: 'save', label: 'Auto Save', description: 'Save responses to history', enabled: true },
  ]);

  const [categoryEnabled, setCategoryEnabled] = useState(true);
  const disabledFeatures = useFeatures([
    { id: 'mcp', label: 'MCP Bridge', description: 'Model Context Protocol support', enabled: false },
    { id: 'agent', label: 'Agent Routing', description: 'Route requests via AI agent', enabled: false },
  ]);

  return (
    <div>
      <ExampleCard
        title="AI Features Toggle Group"
        description="Collapsible category with per-feature toggles and enabled count"
        code={`<FeatureCategoryView categoryLabel="AI" categoryColor="var(--color-protocol-ai)" features={aiFeatures} defaultExpanded />`}
      >
        <FeatureCategoryView
          categoryLabel="AI"
          categoryColor="var(--color-protocol-ai)"
          features={aiFeatures}
          defaultExpanded
        />
      </ExampleCard>

      <ExampleCard
        title="Request Interceptor Features"
        description="Interceptors applied before the request is sent"
        code={`<FeatureCategoryView categoryLabel="Interceptors" categoryColor="var(--color-warning)" features={interceptorFeatures} />`}
      >
        <FeatureCategoryView
          categoryLabel="Interceptors"
          categoryColor="var(--color-warning)"
          features={interceptorFeatures}
        />
      </ExampleCard>

      <ExampleCard
        title="Response Processing Features"
        description="Live enabled-count badge updates as you toggle features"
        code={`<FeatureCategoryView categoryLabel="Response" categoryColor="var(--color-success)" features={responseFeatures} />`}
      >
        <FeatureCategoryView
          categoryLabel="Response"
          categoryColor="var(--color-success)"
          features={responseFeatures}
        />
      </ExampleCard>

      <ExampleCard
        title="Category-Level Toggle"
        description="Master switch disables the whole category"
        code={`<FeatureCategoryView categoryEnabled={categoryEnabled} onCategoryToggle={setCategoryEnabled} ... />`}
      >
        <FeatureCategoryView
          categoryLabel="Experimental"
          categoryColor="var(--color-primary)"
          features={disabledFeatures}
          categoryEnabled={categoryEnabled}
          onCategoryToggle={setCategoryEnabled}
          defaultExpanded
        />
      </ExampleCard>
    </div>
  );
}
