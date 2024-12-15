import { gql, useQuery } from '@apollo/client';

import { UseCoinResponse } from './use-coin.types';

const useCoin = (id?: string): UseCoinResponse => {
  const { data, ...props } = useQuery(
    gql`
      query Coin($id: String!) {
        fetchCoin(input: { id: $id }) {
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
    `,
    {
      variables: { id },
    }
  );

  return {
    coin: data?.fetchCoin,
    ...props,
  };
};

export default useCoin;
