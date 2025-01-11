import { Label, P, Span } from '@stylin.js/elements';
import { path } from 'ramda';
import { FC } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import TextField from '@/components/text-field';

import { CoinEditFormFieldProps, IEditForm } from '../coin-edit.types';

const CoinEditFormField: FC<CoinEditFormFieldProps> = ({ name, label }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<IEditForm>();

  return (
    <Label display="flex" flexDirection="column" gap="0.5rem">
      <Span>{label}</Span>
      <TextField
        {...register(name, {
          onChange: () => {
            if (path(name.split('.'), errors)) trigger(name);
          },
        })}
      />
      {(path(name.split('.'), errors) as FieldError)?.message && (
        <P fontSize="0.75rem" color="#FF562C">
          {(path(name.split('.'), errors) as FieldError).message}
        </P>
      )}
    </Label>
  );
};

export default CoinEditFormField;
