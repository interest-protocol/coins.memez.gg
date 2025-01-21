import { TooltipWrapper } from '@interest-protocol/ui-kit';
import { Div, H4, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InfoSVG } from '@/components/svg';
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
        <H4 color="#F5B722" display="flex" alignItems="center" gap="0.5rem">
          Editable
          <Span lineHeight="0" color="#FFFFFF99">
            <TooltipWrapper
              bg="#111"
              fontSize="1rem"
              minWidth="12rem"
              textAlign="center"
              lineHeight="normal"
              fontWeight="normal"
              tooltipPosition="top"
              tooltipContent="Capability to edit coin metadata"
            >
              <InfoSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </TooltipWrapper>
          </Span>
        </H4>
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
