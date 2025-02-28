import useSWR from 'swr';

import { Network } from '@/constants';

import { useNetwork } from '../use-network';

export const useWhitelistedCoins = () => {
  const network = useNetwork();
  return useSWR<ReadonlyArray<string>>(useWhitelistedCoins.name, async () => {
    const whitelistedCoins: Record<
      Network,
      ReadonlyArray<string>
    > = await fetch(
      'https://interest-protocol.github.io/public/sui/whitelisted-coins.json'
    ).then((res) => res.json?.());
    return whitelistedCoins[network];
  });
};
