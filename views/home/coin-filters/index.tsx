import { Div, Span } from '@stylin.js/elements';
import { not } from 'ramda';
import { FC, useEffect, useMemo } from 'react';

import { FilterSVG } from '@/components/svg';
import { useCoinsFilter } from '@/hooks/use-coins-filter';
import { useLocalMeMode } from '@/hooks/use-local-me-mode';
import { isSameAddress } from '@/utils';

import CoinFiltersTag from './coin-filters-tag';

const CoinFilters: FC = () => {
  const currentAccount = useMemo(
    () => ({
      address:
        '0x1eb7c567d5fcc99140007716d4235e2c72a4b65a7b89197f15fb73c2fb57d3d9',
    }),
    []
  );
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
      <Div display="flex" gap="0.5rem" alignItems="center">
        <CoinFiltersTag
          active={localMeMode}
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
          active={!!filter.burnable}
          onClick={() => setFilter({ burnable: !filter.burnable })}
        >
          Burnable
        </CoinFiltersTag>
        <CoinFiltersTag
          active={!!filter.mintable}
          onClick={() => setFilter({ mintable: !filter.mintable })}
        >
          Mintable
        </CoinFiltersTag>
        <CoinFiltersTag
          active={!!filter.editable}
          onClick={() => setFilter({ editable: !filter.editable })}
        >
          Editable
        </CoinFiltersTag>
      </Div>
    </Div>
  );
};

export default CoinFilters;
