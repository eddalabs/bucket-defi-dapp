import { JSX } from 'react';

export const walletsListFormat: {
  [key: string]: { key: string; displayName: string; icon: JSX.Element };
} = {
  lace: {
    key: 'lace',
    displayName: 'LACE',
    icon: <span className="text-lg font-bold">L</span>,
  },
  '1am': {
    key: '1am',
    displayName: '1AM',
    icon: <span className="text-lg font-bold">1</span>,
  },
};

export enum networkID {
  UNDEPLOYED = 'undeployed',
  PREVIEW = 'preview',
  PREPROD = 'preprod',
  MAINNET = 'mainnet',
}
