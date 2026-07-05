import { MasonryGridView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function Card({ children, h }: { children: React.ReactNode; h: number }) {
  return (
    <div style={{
      padding: 10, borderRadius: 8, border: '1px solid var(--color-surface-border)',
      background: 'var(--color-surface)', fontSize: 11, color: 'var(--color-text-secondary)',
      minHeight: h,
    }}>
      {children}
    </div>
  );
}

export function MasonryGridViewExamples() {
  return (
    <div>
      <ExampleCard
        title="3-Column Card Grid (default)"
        description="Default usage — Pinterest-style balanced columns, cards of varying height"
        code={`<MasonryGridView columns={3}>
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</MasonryGridView>`}
      >
        <MasonryGridView columns={3}>
          <Card h={60}>Card 1</Card>
          <Card h={100}>Card 2</Card>
          <Card h={40}>Card 3</Card>
        </MasonryGridView>
      </ExampleCard>

      <ExampleCard
        title="API Collection Cards"
        description="Saved request collections shown as masonry cards, description length varies naturally"
        code={`<MasonryGridView columns={3}>
  {collections.map(c => (
    <CollectionCard key={c.id} {...c} />
  ))}
</MasonryGridView>`}
      >
        <MasonryGridView columns={3}>
          <Card h={70}><strong>Auth Service</strong><br />Login, refresh, logout, and password reset flows.</Card>
          <Card h={40}><strong>Payments</strong><br />Stripe webhook handlers.</Card>
          <Card h={100}><strong>User Profile</strong><br />CRUD endpoints for profile fields, avatar upload, and preferences sync across devices.</Card>
          <Card h={50}><strong>Notifications</strong><br />Push + email dispatch.</Card>
          <Card h={80}><strong>Search</strong><br />Full-text search across tickets, users, and documents.</Card>
          <Card h={40}><strong>Billing</strong><br />Invoices and plans.</Card>
        </MasonryGridView>
      </ExampleCard>

      <ExampleCard
        title="Column Count Variants"
        description="columns controls the CSS column-count — try 2 vs 4"
        code={`<MasonryGridView columns={2}>...</MasonryGridView>
<MasonryGridView columns={4}>...</MasonryGridView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 4 }}>columns=2</div>
            <MasonryGridView columns={2}>
              <Card h={40}>A</Card>
              <Card h={80}>B</Card>
              <Card h={50}>C</Card>
              <Card h={30}>D</Card>
            </MasonryGridView>
          </div>
          <div>
            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 4 }}>columns=4</div>
            <MasonryGridView columns={4}>
              <Card h={30}>W</Card>
              <Card h={60}>X</Card>
              <Card h={20}>Y</Card>
              <Card h={45}>Z</Card>
            </MasonryGridView>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook Delivery Log Tiles"
        description="Recent webhook deliveries as compact status tiles, varying payload preview sizes"
        code={`<MasonryGridView columns={3} size="sm">
  {deliveries.map(d => <DeliveryTile key={d.id} {...d} />)}
</MasonryGridView>`}
      >
        <MasonryGridView columns={3} size="sm">
          <Card h={36}><span style={{ color: 'var(--color-success)' }}>200</span> payment.succeeded</Card>
          <Card h={60}><span style={{ color: 'var(--color-error)' }}>500</span> order.created<br />Retry scheduled in 30s.</Card>
          <Card h={36}><span style={{ color: 'var(--color-success)' }}>200</span> user.updated</Card>
          <Card h={48}><span style={{ color: 'var(--color-warning)' }}>429</span> refund.issued<br />Rate limited.</Card>
        </MasonryGridView>
      </ExampleCard>

      <ExampleCard
        title="Empty Grid (edge case)"
        description="No items to show — falls back to an empty-state message instead of an empty grid"
        code={`{cards.length > 0 ? (
  <MasonryGridView columns={3}>{cards.map(...)}</MasonryGridView>
) : (
  <EmptyState />
)}`}
      >
        <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: 'var(--color-text-muted)', border: '1px dashed var(--color-surface-border)', borderRadius: 8 }}>
          No collections yet — create one to see it here.
        </div>
      </ExampleCard>
    </div>
  );
}
