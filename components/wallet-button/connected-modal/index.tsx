import { useCurrentAccount } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, DivElementProps } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { UserSVG } from '@/components/svg';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import ConnectedWallets from './connected-wallets';

const ConnectedModal: FC = () => {
  const [show, setShow] = useState(false);
  const currentAccount = useCurrentAccount();

  const menuRef = useClickOutsideListenerRef<DivElementProps>(() =>
    setShow(false)
  );

  return (
    <Div
      ref={menuRef}
      display="flex"
      position="relative"
      alignItems="flex-end"
      flexDirection="column"
    >
      <Button
        all="unset"
        gap="0.5rem"
        bg="#1F1F1F"
        display="flex"
        cursor="pointer"
        alignItems="center"
        borderRadius="2rem"
        whiteSpace="nowrap"
        px={['1rem', '1.25rem']}
        py={['0.75rem', '0.825rem']}
        onClick={() => setShow(not)}
        border="1px solid #F5B72280"
      >
        <Div display={['none', 'block']}>
          <UserSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Div>
        {formatAddress(currentAccount!.address)}
      </Button>
      <AnimatePresence>{show && <ConnectedWallets />}</AnimatePresence>
    </Div>
  );
};

export default ConnectedModal;
