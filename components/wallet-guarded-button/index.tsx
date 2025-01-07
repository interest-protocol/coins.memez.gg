import { useCurrentAccount } from '@mysten/dapp-kit';
import { Button, ButtonProps } from '@stylin.js/elements';
import { FC } from 'react';

import { useConnectModal } from '../layout/header/wallet-button/wallet-button.hook';

const WalletGuardedButton: FC<ButtonProps> = (props) => {
  const currentAccount = useCurrentAccount();
  const handleOpenConnectModal = useConnectModal();

  if (!currentAccount)
    return (
      <Button
        all="unset"
        p="1.125rem"
        gap="0.5rem"
        bg="#F5B722"
        display="flex"
        color="#000000"
        cursor="pointer"
        alignItems="center"
        whiteSpace="nowrap"
        borderRadius="0.75rem"
        justifyContent="center"
        {...props}
        onClick={handleOpenConnectModal}
      >
        Connect Wallet
      </Button>
    );

  return (
    <Button
      all="unset"
      p="1.125rem"
      gap="0.5rem"
      bg="#F5B722"
      display="flex"
      color="#000000"
      cursor="pointer"
      alignItems="center"
      whiteSpace="nowrap"
      borderRadius="0.75rem"
      justifyContent="center"
      nDisabled={{ opacity: 0.3, cursor: 'not-allowed' }}
      {...props}
    />
  );
};

export default WalletGuardedButton;
