import { useState } from 'react';
import { TextInputView } from '@/dui';
import { SearchIcon, GlobeIcon, InfoCircleIcon, SettingsIcon } from '@/icons/daakia-icons';
import { Row } from '../../../shared/Row';

export function TextInputViewLive() {
  const [textVal, setTextVal] = useState('');
  return (
    <div>
      <Row label="Sizes  default · sm · md · lg · xl" code={`<TextInputView size="default" placeholder="default — 26px" />\n<TextInputView size="sm"      placeholder="sm — 22px" />\n<TextInputView size="md"      placeholder="md — 28px" />\n<TextInputView size="lg"      placeholder="lg — 32px" />\n<TextInputView size="xl"      placeholder="xl — 36px" />`}>
        <TextInputView size="default" placeholder="default — 26px" style={{ width: 170 }} />
        <TextInputView size="sm"      placeholder="sm — 22px"      style={{ width: 130 }} />
        <TextInputView size="md"      placeholder="md — 28px"      style={{ width: 130 }} />
        <TextInputView size="lg"      placeholder="lg — 32px"      style={{ width: 130 }} />
        <TextInputView size="xl"      placeholder="xl — 36px"      style={{ width: 130 }} />
      </Row>
      <Row label="With iconLeft / iconRight" code={`<TextInputView placeholder="Search…"      iconLeft={<SearchIcon size={11} />} />\n<TextInputView placeholder="API endpoint" iconLeft={<GlobeIcon size={11} />} iconRight={<InfoCircleIcon size={11} />} />\n<TextInputView placeholder="Settings key" iconLeft={<SettingsIcon size={11} />} />`}>
        <TextInputView placeholder="Search…"      iconLeft={<SearchIcon size={11} />} style={{ width: 200 }} />
        <TextInputView placeholder="API endpoint" iconLeft={<GlobeIcon size={11} />} iconRight={<InfoCircleIcon size={11} />} style={{ width: 240 }} />
        <TextInputView placeholder="Settings key" iconLeft={<SettingsIcon size={11} />} style={{ width: 180 }} />
      </Row>
      <Row label="error=true  (red focus ring)" code={`<TextInputView error placeholder="Required field" />\n<TextInputView error value="bad-value@" onChange={() => {}} />`}>
        <TextInputView error placeholder="Required field" style={{ width: 180 }} />
        <TextInputView error value="bad-value@" onChange={() => {}} style={{ width: 160 }} />
      </Row>
      <Row label="rounded=true vs rounded=false" code={`<TextInputView placeholder="rounded (default)" rounded />\n<TextInputView placeholder="pointy" rounded={false} />`}>
        <TextInputView placeholder="rounded (default)" rounded style={{ width: 170 }} />
        <TextInputView placeholder="pointy" rounded={false} style={{ width: 130 }} />
      </Row>
      <Row label="Custom accentColor" code={`<TextInputView accentColor="var(--color-protocol-graphql)"   placeholder="GraphQL purple" />\n<TextInputView accentColor="var(--color-protocol-websocket)" placeholder="WebSocket green" />\n<TextInputView accentColor="var(--color-protocol-grpc)"      placeholder="gRPC teal" />`}>
        <TextInputView accentColor="var(--color-protocol-graphql)" placeholder="GraphQL purple" value={textVal} onChange={e => setTextVal(e.target.value)} style={{ width: 200 }} />
        <TextInputView accentColor="var(--color-protocol-websocket)" placeholder="WebSocket green" style={{ width: 200 }} />
        <TextInputView accentColor="var(--color-protocol-grpc)" placeholder="gRPC teal" style={{ width: 180 }} />
      </Row>
    </div>
  );
}
