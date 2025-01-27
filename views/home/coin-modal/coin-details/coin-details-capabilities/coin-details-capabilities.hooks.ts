import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { IPX_COIN_STANDARD } from '@/constants';
import { useNetwork } from '@/hooks/use-network';
import { Abilities } from '@/interface';
import { signAndExecute, throwTXIfNotSuccessful, waitForTx } from '@/utils';

const moveFnName = {
  [Abilities.Burn]: 'burn',
  [Abilities.Mint]: 'mint',
  [Abilities.Edit]: 'metadata',
};

export const useDestroyCap = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (cap: string, ability: Abilities) => {
    invariant(currentAccount, 'You must be connected');

    const tx = new Transaction();

    tx.moveCall({
      target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::destroy_${moveFnName[ability]}_cap`,
      arguments: [tx.object(cap)],
    });

    const txResult = await signAndExecute({
      tx,
      suiClient,
      currentAccount,
      signTransaction,
    });

    throwTXIfNotSuccessful(txResult);

    await waitForTx({ suiClient, digest: txResult.digest });

    return txResult.digest;
  };
};
