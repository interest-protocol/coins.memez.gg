import { Div, Input, Label, P, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ICreateCoin } from '../create-coin.types';
import { CreateCoinFieldProps } from './create-coin-field.types';

const CreateCoinField: FC<CreateCoinFieldProps> = ({
  name,
  label,
  limit,
  support,
  placeholder,
  supportColor,
}) => {
  const { register } = useFormContext<ICreateCoin>();

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
          {...register(name as keyof ICreateCoin)}
        />
        {support && (
          <P fontSize="0.75rem" color={supportColor}>
            {support}
          </P>
        )}
      </Div>
    </Label>
  );
};

export default CreateCoinField;
