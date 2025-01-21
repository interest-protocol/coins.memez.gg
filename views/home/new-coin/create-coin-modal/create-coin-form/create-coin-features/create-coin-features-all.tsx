import { TooltipWrapper } from '@interest-protocol/ui-kit';
import { Div, H4 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InfoSVG } from '@/components/svg';
import { ToggleButton } from '@/components/toggle';

import { ICreateCoin } from '../../create-coin.types';

const CreateCoinFeaturesAll: FC = () => {
  const { control, setValue } = useFormContext<ICreateCoin>();

  const features = useWatch({
    control,
    name: 'features',
  });

  const activated =
    (features.burnable || features.canBurn) &&
    features.editable &&
    features.mintable;

  const toggleAll = () => {
    if (activated) setValue('features.burnable', false);
    setValue('features.canBurn', !activated);
    setValue('features.mintable', !activated);
    setValue('features.editable', !activated);
  };

  return (
    <Div
      p="1rem"
      gap="1rem"
      bg="#1A1A1A"
      display="flex"
      borderRadius="0.5rem"
      flexDirection="column"
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <H4 color="#F5B722" display="flex" alignItems="center" gap="0.5rem">
          All
          <Div lineHeight="0" color="#FFFFFF99" display="flex">
            <TooltipWrapper
              bg="#111"
              fontSize="1rem"
              minWidth="12rem"
              textAlign="center"
              lineHeight="normal"
              fontWeight="normal"
              tooltipPosition="right"
              tooltipContent="Enable all the features at same time"
            >
              <InfoSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </TooltipWrapper>
          </Div>
        </H4>
        <ToggleButton
          name="burn"
          defaultValue={activated}
          onChange={toggleAll}
        />
      </Div>
    </Div>
  );
};

export default CreateCoinFeaturesAll;
