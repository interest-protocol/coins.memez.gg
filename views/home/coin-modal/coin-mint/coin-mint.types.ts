import { Coin } from '@/interface';

export interface IMintForm {
  amount: string;
}

export interface CoinMintButtonProps {
  coin: Coin;
  mintable: boolean;
}
