import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { NETWORK } from '@/constants';
import { RPC, RPC_MAP, RPC_STORAGE_KEY } from '@/constants/rpc';

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const rpc = useReadLocalStorage<RPC>(RPC_STORAGE_KEY) ?? RPC.Shinami;

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        defaultNetwork={NETWORK}
        networks={
          createNetworkConfig({
            [NETWORK]: { url: RPC_MAP[NETWORK][rpc] },
          }).networkConfig
        }
      >
        <WalletProvider autoConnect stashedWallet={{ name: 'coins.memez.gg' }}>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default Web3Provider;
