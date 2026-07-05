import { useState } from 'react';
import { AvatarUploadView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AvatarUploadViewExamples() {
  const [emptyAvatar, setEmptyAvatar] = useState<string | null>(null);
  const [profileSrc, setProfileSrc] = useState<string | null>(null);
  const [teamSrc, setTeamSrc] = useState<string | null>(null);
  const [disabledSrc] = useState<string | null>(null);

  return (
    <div>
      <ExampleCard
        title="Default: Empty State"
        description="No image yet — shows a camera icon placeholder in an accent-tinted circle"
        code={`const [src, setSrc] = useState<string | null>(null);

<AvatarUploadView src={src} onFileSelected={file => setSrc(URL.createObjectURL(file))} />`}
      >
        <AvatarUploadView src={emptyAvatar} onFileSelected={f => setEmptyAvatar(URL.createObjectURL(f))} />
      </ExampleCard>

      <ExampleCard
        title="Interactive: Profile Photo Upload"
        description="Click the avatar to pick a photo — preview updates immediately via a local object URL"
        code={`const [src, setSrc] = useState<string | null>(null);

<AvatarUploadView
  src={src}
  onFileSelected={file => setSrc(URL.createObjectURL(file))}
  initials="SV"
/>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AvatarUploadView
            src={profileSrc}
            onFileSelected={f => setProfileSrc(URL.createObjectURL(f))}
            initials="SV"
          />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {profileSrc ? 'Photo selected' : 'Click to upload a photo'}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg / xl avatar diameters for different contexts (table row vs. profile header)"
        code={`<AvatarUploadView src={null} onFileSelected={handle} initials="A" size="xs" />
<AvatarUploadView src={null} onFileSelected={handle} initials="B" size="sm" />
<AvatarUploadView src={null} onFileSelected={handle} initials="C" size="md" />
<AvatarUploadView src={null} onFileSelected={handle} initials="D" size="lg" />
<AvatarUploadView src={null} onFileSelected={handle} initials="E" size="xl" />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <AvatarUploadView src={null} onFileSelected={() => {}} initials="A" size="xs" />
          <AvatarUploadView src={null} onFileSelected={() => {}} initials="B" size="sm" />
          <AvatarUploadView src={null} onFileSelected={() => {}} initials="C" size="md" />
          <AvatarUploadView src={null} onFileSelected={() => {}} initials="D" size="lg" />
          <AvatarUploadView src={null} onFileSelected={() => {}} initials="E" size="xl" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Team Workspace Avatar"
        description="Team/workspace icon upload tinted with the team's brand color, showing initials fallback"
        code={`const [teamSrc, setTeamSrc] = useState<string | null>(null);

<AvatarUploadView
  src={teamSrc}
  onFileSelected={file => setTeamSrc(URL.createObjectURL(file))}
  initials="DQ"
  color="var(--color-protocol-graphql)"
  size="lg"
/>`}
      >
        <AvatarUploadView
          src={teamSrc}
          onFileSelected={f => setTeamSrc(URL.createObjectURL(f))}
          initials="DQ"
          color="var(--color-protocol-graphql)"
          size="lg"
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Read-only avatar for a viewer without permission to change the team's branding"
        code={`<AvatarUploadView src={null} onFileSelected={() => {}} initials="RO" disabled />`}
      >
        <AvatarUploadView src={disabledSrc} onFileSelected={() => {}} initials="RO" disabled />
      </ExampleCard>
    </div>
  );
}
