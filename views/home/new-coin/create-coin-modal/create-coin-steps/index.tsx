import { Button, Div, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import unikey from 'unikey';

import { STEP_DISPLAY } from '../create-coin.data';
import { ICreateCoin, Step, STEPS } from '../create-coin.types';

const CreateCoinSteps: FC = () => {
  const { control, setValue } = useFormContext<ICreateCoin>();
  const step = useWatch({ control, name: 'step' });

  const handleStep = (formStep: Step) => {
    if (step < formStep) return;

    setValue('step', formStep);
  };

  return (
    <Div display="flex" alignItems="center">
      {STEPS.map((formStep) => [
        !!formStep && (
          <Div
            flex="1"
            overflow="hidden"
            borderTop="1px dashed"
            color={step >= formStep ? '#F5B722' : '#7C7C7C'}
          />
        ),
        <Button
          all="unset"
          key={unikey()}
          border="1px solid"
          whiteSpace="nowrap"
          borderRadius="2rem"
          px={['0.5rem', '1.5rem']}
          py={['0.5rem', '0.75rem']}
          onClick={() => handleStep(formStep)}
          cursor={step > formStep ? 'pointer' : 'normal'}
          bg={step > formStep ? '#F5B722' : 'transparent'}
          color={
            step > formStep
              ? '#000000'
              : step === formStep
                ? '#F5B722'
                : '#7C7C7C'
          }
        >
          {formStep + 1}
          <Span>. {STEP_DISPLAY[formStep]}</Span>
        </Button>,
      ])}
    </Div>
  );
};

export default CreateCoinSteps;
