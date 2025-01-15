import { Img } from '@stylin.js/elements';
import { FC, useState } from 'react';

import { LoaderSVG } from '@/components/svg';
import WalletGuardedButton from '@/components/wallet-guarded-button';
import { ExplorerMode } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';

import { useBurn } from './coin-burn.hook';
import { CoinBurnButtonProps } from './coin-burn.types';

const CoinBurnButton: FC<CoinBurnButtonProps> = ({ coin, burnable }) => {
  const burn = useBurn(coin);
  const getExplorerLink = useGetExplorerUrl();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);

  const goToTx = (tx: string) =>
    window.open(
      getExplorerLink(tx, ExplorerMode.Transaction),
      '_blank',
      'noreferrer'
    );

  const handleBurn = async () => {
    if (!burnable) return;

    try {
      setLoading(true);

      await dialog.promise(burn(), {
        success: (txDigest) => ({
          timeout: 15000,
          title: 'Coin Burnt',
          button: {
            label: 'See on explorer',
            onClick: () => goToTx(String(txDigest)),
          },
          message: 'Congratulations! Your coin was successfully burnt.',
          ghostButton: {
            label: 'Continue browsing',
            onClick: handleClose,
          },
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
          title: 'Burning...',
          message:
            'Your transaction is being executed, we will let you know when it is done.',
        }),
        error: (e) => ({
          title: 'Oops! You could not burn!',
          button: { label: 'Try again', onClick: handleBurn },
          message:
            e.message ||
            'Try to refresh the page, double-check your inputs, or reconnect your wallet.',
          ghostButton: {
            label: 'Do not want to try again!',
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletGuardedButton disabled={!burnable} onClick={handleBurn}>
      {loading ? 'Burning...' : !burnable ? 'Unable to Burn' : 'Burn'}
    </WalletGuardedButton>
  );
};

export default CoinBurnButton;
