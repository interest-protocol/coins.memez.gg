import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';

import useCoin from '@/hooks/use-coin';
import { useCoinsAbilities } from '@/hooks/use-coins-abilities';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { Abilities } from '@/interface';
import { isSameAddress } from '@/utils';

import CoinModalLoading from '../coin-modal-loading';
import CoinModalNotFound from '../coin-modal-not-found';
import CoinEditForm from './coin-edit-form';

const CreateEdit: FC = () => {
  const account = useCurrentAccount();
  const params = useURIStaticParams();

  const { coin, loading } = useCoin(params?.get('coin') ?? undefined);

  const { abilities } = useCoinsAbilities({
    metadataCap: coin?.metadataCap,
  });

  if (loading) return <CoinModalLoading />;

  if (!coin) return <CoinModalNotFound />;

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
