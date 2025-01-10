import { Div, H2, Hr, Img, P } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LoaderSVG } from '@/components/svg';
import WalletGuardedButton from '@/components/wallet-guarded-button';
import { ExplorerMode } from '@/constants';
import { useCoinSupply } from '@/hooks/use-coin-supply';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber } from '@/utils';

import { useBurn } from './coin-burn.hook';
import { CoinBurnPreviewProps, IBurnForm } from './coin-burn.types';

const CoinBurnPreview: FC<CoinBurnPreviewProps> = ({ coin, burnable }) => {
  const burn = useBurn(coin);
  const getExplorerLink = useGetExplorerUrl();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { control } = useFormContext<IBurnForm>();
  const { totalSupply } = useCoinSupply(coin.type);
  const [imageError, setImageError] = useState(false);

  const amount = useWatch({ control, name: 'amount' });

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
    <>
      <H2>Preview</H2>
      <Div
        gap="1rem"
        bg="#1A1A1A"
        p="1.125rem"
        display="flex"
        alignItems="center"
        borderRadius="0.5rem"
        border="1px solid #242424"
        justifyContent="space-between"
      >
        <Div display="flex" gap="0.5rem" alignItems="center">
          <Img
            width="2rem"
            height="2rem"
            alt={coin.name}
            objectFit="cover"
            borderRadius="0.5rem"
            onError={() => setImageError(true)}
            src={imageError ? '/default-image.webp' : coin.iconUrl}
          />
          <Div color="#FFFFFFA3">
            <P>{coin.symbol}</P>
            <P>{coin.name}</P>
          </Div>
        </Div>
        <P color="#F5B722" textAlign="right">
          {commaSeparatedNumber(Number(amount))}
        </P>
      </Div>
      <Div
        py="0.25rem"
        bg="#1A1A1A"
        px="1.125rem"
        borderRadius="0.5rem"
        border="1px solid #242424"
      >
        <Div display="flex" justifyContent="space-between" py="0.5rem">
          <P color="#FFFFFFA3">Initial Supply</P>
          <P color="#F5B722">
            {totalSupply
              ? commaSeparatedNumber(
                  FixedPointMath.toNumber(totalSupply, coin.decimals)
                )
              : '--'}
          </P>
        </Div>
        <Hr border="none" borderTop="1px solid #242424" />
        <Div display="flex" justifyContent="space-between" py="0.5rem">
          <P color="#FFFFFFA3">Burning Amount</P>
          <P color="#F5B722">{commaSeparatedNumber(Number(amount))}</P>
        </Div>
        <Hr border="none" borderTop="1px solid #242424" />
        <Div display="flex" justifyContent="space-between" py="0.5rem">
          <P color="#FFFFFFA3">Final Supply</P>
          <P color="#F5B722">
            {totalSupply
              ? commaSeparatedNumber(
                  FixedPointMath.toNumber(totalSupply, coin.decimals) -
                    Number(amount)
                )
              : '--'}
          </P>
        </Div>
      </Div>
      <WalletGuardedButton disabled={!burnable} onClick={handleBurn}>
        {loading ? 'Burning...' : !burnable ? 'Unable to Burn' : 'Burn'}
      </WalletGuardedButton>
    </>
  );
};

export default CoinBurnPreview;
