import { Network } from './network';

export const MIGRATE_COIN_FEE_MAP: Record<Network, number> = {
  [Network.TESTNET]: 0.01, // means 0.01 SUI
  [Network.MAINNET]: 1, // means 1 SUI
};

export const FEE_ADDRESS =
  '0xdd224f2287f0b38693555c6077abe85fcb4aa13e355ad54bc167611896b007e6';

export const CREATE_COIN_FEE_MAP: Record<Network, number> = {
  [Network.TESTNET]: 0.01, // means 0.01 SUI
  [Network.MAINNET]: 2, // means 2 SUI
};
