import { useCallback, useEffect, useState } from 'react';

export type TxStage =
  | 'idle'
  | 'proving'
  | 'signing'
  | 'submitting'
  | 'finalizing'
  | 'indexing'
  | 'confirmed'
  | 'error';

const stageMessages: Record<TxStage, string> = {
  idle: '',
  proving: 'Proving transaction...',
  signing: 'Signing the transaction with wallet...',
  submitting: 'Submitting transaction...',
  finalizing: 'Waiting for finalization...',
  indexing: 'Indexing transaction...',
  confirmed: 'Transaction confirmed!',
  error: 'Transaction failed',
};

const stageProgress: Record<TxStage, number> = {
  idle: 0,
  proving: 15,
  signing: 30,
  submitting: 50,
  finalizing: 70,
  indexing: 85,
  confirmed: 100,
  error: 0,
};

function parseStageFromFlowMessage(message: string | undefined): TxStage | null {
  if (!message) return null;
  if (message.includes('Proving')) return 'proving';
  if (message.includes('Signing') || message.includes('wallet')) return 'signing';
  if (message.includes('Submitting')) return 'submitting';
  if (message.includes('finalization') || message.includes('Waiting')) return 'finalizing';
  if (message.includes('Downloading')) return 'proving';
  return null;
}

export function useTransactionProgress() {
  const [stage, setStage] = useState<TxStage>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Browser warning when transaction is active
  useEffect(() => {
    const isActive = !['idle', 'confirmed', 'error'].includes(stage);
    if (isActive) {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault();
      };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [stage]);

  const updateFromFlowMessage = useCallback(
    (flowMessage: string | undefined) => {
      const parsed = parseStageFromFlowMessage(flowMessage);
      if (parsed && stage !== 'idle' && stage !== 'confirmed' && stage !== 'error') {
        setStage(parsed);
      }
    },
    [stage],
  );

  const reset = useCallback(() => {
    setStage('idle');
    setErrorMessage(null);
  }, []);

  const execute = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setStage('proving');
    setErrorMessage(null);
    try {
      const result = await fn();
      setStage('confirmed');
      setTimeout(() => setStage('idle'), 3000);
      return result;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setErrorMessage(msg);
      setStage('error');
      return null;
    }
  }, []);

  return {
    stage,
    message: stageMessages[stage],
    progress: stageProgress[stage],
    errorMessage,
    execute,
    reset,
    updateFromFlowMessage,
    isIdle: stage === 'idle',
    isProcessing: !['idle', 'confirmed', 'error'].includes(stage),
  };
}
