import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress } from '@mysten/sui/utils';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { IPX_COIN_STANDARD } from '@/constants/package';
import { getBytecode } from '@/lib/move-template/coin-v2';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import { signAndExecute, throwTXIfNotSuccessful, waitForTx } from '@/utils';

import { ICreateCoin } from '../../create-coin.types';

export const useCreateCoin = () => {
  const suiClient = useSuiClient();
  const signTransaction = useSignTransaction();
  const { getValues } = useFormContext<ICreateCoin>();
  const currentAccount = useCurrentAccount();

  return async () => {
    invariant(currentAccount, 'You must be logged in');

    const coin = getValues();

    const tx = new Transaction();

    console.log({ coin });

    await initMoveByteCodeTemplate('/move_bytecode_template_bg.wasm');

    const coinBytecode = getBytecode(coin);

    const [upgradeCap] = tx.publish({
      modules: [[...coinBytecode]],
      dependencies: [
        normalizeSuiAddress('0x1'),
        normalizeSuiAddress('0x2'),
        normalizeSuiAddress(IPX_COIN_STANDARD.testnet),
      ],
    });

    tx.transferObjects([upgradeCap], tx.pure.address(currentAccount.address));

    const tx2 = await signAndExecute({
      tx,
      suiClient,
      currentAccount,
      signTransaction,
    });

    throwTXIfNotSuccessful(tx2);

    await waitForTx({ suiClient, digest: tx2.digest });
  };
};
