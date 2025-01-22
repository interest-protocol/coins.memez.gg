import type { CoinStruct } from '@mysten/sui/client';

import { FetchCoinMetadata, GetCoinsArgs } from './utils.types';

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

export const fetchCoinMetadata: FetchCoinMetadata = async (types) => {
  const uniqueTypes = Array.from(new Set(types));

  const metadata = await fetch(
    `${process.env.NEXT_PUBLIC_COIN_METADATA_API}/api/v1/fetch-coins?coinTypes=${uniqueTypes}`,
    { headers: { network: 'sui' } }
  ).then((res) => res.json());

  return metadata;
};
