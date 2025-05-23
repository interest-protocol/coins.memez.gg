import { Div, H2, Hr, Img, P } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useCoinSupply } from '@/hooks/use-coin-supply';
import { Coin } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber } from '@/utils';

import { IBurnForm } from './coin-burn.types';

const CoinBurnPreview: FC<Coin> = (coin) => {
  const { control } = useFormContext<IBurnForm>();
  const { totalSupply } = useCoinSupply(coin.type);
  const [imageError, setImageError] = useState(false);

  const amount = useWatch({ control, name: 'amount' });

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
            <P
              maxWidth="16ch"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {coin.symbol}
            </P>
            <P
              maxWidth="12ch"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {coin.name}
            </P>
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
    </>
  );
};

export default CoinBurnPreview;
