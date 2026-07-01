import { ButtonView } from '@/dui';
import { PlayIcon, SaveIcon, RefreshIcon, TrashIcon, DownloadIcon } from '@/icons/daakia-icons';
import { Row } from '../../../shared/Row';

export function ButtonViewLive() {
  return (
    <div>
      <Row label="Variants  primary · secondary · ghost · danger" code={`<ButtonView variant="primary">Primary</ButtonView>\n<ButtonView variant="secondary">Secondary</ButtonView>\n<ButtonView variant="ghost">Ghost</ButtonView>\n<ButtonView variant="danger">Danger</ButtonView>`}>
        <ButtonView variant="primary">Primary</ButtonView>
        <ButtonView variant="secondary">Secondary</ButtonView>
        <ButtonView variant="ghost">Ghost</ButtonView>
        <ButtonView variant="danger">Danger</ButtonView>
      </Row>
      <Row label="Sizes  default(26px) · sm(22px) · md(28px) · lg(32px) · xl(36px)" code={`<ButtonView variant="primary" size="default">Default 26px</ButtonView>\n<ButtonView variant="primary" size="sm">SM 22px</ButtonView>\n<ButtonView variant="primary" size="md">MD 28px</ButtonView>\n<ButtonView variant="primary" size="lg">LG 32px</ButtonView>\n<ButtonView variant="primary" size="xl">XL 36px</ButtonView>`}>
        <ButtonView variant="primary" size="default">Default 26px</ButtonView>
        <ButtonView variant="primary" size="sm">SM 22px</ButtonView>
        <ButtonView variant="primary" size="md">MD 28px</ButtonView>
        <ButtonView variant="primary" size="lg">LG 32px</ButtonView>
        <ButtonView variant="primary" size="xl">XL 36px</ButtonView>
      </Row>
      <Row label="With iconLeft / iconRight" code={`<ButtonView variant="primary"   iconLeft={<PlayIcon size={11} />}>Send</ButtonView>\n<ButtonView variant="secondary" iconLeft={<SaveIcon size={11} />}>Save</ButtonView>\n<ButtonView variant="ghost"     iconLeft={<RefreshIcon size={11} />}>Refresh</ButtonView>\n<ButtonView variant="danger"    iconLeft={<TrashIcon size={11} />}>Delete</ButtonView>\n<ButtonView variant="secondary" iconRight={<DownloadIcon size={11} />}>Download</ButtonView>`}>
        <ButtonView variant="primary"   iconLeft={<PlayIcon size={11} />}>Send</ButtonView>
        <ButtonView variant="secondary" iconLeft={<SaveIcon size={11} />}>Save</ButtonView>
        <ButtonView variant="ghost"     iconLeft={<RefreshIcon size={11} />}>Refresh</ButtonView>
        <ButtonView variant="danger"    iconLeft={<TrashIcon size={11} />}>Delete</ButtonView>
        <ButtonView variant="secondary" iconRight={<DownloadIcon size={11} />}>Download</ButtonView>
      </Row>
      <Row label="loading=true" code={`<ButtonView variant="primary"   loading>Sending…</ButtonView>\n<ButtonView variant="secondary" loading>Saving…</ButtonView>\n<ButtonView variant="ghost"     loading>Loading…</ButtonView>`}>
        <ButtonView variant="primary" loading>Sending…</ButtonView>
        <ButtonView variant="secondary" loading>Saving…</ButtonView>
        <ButtonView variant="ghost" loading>Loading…</ButtonView>
      </Row>
      <Row label="disabled=true" code={`<ButtonView variant="primary"   disabled>Disabled</ButtonView>\n<ButtonView variant="secondary" disabled>Disabled</ButtonView>\n<ButtonView variant="ghost"     disabled>Disabled</ButtonView>\n<ButtonView variant="danger"    disabled>Disabled</ButtonView>`}>
        <ButtonView variant="primary" disabled>Disabled</ButtonView>
        <ButtonView variant="secondary" disabled>Disabled</ButtonView>
        <ButtonView variant="ghost" disabled>Disabled</ButtonView>
        <ButtonView variant="danger" disabled>Disabled</ButtonView>
      </Row>
      <Row label="rounded=false (pointy corners)" code={`<ButtonView variant="primary"   rounded={false}>Pointy Primary</ButtonView>\n<ButtonView variant="secondary" rounded={false}>Pointy Secondary</ButtonView>\n<ButtonView variant="ghost"     rounded={false}>Pointy Ghost</ButtonView>`}>
        <ButtonView variant="primary" rounded={false}>Pointy Primary</ButtonView>
        <ButtonView variant="secondary" rounded={false}>Pointy Secondary</ButtonView>
        <ButtonView variant="ghost" rounded={false}>Pointy Ghost</ButtonView>
      </Row>
      <Row label="Custom accentColor per protocol" code={`<ButtonView variant="primary" accentColor="var(--color-protocol-rest)">Send REST</ButtonView>\n<ButtonView variant="primary" accentColor="var(--color-protocol-graphql)">Run GQL</ButtonView>\n<ButtonView variant="primary" accentColor="var(--color-protocol-websocket)">Connect WS</ButtonView>\n<ButtonView variant="primary" accentColor="var(--color-protocol-grpc)">Invoke gRPC</ButtonView>`}>
        <ButtonView variant="primary" accentColor="var(--color-protocol-rest)">Send REST</ButtonView>
        <ButtonView variant="primary" accentColor="var(--color-protocol-graphql)">Run GQL</ButtonView>
        <ButtonView variant="primary" accentColor="var(--color-protocol-websocket)">Connect WS</ButtonView>
        <ButtonView variant="primary" accentColor="var(--color-protocol-grpc)">Invoke gRPC</ButtonView>
        <ButtonView variant="primary" accentColor="var(--color-protocol-soap)">Call SOAP</ButtonView>
        <ButtonView variant="primary" accentColor="var(--color-protocol-mqtt)">Publish MQTT</ButtonView>
      </Row>
    </div>
  );
}
