import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { Network } from '@/constants';
import { RPC, RPC_STORAGE_KEY } from '@/constants/rpc';

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const rpc = useReadLocalStorage<RPC>(RPC_STORAGE_KEY) ?? RPC.Shinami;

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        defaultNetwork={Network.TESTNET}
        networks={
          createNetworkConfig({
            [Network.TESTNET]: { url: rpc },
          }).networkConfig
        }
      >
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default Web3Provider;
