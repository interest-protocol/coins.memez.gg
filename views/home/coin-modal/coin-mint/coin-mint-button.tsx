import { Img } from '@stylin.js/elements';
import { FC, useState } from 'react';

import { LoaderSVG } from '@/components/svg';
import WalletGuardedButton from '@/components/wallet-guarded-button';
import { ExplorerMode } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';

import { useMint } from './coin-mint.hook';
import { CoinMintButtonProps } from './coin-mint.types';

const CoinMintButton: FC<CoinMintButtonProps> = ({ coin, mintable }) => {
  const mint = useMint(coin);
  const { dialog, handleClose } = useDialog();
  const getExplorerLink = useGetExplorerUrl();
  const [loading, setLoading] = useState(false);

  const goToTx = (tx: string) =>
    window.open(
      getExplorerLink(tx, ExplorerMode.Transaction),
      '_blank',
      'noreferrer'
    );

  const handleMint = async () => {
    if (!mintable) return;

    try {
      setLoading(true);

      await dialog.promise(mint(), {
        success: (txDigest) => ({
          timeout: 15000,
          title: 'Coin Minted',
          button: {
            label: 'See on explorer',
            onClick: () => goToTx(String(txDigest)),
          },
          message: 'Congratulations! Your coin was successfully minted.',
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
          title: 'Minting...',
          message:
            'Accept the transaction on the your wallet pop up, we will let you know when it is done.',
        }),
        error: (e) => ({
          title: 'Oops! You could not mint!',
          button: { label: 'Try again', onClick: handleMint },
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
    <WalletGuardedButton onClick={handleMint} disabled={!mintable}>
      {loading ? 'Minting...' : !mintable ? 'Unable to Mint' : 'Mint'}
    </WalletGuardedButton>
  );
};

export default CoinMintButton;
