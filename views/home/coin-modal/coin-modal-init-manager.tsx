import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useModal } from '@/hooks/use-modal';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { updateURL } from '@/utils/url';

import CoinModal from '.';

const CoinModalInitManager: FC = () => {
  const { pathname } = useRouter();
  const { setContent } = useModal();
  const params = useURIStaticParams();

  useEffect(() => {
    if (!params?.has('coin')) return;

    const coin = params.get('coin');
    const mode = params.get('mode');

    updateURL(`${pathname}?coin=${coin}&mode=${mode}`);

    setContent(<CoinModal />, {
      onClose: () => updateURL(pathname),
      overlayProps: {
        alignItems: ['flex-end', 'center'],
      },
      containerProps: {
        maxWidth: ['100vw', '95vw'],
      },
    });
  }, [params]);

  return null;
};

export default CoinModalInitManager;
