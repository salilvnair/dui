import { AnchorView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AnchorViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Docs Page Navigation"
        description="Default usage — scroll-spy nav for API documentation sections"
        code={`<AnchorView links={[
  { id: 'intro', label: 'Introduction' },
  { id: 'auth', label: 'Authentication' },
]} />`}
      >
        <AnchorView links={[
          { id: 'ex-anchor-intro', label: 'Introduction' },
          { id: 'ex-anchor-auth', label: 'Authentication' },
        ]} />
      </ExampleCard>

      <ExampleCard
        title="Full Endpoint Reference (scroll-spy)"
        description="Scroll the panel on the right — the active link highlights as sections pass into view"
        code={`<AnchorView links={[
  { id: 'overview', label: 'Overview' },
  { id: 'requests', label: 'Requests' },
  { id: 'responses', label: 'Responses' },
  { id: 'errors', label: 'Error Codes' },
  { id: 'rate-limits', label: 'Rate Limits' },
]} />`}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <AnchorView links={[
            { id: 'ex-anchor-overview', label: 'Overview' },
            { id: 'ex-anchor-requests', label: 'Requests' },
            { id: 'ex-anchor-responses', label: 'Responses' },
            { id: 'ex-anchor-errors', label: 'Error Codes' },
            { id: 'ex-anchor-ratelimits', label: 'Rate Limits' },
          ]} />
          <div style={{ flex: 1, height: 160, overflowY: 'auto', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <section id="ex-anchor-overview" style={{ paddingBottom: 24 }}><strong>Overview</strong><br />The Webhooks API lets you register endpoints to receive event notifications.</section>
            <section id="ex-anchor-requests" style={{ paddingBottom: 24 }}><strong>Requests</strong><br />POST /v1/webhooks with a target URL and event list.</section>
            <section id="ex-anchor-responses" style={{ paddingBottom: 24 }}><strong>Responses</strong><br />Returns 201 with the webhook id and secret.</section>
            <section id="ex-anchor-errors" style={{ paddingBottom: 24 }}><strong>Error Codes</strong><br />422 invalid URL, 409 duplicate target.</section>
            <section id="ex-anchor-ratelimits" style={{ paddingBottom: 24 }}><strong>Rate Limits</strong><br />100 registrations per team per hour.</section>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Colored Accent"
        description="Custom color prop tints the active link and left border"
        code={`<AnchorView
  color="var(--color-success)"
  links={[
    { id: 'setup', label: 'Setup' },
    { id: 'usage', label: 'Usage' },
  ]}
/>`}
      >
        <AnchorView color="var(--color-success)" links={[
          { id: 'ex-anchor-setup', label: 'Setup' },
          { id: 'ex-anchor-usage', label: 'Usage' },
        ]} />
      </ExampleCard>

      <ExampleCard
        title="Fixed Header Offset — Team Settings"
        description="offset accounts for a sticky app header so scroll-spy detection and smooth-scroll land correctly"
        code={`<AnchorView
  offset={48}
  links={[
    { id: 'members', label: 'Members' },
    { id: 'roles', label: 'Roles & Permissions' },
    { id: 'billing', label: 'Billing' },
  ]}
/>`}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <AnchorView offset={40} links={[
            { id: 'ex-anchor-members', label: 'Members' },
            { id: 'ex-anchor-roles', label: 'Roles & Permissions' },
            { id: 'ex-anchor-billing', label: 'Billing' },
          ]} />
          <div style={{ flex: 1, height: 140, overflowY: 'auto', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, background: 'var(--color-primary)', color: '#fff', fontSize: 10, padding: '4px 8px' }}>
              Team: Platform Engineering
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              <section id="ex-anchor-members" style={{ padding: '16px 8px' }}>12 members across 3 roles.</section>
              <section id="ex-anchor-roles" style={{ padding: '16px 8px' }}>Admin, Editor, Viewer.</section>
              <section id="ex-anchor-billing" style={{ padding: '16px 8px' }}>Team plan — $49/mo, renews Aug 1.</section>
            </div>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Link (edge case)"
        description="Works with just one link — it becomes active immediately with no scroll-spy ambiguity"
        code={`<AnchorView links={[{ id: 'only-section', label: 'Getting Started' }]} />`}
      >
        <AnchorView links={[{ id: 'ex-anchor-only', label: 'Getting Started' }]} />
      </ExampleCard>
    </div>
  );
}
