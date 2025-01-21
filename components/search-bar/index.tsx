import { Div, Span } from '@stylin.js/elements';
import { FC } from 'react';

import useEventListener from '@/hooks/use-event-listener';
import { useIsMacOS } from '@/hooks/use-is-mac-os';
import { useModal } from '@/hooks/use-modal';

import { CommandSVG, SearchSVG } from '../svg';
import SearchModal from './search-modal';

const SearchBar: FC = () => {
  const isMacOS = useIsMacOS();
  const { setContent, onClose } = useModal();

  const handleSearch = () => setContent(<SearchModal />, { onClose });

  useEventListener(
    'keydown',
    (e) => {
      if (!e) return;

      if ((e as KeyboardEvent).key === 'k' && (e as KeyboardEvent).metaKey)
        handleSearch();
    },
    true
  );

  return (
    <>
      <Div
        px="1rem"
        py="0.5rem"
        gap="0.5rem"
        bg="#1A1A1A"
        width="30rem"
        cursor="text"
        color="#7C7C7C"
        alignItems="center"
        borderRadius="0.75rem"
        onClick={handleSearch}
        border="1px solid transparent"
        nHover={{ borderColor: '#F5B722' }}
        display={['none', 'none', 'none', 'flex']}
      >
        <SearchSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        <Span flex="1">Explore coins</Span>
        <Span
          py="0.5rem"
          px="0.75rem"
          bg="#161616"
          display="flex"
          gap="0.125rem"
          alignItems="center"
          borderRadius="0.5rem"
        >
          {isMacOS ? (
            <CommandSVG maxWidth="0.75rem" maxHeight="0.75rem" width="100%" />
          ) : (
            <Span fontFamily="Manrope">ctrl + </Span>
          )}
          <Span fontFamily="Manrope">K</Span>
        </Span>
      </Div>
      <Div
        flex="1"
        mr="1rem"
        color="#7C7C7C"
        textAlign="right"
        onClick={handleSearch}
        display={['block', 'block', 'block', 'none']}
      >
        <SearchSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
      </Div>
    </>
  );
};

export default SearchBar;
