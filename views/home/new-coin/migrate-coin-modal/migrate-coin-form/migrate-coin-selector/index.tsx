import { Div, H3, H4, Img, P } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import unikey from 'unikey';

import { Radio } from '@/components';
import { useOwnedCoins } from '@/hooks/use-owned-coins';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import CoinModalLoading from '@/views/home/coin-modal/coin-modal-loading';

import { IMigrateCoin } from '../../migrate-coin.types';

const MigrateCoinSelector: FC = () => {
  const { data, error, isLoading } = useOwnedCoins();
  const { control, setValue } = useFormContext<IMigrateCoin>();

  const formType = useWatch({ control, name: 'type' });

  if (isLoading) return <CoinModalLoading />;

  if (error || !data)
    return (
      <Div
        gap="1.5rem"
        height="30rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Img src="/not-found.png" width="11.25rem" height="11.25rem" />
        <Div
          gap="1rem"
          display="flex"
          textAlign="center"
          flexDirection="column"
        >
          <H3 fontSize="2rem">Not found coins</H3>
          <P color="#9B9CA1" maxWidth="25rem">
            Nothing to show, verify your internet connection or probably you do
            not own any treasury cap for any coin
          </P>
        </Div>
      </Div>
    );

  return (
    <Div display="grid" gridTemplateColumns="1fr 1fr" gap="1rem">
      {data.metadataWithSupply.map(
        ({
          name,
          type,
          supply,
          symbol,
          iconUrl,
          decimals,
          treasuryId,
          description,
        }) => (
          <Div
            key={unikey()}
            p="1rem"
            gap="0.5rem"
            bg="#393838"
            display="flex"
            cursor="pointer"
            alignItems="center"
            borderRadius="0.5rem"
            border="1px solid transparent"
            nHover={{ borderColor: '#F5B722' }}
            onClick={() => {
              setValue('name', name);
              setValue('type', type);
              setValue('symbol', symbol);
              setValue('decimals', decimals);
              setValue('decimals', decimals);
              setValue('treasuryId', treasuryId);
              setValue('description', description);
              if (iconUrl) setValue('imageUrl', iconUrl);
              setValue(
                'supply',
                FixedPointMath.toNumber(BigNumber(supply), decimals)
              );
            }}
          >
            <Img
              alt={name}
              width="2rem"
              height="2rem"
              src={iconUrl || '/default-image.webp'}
            />
            <Div flex="1">
              <H4
                maxWidth="12ch"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {name}
              </H4>
              <P
                opacity="0.6"
                maxWidth="14ch"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {symbol}
              </P>
            </Div>
            <Radio active={type === formType} />
          </Div>
        )
      )}
    </Div>
  );
};
export default MigrateCoinSelector;
