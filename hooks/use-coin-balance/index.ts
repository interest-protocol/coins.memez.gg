import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { BigNumber } from 'bignumber.js';
import useSWR from 'swr';

export const useCoinBalance = (type?: string, account?: string) => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR(
    [type, account ?? currentAccount?.address, 'useCoinBalance'],
    async () => {
      if (!type || !currentAccount || !account) return;

      const balance = await client.getBalance({
        owner: account ?? currentAccount.address,
        coinType: type,
      });

      return BigNumber(balance.totalBalance);
    }
  );

  return {
    balance: data,
    ...props,
  };
};
