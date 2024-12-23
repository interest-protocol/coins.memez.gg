import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ICreateCoin, Step } from '../create-coin.types';
import CreateCoinForm from './create-coin-form';
import CreateCoinPreview from './create-coin-form/create-coin-preview';
import CreateCoinPreviewButton from './create-coin-form/create-coin-preview/create-coin-preview-button';

const CreateCoinModal: FC = () => {
  const form = useForm<ICreateCoin>({
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
        borderRadius="1.125rem"
        backdropFilter="blur(19px)"
      >
        <Div gap="1rem" display="flex" flexDirection="column">
          <CreateCoinForm />
        </Div>
        <CreateCoinPreview />
      </Div>
      <CreateCoinPreviewButton />
    </FormProvider>
  );
};

export default CreateCoinModal;
