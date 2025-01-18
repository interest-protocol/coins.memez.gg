import { useSuiClient } from '@mysten/dapp-kit';
import { keys, pathOr, values } from 'ramda';
import useSWR from 'swr';

import { Abilities } from '@/interface';

interface UseCoinsAbilitiesArgs {
  burnCap?: string;
  mintCap?: string;
  metadataCap?: string;
}

export const useCoinsAbilities = ({
  burnCap,
  mintCap,
  metadataCap,
}: UseCoinsAbilitiesArgs) => {
  const client = useSuiClient();

  const { data, ...props } = useSWR<Record<Abilities, string | null>>(
    [burnCap, mintCap, metadataCap],
    async () => {
      const caps = [
        [Abilities.Burn, burnCap],
        [Abilities.Mint, mintCap],
        [Abilities.Edit, metadataCap],
      ].reduce(
        (acc, [ability, value]) =>
          value ? { ...acc, [ability as number]: value } : acc,
        {}
      );

      const response = await client.multiGetObjects({
        ids: values(caps),
        options: { showOwner: true },
      });

      const result = {
        ...response.reduce(
          (acc, curr, index) => ({
            ...acc,
            [keys(caps)[index]]: pathOr(
              null,
              ['data', 'owner', 'AddressOwner'],
              curr
            ),
          }),
          {
            [Abilities.Burn]: null,
            [Abilities.Mint]: null,
            [Abilities.Edit]: null,
          } as Record<Abilities, string | null>
        ),
      };

      return result;
    }
  );

  return { abilities: data, ...props };
};
