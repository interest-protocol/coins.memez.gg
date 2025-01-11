import { yupResolver } from '@hookform/resolvers/yup';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DraggableInput from '@/components/draggable-input';

import { CoinEditFormProps } from '../coin-edit.types';
import CoinEditButton from '../coin-edit-button';
import { editCoinSchema } from './coin-edit-form.validation';
import CoinEditFormField from './coin-edit-form-field';

const CoinEditForm: FC<CoinEditFormProps> = ({ coin, editable }) => {
  const form = useForm({
    defaultValues: {
      name: coin.name,
      symbol: coin.symbol,
      imageUrl: coin.iconUrl,
      description: coin.description,
    },
    resolver: yupResolver(editCoinSchema),
  });

  return (
    <FormProvider {...form}>
      <Div display="flex" flexDirection="column" gap="1rem">
        <CoinEditFormField name="name" label="Name" />
        <CoinEditFormField name="symbol" label="Symbol" />
        <CoinEditFormField name="description" label="Description" />
        <CoinEditFormField name="imageUrl" label="Image Link" />
        <DraggableInput
          validTypes={['image/']}
          advice="Maximum file size: 5MB"
          setFileUrl={(url: string) =>
            form.setValue('imageUrl' as never, url as never)
          }
        />
        <CoinEditButton coin={coin} editable={editable} />
      </Div>
    </FormProvider>
  );
};

export default CoinEditForm;
