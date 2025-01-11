import { yupResolver } from '@hookform/resolvers/yup';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Step } from '../create-coin.types';
import CreateCoinForm from './create-coin-form';
import { createCoinSchema } from './create-coin-form/create-coin-form.validation';
import CreateCoinPreview from './create-coin-form/create-coin-preview';
import CreateCoinPreviewButton from './create-coin-form/create-coin-preview/create-coin-preview-button';

const CreateCoinModal: FC = () => {
  const form = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(createCoinSchema),
    defaultValues: {
      step: Step.Details,
      features: {
        burnable: false,
        canBurn: false,
        mintable: false,
        editable: false,
      },
    },
  });

  return (
    <FormProvider {...form}>
      <Div
        p="1rem"
        gap="2rem"
        bg="#3C3C3C80"
        display="flex"
        width={['100vw', 'auto']}
        backdropFilter="blur(19px)"
        borderRadius={['1.125rem 1.125rem 0 0', '1.125rem']}
      >
        <Div
          gap="1rem"
          display="flex"
          flex={['1', 'unset']}
          flexDirection="column"
        >
          <CreateCoinForm />
        </Div>
        <CreateCoinPreview />
      </Div>
      <CreateCoinPreviewButton />
    </FormProvider>
  );
};

export default CreateCoinModal;
