import type { useQuery } from '@apollo/client';

import type { Coin } from '@/interface';

export interface UseCoinsResponse
  extends Omit<ReturnType<typeof useQuery>, 'data'> {
  totalItems?: number;
  items?: ReadonlyArray<Coin>;
}
