import { Div, H3, H4, Img, P, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { commaSeparatedNumber } from '@/utils';

import { ICreateCoin } from '../../../create-coin.types';

const CreateCoinPreview: FC = () => {
  const { control } = useFormContext<ICreateCoin>();

  const [
    showPreview,
    name,
    symbol,
    description,
    iconUrl,
    decimals,
    totalSupply,
  ] = useWatch({
    control,
    name: [
      'showPreview',
      'name',
      'symbol',
      'description',
      'imageUrl',
      'decimals',
      'supply',
    ],
  });

  if (!showPreview) return null;

  return (
    <Div
      p="1rem"
      gap="2rem"
      bg="#3C3C3C80"
      minWidth="26rem"
      borderRadius="1rem"
      border="1px solid #7C7C7C"
    >
      <H3>Coin Details</H3>
      <Div
        gap="0.5rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Img
          alt={name}
          src={iconUrl}
          width="3.75rem"
          height="3.75rem"
          objectFit="cover"
          borderRadius="50%"
        />
        <H3>
          {name} <Span color="#9B9CA1">({symbol})</Span>
        </H3>
        <Div display="flex" gap="0.5rem">
          {/* {!abilities?.[Abilities.Burn] && <Tag hexColor="#FF562C">Burn</Tag>}
          {!abilities?.[Abilities.Mint] && <Tag hexColor="#95CB34">Mint</Tag>}
          {abilities?.[Abilities.Edit] && <Tag hexColor="#D0D0D0">Edit</Tag>} */}
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
            <P color="#F5B722">{name}</P>
          </Div>
          <Div borderTop="1px solid #242424" />
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Symbol</P>
            <P color="#F5B722">{symbol}</P>
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
            <P color="#F5B722">{decimals ?? '--'}</P>
          </Div>
          <Div borderTop="1px solid #242424" />
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Supply</P>
            <P color="#F5B722">
              {totalSupply ? commaSeparatedNumber(totalSupply) : '--'}
            </P>
          </Div>
        </Div>
        <H4>Description</H4>
        <Div p="1rem" bg="#1A1A1A" borderRadius="0.75rem">
          {description ?? ''}
        </Div>
      </Div>
    </Div>
  );
};

export default CreateCoinPreview;
