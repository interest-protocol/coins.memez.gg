import { Button, Div, H3, H4, Img, P, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { ChevronDownSVG, ExternalSVG } from '@/components/svg';
import Tag from '@/components/tag';
import useCoin from '@/hooks/use-coin';
import { useCoinSupply } from '@/hooks/use-coin-supply';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { Abilities } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber } from '@/utils';

import { useCoinsAbilities } from '../../coin-card/coin-card.hooks';

const CoinDetails: FC = () => {
  const params = useURIStaticParams();
  const { coin } = useCoin(params?.get('coin') ?? undefined);

  const { totalSupply } = useCoinSupply(coin?.type);
  const { abilities } = useCoinsAbilities(coin?.ipxTreasuryCap);

  if (!coin) return <Div>No Coin to show!</Div>;

  return (
    <Div>
      <Div
        gap="0.5rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Img
          width="3.75rem"
          alt={coin.name}
          height="3.75rem"
          objectFit="cover"
          borderRadius="50%"
          src={coin.iconUrl}
        />
        <H3>
          {coin.name} <Span color="#9B9CA1">({coin.symbol})</Span>
        </H3>
        <Div display="flex" gap="0.5rem">
          {!abilities?.[Abilities.Burn] && <Tag hexColor="#FF562C">Burn</Tag>}
          {!abilities?.[Abilities.Mint] && <Tag hexColor="#95CB34">Mint</Tag>}
          {abilities?.[Abilities.Edit] && <Tag hexColor="#D0D0D0">Edit</Tag>}
        </Div>
      </Div>
      <Div display="flex" flexDirection="column" gap="1rem">
        <H4>Details</H4>
        <Div
          p="1rem"
          bg="#1A1A1A"
          gap="0.5rem"
          display="flex"
          borderRadius="0.75rem"
          flexDirection="column"
        >
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Name</P>
            <P color="#F5B722">{coin.name}</P>
          </Div>
          <Div borderTop="1px solid #242424" />
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Symbol</P>
            <P color="#F5B722">{coin.symbol}</P>
          </Div>
        </Div>
        <H4>Supply</H4>
        <Div
          p="1rem"
          bg="#1A1A1A"
          gap="0.5rem"
          display="flex"
          borderRadius="0.75rem"
          flexDirection="column"
        >
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Decimals</P>
            <P color="#F5B722">{coin.decimals}</P>
          </Div>
          <Div borderTop="1px solid #242424" />
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Supply</P>
            <P color="#F5B722">
              {totalSupply
                ? commaSeparatedNumber(
                    FixedPointMath.toNumber(totalSupply, coin.decimals)
                  )
                : '--'}
            </P>
          </Div>
        </Div>
        <H4>Description</H4>
        <Div p="1rem" bg="#1A1A1A" borderRadius="0.75rem">
          {coin.description}
        </Div>
        <Button
          all="unset"
          py="1rem"
          gap="1rem"
          my="0.5rem"
          bg="#1A1A1A"
          display="flex"
          alignItems="center"
          borderRadius="0.5rem"
          justifyContent="center"
          border="1px solid #7C7C7C"
        >
          Advanced
          <ChevronDownSVG maxWidth="0.75rem" maxHeight="0.75rem" width="100%" />
        </Button>
        <Button
          all="unset"
          p="1.25rem"
          gap="1rem"
          bg="#F5B722"
          px="1.25rem"
          display="flex"
          color="#000000"
          fontSize="1.25rem"
          alignItems="center"
          borderRadius="1rem"
          justifyContent="center"
        >
          Open on Explorer{' '}
          <ExternalSVG maxWidth="0.75rem" maxHeight="0.75rem" width="100%" />
        </Button>
      </Div>
    </Div>
  );
};

export default CoinDetails;
