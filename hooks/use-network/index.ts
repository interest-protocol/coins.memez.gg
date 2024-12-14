import { useSuiClientContext } from '@mysten/dapp-kit';

export const useNetwork = () => useSuiClientContext().network;
