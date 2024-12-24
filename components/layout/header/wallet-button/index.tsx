import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div } from '@stylin.js/elements';
import { motion } from 'framer-motion';
import { FC } from 'react';

import { LogoutSVG, UserSVG, WalletSVG } from '@/components/svg';

import { useConnectModal } from './wallet-button.hook';

const Motion = motion(Div);

const WalletButton: FC = () => {
  const { mutate } = useDisconnectWallet();
  const currentAccount = useCurrentAccount();
  const handleOpenConnectModal = useConnectModal();

  if (currentAccount)
    return (
      <Button
        all="unset"
        px="1.25rem"
        gap="0.5rem"
        bg="#1F1F1F"
        py="0.825rem"
        display="flex"
        cursor="pointer"
        alignItems="center"
        borderRadius="2rem"
        whiteSpace="nowrap"
        onClick={() => mutate()}
        border="1px solid #F5B72280"
      >
        <UserSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        {formatAddress(currentAccount.address)}
        <LogoutSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      </Button>
    );

  return (
    <Div
      display="flex"
      overflow="hidden"
      position="relative"
      alignItems="center"
      borderRadius="2rem"
      justifyContent="center"
    >
      <Motion
        width="100%"
        height="100%"
        position="absolute"
        animate={{
          background: [
            'linear-gradient(0deg, #F5B72280, #0000)',
            'linear-gradient(359deg, #F5B72280, #0000)',
          ],
        }}
        transition={{
          duration: 0.6,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <Button
        all="unset"
        m="0.05rem"
        px="1.25rem"
        gap="0.5rem"
        bg="#1F1F1F"
        height="3rem"
        display="flex"
        cursor="pointer"
        alignItems="center"
        position="relative"
        borderRadius="2rem"
        onClick={handleOpenConnectModal}
      >
        <WalletSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        Connect Wallet
      </Button>
    </Div>
  );
};

export default WalletButton;
