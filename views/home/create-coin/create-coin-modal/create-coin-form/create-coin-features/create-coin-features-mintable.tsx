import { Div, H4 } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ToggleButton } from '@/components/toggle';

import { ICreateCoin } from '../../../create-coin.types';
import CreateCoinField from '../../../create-coin-field';

const Motion = motion.create(Div);

const CreateCoinFeaturesMintable: FC = () => {
  const { control, setValue } = useFormContext<ICreateCoin>();

  const mintable = useWatch({
    control,
    name: 'features.mintable',
  });

  return (
    <Motion
      p="1rem"
      gap="1rem"
      bg="#1A1A1A"
      display="flex"
      borderRadius="0.5rem"
      flexDirection="column"
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <H4 color="#F5B722">Mintable</H4>
        <ToggleButton
          name="burn"
          defaultValue={mintable}
          onChange={() => setValue('features.mintable', !mintable)}
        />
      </Div>
      <AnimatePresence>
        {mintable ? (
          <Motion
            layout
            transition={{ duration: 0.3 }}
            exit={{ scaleY: 0, height: 0 }}
            animate={{
              scaleY: [0, 1],
              height: 'auto',
              transformOrigin: 'top left',
            }}
          >
            <Div
              p="1rem"
              gap="1rem"
              display="flex"
              bg="#3C3C3C40"
              borderRadius="0.5rem"
              flexDirection="column"
            >
              <CreateCoinField
                kind="numeric"
                name="maxSupply"
                limit="Optional"
                label="Max Supply"
                placeholder="100000000000"
              />
            </Div>
          </Motion>
        ) : null}
      </AnimatePresence>
    </Motion>
  );
};

export default CreateCoinFeaturesMintable;
