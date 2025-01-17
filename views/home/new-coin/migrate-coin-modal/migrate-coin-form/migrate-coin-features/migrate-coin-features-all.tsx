import { Div, H4 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ToggleButton } from '@/components/toggle';

import { IMigrateCoin } from '../../migrate-coin.types';

const MigrateCoinFeaturesAll: FC = () => {
  const { control, setValue } = useFormContext<IMigrateCoin>();

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
        <H4 color="#F5B722">All</H4>
        <ToggleButton
          name="burn"
          onChange={toggleAll}
          defaultValue={activated}
        />
      </Div>
    </Div>
  );
};

export default MigrateCoinFeaturesAll;
