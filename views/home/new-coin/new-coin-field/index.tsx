import { Div, Input, Label, P, Span } from '@stylin.js/elements';
import { path } from 'ramda';
import { FC } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { ICreateCoin } from '../create-coin-modal/create-coin.types';
import { NewCoinFieldProps } from './new-coin-field.types';

const NewCoinField: FC<NewCoinFieldProps> = ({
  kind,
  name,
  label,
  limit,
  placeholder,
}) => {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateCoin>();

  return (
    <Label display="flex" gap="0.5rem" flexDirection="column">
      <Div display="flex" alignItems="flex-end" justifyContent="space-between">
        <Span fontSize="1rem">{label}</Span>
        {limit && (
          <P fontSize="0.825rem" color="#9B9CA1">
            {limit}
          </P>
        )}
      </Div>
      <Div display="flex" gap="0.125rem" flexDirection="column">
        <Input
          all="unset"
          bg="#1A1A1A"
          p="1.125rem"
          borderRadius="0.5rem"
          placeholder={placeholder}
          {...register(name, {
            onChange: (e) => {
              if (path(name.split('.'), errors)) trigger(name);

              if (kind === 'numeric')
                setValue(name, parseInputEventToNumberString(e));
            },
          })}
        />
        {(path(name.split('.'), errors) as FieldError)?.message && (
          <P fontSize="0.75rem" color="#FF562C">
            {(path(name.split('.'), errors) as FieldError).message}
          </P>
        )}
      </Div>
    </Label>
  );
};

export default NewCoinField;
