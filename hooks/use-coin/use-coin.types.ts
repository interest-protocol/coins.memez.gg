import type { useQuery } from '@apollo/client';

import type { Coin } from '@/interface';

export interface UseCoinResponse
  extends Omit<ReturnType<typeof useQuery>, 'data'> {
  coin?: Coin;
}
