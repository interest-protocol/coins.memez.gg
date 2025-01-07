import { useCurrentAccount } from '@mysten/dapp-kit';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import useCoin from '@/hooks/use-coin';
import { useCoinsAbilities } from '@/hooks/use-coins-abilities';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { Abilities } from '@/interface';
import { isSameAddress } from '@/utils';

import CoinEditForm from './coin-edit-form';

const CreateEdit: FC = () => {
  const account = useCurrentAccount();
  const params = useURIStaticParams();

  const { coin } = useCoin(params?.get('coin') ?? undefined);

  const { abilities } = useCoinsAbilities({
    burnCap: coin?.metadataCap,
  });

  if (!coin) return <Div>Loading...</Div>;

  return (
    <CoinEditForm
      coin={coin}
      editable={
        !!(
          abilities?.[Abilities.Edit] &&
          account?.address &&
          isSameAddress(abilities?.[Abilities.Edit], account?.address)
        )
      }
    />
  );
};

export default CreateEdit;
