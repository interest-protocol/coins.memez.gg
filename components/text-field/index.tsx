import { Div, Input, InputElementProps } from '@stylin.js/elements';
import { forwardRef } from 'react';

import { TextFieldProps } from './text-field.types';

const TextField = forwardRef<InputElementProps, TextFieldProps>(
  ({ Prefix, Suffix, ...props }, ref) => (
    <Div
      gap="1rem"
      bg="#1A1A1A"
      p="1.125rem"
      display="flex"
      alignItems="center"
      borderRadius="0.5rem"
    >
      {Prefix}
      <Input ref={ref} all="unset" width="100%" {...props} />
      {Suffix}
    </Div>
  )
);

TextField.displayName = 'TextField';

export default TextField;
