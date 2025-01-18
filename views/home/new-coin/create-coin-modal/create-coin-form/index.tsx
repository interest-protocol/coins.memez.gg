import { Div, H3 } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STEP_DISPLAY } from '../create-coin.data';
import { ICreateCoin, Step } from '../create-coin.types';
import CreateCoinButton from '../create-coin-button';
import CreateCoinSteps from '../create-coin-steps';
import CreateCoinDetails from './create-coin-details';
import CreateCoinFeatures from './create-coin-features';
import CreateCoinPreviewContent from './create-coin-preview/create-coin-preview-content';
import CreateCoinSupply from './create-coin-supply';

const Motion = motion.create(Div);

const STEP_FORM = {
  [Step.Details]: (
    <Motion
      width="100%"
      exit={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <CreateCoinDetails />
    </Motion>
  ),
  [Step.Supply]: (
    <Motion
      width="100%"
      exit={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <CreateCoinSupply />
    </Motion>
  ),
  [Step.Features]: (
    <Motion
      width="100%"
      exit={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <CreateCoinFeatures />
    </Motion>
  ),
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
    <Div gap="1.5rem" display="flex" flexDirection="column">
      <CreateCoinSteps />
      <H3>{STEP_DISPLAY[step]}</H3>
      <AnimatePresence>{STEP_FORM[step]}</AnimatePresence>
    </Div>
  );
};

const CreateCoinForm: FC = () => (
  <Div
    flex="1"
    gap="1.5rem"
    display="flex"
    overflowY="auto"
    overflowX="hidden"
    flexDirection="column"
    justifyContent="space-between"
    width={['100%', '34rem', '34rem', '26rem', '34rem']}
  >
    <CreateCoinFormContent />
    <CreateCoinButton />
  </Div>
);

export default CreateCoinForm;
