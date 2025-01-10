import type { useQuery } from '@apollo/client';

export interface SearchingCoin {
  name: string;
  type: string;
  symbol: string;
  iconUrl: string;
}

interface TypedItems {
  field: string;
  coins: ReadonlyArray<SearchingCoin>;
}

export interface UseSearchCoinsResponse
  extends Omit<ReturnType<typeof useQuery>, 'data'> {
  totalItems?: number;
  itemsPerField?: ReadonlyArray<TypedItems>;
}
