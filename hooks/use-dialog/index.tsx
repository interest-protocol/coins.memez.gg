import { Dialog } from '@/components';
import { DialogProps } from '@/components/dialog/dialog.types';
import { useModal } from '@/hooks/use-modal';

export const useDialog = () => {
  const { setContent, handleClose, onClose } = useModal();

  return {
    handleClose,
    dialog: {
      promise: async (
        promise: Promise<unknown>,
        {
          loading,
          success,
          error,
        }: {
          success: (response: unknown) => DialogProps;
          error: (error: Error) => DialogProps;
          loading: () => Omit<DialogProps, 'button'>;
        }
      ): Promise<void> => {
        try {
          setContent(<Dialog {...loading()} />, { onClose });
          const response = await promise;
          setContent(<Dialog {...success(response)} />, { onClose });
        } catch (e) {
          setContent(<Dialog {...error(e as Error)} />, { onClose });
        }
      },
    },
  };
};
