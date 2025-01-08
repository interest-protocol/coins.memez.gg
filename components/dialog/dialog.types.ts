import { ReactNode } from 'react';

export interface IDialogButton {
  label: string;
  onClick?: () => void;
}

export interface DialogProps {
  title: string;
  Icon?: ReactNode;
  timeout?: number;
  message: string | ReactNode;
  button?: IDialogButton | ReactNode;
  ghostButton?: IDialogButton | ReactNode;
}

export interface DialogCountdownProps {
  timeout: number;
}
