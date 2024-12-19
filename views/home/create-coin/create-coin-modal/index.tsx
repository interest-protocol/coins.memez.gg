import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ICreateCoin, Step } from '../create-coin.types';
import CreateCoinForm from './create-coin-form';
import CreateCoinSteps from './create-coin-steps';

const CreateCoinModal: FC = () => {
  const form = useForm<ICreateCoin>({
    defaultValues: { step: Step.Details },
  });

  return (
    <FormProvider {...form}>
      <Div
        p="1rem"
        gap="1rem"
        bg="#3C3C3C80"
        display="flex"
        maxHeight="90vh"
        maxWidth="43.75rem"
        width="fill-available"
        flexDirection="column"
        borderRadius="1.125rem"
        backdropFilter="blur(19px)"
      >
        <CreateCoinSteps />
        <CreateCoinForm />
      </Div>
    </FormProvider>
  );
};

export default CreateCoinModal;
