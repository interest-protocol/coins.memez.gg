import { Abilities } from '@/interface';

export interface CoinDetailsCapabilitiesProps {
  canBurn: boolean;
  abilities: undefined | Record<Abilities, string | null>;
  caps: Record<'burnCap' | 'mintCap' | 'metadataCap', string | undefined>;
}
