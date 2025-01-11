import { Div, H3 } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import unikey from 'unikey';

import { ChevronLeftSVG, ChevronRightSVG, LoaderSVG } from '@/components/svg';
import useCoins from '@/hooks/use-coins';
import { useCoinsFilter } from '@/hooks/use-coins-filter';
import { useModal } from '@/hooks/use-modal';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { updateURL } from '@/utils/url';

import CoinCard from './coin-card';
import CoinCardListEmpty from './coin-card-list-empty';
import CoinFilters from './coin-filters';
import CoinModal from './coin-modal';
import CreateCoin from './create-coin';

const CardList: FC = () => {
  const { pathname } = useRouter();
  const { setContent } = useModal();
  const params = useURIStaticParams();
  const { page, setPage, limit } = useCoinsFilter();
  const { totalItems, items, loading } = useCoins();

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
          {items && totalItems ? (
            <>
              {items?.length} coins of {totalItems}
            </>
          ) : (
            'No Results'
          )}
        </H3>
        <Div gap="2rem" display="flex" alignItems="center">
          <CoinFilters />
          <Div display={['none', 'none', 'none', 'block']}>
            <CreateCoin />
          </Div>
        </Div>
      </Div>
      {items && totalItems ? (
        <Div gap="2rem" display="flex" flexDirection="column">
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
            {items.map((coin) => (
              <CoinCard key={unikey()} {...coin} />
            ))}
          </Div>
          <Div display="flex" justifyContent="center" fontFamily="DM Sans">
            <ReactPaginate
              breakLabel="..."
              initialPage={page - 1}
              pageRangeDisplayed={2}
              renderOnZeroPageCount={null}
              containerClassName="paginate"
              pageCount={Math.floor(totalItems / limit)}
              onPageChange={({ selected }) => setPage(selected + 1)}
              previousLabel={
                <ChevronLeftSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
              }
              nextLabel={
                <ChevronRightSVG
                  width="100%"
                  maxWidth="1rem"
                  maxHeight="1rem"
                />
              }
            />
          </Div>
        </Div>
      ) : loading ? (
        <Div
          height="30rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LoaderSVG />
        </Div>
      ) : (
        <CoinCardListEmpty />
      )}
    </Div>
  );
};

export default CardList;
