import { Div, H4 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ToggleButton } from '@/components/toggle';

import { ICreateCoin } from '../../../create-coin.types';

const CreateCoinFeaturesAll: FC = () => {
  const { control, setValue } = useFormContext<ICreateCoin>();

  const features = useWatch({
    control,
    name: 'features',
  });

  const activated =
    features.burnable &&
    features.canBurn &&
    features.editable &&
    features.mintable;

  const toggleAll = () => {
    setValue('features.burnable', !activated);
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
        <H4 color="#F5B722">All</H4>
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
