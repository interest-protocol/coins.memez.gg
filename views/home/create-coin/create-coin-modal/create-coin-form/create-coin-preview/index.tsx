import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ICreateCoin, Step } from '../../../create-coin.types';
import CreateCoinPreviewContent from './create-coin-preview-content';

const CreateCoinPreview: FC = () => {
  const { control } = useFormContext<ICreateCoin>();

  const [showPreview, step] = useWatch({
    control,
    name: ['showPreview', 'step'],
  });

  if (!showPreview || step === Step.Preview) return null;

  return (
    <Div
      p="1rem"
      bg="#3C3C3C80"
      minWidth="26rem"
      overflowY="auto"
      borderRadius="1rem"
      border="1px solid #7C7C7C"
      display={['none', 'none', 'none', 'block']}
    >
      <CreateCoinPreviewContent />
    </Div>
  );
};

export default CreateCoinPreview;
