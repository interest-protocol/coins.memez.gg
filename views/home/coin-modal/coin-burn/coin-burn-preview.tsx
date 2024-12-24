import { Div, H2, Hr, Img, P, Span } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import WalletGuardedButton from '@/components/wallet-guarded-button';
import { useCoinSupply } from '@/hooks/use-coin-supply';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber } from '@/utils';

import { useBurn } from './coin-burn.hook';
import { CoinBurnPreviewProps, IBurnForm } from './coin-burn.types';

const CoinBurnPreview: FC<CoinBurnPreviewProps> = ({ coin }) => {
  const burn = useBurn(coin);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { control } = useFormContext<IBurnForm>();
  const { totalSupply } = useCoinSupply(coin.type);

  const amount = useWatch({ control, name: 'amount' });

  const handleBurn = async () => {
    try {
      setLoading(true);
      await burn();
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
            src={coin.iconUrl}
            borderRadius="0.5rem"
          />
          <Span color="#FFFFFFA3">{coin.symbol}</Span>
        </Div>
        <Div textAlign="right">
          <P color="#F5B722">{commaSeparatedNumber(Number(amount))}</P>
          <P color="#FFFFFFA3">{coin.name}</P>
        </Div>
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
      <WalletGuardedButton onClick={handleBurn}>
        {loading ? 'Burning...' : error || 'Burn'}
      </WalletGuardedButton>
    </>
  );
};

export default CoinBurnPreview;
