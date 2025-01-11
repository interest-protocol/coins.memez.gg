import { Div, H4 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import unikey from 'unikey';
import { useDebounceValue } from 'usehooks-ts';

import { useSearchCoins } from '@/hooks/use-search-coins';

import { ISearchForm, SearchResultsContentProps } from '../search-modal.types';
import SearchResultsItem from './search-results-item';

const SearchResultsContent: FC<SearchResultsContentProps> = ({ search }) => {
  const { itemsPerField } = useSearchCoins(search);

  if (!itemsPerField) return null;

  return (
    <Div
      flex="1"
      py="1rem"
      gap="1rem"
      px="0.5rem"
      height="100%"
      display="flex"
      overflowY="auto"
      flexDirection="column"
      borderTop="1px solid #F5B722"
      onClick={(e) => e.stopPropagation()}
    >
      {itemsPerField.map(({ coins, field }) => (
        <Div key={unikey()} display="flex" flexDirection="column" gap="0.5rem">
          <H4 color="#F5B722" ml="0.5rem">
            {field}
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

const SearchResults: FC = () => {
  const { control } = useFormContext<ISearchForm>();

  const [search] = useDebounceValue(useWatch({ control, name: 'search' }), 300);

  if (!search) return null;

  return <SearchResultsContent search={search} />;
};

export default SearchResults;
