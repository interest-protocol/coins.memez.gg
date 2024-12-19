import { Button, Div, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import unikey from 'unikey';

import { STEP_DISPLAY } from '../../create-coin.data';
import { ICreateCoin, STEPS } from '../../create-coin.types';

const CreateCoinSteps: FC = () => {
  const { control } = useFormContext<ICreateCoin>();
  const step = useWatch({ control, name: 'step' });

  return (
    <Div display="flex" alignItems="center">
      {STEPS.map((formStep) => [
        !!formStep && (
          <Div color={step >= formStep ? '#F5B722' : '#7C7C7C'}>---------</Div>
        ),
        <Button
          all="unset"
          px="1.5rem"
          py="0.75rem"
          key={unikey()}
          border="1px solid"
          borderRadius="2rem"
          color={step >= formStep ? '#F5B722' : '#7C7C7C'}
          borderColor={step >= formStep ? '#F5B722' : '#7C7C7C'}
        >
          {formStep + 1}
          <Span>. {STEP_DISPLAY[formStep]}</Span>
        </Button>,
      ])}
    </Div>
  );
};

export default CreateCoinSteps;
