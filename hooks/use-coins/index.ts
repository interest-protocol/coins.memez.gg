import { gql, useQuery } from '@apollo/client';

import { useCoinsFilter } from '../use-coins-filter';
import { useWhitelistedCoins } from '../use-whitelisted';
import { UseCoinsResponse } from './use-coins.types';

const useCoins = (): UseCoinsResponse => {
  const { page, limit, filter } = useCoinsFilter();
  const { data: whitelisted } = useWhitelistedCoins();

  const { data, ...props } = useQuery(
    gql`
      query Coins(
        $page: Int!
        $limit: Int!
        $creators: [String]
        $isBurnable: Boolean
        $isMintable: Boolean
        $isEditable: Boolean
        $showNsfw: Boolean
        $types: [String]
      ) {
        fetchCoins(
          input: {
            page: $page
            limit: $limit
            creators: $creators
            showNsfw: $showNsfw
            isBurnable: $isBurnable
            isMintable: $isMintable
            isEditable: $isEditable
            types: $types
          }
        ) {
          totalItems
          coins {
            name
            type
            symbol
            iconUrl
            burnCap
            canBurn
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
      variables: {
        page,
        limit,
        showNsfw: filter.showNsfw || undefined,
        isBurnable: filter.burnable || undefined,
        isMintable: filter.mintable || undefined,
        isEditable: filter.editable || undefined,
        creators: filter.creator ? [filter.creator] : undefined,
        types: filter.whitelisted ? whitelisted : undefined,
      },
      defaultOptions: {
        pollInterval: 5000,
      },
    }
  );

  return {
    ...props,
    items: data?.fetchCoins.coins,
    totalItems: data?.fetchCoins.totalItems,
  };
};

export default useCoins;
