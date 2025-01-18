export const RPC_STORAGE_KEY = 'coins-memez-rpc';

export enum RPC {
  Shinami = 'https://api.shinami.com/node/v1/sui_testnet_8d0574f74958d67931463c51da36bc24',
  Mysten = 'https://fullnode.testnet.sui.io:443',
  Blockvision = 'https://sui-testnet-endpoint.blockvision.org',
  SuiScan = 'https://rpc-testnet.suiscan.xyz/',
  Suiet = 'https://testnet.suiet.app',
}

export const RPCs = [
  RPC.Shinami,
  RPC.Mysten,
  RPC.Blockvision,
  RPC.SuiScan,
  RPC.Suiet,
];

export const RPC_DISPLAY = {
  [RPC.Shinami]: 'Shinami (Recommended)',
  [RPC.Mysten]: 'Mysten Public RPC',
  [RPC.Blockvision]: 'Blockvision',
  [RPC.SuiScan]: 'SuiScan',
  [RPC.Suiet]: 'Suiet',
};
