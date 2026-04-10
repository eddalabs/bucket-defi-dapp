import { useCallback, useState } from 'react';

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
  proving: 'Generating ZK proof...',
  signing: 'Signing transaction...',
  submitting: 'Submitting to network...',
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

export function useTransactionProgress() {
  const [stage, setStage] = useState<TxStage>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStage('idle');
    setErrorMessage(null);
  }, []);

  const execute = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setStage('proving');
    setErrorMessage(null);
    try {
      setStage('submitting');
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
    isIdle: stage === 'idle',
    isProcessing: !['idle', 'confirmed', 'error'].includes(stage),
  };
}
