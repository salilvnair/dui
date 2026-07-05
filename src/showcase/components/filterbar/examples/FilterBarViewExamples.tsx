import { useState } from 'react';
import { FilterBarView, type FilterBarFilter } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FilterBarViewExamples() {
  const [filters, setFilters] = useState<FilterBarFilter[]>([{ key: 'method', label: 'Method: GET' }]);

  const [logFilters, setLogFilters] = useState<FilterBarFilter[]>([
    { key: 'status', label: 'Status: 4xx/5xx' },
    { key: 'env', label: 'Env: Production' },
    { key: 'team', label: 'Team: Commerce' },
  ]);

  const [singleFilter, setSingleFilter] = useState<FilterBarFilter[]>([{ key: 'auth', label: 'Auth: Bearer' }]);

  const [emptyFilters, setEmptyFilters] = useState<FilterBarFilter[]>([]);

  return (
    <div>
      <ExampleCard
        title="Basic Filter Bar"
        description="Remove a filter by clicking its close icon"
        code={`const [filters, setFilters] = useState([{ key: 'method', label: 'Method: GET' }]);

<FilterBarView
  filters={filters}
  onRemove={key => setFilters(f => f.filter(x => x.key !== key))}
  onClearAll={() => setFilters([])}
/>`}
      >
        <FilterBarView
          filters={filters}
          onRemove={key => setFilters(f => f.filter(x => x.key !== key))}
          onClearAll={() => setFilters([])}
        />
      </ExampleCard>

      <ExampleCard
        title="Request Log Filter Toolbar (interactive)"
        description="Multiple active filters over an API request log, with individual removal and clear-all"
        code={`const [filters, setFilters] = useState([
  { key: 'status', label: 'Status: 4xx/5xx' },
  { key: 'env', label: 'Env: Production' },
  { key: 'team', label: 'Team: Commerce' },
]);

<FilterBarView
  filters={filters}
  onRemove={key => setFilters(f => f.filter(x => x.key !== key))}
  onClearAll={() => setFilters([])}
  color="var(--color-warning)"
/>`}
      >
        <FilterBarView
          filters={logFilters}
          onRemove={key => setLogFilters(f => f.filter(x => x.key !== key))}
          onClearAll={() => setLogFilters([])}
          color="var(--color-warning)"
        />
        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            onClick={() => setLogFilters([{ key: 'status', label: 'Status: 4xx/5xx' }, { key: 'env', label: 'Env: Production' }, { key: 'team', label: 'Team: Commerce' }])}
            style={{ fontSize: 11, color: 'var(--color-text-muted)', background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
          >
            Reset filters
          </button>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color prop drives the translucent background tint and text/border color for every chip"
        code={`<FilterBarView filters={filters} onRemove={...} color="var(--color-success)" />
<FilterBarView filters={filters} onRemove={...} color="var(--color-error)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FilterBarView filters={[{ key: 'a', label: 'Cached responses' }]} onRemove={() => {}} color="var(--color-success)" />
          <FilterBarView filters={[{ key: 'b', label: 'Failed requests' }]} onRemove={() => {}} color="var(--color-error)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Filter, No Clear-All"
        description="onClearAll is optional — omit it when there's nothing meaningful to clear in bulk"
        code={`<FilterBarView
  filters={[{ key: 'auth', label: 'Auth: Bearer' }]}
  onRemove={key => setFilter(f => f.filter(x => x.key !== key))}
/>`}
      >
        <FilterBarView
          filters={singleFilter}
          onRemove={key => setSingleFilter(f => f.filter(x => x.key !== key))}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="With zero filters, FilterBarView renders null — nothing is shown, keeping toolbars clean when no filters are active"
        code={`<FilterBarView filters={[]} onRemove={() => {}} onClearAll={() => {}} />
{/* renders nothing */}`}
      >
        <div style={{ minHeight: 20 }}>
          <FilterBarView filters={emptyFilters} onRemove={() => {}} onClearAll={() => {}} />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            (nothing rendered — no active filters)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setEmptyFilters([{ key: 'x', label: 'Method: POST' }])}
          style={{ marginTop: 8, fontSize: 11, color: 'var(--color-primary)', background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
        >
          Add a filter
        </button>
      </ExampleCard>
    </div>
  );
}
