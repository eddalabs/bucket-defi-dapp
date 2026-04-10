export const walletsListFormat: Record<string, { key: string; name: string; icon: string }> = {
  lace: {
    key: 'lace',
    name: 'Lace',
    icon: 'L',
  },
  '1am': {
    key: '1am',
    name: '1AM',
    icon: '1',
  },
};

export enum networkID {
  UNDEPLOYED = 'undeployed',
  PREVIEW = 'preview',
  PREPROD = 'preprod',
  MAINNET = 'mainnet',
}
