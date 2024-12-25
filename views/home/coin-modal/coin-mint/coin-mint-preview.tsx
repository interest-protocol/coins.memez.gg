import { Div, H2, Hr, Img, P } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import WalletGuardedButton from '@/components/wallet-guarded-button';
import { useCoinSupply } from '@/hooks/use-coin-supply';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber } from '@/utils';

import { useMint } from './coin-mint.hook';
import { CoinMintPreviewProps, IMintForm } from './coin-mint.types';

const CoinBurnPreview: FC<CoinMintPreviewProps> = ({ coin }) => {
  const mint = useMint(coin);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { control } = useFormContext<IMintForm>();
  const { totalSupply } = useCoinSupply(coin.type);
  const [imageError, setImageError] = useState(false);

  const amount = useWatch({ control, name: 'amount' });

  const handleMint = async () => {
    try {
      setLoading(true);
      await mint();
      setError('');
    } catch (e) {
      console.log({ e });

      setError((e as Error).message);
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
          <P color="#FFFFFFA3">Minting Amount</P>
          <P color="#F5B722">{commaSeparatedNumber(Number(amount))}</P>
        </Div>
        <Hr border="none" borderTop="1px solid #242424" />
        <Div display="flex" justifyContent="space-between" py="0.5rem">
          <P color="#FFFFFFA3">Final Supply</P>
          <P color="#F5B722">
            {totalSupply
              ? commaSeparatedNumber(
                  FixedPointMath.toNumber(totalSupply, coin.decimals) +
                    Number(amount)
                )
              : '--'}
          </P>
        </Div>
      </Div>
      <WalletGuardedButton onClick={handleMint}>
        {loading ? 'Minting...' : error || 'Mint'}
      </WalletGuardedButton>
    </>
  );
};

export default CoinBurnPreview;
