import { Div, H4 } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ToggleButton } from '@/components/toggle';

import { IMigrateCoin } from '../../migrate-coin.types';

const MigrateCoinFeaturesEditable: FC = () => {
  const { control, setValue } = useFormContext<IMigrateCoin>();

  const editable = useWatch({
    control,
    name: 'features.editable',
  });

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
        <H4 color="#F5B722">Editable</H4>
        <ToggleButton
          name="burn"
          defaultValue={editable}
          onChange={() => setValue('features.editable', !editable)}
        />
      </Div>
    </Div>
  );
};

export default MigrateCoinFeaturesEditable;
