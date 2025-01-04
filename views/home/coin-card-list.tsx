import { Div, H3 } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import unikey from 'unikey';

import useCoins from '@/hooks/use-coins';
import { useModal } from '@/hooks/use-modal';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { updateURL } from '@/utils/url';

import CoinCard from './coin-card';
import CoinFilters from './coin-filters';
import CoinModal from './coin-modal';
import CreateCoin from './create-coin';

const CardList: FC = () => {
  const { totalItems, items } = useCoins();
  const { pathname } = useRouter();
  const { setContent } = useModal();
  const params = useURIStaticParams();

  useEffect(() => {
    if (!params?.has('coin')) return;

    const coin = params.get('coin');
    const mode = params.get('mode');

    updateURL(`${pathname}?coin=${coin}&mode=${mode}`);

    setContent(<CoinModal />, {
      onClose: () => updateURL(pathname),
      overlayProps: {
        alignItems: ['flex-end', 'center'],
      },
      containerProps: {
        maxWidth: ['100vw', '95vw'],
      },
    });
  }, [params]);

  return (
    <Div>
      <Div
        gap="1rem"
        display="flex"
        justifyContent="space-between"
        alignItems={['unset', 'unset', 'unset', 'center']}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <H3 fontSize={['1.5rem', '1.5rem', '1.5rem', '1.25rem']}>
          {items?.length} coins of {totalItems}
        </H3>
        <Div gap="2rem" display="flex" alignItems="center">
          <CoinFilters />
          <Div display={['none', 'none', 'none', 'block']}>
            <CreateCoin />
          </Div>
        </Div>
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
