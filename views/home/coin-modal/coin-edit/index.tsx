import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import useCoin from '@/hooks/use-coin';
import useURIStaticParams from '@/hooks/use-uri-static-params';

import CoinEditForm from './coin-edit-form';

const CreateEdit: FC = () => {
  const params = useURIStaticParams();

  const { coin } = useCoin(params?.get('coin') ?? undefined);

  if (!coin) return <Div>Loading...</Div>;

  return <CoinEditForm coin={coin} />;
};

export default CreateEdit;
