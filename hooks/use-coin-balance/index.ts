import { useSuiClient } from '@mysten/dapp-kit';
import { BigNumber } from 'bignumber.js';
import { useMemo } from 'react';
import useSWR from 'swr';

export const useCoinBalance = (type?: string, account?: string) => {
  const client = useSuiClient();

  const currentAccount = useMemo(
    () => ({
      address:
        '0x1eb7c567d5fcc99140007716d4235e2c72a4b65a7b89197f15fb73c2fb57d3d9',
    }),
    []
  );

  const { data, ...props } = useSWR(
    [type, account ?? currentAccount?.address, useCoinBalance.name],
    async () => {
      const address = account || currentAccount?.address;

      if (!type || !address) return;

      const balance = await client.getBalance({
        owner: address,
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
