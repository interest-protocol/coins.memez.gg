import type { InputProps } from '@stylin.js/elements';
import type { ReactNode } from 'react';

export type TextFieldProps = InputProps & {
  Prefix?: ReactNode;
  Suffix?: ReactNode;
};
