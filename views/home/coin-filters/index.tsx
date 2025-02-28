import { useCurrentAccount } from '@mysten/dapp-kit';
import { Div, Span } from '@stylin.js/elements';
import { not } from 'ramda';
import { FC, useEffect } from 'react';

import { FilterSVG } from '@/components/svg';
import { useCoinsFilter } from '@/hooks/use-coins-filter';
import { useLocalMeMode } from '@/hooks/use-local-me-mode';
import { isSameAddress } from '@/utils';

import CoinFiltersTag from './coin-filters-tag';

const CoinFilters: FC = () => {
  const currentAccount = useCurrentAccount();
  const { filter, setFilter } = useCoinsFilter();
  const [localMeMode, setLocalMeMode] = useLocalMeMode();

  useEffect(() => {
    if (
      localMeMode &&
      filter.creator &&
      currentAccount &&
      isSameAddress(filter.creator, currentAccount.address)
    )
      return;

    const creator = localMeMode
      ? currentAccount &&
        !isSameAddress(filter.creator ?? '', currentAccount.address)
        ? currentAccount.address
        : '0x'
      : undefined;

    setFilter({ creator });
  }, [localMeMode, currentAccount]);

  return (
    <Div display="flex" gap="1rem">
      <Div
        gap="0.5rem"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <FilterSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        <Span>Filter</Span>
      </Div>
      <Div display="flex" flexWrap="wrap" gap="0.5rem" alignItems="center">
        <CoinFiltersTag
          active={!!filter.whitelisted}
          isWhitelist={true}
          onClick={() => {
            setFilter({ whitelisted: !filter.whitelisted });
          }}
        >
          Whitelisted
        </CoinFiltersTag>
        <CoinFiltersTag
          active={localMeMode}
          isWhitelist={false}
          onClick={() => {
            const creator =
              currentAccount &&
              !isSameAddress(filter.creator ?? '', currentAccount.address)
                ? currentAccount.address
                : localMeMode
                  ? undefined
                  : '0x';

            setLocalMeMode(not);
            setFilter({ creator });
          }}
        >
          Me
        </CoinFiltersTag>
        <CoinFiltersTag
          isWhitelist={false}
          active={!!filter.burnable}
          onClick={() => setFilter({ burnable: !filter.burnable })}
        >
          Burnable
        </CoinFiltersTag>
        <CoinFiltersTag
          active={!!filter.mintable}
          isWhitelist={false}
          onClick={() => setFilter({ mintable: !filter.mintable })}
        >
          Mintable
        </CoinFiltersTag>
        <CoinFiltersTag
          active={!!filter.editable}
          isWhitelist={false}
          onClick={() => setFilter({ editable: !filter.editable })}
        >
          Editable
        </CoinFiltersTag>
      </Div>
    </Div>
  );
};

export default CoinFilters;
