import { FieldPath } from 'react-hook-form';

import { ICreateCoin } from '../create-coin-modal/create-coin.types';
import { IMigrateCoin } from '../migrate-coin-modal/migrate-coin.types';

export interface NewCoinFieldProps {
  label: string;
  limit?: string;
  placeholder: string;
  kind: 'text' | 'numeric';
  name: FieldPath<ICreateCoin | IMigrateCoin>;
}
