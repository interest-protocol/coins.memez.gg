import { DialogProps } from '@/components/dialog/dialog.types';

export type IDialogData = Omit<DialogProps, 'isOpen' | 'status'>;
