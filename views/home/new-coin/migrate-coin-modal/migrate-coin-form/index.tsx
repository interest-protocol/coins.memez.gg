import { Div, H3 } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STEP_DISPLAY } from '../migrate-coin.data';
import { IMigrateCoin, Step } from '../migrate-coin.types';
import MigrateCoinButton from '../migrate-coin-button';
import CreateCoinSteps from '../migrate-coin-steps';
import MigrateCoinFeatures from './migrate-coin-features';
import CreateCoinPreviewContent from './migrate-coin-preview/migrate-coin-preview-content';
import MigrateCoinSelector from './migrate-coin-selector';

const Motion = motion.create(Div);

const STEP_FORM = {
  [Step.Select]: (
    <Motion
      width="100%"
      exit={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <MigrateCoinSelector />
    </Motion>
  ),
  [Step.Features]: (
    <Motion
      width="100%"
      exit={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <MigrateCoinFeatures />
    </Motion>
  ),
};

const MigrateCoinFormContent: FC = () => {
  const { control } = useFormContext<IMigrateCoin>();
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

const MigrateCoinForm: FC = () => (
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
    <MigrateCoinFormContent />
    <MigrateCoinButton />
  </Div>
);

export default MigrateCoinForm;
