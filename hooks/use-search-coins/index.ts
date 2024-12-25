import { gql, useQuery } from '@apollo/client';

import { UseSearchCoinsResponse } from './use-search-coins.types';

export const useSearchCoins = (search: string): UseSearchCoinsResponse => {
  const { data, ...props } = useQuery(
    gql`
      query Coins($search: String!) {
        searchCoins(input: { search: $search }) {
          result {
            type
            coins {
              name
              type
              symbol
              iconUrl
            }
          }
        }
      }
    `,
    {
      variables: { search },
    }
  );

  return {
    ...props,
    itemsPerType: data?.searchCoins.result,
  };
};
