import { Div } from '@stylin.js/elements';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ICreateCoin, Step } from '../create-coin.types';
import CreateCoinForm from './create-coin-form';
import CreateCoinPreview from './create-coin-form/create-coin-preview';
import CreateCoinPreviewButton from './create-coin-form/create-coin-preview/create-coin-preview-button';
import CreateCoinSteps from './create-coin-steps';

const ModalContainer = motion(Div);

const CreateCoinModal: FC = () => {
  const form = useForm<ICreateCoin>({
    defaultValues: { step: Step.Details },
  });

  return (
    <FormProvider {...form}>
      <Div display="flex">
        <ModalContainer
          layout
          p="1rem"
          gap="2rem"
          bg="#3C3C3C80"
          display="flex"
          maxHeight="90vh"
          borderRadius="1.125rem"
          backdropFilter="blur(19px)"
        >
          <Div gap="1rem" display="flex" flexDirection="column">
            <CreateCoinSteps />
            <CreateCoinForm />
          </Div>
          <CreateCoinPreview />
        </ModalContainer>
        <CreateCoinPreviewButton />
      </Div>
    </FormProvider>
  );
};

export default CreateCoinModal;
