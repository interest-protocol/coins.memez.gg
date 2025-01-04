import { Div, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchSVG } from '@/components/svg';
import TextField from '@/components/text-field';
import { useModal } from '@/hooks/use-modal';

import { ISearchForm } from './search-modal.types';
import SearchResults from './search-results';

const SearchModal: FC = () => {
  const { handleClose } = useModal();
  const form = useForm<ISearchForm>();

  return (
    <FormProvider {...form}>
      <Div
        display="flex"
        flexDirection="column"
        height={['90vh', '90vh', '90vh', '70vh']}
      >
        <Div
          bg="#1A1A1A"
          overflow="hidden"
          borderRadius="1rem"
          border="1px solid #F5B722"
        >
          <TextField
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            color="#F5B722"
            placeholder="Explore coins"
            width={['12rem', '12rem', '30rem']}
            Prefix={
              <Span color="#7C7C7C">
                <SearchSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Span>
            }
            Suffix={
              <Span
                py="0.5rem"
                px="0.75rem"
                bg="#161616"
                gap="0.125rem"
                color="#7C7C7C"
                cursor="pointer"
                alignItems="center"
                fontSize="0.825rem"
                fontFamily="Manrope"
                borderRadius="0.5rem"
                onClick={handleClose}
                nHover={{ color: '#ffffff' }}
              >
                ESC
              </Span>
            }
            {...form.register('search')}
          />
          <SearchResults />
        </Div>
      </Div>
    </FormProvider>
  );
};

export default SearchModal;
