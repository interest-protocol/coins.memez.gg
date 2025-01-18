import { yupResolver } from '@hookform/resolvers/yup';
import { Div } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Step } from './migrate-coin.types';
import MigrateCoinForm from './migrate-coin-form';
import { migrateCoinSchema } from './migrate-coin-form/migrate-coin-form.validation';
import MigrateCoinPreview from './migrate-coin-form/migrate-coin-preview';
import MigrateCoinPreviewButton from './migrate-coin-form/migrate-coin-preview/migrate-coin-preview-button';

const Motion = motion.create(Div);

const MigrateCoinModal: FC = () => {
  const form = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(migrateCoinSchema),
    defaultValues: {
      step: Step.Select,
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
      <Motion
        p="1rem"
        gap="2rem"
        bg="#3C3C3C80"
        height="80vh"
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
          <MigrateCoinForm />
        </Div>
        <MigrateCoinPreview />
      </Motion>
      <MigrateCoinPreviewButton />
    </FormProvider>
  );
};

export default MigrateCoinModal;
