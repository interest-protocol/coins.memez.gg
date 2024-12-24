import { useModal } from '@/hooks/use-modal';

import ConnectModal from './connect-modal';

export const useConnectModal = () => {
  const { setContent } = useModal();

  return () =>
    setContent(<ConnectModal />, {
      allowClose: true,
    });
};
