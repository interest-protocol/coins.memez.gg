import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import DraggableInput from '@/components/draggable-input';

import { ICreateCoin } from '../../../create-coin.types';
import CreateCoinField from '../../../create-coin-field';

const CreateCoinDetails: FC = () => {
  const { setValue } = useFormContext<ICreateCoin>();

  return (
    <Div display="flex" flexDirection="column" gap="0.5rem">
      <CreateCoinField
        name="name"
        kind="text"
        label="Name"
        placeholder="Coin name"
      />
      <CreateCoinField
        kind="text"
        name="symbol"
        label="Symbol"
        placeholder="Coin symbol"
      />
      <CreateCoinField
        kind="text"
        name="description"
        label="Description"
        limit="1000 letter max"
        placeholder="Description"
      />
      <CreateCoinField
        kind="text"
        name="imageUrl"
        label="Image Link"
        placeholder="Link"
      />
      <DraggableInput
        validTypes={['image/']}
        advice="Maximum file size: 5MB"
        setFileUrl={(url: string) => setValue('imageUrl', url)}
      />
    </Div>
  );
};

export default CreateCoinDetails;
