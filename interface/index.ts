import { CoinMetadata, SuiTransactionBlockResponse } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface Coin {
  name: string;
  type: string;
  symbol: string;
  mintCap: string;
  burnCap: string;
  iconUrl: string;
  canBurn: boolean;
  decimals: number;
  createdAt: string;
  createdBy: string;
  packageId: string;
  description: string;
  treasuryCap: string;
  metadataCap: string;
  maximumSupply: string;
  ipxTreasuryCap: string;
  metadataObjectId: string;
}

export interface Filter {
  type?: string;
  symbol?: string;
  creator?: string;
  treasury?: string;
  burnable?: boolean;
  mintable?: boolean;
  editable?: boolean;
  ipxTreasury?: string;
}

export enum Abilities {
  Burn,
  Mint,
  Edit,
}

export enum CoinModalMode {
  Details,
  Burn,
  Mint,
  Edit,
}

export interface TimedSuiTransactionBlockResponse
  extends SuiTransactionBlockResponse {
  time: number;
}
