import { useEffect, useState } from 'react';
import { type Subscription } from 'rxjs';
import { type DerivedState, emptyState } from '../api/common-types';
import { type ContractController } from '../api/contractController';

export function useContractSubscription(controller: ContractController | null) {
  const [state, setState] = useState<DerivedState>(emptyState);

  useEffect(() => {
    if (!controller) {
      setState(emptyState);
      return;
    }

    let sub: Subscription | undefined;
    sub = controller.state$.subscribe({
      next: (s) => setState(s),
      error: (err) => console.error('Contract subscription error:', err),
    });

    return () => {
      sub?.unsubscribe();
    };
  }, [controller]);

  return state;
}
