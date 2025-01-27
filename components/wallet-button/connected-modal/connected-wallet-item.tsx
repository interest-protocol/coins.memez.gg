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

import { ChevronDownSVG, CopySVG, LogoutSVG, UserSVG } from '@/components/svg';
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
    !!currentAccount && isSameAddress(currentAccount.address, account.address);

  return (
    <AnimatePresence>
      <Motion
        layout
        px="1rem"
        bg="#1A1A1A"
        gap="0.75rem"
        width="20rem"
        display="flex"
        overflow="hidden"
        borderRadius="0.5rem"
        flexDirection="column"
        transition={{ ease: 'linear' }}
        py={isCurrentAccount ? '1rem' : '0.5rem'}
        onClick={() => !isCurrentAccount && switchAccount({ account })}
      >
        <Motion
          layout
          gap="0.25rem"
          display="flex"
          borderRadius="0.5rem"
          flexDirection="column"
          transition={{ ease: 'linear' }}
          px={isCurrentAccount ? '1rem' : '0rem'}
          py={isCurrentAccount ? '0.5rem' : '0rem'}
          border={isCurrentAccount ? '1px solid #FFFFFF33' : 'none'}
        >
          <Div
            gap="1rem"
            py="0.5rem"
            display="flex"
            alignItems="center"
            borderBottom={isCurrentAccount ? '1px solid #242424' : 'none'}
          >
            <Span color="#F5B722">
              <UserSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Span>
            <Span
              flex="1"
              cursor="pointer"
              color={isCurrentAccount ? '#F5B722' : '#ffffff'}
              nHover={{
                textDecoration: isCurrentAccount ? 'underline' : 'none',
              }}
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
            {isCurrentAccount ? (
              <Span
                cursor="pointer"
                onClick={copyAddress}
                nHover={{ color: '#F5B722' }}
              >
                <CopySVG width="100%" maxWidth="1rem" maxHeight="1rem" />
              </Span>
            ) : (
              <Span
                cursor="pointer"
                onClick={copyAddress}
                nHover={{ color: '#F5B722' }}
              >
                <ChevronDownSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
              </Span>
            )}
          </Div>
          <AnimatePresence>
            {isCurrentAccount && (
              <Motion
                display="flex"
                alignItems="center"
                style={{ originY: 0 }}
                justifyContent="space-between"
                exit={{ height: 0, scaleY: 0 }}
                transition={{ ease: 'linear' }}
                animate={{ height: [0, 'auto'], scaleY: [0, 1] }}
              >
                <Span>My Balance</Span>
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
              </Motion>
            )}
          </AnimatePresence>
        </Motion>
        <AnimatePresence>
          {isCurrentAccount && (
            <Motion
              p="1rem"
              display="flex"
              color="#E53E3E"
              cursor="pointer"
              alignItems="center"
              borderRadius="0.5rem"
              style={{ originY: 0 }}
              border="1px solid #FFFFFF33"
              justifyContent="space-between"
              exit={{ height: 0, scaleY: 0 }}
              transition={{ ease: 'linear' }}
              onClick={() => disconnectWallet()}
              nHover={{ borderColor: '#E53E3E' }}
              animate={{ height: [0, 'auto'], scaleY: [0, 1] }}
            >
              <Span>Disconnect</Span>
              <LogoutSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            </Motion>
          )}
        </AnimatePresence>
      </Motion>
    </AnimatePresence>
  );
};

export default ConnectedWalletItem;
