import { ContactCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { LinkIcon, ShareIcon } from '../../../../icons';

export function ContactCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Card (name + role)"
        description="Minimal contact card with an auto-generated avatar placeholder"
        code={`<ContactCardView name="Jordan Lee" role="Platform Engineer" />`}
      >
        <ContactCardView name="Jordan Lee" role="Platform Engineer" />
      </ExampleCard>

      <ExampleCard
        title="With Contact Actions"
        description="Icon row for quick actions like email, profile link, or invite"
        code={`<ContactCardView
  name="Priya Nair"
  role="API Team Lead"
  contacts={[
    { icon: <LinkIcon size={14} />, label: 'Profile', onClick: () => openProfile() },
    { icon: <ShareIcon size={14} />, label: 'Share', onClick: () => share() },
  ]}
/>`}
      >
        <ContactCardView
          name="Priya Nair"
          role="API Team Lead"
          contacts={[
            { icon: <LinkIcon size={14} />, label: 'Profile', onClick: () => {} },
            { icon: <ShareIcon size={14} />, label: 'Share', onClick: () => {} },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Avatar"
        description="Pass a real avatar image instead of the default initials placeholder"
        code={`<ContactCardView
  name="Alex Chen"
  role="Backend Engineer"
  avatar={<img src="/avatars/alex.png" style={{ width: 56, height: 56, borderRadius: '999px' }} />}
/>`}
      >
        <ContactCardView
          name="Alex Chen"
          role="Backend Engineer"
          avatar={<span style={{ width: 56, height: 56, borderRadius: '999px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-info))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>AC</span>}
        />
      </ExampleCard>

      <ExampleCard
        title="Team Directory Grid"
        description="Multiple contact cards laid out in a workspace member directory"
        code={`<div style={{ display: 'flex', gap: 12 }}>
  <ContactCardView name="Sam Rivera" role="DevOps" color="var(--color-success)" />
  <ContactCardView name="Morgan Yu" role="QA Lead" color="var(--color-warning)" />
  <ContactCardView name="Casey Kim" role="Solutions Architect" color="var(--color-info)" />
</div>`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ContactCardView name="Sam Rivera" role="DevOps" color="var(--color-success)" />
          <ContactCardView name="Morgan Yu" role="QA Lead" color="var(--color-warning)" />
          <ContactCardView name="Casey Kim" role="Solutions Architect" color="var(--color-info)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Role / Minimal Info"
        description="Role and contacts are optional — falls back to just a name and avatar"
        code={`<ContactCardView name="Unassigned" avatar={<CheckCircleIcon size={24} />} />`}
      >
        <ContactCardView name="Unassigned Reviewer" />
      </ExampleCard>
    </div>
  );
}
