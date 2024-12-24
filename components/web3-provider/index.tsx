import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { Network } from '@/constants';

const { networkConfig } = createNetworkConfig({
  [Network.TESTNET]: { url: getFullnodeUrl('testnet') },
  [Network.MAINNET]: { url: getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider
      networks={networkConfig}
      defaultNetwork={Network.TESTNET}
    >
      <WalletProvider autoConnect>{children}</WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);

export default Web3Provider;
