import { useSignTransaction } from '@mysten/dapp-kit';
import {
  SuiClient,
  SuiTransactionBlockResponseOptions,
} from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { WalletAccount } from '@mysten/wallet-standard';

import { CoinMetadataWithType } from '@/interface';

export interface SignAndExecuteArgs {
  suiClient: SuiClient;
  currentAccount: WalletAccount;
  tx: Transaction;
  signTransaction: ReturnType<typeof useSignTransaction>;
  options?: SuiTransactionBlockResponseOptions;
}

export interface WaitForTxArgs {
  suiClient: SuiClient;
  digest: string;
  timeout?: number;
  pollInterval?: number;
}

export interface GetCoinsArgs {
  type: string;
  account: string;
  client: SuiClient;
  cursor?: string | null; // for internal recursive fn
}

export interface FetchCoinMetadataMultipleTypeArg {}

export interface FetchCoinMetadata {
  (types: ReadonlyArray<string>): Promise<ReadonlyArray<CoinMetadataWithType>>;
}
