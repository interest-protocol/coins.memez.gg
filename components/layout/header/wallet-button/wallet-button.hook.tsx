import { useModal } from '@/hooks/use-modal';

import ConnectModal from './connect-modal';

export const useConnectModal = () => {
  const { setContent } = useModal();

  return () =>
    setContent(<ConnectModal />, {
      overlayProps: {
        alignItems: ['flex-end', 'center'],
      },
      containerProps: {
        maxWidth: ['100vw', '95vw'],
      },
    });
};
