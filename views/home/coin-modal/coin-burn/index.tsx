import { useCurrentAccount } from '@mysten/dapp-kit';
import { Button, Div, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Tag from '@/components/tag';
import TextField from '@/components/text-field';
import useCoin from '@/hooks/use-coin';
import { useCoinBalance } from '@/hooks/use-coin-balance';
import { useCoinsAbilities } from '@/hooks/use-coins-abilities';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { Abilities } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber, isSameAddress } from '@/utils';

import { IBurnForm } from './coin-burn.types';
import CoinBurnPreview from './coin-burn-preview';

const CoinBurn: FC = () => {
  const params = useURIStaticParams();
  const account = useCurrentAccount();
  const { coin } = useCoin(params?.get('coin') ?? undefined);
  const form = useForm<IBurnForm>({
    defaultValues: {
      amount: '0',
    },
  });

  const { balance } = useCoinBalance(coin?.type);
  const { abilities } = useCoinsAbilities({
    burnCap: coin?.burnCap,
  });

  if (!coin) return <Div>No Coin to show!</Div>;

  const burnable = !!(coin.canBurn || abilities?.[Abilities.Burn]);

  return (
    <FormProvider {...form}>
      <Div gap="1rem" display="flex" flexDirection="column">
        <Div display="flex" alignItems="center" justifyContent="space-between">
          <Tag hexColor="#FF562C">Burn</Tag>
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
            <Span color="#FFFFFFA3">Balance</Span>
            <Span color="#F5B722">
              {balance
                ? commaSeparatedNumber(
                    FixedPointMath.toNumber(balance, coin.decimals)
                  )
                : 0}{' '}
              {coin.symbol}
            </Span>
          </Div>
        </Div>
        <TextField
          placeholder="0"
          disabled={!burnable}
          {...form.register('amount')}
          Suffix={
            <Button
              all="unset"
              px="0.5rem"
              bg="#161616"
              py="0.25rem"
              borderRadius="0.5rem"
              border="1px solid #7C7C7C"
              onClick={() =>
                form.setValue(
                  'amount',
                  String(
                    balance
                      ? FixedPointMath.toNumber(balance, coin.decimals)
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
          burnable={
            !!(
              coin.canBurn ||
              (abilities?.[Abilities.Burn] &&
                account?.address &&
                isSameAddress(abilities[Abilities.Burn], account.address))
            )
          }
        />
      </Div>
    </FormProvider>
  );
};
export default CoinBurn;
