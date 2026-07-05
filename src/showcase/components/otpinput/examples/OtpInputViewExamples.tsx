import { useState } from 'react';
import { OtpInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function OtpInputViewExamples() {
  const [basic, setBasic] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified' | 'error'>('idle');
  const [fourDigit, setFourDigit] = useState('');
  const [alphaCode, setAlphaCode] = useState('');
  const [disabledOtp] = useState('482');

  const handleComplete = (code: string) => {
    setStatus('verifying');
    setTimeout(() => {
      setStatus(code === '123456' ? 'verified' : 'error');
    }, 600);
  };

  return (
    <div>
      <ExampleCard
        title="Default 6-Digit OTP"
        description="Numeric-only OTP input with auto-advance between boxes"
        code={`const [otp, setOtp] = useState('');

<OtpInputView value={otp} onChange={setOtp} length={6} />`}
      >
        <OtpInputView value={basic} onChange={setBasic} length={6} />
      </ExampleCard>

      <ExampleCard
        title="2FA Login Verification (interactive)"
        description="onComplete fires verification logic once all digits are filled — shows verifying/verified/error states"
        code={`const [otp, setOtp] = useState('');
const [status, setStatus] = useState<'idle' | 'verifying' | 'verified' | 'error'>('idle');

<OtpInputView
  value={otp}
  onChange={setOtp}
  length={6}
  onComplete={code => {
    setStatus('verifying');
    verifyTwoFactorCode(code).then(ok => setStatus(ok ? 'verified' : 'error'));
  }}
/>
{status === 'verifying' && <span>Verifying...</span>}
{status === 'verified' && <span>Code verified!</span>}
{status === 'error' && <span>Invalid code, try again.</span>}`}
      >
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
            Enter the 6-digit code from your authenticator app (try 123456)
          </div>
          <OtpInputView
            value={loginOtp}
            onChange={v => { setLoginOtp(v); if (status !== 'idle') setStatus('idle'); }}
            length={6}
            onComplete={handleComplete}
            color={status === 'error' ? 'var(--color-error)' : status === 'verified' ? 'var(--color-success)' : undefined}
          />
          <div style={{ marginTop: 8, fontSize: 11 }}>
            {status === 'verifying' && <span style={{ color: 'var(--color-text-muted)' }}>Verifying...</span>}
            {status === 'verified' && <span style={{ color: 'var(--color-success)' }}>Code verified!</span>}
            {status === 'error' && <span style={{ color: 'var(--color-error)' }}>Invalid code, try again.</span>}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Length & Color Showcase"
        description="4-digit vs 6-digit lengths with different accent colors"
        code={`<OtpInputView value={pin} onChange={setPin} length={4} color="var(--color-success)" />
<OtpInputView value={code} onChange={setCode} length={6} color="var(--color-protocol-graphql)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)', marginBottom: 4 }}>4-digit PIN, success accent</div>
            <OtpInputView value={fourDigit} onChange={setFourDigit} length={4} color="var(--color-success)" />
          </div>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)', marginBottom: 4 }}>6-digit, custom accent, non-numeric allowed</div>
            <OtpInputView value={alphaCode} onChange={setAlphaCode} length={6} numeric={false} color="var(--color-protocol-graphql)" />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook Signing Secret Confirmation"
        description="Domain-realistic use case: confirming the last 6 digits of a webhook secret before regenerating it"
        code={`<OtpInputView
  value={confirmDigits}
  onChange={setConfirmDigits}
  length={6}
  color="var(--color-warning)"
  onComplete={digits => enableRegenerateButton(digits)}
/>`}
      >
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
            Confirm the last 6 digits of your current webhook secret to regenerate it
          </div>
          <OtpInputView value="" onChange={() => {}} length={6} color="var(--color-warning)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State (Edge Case)"
        description="disabled=true locks the boxes while preserving the pre-filled value, e.g. while a request is in flight"
        code={`<OtpInputView value="482" onChange={() => {}} length={6} disabled />`}
      >
        <OtpInputView value={disabledOtp} onChange={() => {}} length={6} disabled />
      </ExampleCard>
    </div>
  );
}
