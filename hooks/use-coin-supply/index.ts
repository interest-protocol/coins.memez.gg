import { useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { makeSWRKey } from '@/utils';

export const useCoinSupply = (type?: string) => {
  const client = useSuiClient();

  const { data, ...props } = useSWR(
    makeSWRKey([type], 'coin-supply'),
    async () => {
      if (!type) return;

      const supply = await client.getTotalSupply({ coinType: type });

      return BigNumber(supply.value);
    }
  );

  return { totalSupply: data, ...props };
};
