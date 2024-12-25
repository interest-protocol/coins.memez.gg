import { Div, H4 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import unikey from 'unikey';
import { useDebounceValue } from 'usehooks-ts';

import { useSearchCoins } from '@/hooks/use-search-coins';

import { ISearchForm } from '../search-modal.types';
import SearchResultsItem from './search-results-item';

const SearchResults: FC = () => {
  const { control } = useFormContext<ISearchForm>();

  const [search] = useDebounceValue(useWatch({ control, name: 'search' }), 300);

  const { itemsPerType } = useSearchCoins(search);

  if (!itemsPerType) return null;

  return (
    <Div
      py="1rem"
      gap="1rem"
      px="0.5rem"
      display="flex"
      flexDirection="column"
      borderTop="1px solid #F5B722"
    >
      {itemsPerType.map(({ coins, type }) => (
        <Div key={unikey()} display="flex" flexDirection="column" gap="0.5rem">
          <H4 color="#F5B722" ml="0.5rem">
            {type}
          </H4>
          <Div display="flex" flexDirection="column" gap="0.5rem">
            {coins.map((coin) => (
              <SearchResultsItem key={unikey()} {...coin} />
            ))}
          </Div>
        </Div>
      ))}
    </Div>
  );
};

export default SearchResults;
