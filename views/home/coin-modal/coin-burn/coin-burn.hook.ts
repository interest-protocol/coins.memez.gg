import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeStructTag } from '@mysten/sui/utils';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { IPX_COIN_STANDARD } from '@/constants';
import { useNetwork } from '@/hooks/use-network';
import { Coin } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import {
  getCoins,
  signAndExecute,
  throwTXIfNotSuccessful,
  waitForTx,
} from '@/utils';

import { IBurnForm } from './coin-burn.types';

export const useBurn = ({ burnCap, ipxTreasuryCap, type, decimals }: Coin) => {
  const network = useNetwork();
  const client = useSuiClient();

  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const publicBurn = burnCap === ipxTreasuryCap;
  const { getValues } = useFormContext<IBurnForm>();

  return async () => {
    invariant(currentAccount, 'You must be connected');

    const amount = getValues('amount');

    const tx = new Transaction();

    const [targetCoin, ...otherCoins] = await getCoins({
      client,
      type: type,
      account: currentAccount.address,
    });

    if (otherCoins.length)
      tx.mergeCoins(
        tx.object(targetCoin.coinObjectId),
        otherCoins
          .slice(0, 200)
          .map(({ coinObjectId }) => tx.object(coinObjectId))
      );

    const coin = tx.splitCoins(tx.object(targetCoin.coinObjectId), [
      FixedPointMath.toBigNumber(amount, decimals).toFixed(0),
    ]);

    tx.moveCall({
      target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::${
        publicBurn ? 'treasury' : 'cap'
      }_burn`,
      typeArguments: [normalizeStructTag(type)],
      arguments: publicBurn
        ? [tx.object(ipxTreasuryCap), coin]
        : [tx.object(burnCap), tx.object(ipxTreasuryCap), coin],
    });

    const txResult = await signAndExecute({
      tx,
      currentAccount,
      signTransaction,
      suiClient: client,
    });

    throwTXIfNotSuccessful(txResult);

    await waitForTx({ suiClient: client, digest: txResult.digest });

    return txResult.digest;
  };
};
