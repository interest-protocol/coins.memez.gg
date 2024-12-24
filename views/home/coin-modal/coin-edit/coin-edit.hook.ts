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
import { signAndExecute, throwTXIfNotSuccessful, waitForTx } from '@/utils';

import { IEditForm } from './coin-edit.types';

export const useEdit = ({
  type,
  metadataCap,
  ipxTreasuryCap,
  metadataObjectId,
  ...coin
}: Coin) => {
  const network = useNetwork();
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { getValues } = useFormContext<IEditForm>();

  return async () => {
    invariant(currentAccount, 'You must be connected');

    const [name, symbol, description, imageUrl] = getValues([
      'name',
      'symbol',
      'description',
      'imageUrl',
    ]);

    const tx = new Transaction();

    if (name !== coin.name)
      tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::update_name`,
        typeArguments: [normalizeStructTag(type)],
        arguments: [
          tx.object(ipxTreasuryCap),
          tx.object(metadataObjectId),
          tx.object(metadataCap),
          tx.pure.string(name),
        ],
      });

    if (symbol !== coin.symbol)
      tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::update_symbol`,
        typeArguments: [normalizeStructTag(type)],
        arguments: [
          tx.object(ipxTreasuryCap),
          tx.object(metadataObjectId),
          tx.object(metadataCap),
          tx.pure.string(symbol),
        ],
      });

    if (description !== coin.description)
      tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::update_description`,
        typeArguments: [normalizeStructTag(type)],
        arguments: [
          tx.object(ipxTreasuryCap),
          tx.object(metadataObjectId),
          tx.object(metadataCap),
          tx.pure.string(description),
        ],
      });

    if (imageUrl !== coin.iconUrl)
      tx.moveCall({
        target: `${IPX_COIN_STANDARD[network]}::ipx_coin_standard::update_icon_url`,
        typeArguments: [normalizeStructTag(type)],
        arguments: [
          tx.object(ipxTreasuryCap),
          tx.object(metadataObjectId),
          tx.object(metadataCap),
          tx.pure.string(imageUrl),
        ],
      });

    const txResult = await signAndExecute({
      tx,
      currentAccount,
      signTransaction,
      suiClient: client,
    });

    throwTXIfNotSuccessful(txResult);

    await waitForTx({ suiClient: client, digest: txResult.digest });
  };
};
