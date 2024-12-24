import type { CoinStruct } from '@mysten/sui/client';

import { GetCoinsArgs } from './utils.types';

export const getCoins = async ({
  type,
  client,
  cursor,
  account,
}: GetCoinsArgs): Promise<CoinStruct[]> => {
  const { data, nextCursor, hasNextPage } = await client.getCoins({
    cursor,
    owner: account,
    coinType: type,
  });

  if (!hasNextPage) return data;

  const newData = await getCoins({
    type,
    client,
    account,
    cursor: nextCursor,
  });

  return [...data, ...newData];
};
