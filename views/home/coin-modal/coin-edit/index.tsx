import { FC, useMemo } from 'react';

import useCoin from '@/hooks/use-coin';
import { useCoinsAbilities } from '@/hooks/use-coins-abilities';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { Abilities } from '@/interface';
import { isSameAddress } from '@/utils';

import CoinModalLoading from '../coin-modal-loading';
import CoinModalNotFound from '../coin-modal-not-found';
import CoinEditForm from './coin-edit-form';

const CreateEdit: FC = () => {
  const account = useMemo(
    () => ({
      address:
        '0x1eb7c567d5fcc99140007716d4235e2c72a4b65a7b89197f15fb73c2fb57d3d9',
    }),
    []
  );
  const params = useURIStaticParams();

  const { coin, loading } = useCoin(params?.get('coin') ?? undefined);

  const { abilities } = useCoinsAbilities({ metadataCap: coin?.metadataCap });

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
