import { Div, P } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import unikey from 'unikey';

import useCoins from '@/hooks/use-coins';
import { useModal } from '@/hooks/use-modal';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { updateURL } from '@/utils/url';

import CoinCard from './coin-card';
import CoinModal from './coin-modal';
import CreateCoin from './create-coin';

const CardList: FC = () => {
  const { items } = useCoins();
  const { pathname } = useRouter();
  const { setContent } = useModal();
  const params = useURIStaticParams();

  useEffect(() => {
    if (!params?.has('coin')) return;

    const coin = params.get('coin');
    const mode = params.get('mode');

    updateURL(`${pathname}?coin=${coin}&mode=${mode}`);

    setContent(<CoinModal />, {
      allowClose: true,
      onClose: () => updateURL(pathname),
    });
  }, [params]);

  return (
    <Div>
      <Div
        gap="1rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Div display="flex" gap="1rem">
          <P>Filters:</P>
        </Div>
        <CreateCoin />
      </Div>
      <Div
        mt="1rem"
        gap="1rem"
        display="grid"
        gridTemplateColumns={[
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
          '1fr 1fr 1fr 1fr',
        ]}
      >
        {items?.map((coin) => <CoinCard key={unikey()} {...coin} />)}
      </Div>
    </Div>
  );
};

export default CardList;
