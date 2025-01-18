import { Div } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IMigrateCoin, Step } from '../../migrate-coin.types';
import MigrateCoinPreviewContent from './migrate-coin-preview-content';

const Motion = motion.create(Div);

const MigrateCoinPreview: FC = () => {
  const { control } = useFormContext<IMigrateCoin>();

  const [showPreview, step] = useWatch({
    control,
    name: ['showPreview', 'step'],
  });

  const show = !(!showPreview || step === Step.Preview);

  return (
    <AnimatePresence>
      {show ? (
        <Motion
          overflow="hidden"
          exit={{ scaleX: 0, width: 0 }}
          transition={{ ease: 'linear' }}
          animate={{ scaleX: [0, 1], width: [0, '28rem'] }}
        >
          <Div
            p="1rem"
            width="28rem"
            height="100%"
            bg="#3C3C3C80"
            overflowY="auto"
            borderRadius="1rem"
            border="1px solid #7C7C7C"
            display={['none', 'none', 'none', 'block']}
          >
            <MigrateCoinPreviewContent />
          </Div>
        </Motion>
      ) : null}
    </AnimatePresence>
  );
};

export default MigrateCoinPreview;
