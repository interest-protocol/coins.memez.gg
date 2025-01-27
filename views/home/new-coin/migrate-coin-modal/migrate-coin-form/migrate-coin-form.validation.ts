import * as yup from 'yup';

import { MAX_U64 } from '@/constants';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { IMigrateCoin } from '../migrate-coin.types';

export const migrateCoinSchema = yup.object<IMigrateCoin>({
  name: yup.string().required(),
  symbol: yup.string().required(),
  description: yup.string(),
  imageUrl: yup.string(),
  maxSupply: yup
    .string()
    .test(
      'min',
      'Max Supply should be superior than current supply',
      function (value) {
        const { supply, features } = this.parent;

        if (!features?.mintable) return true;

        if (!Number(value)) return true;

        return Number(supply) <= Number(value);
      }
    )
    .test('max', 'Max Supply exceed the u64 max amount', function (value) {
      const { decimals } = this.parent;
      const bnValue = FixedPointMath.toBigNumber(Number(value), decimals);
      return bnValue.lte(MAX_U64);
    }),
  features: yup.object({
    mintable: yup.boolean(),
    burnable: yup.boolean(),
    editable: yup.boolean(),
    all: yup.boolean(),
  }),
});
