import { Div, H3 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STEP_DISPLAY } from '../../create-coin.data';
import { ICreateCoin, Step } from '../../create-coin.types';
import CreateCoinButton from '../create-coin-button';
import CreateCoinSteps from '../create-coin-steps';
import CreateCoinDetails from './create-coin-details';
import CreateCoinFeatures from './create-coin-features';
import CreateCoinPreviewContent from './create-coin-preview/create-coin-preview-content';
import CreateCoinSupply from './create-coin-supply';

const STEP_FORM = {
  [Step.Details]: <CreateCoinDetails />,
  [Step.Supply]: <CreateCoinSupply />,
  [Step.Features]: <CreateCoinFeatures />,
};

const CreateCoinFormContent: FC = () => {
  const { control } = useFormContext<ICreateCoin>();
  const step = useWatch({ control, name: 'step' });

  if (step === Step.Preview)
    return (
      <Div
        gap="1.5rem"
        display="flex"
        overflowY="auto"
        minWidth="26rem"
        flexDirection="column"
      >
        <CreateCoinPreviewContent />
      </Div>
    );

  return (
    <Div gap="1.5rem" display="flex" overflowY="auto" flexDirection="column">
      <CreateCoinSteps />
      <H3>{STEP_DISPLAY[step]}</H3>
      {STEP_FORM[step]}
    </Div>
  );
};

const CreateCoinForm: FC = () => (
  <Div
    flex="1"
    gap="1.5rem"
    width="100%"
    display="flex"
    maxWidth="34rem"
    overflowY="auto"
    flexDirection="column"
    justifyContent="space-between"
  >
    <CreateCoinFormContent />
    <CreateCoinButton />
  </Div>
);

export default CreateCoinForm;
