import { Div, H3, H4, Img, P, Span } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Tag from '@/components/tag';
import { commaSeparatedNumber } from '@/utils';

import { ICreateCoin } from '../../../create-coin.types';

const Motion = motion.create(Div);

const CreateCoinPreviewContent: FC = () => {
  const { control } = useFormContext<ICreateCoin>();

  const [
    name,
    symbol,
    description,
    iconUrl,
    decimals,
    totalSupply,
    maxSupply,
    features,
  ] = useWatch({
    control,
    name: [
      'name',
      'symbol',
      'description',
      'imageUrl',
      'decimals',
      'supply',
      'maxSupply',
      'features',
    ],
  });

  return (
    <Div>
      <H3>Coin Details</H3>
      <Div
        gap="0.5rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Img
          alt={name}
          width="3.75rem"
          height="3.75rem"
          objectFit="cover"
          borderRadius="50%"
          src={iconUrl || '/default-image.webp'}
        />
        <H3
          maxWidth="25ch"
          overflow="hidden"
          textAlign="center"
          textOverflow="ellipsis"
        >
          {name || 'Coin Name'}{' '}
          <Span color="#9B9CA1">({symbol || 'Coin Symbol'})</Span>
        </H3>
        <Motion display="flex" gap="0.5rem">
          <AnimatePresence>
            {features.burnable || features.canBurn ? (
              <Motion animate={{ scale: [0, 1] }} exit={{ scale: 0 }}>
                <Tag hexColor="#FF562C">Burn</Tag>
              </Motion>
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {features.mintable && (
              <Motion animate={{ scale: [0, 1] }} exit={{ scale: 0 }}>
                <Tag hexColor="#95CB34">Mint</Tag>
              </Motion>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {features?.editable && (
              <Motion animate={{ scale: [0, 1] }} exit={{ scale: 0 }}>
                <Tag hexColor="#D0D0D0">Edit</Tag>
              </Motion>
            )}
          </AnimatePresence>
        </Motion>
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
            <P
              color="#F5B722"
              maxWidth="25ch"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {name || '--'}
            </P>
          </Div>
          <Div borderTop="1px solid #242424" />
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Symbol</P>
            <P
              color="#F5B722"
              maxWidth="12ch"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {symbol || '--'}
            </P>
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
          {maxSupply && (
            <>
              <Div borderTop="1px solid #242424" />
              <Div display="flex" justifyContent="space-between">
                <P color="#FFFFFFA3">Max Supply</P>
                <P color="#F5B722">{commaSeparatedNumber(maxSupply)}</P>
              </Div>
            </>
          )}
        </Div>
        <H4>Description</H4>
        <Div
          p="1rem"
          bg="#1A1A1A"
          borderRadius="0.75rem"
          wordBreak="break-word"
        >
          {description ?? '--'}
        </Div>
      </Div>
    </Div>
  );
};

export default CreateCoinPreviewContent;
