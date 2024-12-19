import { gql, useQuery } from '@apollo/client';

import { useCoinsFilter } from '../use-coins-filter';
import { UseCoinsResponse } from './use-coins.types';

const useCoins = (): UseCoinsResponse => {
  const { page, limit } = useCoinsFilter();

  const { data, ...props } = useQuery(
    gql`
      query Coins($page: Int!, $limit: Int!) {
        fetchCoins(input: { page: $page, limit: $limit }) {
          totalItems
          coins {
            id
            name
            symbol
            type
            decimals
            iconUrl
            treasuryCap
            ipxTreasuryCap
            metadataObjectId
            createdAt
            createdBy
            description
          }
        }
      }
    `,
    {
      variables: { page, limit },
    }
  );

  return {
    ...props,
    items: data?.fetchCoins.coins,
    totalItems: data?.fetchCoins.totalItems,
  };
};

export default useCoins;
