import { Div, H3 } from '@stylin.js/elements';
import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import unikey from 'unikey';

import { ChevronLeftSVG, ChevronRightSVG, LoaderSVG } from '@/components/svg';
import useCoins from '@/hooks/use-coins';
import { useCoinsFilter } from '@/hooks/use-coins-filter';

import CoinFilters from '../coin-filters';
import CoinModalInitManager from '../coin-modal/coin-modal-init-manager';
import CreateCoin from '../new-coin';
import CoinCardListEmpty from './coin-card-list-empty';
import CoinCard from './coin-card-list-item';

const CardList: FC = () => {
  const { page, setPage, limit } = useCoinsFilter();
  const { totalItems, items, loading } = useCoins();

  const firstItem = (page - 1) * limit;

  return (
    <Div>
      <CoinModalInitManager />
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
              {firstItem + 1} - {firstItem + items?.length} coins of{' '}
              {totalItems}
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
              '1fr',
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
              onPageChange={({ selected }) => setPage(selected + 1)}
              pageCount={
                totalItems <= limit ? 0 : Math.ceil(totalItems / limit)
              }
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
