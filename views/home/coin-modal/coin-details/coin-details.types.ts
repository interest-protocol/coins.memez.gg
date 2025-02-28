import { Abilities } from '@/interface';

export interface CoinDetailsCapabilitiesProps {
  canBurn: boolean;
  loading: boolean;
  packageId: string;
  abilities: undefined | Record<Abilities, string | null>;
  caps: Record<'burnCap' | 'mintCap' | 'metadataCap', string | undefined>;
}

export interface CapabilityDestroyModalProps {
  onClick: () => Promise<void>;
}
