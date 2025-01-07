import { Input, InputElementProps, Label } from '@stylin.js/elements';
import { forwardRef } from 'react';

import { TextFieldProps } from './text-field.types';

const TextField = forwardRef<InputElementProps, TextFieldProps>(
  ({ Prefix, Suffix, ...props }, ref) => (
    <Label
      gap="1rem"
      bg="#1A1A1A"
      p="1.125rem"
      display="flex"
      alignItems="center"
      borderRadius="0.5rem"
      opacity={props.disabled ? 0.7 : 1}
      cursor={props.disabled ? 'not-allowed' : 'text'}
    >
      {Prefix}
      <Input ref={ref} all="unset" width="100%" {...props} />
      {Suffix}
    </Label>
  )
);

TextField.displayName = 'TextField';

export default TextField;
