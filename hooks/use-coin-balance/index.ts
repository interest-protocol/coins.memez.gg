import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { BigNumber } from 'bignumber.js';
import useSWR from 'swr';

export const useCoinBalance = (type?: string) => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR([type, 'useCoinBalance'], async () => {
    if (!type || !currentAccount) return;

    const balance = await client.getBalance({
      owner: currentAccount.address,
      coinType: type,
    });

    return BigNumber(balance.totalBalance);
  });

  return {
    balance: data,
    ...props,
  };
};
