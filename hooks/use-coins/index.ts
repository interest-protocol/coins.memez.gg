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
            name
            type
            symbol
            iconUrl
            burnCap
            mintCap
            decimals
            createdAt
            createdBy
            description
            metadataCap
            treasuryCap
            maximumSupply
            ipxTreasuryCap
            metadataObjectId
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
