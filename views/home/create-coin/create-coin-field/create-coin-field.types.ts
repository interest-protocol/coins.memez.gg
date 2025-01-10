import { FieldPath } from 'react-hook-form';

import { ICreateCoin } from '../create-coin.types';

export interface CreateCoinFieldProps {
  label: string;
  limit?: string;
  placeholder: string;
  kind: 'text' | 'numeric';
  name: FieldPath<ICreateCoin>;
}
