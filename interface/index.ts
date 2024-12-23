import { CoinMetadata, SuiTransactionBlockResponse } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface Coin {
  id: string;
  name: string;
  type: string;
  symbol: string;
  iconUrl: string;
  decimals: number;
  createdAt: string;
  createdBy: string;
  description: string;
  treasuryCap: string;
  ipxTreasuryCap: string;
  metadataObjectId: string;
}

export interface Filter {
  type?: string;
  symbol?: string;
  creator?: string;
  treasury?: string;
  ipxTreasury?: string;
}

export enum Abilities {
  Details,
  Burn,
  Mint,
  Edit,
}

export interface TimedSuiTransactionBlockResponse
  extends SuiTransactionBlockResponse {
  time: number;
}
