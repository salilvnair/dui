import { useState } from 'react';
import { PhoneInputView, type PhoneCountry } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const WEBHOOK_ALERT_COUNTRIES: PhoneCountry[] = [
  { code: 'US', dialCode: '+1', label: 'United States', flag: '🇺🇸' },
  { code: 'IN', dialCode: '+91', label: 'India', flag: '🇮🇳' },
  { code: 'GB', dialCode: '+44', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'SG', dialCode: '+65', label: 'Singapore', flag: '🇸🇬' },
];

export function PhoneInputViewExamples() {
  const [basicCountry, setBasicCountry] = useState('US');
  const [basicNumber, setBasicNumber] = useState('');

  const [verifyCountry, setVerifyCountry] = useState('IN');
  const [verifyNumber, setVerifyNumber] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const [wideCountry, setWideCountry] = useState('GB');
  const [wideNumber, setWideNumber] = useState('');
  const [smallCountry, setSmallCountry] = useState('DE');
  const [smallNumber, setSmallNumber] = useState('');

  const [alertCountry, setAlertCountry] = useState('SG');
  const [alertNumber, setAlertNumber] = useState('');

  const sendCode = () => {
    if (verifyNumber.trim()) setCodeSent(true);
  };

  return (
    <div>
      <ExampleCard
        title="Default Phone Input"
        description="Country dial-code selector paired with a number field"
        code={`const [country, setCountry] = useState('US');
const [number, setNumber] = useState('');

<PhoneInputView
  countryCode={country}
  onCountryChange={setCountry}
  number={number}
  onNumberChange={setNumber}
/>`}
      >
        <PhoneInputView
          countryCode={basicCountry}
          onCountryChange={setBasicCountry}
          number={basicNumber}
          onNumberChange={setBasicNumber}
          style={{ width: 260 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Phone Verification Flow (interactive)"
        description="Send a verification code once a number is entered — real handler logic with a disabled-until-valid button"
        code={`const [country, setCountry] = useState('IN');
const [number, setNumber] = useState('');
const [codeSent, setCodeSent] = useState(false);

<PhoneInputView
  countryCode={country}
  onCountryChange={setCountry}
  number={number}
  onNumberChange={setNumber}
/>
<button disabled={!number.trim()} onClick={() => sendVerificationCode(country, number)}>
  Send code
</button>
{codeSent && <p>Verification code sent!</p>}`}
      >
        <div>
          <PhoneInputView
            countryCode={verifyCountry}
            onCountryChange={setVerifyCountry}
            number={verifyNumber}
            onNumberChange={v => { setVerifyNumber(v); setCodeSent(false); }}
            style={{ width: 260 }}
          />
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              disabled={!verifyNumber.trim()}
              onClick={sendCode}
              style={{
                fontSize: 11, padding: '5px 12px', borderRadius: 6,
                border: '1px solid var(--color-surface-border)',
                background: !verifyNumber.trim() ? 'var(--color-surface)' : 'var(--color-primary)',
                color: !verifyNumber.trim() ? 'var(--color-text-muted)' : '#fff',
                cursor: !verifyNumber.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              Send code
            </button>
            {codeSent && (
              <span style={{ marginLeft: 10, fontSize: 11, color: 'var(--color-success)' }}>
                Verification code sent!
              </span>
            )}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Width & Size Showcase"
        description="width and size props control the overall field dimensions"
        code={`<PhoneInputView countryCode={c1} onCountryChange={setC1} number={n1} onNumberChange={setN1} width="fullWidth" size="lg" />
<PhoneInputView countryCode={c2} onCountryChange={setC2} number={n2} onNumberChange={setN2} width="sm" size="sm" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)', marginBottom: 4 }}>Full width, lg size</div>
            <PhoneInputView countryCode={wideCountry} onCountryChange={setWideCountry} number={wideNumber} onNumberChange={setWideNumber} width="fullWidth" size="lg" />
          </div>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)', marginBottom: 4 }}>Compact, sm size</div>
            <PhoneInputView countryCode={smallCountry} onCountryChange={setSmallCountry} number={smallNumber} onNumberChange={setSmallNumber} width="sm" size="sm" />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook SMS Alert Number"
        description="Domain-realistic use case: setting a phone number for SMS alerts on webhook failures, restricted to a custom country list"
        code={`const alertCountries = [
  { code: 'US', dialCode: '+1', label: 'United States', flag: '🇺🇸' },
  { code: 'IN', dialCode: '+91', label: 'India', flag: '🇮🇳' },
  { code: 'GB', dialCode: '+44', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'SG', dialCode: '+65', label: 'Singapore', flag: '🇸🇬' },
];

<PhoneInputView
  countryCode={country}
  onCountryChange={setCountry}
  number={number}
  onNumberChange={setNumber}
  countries={alertCountries}
  placeholder="Mobile number for alerts"
  color="var(--color-warning)"
/>`}
      >
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
            Get SMS alerts when a webhook delivery fails
          </div>
          <PhoneInputView
            countryCode={alertCountry}
            onCountryChange={setAlertCountry}
            number={alertNumber}
            onNumberChange={setAlertNumber}
            countries={WEBHOOK_ALERT_COUNTRIES}
            placeholder="Mobile number for alerts"
            color="var(--color-warning)"
            style={{ width: 280 }}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State (Edge Case)"
        description="disabled=true locks both the country select and number field while preserving the current values"
        code={`<PhoneInputView
  countryCode="US"
  onCountryChange={() => {}}
  number="415 555 0132"
  onNumberChange={() => {}}
  disabled
/>`}
      >
        <PhoneInputView
          countryCode="US"
          onCountryChange={() => {}}
          number="415 555 0132"
          onNumberChange={() => {}}
          disabled
          style={{ width: 260 }}
        />
      </ExampleCard>
    </div>
  );
}
