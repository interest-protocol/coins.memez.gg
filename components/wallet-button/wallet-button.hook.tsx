import { useModal } from '@/hooks/use-modal';

import ConnectModal from './connect-modal';

export const useConnectModal = () => {
  const { setContent, onClose } = useModal();

  return () =>
    setContent(<ConnectModal />, {
      onClose,
      overlayProps: {
        alignItems: ['flex-end', 'center'],
      },
      containerProps: {
        maxWidth: ['100vw', '95vw'],
      },
    });
};
