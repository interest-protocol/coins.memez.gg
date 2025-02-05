import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress, SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { CREATE_COIN_FEE, FEE_ADDRESS } from '@/constants/fee';
import { IPX_COIN_STANDARD } from '@/constants/package';
import { useCoinBalance } from '@/hooks/use-coin-balance';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { getBytecode } from '@/lib/move-template/coin-v2';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import { signAndExecute, throwTXIfNotSuccessful, waitForTx } from '@/utils';

import { ICreateCoin } from '../create-coin.types';

export const useCreateCoin = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { getValues } = useFormContext<ICreateCoin>();
  const { balance } = useCoinBalance(SUI_TYPE_ARG, currentAccount?.address);

  return async () => {
    invariant(currentAccount, 'You must be logged in');
    invariant(balance, 'Loading your balance, try again');
    invariant(
      balance.gt(BigNumber(2 * 10 ** 9)),
      'You do not have enough Sui, please charge your wallet and try again'
    );

    const coin = getValues();

    const tx = new Transaction();

    const fee = tx.splitCoins(tx.gas, [
      tx.pure.u64(FixedPointMath.toBigNumber(CREATE_COIN_FEE).toString()),
    ]);

    await initMoveByteCodeTemplate('/move_bytecode_template_bg.wasm');

    const coinBytecode = getBytecode(coin, network);

    const [upgradeCap] = tx.publish({
      modules: [[...coinBytecode]],
      dependencies: [
        normalizeSuiAddress('0x1'),
        normalizeSuiAddress('0x2'),
        normalizeSuiAddress(IPX_COIN_STANDARD[network]),
      ],
    });

    tx.transferObjects([upgradeCap], tx.pure.address(currentAccount.address));
    tx.transferObjects([fee], tx.pure.address(FEE_ADDRESS));

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
