import { gql, useQuery } from '@apollo/client';

import { UseCoinResponse } from './use-coin.types';

const useCoin = (type?: string): UseCoinResponse => {
  const { data, ...props } = useQuery(
    gql`
      query Coin($type: String!) {
        fetchCoin(input: { type: $type }) {
          name
          type
          symbol
          iconUrl
          burnCap
          mintCap
          canBurn
          decimals
          createdAt
          createdBy
          packageId
          description
          metadataCap
          treasuryCap
          maximumSupply
          ipxTreasuryCap
          metadataObjectId
        }
      }
    `,
    {
      variables: { type: type ?? '0x2::sui::SUI' },
    }
  );

  return {
    coin: data?.fetchCoin,
    ...props,
  };
};

export default useCoin;
