import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { NEXT_BUTTON_TEXT, NEXT_STEP } from '../../create-coin.data';
import { ICreateCoin, Step } from '../../create-coin.types';

const CreateCoinButton: FC = () => {
  const { control, setValue } = useFormContext<ICreateCoin>();

  const step = useWatch({ control, name: 'step' });

  if (step === Step.Preview) return null;

  return (
    <Button
      all="unset"
      p="1.125rem"
      gap="0.5rem"
      bg="#F5B722"
      display="flex"
      color="#000000"
      cursor="pointer"
      alignItems="center"
      whiteSpace="nowrap"
      borderRadius="0.75rem"
      justifyContent="center"
      onClick={() => setValue('step', NEXT_STEP[step])}
    >
      {NEXT_BUTTON_TEXT[step]}
    </Button>
  );
};

export default CreateCoinButton;
