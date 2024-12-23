import { Button, Div, Span } from '@stylin.js/elements';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG } from '@/components/svg';

import { ICreateCoin, Step } from '../../../create-coin.types';

const Icon = motion(Span);

const CreateCoinPreviewButton: FC = () => {
  const { control, setValue } = useFormContext<ICreateCoin>();
  const [step, showPreview] = useWatch({
    control,
    name: ['step', 'showPreview'],
  });

  if (step === Step.Preview) return null;

  return (
    <Div display="flex" alignItems="center">
      <Button
        all="unset"
        py="0.75rem"
        px="0.5rem"
        gap="0.5rem"
        bg="#F5B722"
        display="flex"
        color="#000000"
        cursor="pointer"
        alignItems="center"
        flexDirection="column"
        border="1px solid #242424"
        borderTopRightRadius="0.5rem"
        borderBottomRightRadius="0.5rem"
        onClick={() => setValue('showPreview', !showPreview)}
      >
        <Span
          fontWeight="500"
          textOrientation="mixed"
          writingMode="vertical-rl"
          textTransform="uppercase"
        >
          {showPreview ? 'Hide' : 'Show'} Coin Details
        </Span>
        <Icon animate={{ rotate: showPreview ? '90deg' : '-90deg' }}>
          <ChevronDownSVG
            width="100%"
            maxWidth="0.825rem"
            maxHeight="0.825rem"
          />
        </Icon>
      </Button>
    </Div>
  );
};

export default CreateCoinPreviewButton;
