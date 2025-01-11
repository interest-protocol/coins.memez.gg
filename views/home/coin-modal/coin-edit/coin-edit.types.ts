import { FieldPath } from 'react-hook-form';

import { Coin } from '@/interface';

export interface IEditForm {
  name: string;
  symbol: string;
  imageUrl: string;
  description: string;
}

export interface CoinEditFormProps {
  coin: Coin;
  editable: boolean;
}
export interface CoinEditFormFieldProps {
  label: string;
  name: FieldPath<IEditForm>;
}
