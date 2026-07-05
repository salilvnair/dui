import { useState } from 'react';
import { MaskedInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MaskedInputViewExamples() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [cardNumber, setCardNumber] = useState('4242424242424242'.slice(0, 0));
  const [apiKey, setApiKey] = useState('');
  const [invalidZip, setInvalidZip] = useState('AB-12');

  return (
    <div>
      <ExampleCard
        title="Basic Phone Number Mask"
        description="Default use case — a controlled masked input for a phone number field"
        code={`const [phone, setPhone] = useState('');

<MaskedInputView
  mask="999-999-9999"
  value={phone}
  onChange={setPhone}
  placeholder="555-123-4567"
/>`}
      >
        <MaskedInputView
          mask="999-999-9999"
          value={phone}
          onChange={setPhone}
          placeholder="555-123-4567"
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Raw value: <code>{phone || '(empty)'}</code>
        </div>
      </ExampleCard>

      <ExampleCard
        title="OTP / Verification Code (interactive)"
        description="Stateful 6-digit code entry that reports completion once fully typed"
        code={`const [otp, setOtp] = useState('');
const complete = otp.replace(/-/g, '').length === 6;

<MaskedInputView
  mask="999-999"
  value={otp}
  onChange={setOtp}
  color={complete ? 'var(--color-success)' : undefined}
/>
{complete && <span>Code entered — verifying…</span>}`}
      >
        <MaskedInputView
          mask="999-999"
          value={otp}
          onChange={setOtp}
          color={otp.replace(/-/g, '').length === 6 ? 'var(--color-success)' : undefined}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: otp.replace(/-/g, '').length === 6 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
          {otp.replace(/-/g, '').length === 6 ? 'Code entered — verifying…' : `${otp.replace(/-/g, '').length}/6 digits`}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Mask Pattern & Size Showcase"
        description="Different mask tokens (9 = digit, A = letter, * = any) across available sizes"
        code={`<MaskedInputView mask="999-99-9999" value={ssn} onChange={setSsn} size="xs" />
<MaskedInputView mask="AA-9999" value={plate} onChange={setPlate} size="sm" />
<MaskedInputView mask="99:99:99" value={time} onChange={setTime} size="md" />
<MaskedInputView mask="****-****-****" value={code} onChange={setCode} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <MaskedInputExampleRow mask="999-99-9999" size="xs" label="SSN" />
          <MaskedInputExampleRow mask="AA-9999" size="sm" label="License plate" />
          <MaskedInputExampleRow mask="99:99:99" size="md" label="Duration (hh:mm:ss)" />
          <MaskedInputExampleRow mask="****-****-****" size="lg" label="License key" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Key Masking (domain-realistic)"
        description="Masked credit card entry for a payment/billing settings screen, and an API key field with a monospace mask"
        code={`const [cardNumber, setCardNumber] = useState('');
const [apiKey, setApiKey] = useState('');

<MaskedInputView
  mask="9999 9999 9999 9999"
  value={cardNumber}
  onChange={setCardNumber}
  placeholder="0000 0000 0000 0000"
  width="lg"
/>

<MaskedInputView
  mask="AAAA-9999-AAAA-9999"
  value={apiKey}
  onChange={setApiKey}
  placeholder="sk-x-XXXX-0000-XXXX-0000"
  color="var(--color-info)"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Billing card number</div>
            <MaskedInputView
              mask="9999 9999 9999 9999"
              value={cardNumber}
              onChange={setCardNumber}
              placeholder="0000 0000 0000 0000"
              width="lg"
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Workspace API key</div>
            <MaskedInputView
              mask="AAAA-9999-AAAA-9999"
              value={apiKey}
              onChange={setApiKey}
              placeholder="sk-x-XXXX-0000-XXXX-0000"
              color="var(--color-info)"
            />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled & Rejected Input (edge cases)"
        description="A disabled masked field, plus a field where non-conforming characters are silently rejected by the mask"
        code={`<MaskedInputView mask="999-999-9999" value="" onChange={() => {}} disabled />

const [invalidZip, setInvalidZip] = useState('AB-12');
// mask="99999" only accepts digits — letters typed by the user are dropped
<MaskedInputView mask="99999" value={invalidZip} onChange={setInvalidZip} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Disabled (read-only environment)</div>
            <MaskedInputView mask="999-999-9999" value="" onChange={() => {}} disabled />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>
              5-digit zip mask — letters are rejected as you type
            </div>
            <MaskedInputView mask="99999" value={invalidZip} onChange={setInvalidZip} />
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}

function MaskedInputExampleRow({ mask, size, label }: { mask: string; size: 'xs' | 'sm' | 'md' | 'lg'; label: string }) {
  const [value, setValue] = useState('');
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>{label} ({size})</div>
      <MaskedInputView mask={mask} value={value} onChange={setValue} size={size} />
    </div>
  );
}
