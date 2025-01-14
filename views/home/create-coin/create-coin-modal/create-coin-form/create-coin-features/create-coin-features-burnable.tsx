import { Div, H4, P } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ToggleButton } from '@/components/toggle';

import { ICreateCoin } from '../../../create-coin.types';

const Motion = motion.create(Div);

const CreateCoinFeaturesBurnable: FC = () => {
  const { control, setValue } = useFormContext<ICreateCoin>();

  const [burnable, canBurn] = useWatch({
    control,
    name: ['features.burnable', 'features.canBurn'],
  });

  const activated = burnable || canBurn;

  return (
    <Motion
      p="1rem"
      gap="1rem"
      bg="#1A1A1A"
      height="auto"
      display="flex"
      borderRadius="0.5rem"
      flexDirection="column"
      transition={{ ease: 'linear' }}
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <H4 color="#F5B722">Burnable</H4>
        <ToggleButton
          name="burn"
          defaultValue={activated}
          onChange={() => {
            if (activated) {
              setValue('features.burnable', false);
              setValue('features.canBurn', false);
              return;
            }
            setValue('features.canBurn', true);
          }}
        />
      </Div>
      {burnable || canBurn ? (
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
            <Div
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <P color="#FFFFFFA3">Allow public burn</P>
              <ToggleButton
                name="canBurn"
                defaultValue={canBurn}
                onChange={() => {
                  setValue('features.canBurn', !canBurn);
                  setValue('features.burnable', canBurn);
                }}
              />
            </Div>
          </Div>
        </Motion>
      ) : null}
    </Motion>
  );
};

export default CreateCoinFeaturesBurnable;
