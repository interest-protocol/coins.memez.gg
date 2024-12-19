import { Div, H3 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STEP_DISPLAY } from '../../create-coin.data';
import { ICreateCoin, Step } from '../../create-coin.types';
import CreateCoinButton from '../create-coin-button';
import CreateCoinDetails from './create-coin-details/indext';
import CreateCoinFeatures from './create-coin-features';
import CreateCoinSupply from './create-coin-supply';

const STEP_FORM = {
  [Step.Details]: <CreateCoinDetails />,
  [Step.Supply]: <CreateCoinSupply />,
  [Step.Features]: <CreateCoinFeatures />,
};

const CreateCoinFormContent: FC = () => {
  const { control } = useFormContext<ICreateCoin>();
  const step = useWatch({ control, name: 'step' });

  if (step === Step.Preview) return null;

  return (
    <>
      <H3>{STEP_DISPLAY[step]}</H3>
      {STEP_FORM[step]}
    </>
  );
};

const CreateCoinForm: FC = () => (
  <Div display="flex" flexDirection="column" gap="1.5rem" overflowY="auto">
    <CreateCoinFormContent />
    <CreateCoinButton />
  </Div>
);

export default CreateCoinForm;
