import { Coin } from '@/interface';

export interface IBurnForm {
  amount: string;
}

export interface CoinBurnButtonProps {
  coin: Coin;
  burnable: boolean;
}
