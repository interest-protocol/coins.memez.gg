import { CoinMetadata } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  type: string;
  decimals: number;
  iconUrl: string;
  treasuryCap: string;
  ipxTreasuryCap: string;
  metadataObjectId: string;
  createdAt: string;
  createdBy: string;
  description: string;
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
