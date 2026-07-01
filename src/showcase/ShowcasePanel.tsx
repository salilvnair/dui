import { useState } from 'react';
import { TabView } from '@/dui';

export type ShowcaseTab = 'live' | 'examples' | 'docs';

const TABS = [
  { id: 'live',     label: 'Live' },
  { id: 'examples', label: 'Examples' },
  { id: 'docs',     label: 'Docs' },
];

interface ShowcasePanelProps {
  live: React.ReactNode;
  examples?: React.ReactNode;
  docs: React.ReactNode;
  defaultTab?: ShowcaseTab;
}

export function ShowcasePanel({ live, examples, docs, defaultTab = 'live' }: ShowcasePanelProps) {
  const [tab, setTab] = useState<ShowcaseTab>(defaultTab);

  const fallbackExamples = (
    <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
      Examples coming soon.
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <TabView
          variant="pill"
          tabs={TABS}
          activeTab={tab}
          onChange={id => setTab(id as ShowcaseTab)}
          size="sm"
        />
      </div>
      {tab === 'live'     && <div>{live}</div>}
      {tab === 'examples' && <div>{examples ?? fallbackExamples}</div>}
      {tab === 'docs'     && <div>{docs}</div>}
    </div>
  );
}
