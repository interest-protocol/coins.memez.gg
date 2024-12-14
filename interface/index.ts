import { CoinMetadata } from '@mysten/sui/client';

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}
