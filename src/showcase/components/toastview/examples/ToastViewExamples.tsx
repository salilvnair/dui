import { useState, useCallback } from 'react';
import { ToastView, ButtonView } from '@/dui';
import type { Toast, ToastVariant } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

let _id = 0;
const uid = () => `toast-${++_id}`;

function ToastDemo() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((variant: ToastVariant, title: string, message?: string, duration?: number) => {
    const t: Toast = { id: uid(), variant, title, message, duration };
    setToasts(prev => [...prev, t]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <ButtonView
          size="sm"
          variant="primary"
          onClick={() => add('success', 'Request saved!', 'Your changes have been stored.')}
        >
          Success Toast
        </ButtonView>

        <ButtonView
          size="sm"
          variant="danger"
          onClick={() => add('error', 'Network error', 'Check your connection and try again.')}
        >
          Error Toast
        </ButtonView>

        <ButtonView
          size="sm"
          variant="ghost"
          onClick={() => add('warning', 'Request took longer than 5s', 'Consider increasing your timeout setting.')}
        >
          Warning Toast
        </ButtonView>

        <ButtonView
          size="sm"
          variant="ghost"
          onClick={() => add('info', 'Environment switched', 'Now using Production environment.')}
        >
          Info Toast
        </ButtonView>

        <ButtonView
          size="sm"
          variant="ghost"
          onClick={() => add('success', 'Quick dismiss', undefined, 2000)}
        >
          2s Auto-dismiss
        </ButtonView>

        <ButtonView
          size="sm"
          variant="ghost"
          onClick={() => add('info', 'Slow dismiss', 'This stays for 5 seconds.', 5000)}
        >
          5s Auto-dismiss
        </ButtonView>
      </div>

      <ToastView toasts={toasts} onDismiss={dismiss} position="bottom-right" />
    </>
  );
}

export function ToastViewExamples() {
  return (
    <div>
      <ExampleCard
        title="All Toast Variants"
        description="Click buttons to trigger Success / Error / Warning / Info toasts with auto-dismiss timing"
        code={`const { toast, dismiss } = useToast();\ntoast('success', 'Saved!', 'Your changes are stored.');\ntoast('error', 'Network error', 'Check your connection.');\ntoast('warning', 'Slow request', 'Took longer than 5s.');\ntoast('info', 'Env switched', 'Now using Production.');`}
      >
        <ToastDemo />
      </ExampleCard>
    </div>
  );
}
