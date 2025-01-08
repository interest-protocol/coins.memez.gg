import { useConnectWallet, useWallets } from '@mysten/dapp-kit';
import { WalletWithRequiredFeatures } from '@mysten/wallet-standard';
import { Div, H2, Img, Li, P, Ul } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { LoaderSVG } from '@/components/svg';
import { useDialog } from '@/hooks/use-dialog';

const ConnectModal: FC = () => {
  const wallets = useWallets();
  const { mutateAsync } = useConnectWallet();
  const { dialog, handleClose } = useDialog();

  const connectWallet = async (wallet: WalletWithRequiredFeatures) => {
    await mutateAsync({ wallet });
  };

  const handleConnect = (wallet: WalletWithRequiredFeatures) =>
    dialog.promise(connectWallet(wallet), {
      success: () => ({
        timeout: 10000,
        title: 'Connected!',
        button: { label: 'Continue browsing', onClick: handleClose },
        message:
          'Your wallet is now securely connected, opening the door to the world of crypto opportunities.',
        Icon: (
          <Img
            alt="Success"
            width="7rem"
            height="7rem"
            src="/dialogs/success.png"
          />
        ),
      }),
      loading: () => ({
        Icon: <LoaderSVG />,
        title: 'Connecting...',
        message: 'Hang tight! You need to connect on the wallet popup.',
      }),
      error: (e) => ({
        title: 'Oops! You could not Connect!',
        button: { label: 'Try again', onClick: () => handleConnect(wallet) },
        message:
          e.message ||
          'Try to refresh the page, double-check your inputs, or reconnect your wallet.',
        ghostButton: {
          label: 'Do not want to connect my wallet',
          onClick: handleClose,
        },
        Icon: (
          <Img
            alt="Error"
            width="7rem"
            height="7rem"
            src="/dialogs/error.png"
          />
        ),
      }),
    });

  return (
    <Div
      p="1rem"
      gap="2rem"
      bg="#3C3C3C80"
      display="flex"
      maxHeight="90vh"
      flexDirection="column"
      width={['100vw', '33.25rem']}
      borderRadius={['1rem 1rem 0 0', '1rem']}
    >
      <H2 textAlign="center">Select Your Wallet</H2>
      <Ul
        all="unset"
        gap="0.5rem"
        display="flex"
        overflowY="auto"
        flexDirection="column"
      >
        {wallets.map((wallet) => (
          <Li
            p="0.75rem"
            bg="#393838"
            gap="0.75rem"
            key={unikey()}
            display="flex"
            cursor="pointer"
            alignItems="center"
            borderRadius="0.5rem"
            border="1px solid transparent"
            justifyContent="space-between"
            nHover={{ borderColor: '#F5B72280' }}
            onClick={() => handleConnect(wallet)}
          >
            <Div
              key={unikey()}
              gap="0.75rem"
              display="flex"
              cursor="pointer"
              alignItems="center"
            >
              <Img
                alt={wallet.name}
                src={wallet.icon}
                width="2rem"
                height="2rem"
                borderRadius="0.5rem"
              />
              <P>{wallet.name}</P>
            </Div>
            <P color="#BAF6CF">Installed</P>
          </Li>
        ))}
      </Ul>
    </Div>
  );
};

export default ConnectModal;
