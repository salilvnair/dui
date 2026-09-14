import { useState } from 'react';
import { TabView } from '@/dui';
import type { ShowcaseTabId } from './deepLink';

export type ShowcaseTab = ShowcaseTabId;

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
  /** Controlled, when the URL is the one deciding which tab is up. */
  tab?: ShowcaseTab;
  onTabChange?: (tab: ShowcaseTab) => void;
}

export function ShowcasePanel({ live, examples, docs, defaultTab = 'live', tab: controlled, onTabChange }: ShowcasePanelProps) {
  const [ownTab, setOwnTab] = useState<ShowcaseTab>(defaultTab);
  /*
    Controlled when the address bar is driving — a capture asks for `#/chips/docs`
    and must land on Docs, not on whatever the panel last remembered. Uncontrolled
    otherwise, so the component stays usable on its own.
  */
  const tab = controlled ?? ownTab;
  const setTab = (next: ShowcaseTab) => {
    if (controlled === undefined) setOwnTab(next);
    onTabChange?.(next);
  };

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
