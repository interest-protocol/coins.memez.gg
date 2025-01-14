import { useCurrentAccount } from '@mysten/dapp-kit';
import { Button, Div, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Tag from '@/components/tag';
import TextField from '@/components/text-field';
import useCoin from '@/hooks/use-coin';
import { useCoinSupply } from '@/hooks/use-coin-supply';
import { useCoinsAbilities } from '@/hooks/use-coins-abilities';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { Abilities } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import {
  commaSeparatedNumber,
  isSameAddress,
  parseInputEventToNumberString,
} from '@/utils';

import CoinModalLoading from '../coin-modal-loading';
import CoinModalNotFound from '../coin-modal-not-found';
import { IMintForm } from './coin-mint.types';
import CoinBurnPreview from './coin-mint-preview';

const CoinMint: FC = () => {
  const params = useURIStaticParams();
  const account = useCurrentAccount();
  const form = useForm<IMintForm>({ defaultValues: { amount: '0' } });
  const { coin, loading } = useCoin(params?.get('coin') ?? undefined);

  const { totalSupply } = useCoinSupply(coin?.type);
  const { abilities } = useCoinsAbilities({ mintCap: coin?.mintCap });

  if (loading) return <CoinModalLoading />;

  if (!coin) return <CoinModalNotFound />;

  return (
    <FormProvider {...form}>
      <Div gap="1rem" display="flex" flexDirection="column">
        <Div display="flex" alignItems="center" justifyContent="space-between">
          <Tag hexColor="#95CB34">Mint</Tag>
          <Div
            gap="0.5rem"
            px="0.75rem"
            bg="#1A1A1A"
            py="0.825rem"
            display="flex"
            minWidth="10rem"
            alignItems="center"
            borderRadius="0.625rem"
            border="1px solid #242424"
            justifyContent="space-between"
          >
            <Span color="#FFFFFFA3">Maximum</Span>
            <Span color="#F5B722">
              {coin.maximumSupply && totalSupply
                ? commaSeparatedNumber(
                    FixedPointMath.toNumber(
                      BigNumber(coin.maximumSupply).minus(totalSupply),
                      coin.decimals
                    )
                  )
                : '--'}{' '}
              {coin.symbol}
            </Span>
          </Div>
        </Div>
        <TextField
          placeholder="0"
          {...form.register('amount', {
            onChange: (e) =>
              form.setValue('amount', parseInputEventToNumberString(e)),
          })}
          disabled={!abilities?.[Abilities.Mint]}
          Suffix={
            <Button
              all="unset"
              px="0.5rem"
              bg="#161616"
              py="0.25rem"
              borderRadius="0.5rem"
              border="1px solid #7C7C7C"
              disabled={!(coin.maximumSupply && totalSupply)}
              opacity={coin.maximumSupply && totalSupply ? 1 : 0.5}
              cursor={
                coin.maximumSupply && totalSupply ? 'pointer' : 'not-allowed'
              }
              onClick={() =>
                form.setValue(
                  'amount',
                  String(
                    coin.maximumSupply && totalSupply
                      ? FixedPointMath.toNumber(
                          BigNumber(coin.maximumSupply).minus(totalSupply),
                          coin.decimals
                        )
                      : 0
                  )
                )
              }
            >
              MAX
            </Button>
          }
        />
        <CoinBurnPreview
          coin={coin}
          mintable={
            !!(
              abilities?.[Abilities.Mint] &&
              account &&
              isSameAddress(abilities[Abilities.Mint], account.address)
            )
          }
        />
      </Div>
    </FormProvider>
  );
};

export default CoinMint;
