import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import {
  Transaction,
  TransactionObjectArgument,
} from '@mysten/sui/transactions';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { FEE_ADDRESS, MIGRATE_COIN_FEE } from '@/constants/fee';
import { IPX_COIN_STANDARD } from '@/constants/package';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { signAndExecute, throwTXIfNotSuccessful, waitForTx } from '@/utils';

import { IMigrateCoin } from '../migrate-coin.types';

export const useMigrateCoin = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { getValues } = useFormContext<IMigrateCoin>();

  return async () => {
    invariant(currentAccount, 'You must be logged in');

    const [
      type,
      treasuryId,
      mintable,
      maxSupply,
      decimals,
      burnable,
      canBurn,
      editable,
    ] = getValues([
      'type',
      'treasuryId',
      'features.mintable',
      'maxSupply',
      'decimals',
      'features.burnable',
      'features.canBurn',
      'features.editable',
    ]);

    const caps: Array<TransactionObjectArgument | string> = [];

    const tx = new Transaction();

    const fee = tx.splitCoins(tx.gas, [
      tx.pure.u64(FixedPointMath.toBigNumber(MIGRATE_COIN_FEE).toString()),
    ]);

    const [ipxTreasuryCap, witness] = tx.moveCall({
      target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::new`,
      typeArguments: [type],
      arguments: [tx.object(treasuryId)],
    });

    caps.push(ipxTreasuryCap);

    if (mintable) {
      if (Number(maxSupply))
        tx.moveCall({
          target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::set_maximum_supply`,
          arguments: [
            witness,
            tx.pure.u64(
              FixedPointMath.toBigNumber(maxSupply, decimals).toFixed(0)
            ),
          ],
        });

      const mintCap = tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::create_mint_cap`,
        arguments: [tx.object(witness)],
      });

      caps.push(mintCap);
    }

    if (burnable) {
      const burnCap = tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::create_burn_cap`,
        arguments: [tx.object(witness)],
      });

      caps.push(burnCap);
    } else if (canBurn)
      tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::allow_public_burn`,
        arguments: [tx.object(witness), tx.object(ipxTreasuryCap)],
      });

    if (editable) {
      const metadataCap = tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::create_metadata_cap`,
        arguments: [tx.object(witness)],
      });

      caps.push(metadataCap);
    }

    tx.moveCall({
      target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::destroy_witness`,
      typeArguments: [type],
      arguments: [tx.object(ipxTreasuryCap), tx.object(witness)],
    });

    tx.transferObjects(caps, tx.pure.address(currentAccount.address));

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
