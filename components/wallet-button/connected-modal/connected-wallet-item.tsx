import {
  useCurrentAccount,
  useDisconnectWallet,
  useSwitchAccount,
} from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Div, Span, Strong } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { CopySVG, LogoutSVG, UserSVG } from '@/components/svg';
import { ExplorerMode } from '@/constants';
import { useCoinBalance } from '@/hooks/use-coin-balance';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { isSameAddress } from '@/utils';

import { ConnectedWalletItemProps } from './connected-modal.types';

const Motion = motion.create(Div);

const ConnectedWalletItem: FC<ConnectedWalletItemProps> = ({ account }) => {
  const currentAccount = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const { mutate: switchAccount } = useSwitchAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  const { balance } = useCoinBalance('0x2::sui::SUI', account.address);

  const copyAddress = () => {
    toast.success('Copied!');
    window.navigator.clipboard.writeText(account.address);
  };

  const isCurrentAccount =
    currentAccount && isSameAddress(currentAccount.address, account.address);

  return (
    <Motion
      px="1rem"
      py="0.5rem"
      bg="#1A1A1A"
      gap="0.75rem"
      width="20rem"
      display="flex"
      overflow="hidden"
      borderRadius="0.5rem"
      flexDirection="column"
      {...(!isCurrentAccount && { onClick: () => switchAccount({ account }) })}
    >
      <Div
        gap="1rem"
        py="0.5rem"
        display="flex"
        alignItems="center"
        {...(isCurrentAccount && { borderBottom: '1px solid #242424' })}
      >
        <Span color={isCurrentAccount ? '#F5B722' : '#ffffff'}>
          <UserSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Span>
        <Span
          flex="1"
          cursor="pointer"
          color={isCurrentAccount ? '#F5B722' : '#ffffff'}
          nHover={{ textDecoration: isCurrentAccount ? 'underline' : 'unset' }}
        >
          {isCurrentAccount ? (
            <Link
              target="_blank"
              href={getExplorerUrl(account.address, ExplorerMode.Account)}
            >
              {formatAddress(account.address)}
            </Link>
          ) : (
            formatAddress(account.address)
          )}
        </Span>
        {isCurrentAccount && (
          <Span
            cursor="pointer"
            onClick={copyAddress}
            nHover={{ color: '#F5B722' }}
          >
            <CopySVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          </Span>
        )}
      </Div>
      <AnimatePresence>
        {isCurrentAccount && (
          <Motion
            layout
            gap="0.5rem"
            display="grid"
            style={{ originY: 0 }}
            gridTemplateColumns="1fr 1fr"
            exit={{ scaleY: 0, height: 0 }}
            transition={{ ease: 'linear' }}
            animate={{ scaleY: [0, 1], height: [0, 'auto'] }}
          >
            <Div display="flex" flexDirection="column">
              <Span>Your Balance</Span>
              <Span
                gap="0.25rem"
                display="flex"
                color="#F5B722"
                alignItems="center"
              >
                <Strong fontSize="1.5rem" fontWeight="600">
                  {balance
                    ? Number(FixedPointMath.toNumber(balance).toFixed(2))
                    : '--'}
                </Strong>
                <Span>Sui</Span>
              </Span>
            </Div>
            <Div
              px="1rem"
              py="0.5rem"
              display="flex"
              color="#E53E3E"
              cursor="pointer"
              alignItems="center"
              borderRadius="0.5rem"
              border="1px solid #FFFFFF33"
              justifyContent="space-between"
              onClick={() => disconnectWallet()}
              nHover={{ borderColor: '#E53E3E' }}
            >
              <Span>Disconnect</Span>
              <LogoutSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            </Div>
          </Motion>
        )}
      </AnimatePresence>
    </Motion>
  );
};

export default ConnectedWalletItem;
