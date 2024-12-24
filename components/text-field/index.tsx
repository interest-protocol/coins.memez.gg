import { Div, Input, InputElementProps } from '@stylin.js/elements';
import { forwardRef } from 'react';

import { TextFieldProps } from './text-field.types';

const TextField = forwardRef<InputElementProps, TextFieldProps>(
  ({ prefix, suffix, ...props }, ref) => (
    <Div
      gap="1rem"
      bg="#1A1A1A"
      p="1.125rem"
      display="flex"
      alignItems="center"
      borderRadius="0.5rem"
    >
      {prefix}
      <Input ref={ref} all="unset" width="100%" {...props} />
      {suffix}
    </Div>
  )
);

TextField.displayName = 'TextField';

export default TextField;
