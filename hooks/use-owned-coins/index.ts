import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { keys, path } from 'ramda';
import useSWR from 'swr';

import { TREASURY_STRUCT_TYPE } from '@/constants';
import { fetchCoinMetadata } from '@/utils';

export const useOwnedCoins = (cursor?: string | null) => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();

  return useSWR([currentAccount?.address], async () => {
    if (!currentAccount) return;

    const { data, hasNextPage, nextCursor } = await client.getOwnedObjects({
      cursor,
      owner: currentAccount.address,
      filter: { StructType: TREASURY_STRUCT_TYPE },
      options: { showType: true, showContent: true },
    });

    const info = data.reduce(
      (acc, item) => {
        const type = (path(['data', 'type'], item) as string)
          .split(`${TREASURY_STRUCT_TYPE}<`)[1]
          .slice(0, -1);

        return {
          ...acc,
          [type]: {
            supply: path(
              ['data', 'content', 'fields', 'total_supply', 'fields', 'value'],
              item
            ) as string,
            id: item.data!.objectId,
          },
        };
      },
      {} as Record<string, { supply: string; id: string }>
    );

    const metadata = await fetchCoinMetadata(keys(info));

    const metadataWithSupply = metadata.map(({ type, ...rest }) => ({
      ...rest,
      type,
      supply: info[type]!.supply,
      treasuryId: info[type]!.id,
    }));

    return { metadataWithSupply, hasNextPage, nextCursor };
  });
};
