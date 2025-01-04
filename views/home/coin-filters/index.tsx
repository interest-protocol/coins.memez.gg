import { Div, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { FilterSVG } from '@/components/svg';
import { useCoinsFilter } from '@/hooks/use-coins-filter';

import CoinFiltersTag from './coin-filters-tag';

const CoinFilters: FC = () => {
  const { filter, setFilter } = useCoinsFilter();

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
