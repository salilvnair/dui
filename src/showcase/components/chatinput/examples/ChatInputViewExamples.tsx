import { useState } from 'react';
import { ChatInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ChatInputViewExamples() {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState<string[]>([]);
  const [withAttach, setWithAttach] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [disabledVal] = useState('Reconnecting to support channel…');

  return (
    <div>
      <ExampleCard
        title="Basic Composer"
        description="Controlled textarea with a send button that enables once there is text"
        code={`const [msg, setMsg] = useState('');
<ChatInputView value={msg} onChange={setMsg} onSend={() => setMsg('')} />`}
      >
        <ChatInputView value={msg} onChange={setMsg} onSend={() => { setSent(p => [...p, msg]); setMsg(''); }} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Sent: {sent.length > 0 ? sent.join(' | ') : 'nothing yet'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="With File Attachment"
        description="Passing onAttach shows the paperclip button and wires up a hidden file input"
        code={`const [msg, setMsg] = useState('');
<ChatInputView
  value={msg}
  onChange={setMsg}
  onSend={() => setMsg('')}
  onAttach={(files) => console.log(files)}
/>`}
      >
        <ChatInputView
          value={withAttach}
          onChange={setWithAttach}
          onSend={() => setWithAttach('')}
          onAttach={fl => setFiles(Array.from(fl).map(f => f.name))}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Attached: {files.length > 0 ? files.join(', ') : 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled (Channel Unavailable)"
        description="Disable the composer while a channel is read-only or reconnecting"
        code={`<ChatInputView
  value="Reconnecting to support channel…"
  onChange={() => {}}
  onSend={() => {}}
  disabled
/>`}
      >
        <ChatInputView value={disabledVal} onChange={() => {}} onSend={() => {}} disabled />
      </ExampleCard>

      <ExampleCard
        title="Custom Placeholder & Accent Color"
        description="Match the composer to a support/live-chat theme"
        code={`<ChatInputView
  value={msg}
  onChange={setMsg}
  onSend={() => setMsg('')}
  placeholder="Ask the API support bot…"
  color="var(--color-info)"
/>`}
      >
        <ChatInputView value={msg} onChange={setMsg} onSend={() => setMsg('')} placeholder="Ask the API support bot…" color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Composer height and icon size scale with the DUI size system"
        code={`<ChatInputView value="" onChange={() => {}} onSend={() => {}} size="sm" />
<ChatInputView value="" onChange={() => {}} onSend={() => {}} size="md" />
<ChatInputView value="" onChange={() => {}} onSend={() => {}} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ChatInputView value="" onChange={() => {}} onSend={() => {}} size="sm" />
          <ChatInputView value="" onChange={() => {}} onSend={() => {}} size="md" />
          <ChatInputView value="" onChange={() => {}} onSend={() => {}} size="lg" />
        </div>
      </ExampleCard>
    </div>
  );
}
