import { TooltipWrapper } from '@interest-protocol/ui-kit';
import { Div, H4, P, Span } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InfoSVG } from '@/components/svg';
import { ToggleButton } from '@/components/toggle';

import { IMigrateCoin } from '../../migrate-coin.types';

const Motion = motion.create(Div);

const MigrateCoinFeaturesBurnable: FC = () => {
  const { control, setValue } = useFormContext<IMigrateCoin>();

  const [burnable, canBurn] = useWatch({
    control,
    name: ['features.burnable', 'features.canBurn'],
  });

  const activated = burnable || canBurn;

  return (
    <Motion
      layout
      p="1rem"
      gap="1rem"
      bg="#1A1A1A"
      display="flex"
      borderRadius="0.5rem"
      flexDirection="column"
      transition={{ ease: 'linear' }}
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <H4 color="#F5B722" display="flex" alignItems="center" gap="0.5rem">
          Burnable
          <Span lineHeight="0" color="#FFFFFF99">
            <TooltipWrapper
              bg="#111"
              fontSize="1rem"
              minWidth="12rem"
              textAlign="center"
              lineHeight="normal"
              fontWeight="normal"
              tooltipPosition="top"
              tooltipContent="Capability to burn supply"
            >
              <InfoSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </TooltipWrapper>
          </Span>
        </H4>
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
      <AnimatePresence>
        {burnable || canBurn ? (
          <Motion
            layout
            style={{ originY: 0 }}
            exit={{ height: 0, scaleY: 0 }}
            transition={{ duration: 0.3, originY: 0 }}
            animate={{
              height: 'auto',
              scaleY: [0, 1],
              transformOrigin: '0% 0%',
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
      </AnimatePresence>
    </Motion>
  );
};

export default MigrateCoinFeaturesBurnable;
