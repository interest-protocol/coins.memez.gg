import { useAccounts } from '@mysten/dapp-kit';
import { Div } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';

import ConnectedWalletItem from './connected-wallet-item';

const Motion = motion.create(Div);

const ConnectedWallets: FC = () => {
  const accounts = useAccounts();

  return (
    <Motion
      layout
      p="1rem"
      gap="0.5rem"
      mt="3.5rem"
      bg="#3C3C3C80"
      display="flex"
      overflow="hidden"
      position="absolute"
      exit={{ scaleY: 0 }}
      flexDirection="column"
      style={{ originY: 0 }}
      borderRadius="1.125rem"
      backdropFilter="blur(30px)"
      animate={{ scaleY: [0, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence>
        {accounts.map((account) => (
          <ConnectedWalletItem key={account.address} account={account} />
        ))}
      </AnimatePresence>
    </Motion>
  );
};

export default ConnectedWallets;
