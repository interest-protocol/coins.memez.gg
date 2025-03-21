import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeStructTag } from '@mysten/sui/utils';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { Coin } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { signAndExecute, throwTXIfNotSuccessful, waitForTx } from '@/utils';

import { IMintForm } from './coin-mint.types';

export const useMint = ({
  type,
  mintCap,
  decimals,
  packageId,
  ipxTreasuryCap,
}: Coin) => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { getValues } = useFormContext<IMintForm>();

  return async () => {
    invariant(currentAccount, 'You must be connected');

    const amount = getValues('amount');

    const tx = new Transaction();

    const mintedCoin = tx.moveCall({
      target: `${packageId}::ipx_coin_standard::mint`,
      typeArguments: [normalizeStructTag(type)],
      arguments: [
        tx.object(mintCap),
        tx.object(ipxTreasuryCap),
        tx.pure.u64(FixedPointMath.toBigNumber(amount, decimals).toFixed(0)),
      ],
    });

    tx.transferObjects([mintedCoin], tx.pure.address(currentAccount.address));

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
