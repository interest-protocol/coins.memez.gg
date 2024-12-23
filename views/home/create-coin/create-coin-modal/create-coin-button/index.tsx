import { Button } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { NEXT_BUTTON_TEXT, NEXT_STEP } from '../../create-coin.data';
import { ICreateCoin, Step } from '../../create-coin.types';
import { useCreateCoin } from './create-coin-button.hook';

const CreateCoinButton: FC = () => {
  const createCoin = useCreateCoin();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { control, setValue } = useFormContext<ICreateCoin>();

  const step = useWatch({ control, name: 'step' });

  const handleCreateCoin = async () => {
    try {
      setLoading(true);
      await createCoin();
    } catch (e) {
      console.warn({ e });

      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (step === Step.Preview)
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
        onClick={handleCreateCoin}
      >
        {loading ? 'Creating Coin...' : error || 'Create Coin'}
      </Button>
    );

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
