import { Dialog } from '@/components';
import { useModal } from '@/hooks/use-modal';

import { IDialogData } from './use-dialog.types';

export const useDialog = () => {
  const { setContent, handleClose } = useModal();

  return {
    handleClose,
    dialog: {
      promise: async (
        promise: Promise<void>,
        {
          loading,
          success,
          error,
        }: Record<'error' | 'loading' | 'success', () => IDialogData>
      ): Promise<void> => {
        try {
          setContent(<Dialog status="loading" {...loading()} />, {
            onClose: handleClose,
          });
          await promise;
          setContent(<Dialog status="success" {...success()} />, {
            onClose: handleClose,
          });
        } catch {
          setContent(<Dialog status="error" {...error()} />, {
            onClose: handleClose,
          });
        }
      },
    },
  };
};
