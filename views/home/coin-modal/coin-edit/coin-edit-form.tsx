import { Div, Label, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DraggableInput from '@/components/draggable-input';
import TextField from '@/components/text-field';

import { CoinEditFormProps, IEditForm } from './coin-edit.types';
import CoinEditButton from './coin-edit-button';
import CoinEditFormImage from './coin-edit-form-image';

const CoinEditForm: FC<CoinEditFormProps> = ({ coin, editable }) => {
  const form = useForm<IEditForm>({
    defaultValues: {
      name: coin.name,
      symbol: coin.symbol,
      imageUrl: coin.iconUrl,
      description: coin.description,
    },
  });

  return (
    <FormProvider {...form}>
      <Div display="flex" flexDirection="column" gap="1rem">
        <Label display="flex" flexDirection="column" gap="0.5rem">
          <Span>Name</Span>
          <TextField {...form.register('name')} />
        </Label>
        <Label display="flex" flexDirection="column" gap="0.5rem">
          <Span>Symbol</Span>
          <TextField {...form.register('symbol')} />
        </Label>

        <Label display="flex" flexDirection="column" gap="0.5rem">
          <Span>Description</Span>
          <TextField {...form.register('description')} />
        </Label>
        <Label display="flex" flexDirection="column" gap="0.5rem">
          <Span>Image Link</Span>
          <TextField
            Prefix={<CoinEditFormImage />}
            {...form.register('imageUrl')}
          />
        </Label>
        <DraggableInput
          validTypes={['image/']}
          advice="Maximum file size: 5MB"
          setFileUrl={(url: string) => form.setValue('imageUrl', url)}
        />
        <CoinEditButton coin={coin} editable={editable} />
      </Div>
    </FormProvider>
  );
};

export default CoinEditForm;
