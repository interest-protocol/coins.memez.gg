import { useConnectWallet, useWallets } from '@mysten/dapp-kit';
import { Div, H2, Img, Li, P, Ul } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { useModal } from '@/hooks/use-modal';

const ConnectModal: FC = () => {
  const wallets = useWallets();
  const { handleClose } = useModal();
  const { mutate } = useConnectWallet();

  return (
    <Div
      p="1rem"
      gap="2rem"
      bg="#3C3C3C80"
      display="flex"
      width="33.25rem"
      maxHeight="90vh"
      borderRadius="1rem"
      flexDirection="column"
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
            onClick={() => {
              mutate({ wallet });
              handleClose();
            }}
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
