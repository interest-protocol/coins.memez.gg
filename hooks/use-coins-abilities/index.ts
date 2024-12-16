import { useSuiClient } from '@mysten/dapp-kit';
import { keys, pathOr, values } from 'ramda';
import useSWR from 'swr';

import { Abilities } from '@/interface';

export const useCoinsAbilities = (ipxTreasuryCap?: string) => {
  const client = useSuiClient();

  const { data, ...props } = useSWR(ipxTreasuryCap, async () => {
    if (!ipxTreasuryCap) return;

    const data = await client.getObject({
      id: ipxTreasuryCap,
      options: { showContent: true },
    });

    const caps = [
      [
        Abilities.Burn,
        pathOr('', ['data', 'content', 'fields', 'burn_cap'], data),
      ],
      [
        Abilities.Mint,
        pathOr('', ['data', 'content', 'fields', 'mint_cap'], data),
      ],
      [
        Abilities.Edit,
        pathOr('', ['data', 'content', 'fields', 'metadata_cap'], data),
      ],
    ].reduce(
      (acc, curr) => (curr[1] ? { ...acc, [curr[0]]: curr[1] } : acc),
      {}
    );

    const response = await client.multiGetObjects({
      ids: values(caps),
      options: { showContent: true },
    });

    const result = {
      ...response.reduce(
        (acc, curr, index) => ({
          ...acc,
          [keys(caps)[index]]: acc[keys(caps)[index]] || !curr.error,
        }),
        {
          [Abilities.Burn]: pathOr(
            '',
            ['data', 'content', 'fields', 'can_burn'],
            data
          ),
          [Abilities.Mint]: false,
          [Abilities.Edit]: false,
        }
      ),
    };

    return result;
  });

  return { abilities: data, ...props };
};
