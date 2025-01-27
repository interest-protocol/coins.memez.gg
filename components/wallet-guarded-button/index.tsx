import { Button, ButtonProps } from '@stylin.js/elements';
import { FC, useMemo } from 'react';

import { useConnectModal } from '../wallet-button/wallet-button.hook';

const WalletGuardedButton: FC<ButtonProps> = (props) => {
  const currentAccount = useMemo(
    () => ({
      address:
        '0x1eb7c567d5fcc99140007716d4235e2c72a4b65a7b89197f15fb73c2fb57d3d9',
    }),
    []
  );
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
