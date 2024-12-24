import { Coin } from '@/interface';

export interface IEditForm {
  name: string;
  symbol: string;
  imageUrl: string;
  description: string;
}

export interface CoinEditFormProps {
  coin: Coin;
}
